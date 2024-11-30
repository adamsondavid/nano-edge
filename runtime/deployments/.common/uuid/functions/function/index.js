import "../../../../.common/uuid/functions/function/patch-globals.js";
import {default as fetch} from "./main.js"

Deno.serve(fetch);
