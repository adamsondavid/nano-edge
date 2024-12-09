import "../../../../.common/uuid/functions/function/patch-globals.js";
import {context} from "../../../../.common/uuid/functions/function/context.js";
import {default as fetch} from "./main.js";

Deno.serve((req) => {
  return context.run(req.headers.get("x-nano-edge-id"), async () => {
    try {
      return await fetch(req);
    } catch (e) {
      console.error(e);
      return new Response("internal server error", { status: 500 });
    }
  });
});
