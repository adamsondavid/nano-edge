// This file will be generated

import env from "../env.js";

window.process = { env };
const { default: fetch } = await import("./main.js");
Deno.serve(fetch);
