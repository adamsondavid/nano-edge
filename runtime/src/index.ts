import { download } from "./download.ts";

Deno.serve(async (request: Request) => {
  // TODO: const deployment = deployments.get(new URL(request.url).hostname.split(".")[0]);
  // TODO: if (!deployment) return new Response("not found", { status: 404 });
  try {
    const deployment = await download("tapw"); // TODO: cache downloaded deployment
    return await deployment.fetch(request);
  } catch (_) {
    return new Response("internal server error", { status: 500 });
  }
});
