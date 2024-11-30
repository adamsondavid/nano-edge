import {logger} from "../logger.ts";

// deno-lint-ignore ban-ts-comment
// @ts-ignore
const eventManager = new EventManager();

for await (const data of eventManager) {
  if (data && data.event_type === "Log") {
    console.log(data.event.level);
    logger.log({
      labels: { deployment: data.metadata.service_path.split("/")[1] },
      type: "FUNCTION_LOG",
      functionId: data.metadata.execution_id,
      level: data.event.level.toLowerCase(),
      // deno-lint-ignore no-control-regex
      message: data.event.msg.substring(0, data.event.msg.length - 1).replace(/\u001b\[\d+m/g, ""),
    });
  }
}
