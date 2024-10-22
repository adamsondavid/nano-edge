import { crypto } from "std/crypto";
import { dirname, parse } from "std/path";
import { UntarStream } from "std/tar";
import { ensureDir } from "std/fs";
import { toJson } from "std/streams";

async function createFile(path: string) {
  await ensureDir(dirname(path));
  return Deno.create(path);
}

export async function download(deployment: string) {
  const res = await fetch(`http://storage/deployments/${deployment}.tar.gz`);
  if (!res.ok || !res.body) throw new Error(`failed to download deployment: ${deployment}`);
  const outputRoot = `deployments/${deployment}/${crypto.randomUUID()}`;
  for await (
    const entry of res.body
      .pipeThrough(new DecompressionStream("gzip"))
      .pipeThrough(new UntarStream())
  ) {
    let file = entry.path.replace(`${deployment}/`, "");
    if (!entry.readable) continue;

    if (file === "functions/env.json") {
      console.log(await toJson(entry.readable)); // TODO: pass env vars to worker!
    } else {
      const parsedFilePath = parse(file);
      if (parsedFilePath.dir === "functions" && parsedFilePath.ext === ".js") {
        const functionBasePath = `${parsedFilePath.dir}/${parsedFilePath.name}`;
        file = `${functionBasePath}/main.js`;
        await ensureDir(`${outputRoot}/${functionBasePath}`);
        await Deno.copyFile(
          "deployments/.common/uuid/functions/function/index.js",
          `${outputRoot}/${functionBasePath}/index.js`,
        );
      }
      await entry.readable.pipeTo((await createFile(`${outputRoot}/${file}`)).writable);
    }
  }

  return outputRoot;
}
