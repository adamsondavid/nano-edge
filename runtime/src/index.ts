import {DeploymentManager} from "./deployment-manager.ts";

const deploymentManager = new DeploymentManager();

Deno.serve(async (request: Request) => {
  const nanoEdgeId = crypto.randomUUID();
  const oldRequest = request;
  request = new Request(request, { headers: { ...Object.fromEntries(request.headers.entries()), "x-nano-edge-id": nanoEdgeId }});
  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  EdgeRuntime.applySupabaseTag(oldRequest, request);

  const deploymentName = new URL(request.url).hostname.split(".")[0];
  try {
    const deployment = await deploymentManager.get(deploymentName);
    const response = await deployment.fetch(request);
    // deno-lint-ignore no-explicit-any
    (response as any).headers ??= new Headers();
    response.headers.set("x-nano-edge-id", nanoEdgeId);
    return response;
  } catch (e) {
    console.error(e);
    // TODO: adjust response when downloading a deployment returns 404. e.g. when deploymentName does not exist.
    return new Response("this is most likely a nano-edge bug", { status: 500, headers: { "x-nano-edge-id": nanoEdgeId } });
  }
});
