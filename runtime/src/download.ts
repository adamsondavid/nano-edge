import { crypto, dirname, join, UntarStream } from "./deps.ts";

export async function download(deployment: string) {
  const res = await fetch(`http://storage/deployments/${deployment}.tar.gz`);
  if (res.status !== 200 || !res.body) throw new Error(`failed to download deployment: ${deployment}`);
  const outputRoot = join("deployments", deployment, crypto.randomUUID());
  for await (
    const entry of res.body
      .pipeThrough(new DecompressionStream("gzip"))
      .pipeThrough(new UntarStream())
  ) {
    const path = join(outputRoot, entry.path.replace(deployment + "/", ""));
    await Deno.mkdir(dirname(path), { recursive: true });
    await entry.readable?.pipeTo((await Deno.create(path)).writable);
  }
  return outputRoot;
}
