import {download} from "./download.ts";

Deno.serve(async (request: Request) => {
  try {
    const deploymentName = new URL(request.url).hostname.split(".")[0];
    const deployment = await download(deploymentName); // TODO: cache downloaded deployment
    return await deployment.fetch(request);
  } catch (e) {
    console.error(e);
    return new Response("this is most likely a nano-edge bug", { status: 500 });
  }
});
