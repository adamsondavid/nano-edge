import { DeploymentManager } from "./deployment-manager.ts";
import { connectAsync } from "mqtt";

const deploymentManager = new DeploymentManager();

const mqtt = await connectAsync("mqtt://mqtt:1883");
await mqtt.subscribeAsync("invalidate-deployment");
mqtt.on("message", (_topic, deploymentName) => deploymentManager.delete(deploymentName.toString()));

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
    return new Response("UnknownError. This is most likely a nano-edge bug. Please consider raising an issue under https://github.com/adamsondavid/nano-edge/issues.", { status: 500, headers: { "x-nano-edge-id": nanoEdgeId } });
  }
});
