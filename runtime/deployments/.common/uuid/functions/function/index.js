import "../../../../.common/uuid/functions/function/patch-globals.js";

Deno.serve((await import("./main.js")).default);
