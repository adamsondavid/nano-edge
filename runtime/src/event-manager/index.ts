import {logger} from "../logger.ts";

// deno-lint-ignore ban-ts-comment
// @ts-ignore
const eventManager = new EventManager();

for await (const data of eventManager) {
  if (data && data.event_type === "Log") {
    logger.log({
      labels: { deployment: data.metadata.service_path.split("/")[1] },
      ...JSON.parse(data.event.msg),
    });
  }
}
