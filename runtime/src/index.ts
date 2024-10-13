import { serveDir, serveFile } from "./deps.ts";
import { download } from "./download.ts";

type Function = {
  name: string;
  fetch: (req: Request) => Promise<Response>;
};

type Deployment = {
  name: string;
  root: string;
  functions: Map<string, Function>;
};

const deployments = new Map<string, Deployment>();

// TODO: do not manually create deployments
const root = await download("tapw");
// deno-lint-ignore ban-ts-comment
// @ts-ignore
const worker = await EdgeRuntime.userWorkers.create({
  servicePath: `${root}/functions/api`,
  forceCreate: true,
  memoryLimitMb: 128,
  workerTimeoutMs: 15_000,
});
const functions = new Map();
functions.set("api", { name: "api", fetch: (req: Request) => worker.fetch(req) });
deployments.set("tapw", { name: "tapw", root, functions });

Deno.serve(async (req: Request) => {
  const url = new URL(req.url);

  // TODO: download deployments dynamically
  const deployment = deployments.get(url.hostname.split(".")[0]);
  if (!deployment) return new Response("Not Found", { status: 404 });

  const fn = deployment.functions.get(url.pathname.split("/")[1]);
  if (fn) {
    try {
      return fn.fetch(req);
    } catch (e) {
      console.error(`handling request for function ${deployment.name}.${fn.name} failed`, e);
      return new Response("Internal Server Error", { status: 500 });
    }
  }

  const res = await serveDir(req, { fsRoot: `${deployment.root}/static` });
  if (res.status === 404) return serveFile(req, `${deployment.root}/static/index.html`);
  return res;
});
