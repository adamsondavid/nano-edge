import { serveDir, serveFile } from "std/http";
import { download } from "./download.ts";

console.log(Deno.env.toObject());

type Deployment = {
  name: string;
  root: string;
  functions: Set<string>;
};

const deployments = new Map<string, Deployment>();

// TODO: do not manually create deployments
const root = await download("tapw");
const functions = new Set<string>(["api", "bpi"]);
deployments.set("tapw", { name: "tapw", root, functions });

Deno.serve(async (req: Request) => {
  const url = new URL(req.url);

  // TODO: download deployments dynamically
  const deployment = deployments.get(url.hostname.split(".")[0]);
  if (!deployment) return new Response("Not Found", { status: 404 });

  const functionName = url.pathname.split("/")[1];
  if (deployment.functions.has(functionName)) {
    try {
      // deno-lint-ignore ban-ts-comment
      // @ts-ignore
      const fn = await EdgeRuntime.userWorkers.create({
        servicePath: `${root}/functions/${functionName}`,
        memoryLimitMb: 128,
        workerTimeoutMs: 15_000,
        remoteModules: false,
      });
      return fn.fetch(req);
    } catch (e) {
      console.error(`handling request for function ${deployment.name}.${functionName} failed`, e);
      return new Response("Internal Server Error", { status: 500 });
    }
  }

  const res = await serveDir(req, { fsRoot: `${deployment.root}/static` });
  if (res.status === 404) return serveFile(req, `${deployment.root}/static/index.html`);
  return res;
});
