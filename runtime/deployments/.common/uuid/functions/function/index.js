import "../../../../.common/uuid/functions/function/patch-globals.js";
import {
  context,
} from "../../../../.common/uuid/functions/function/context.js";
import { default as fetch } from "./main.js";

Deno.serve((req) => {
  return context.run(req.headers.get("x-nano-edge-id"), async () => {
    try {
      return await fetch(req);
    } catch (e) {
      console.error(e);
      return new Response("RuntimeError. This is most likely an unhandled error within the deployed function. Please check the deployment's logs for details.", { status: 500 });
    }
  });
});
