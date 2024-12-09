import "../../../../.common/uuid/functions/function/patch-globals.js";
import {context} from "../../../../.common/uuid/functions/function/context.js";
import {default as fetch} from "./main.js";

Deno.serve((req) => context.run(req.headers.get("x-nano-edge-id"), () => fetch(req)));
// TODO error handling!!