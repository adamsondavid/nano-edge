import { crypto } from "std/crypto";
import { dirname, parse } from "std/path";
import { UntarStream } from "std/tar";
import { ensureDir } from "std/fs";
import { toJson } from "std/streams";
import { Deployment } from "./deployment.ts";

async function createFile(path: string) {
  await ensureDir(dirname(path));
  return Deno.create(path);
}

export async function download(deployment: string) {
  const res = await fetch(`http://storage/deployments/${deployment}.tar.gz`);
  if (!res.ok || !res.body) throw new Error(`failed to download deployment: ${deployment}`);
  const basePath = `deployments/${deployment}/${crypto.randomUUID()}`;
  const functions = new Set<string>();
  let env = {};
  for await (
    const entry of res.body
      .pipeThrough(new DecompressionStream("gzip"))
      .pipeThrough(new UntarStream())
  ) {
    let file = entry.path;
    if (!entry.readable) continue;

    if (file === "functions/env.json") {
      env = await toJson(entry.readable) as Record<string, string>; // TODO: validate that object really is a Record<string, string>. Probably do the validation on the deploy-server!
    } else {
      const parsedFilePath = parse(file);
      if (parsedFilePath.dir === "functions" && parsedFilePath.ext === ".js") {
        functions.add(parsedFilePath.name);
        const functionBasePath = `${parsedFilePath.dir}/${parsedFilePath.name}`;
        file = `${functionBasePath}/main.js`;
        await ensureDir(`${basePath}/${functionBasePath}`);
        await Deno.copyFile(
          "deployments/.common/uuid/functions/function/index.js",
          `${basePath}/${functionBasePath}/index.js`,
        );
      }
      await entry.readable.pipeTo((await createFile(`${basePath}/${file}`)).writable);
    }
  }

  return new Deployment({ name: deployment, basePath, functions, env });
}
