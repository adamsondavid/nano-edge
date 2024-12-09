import {parse} from "../../../../.common/uuid/functions/function/ipaddr.js";
import {context} from "../../../../.common/uuid/functions/function/context.js";

const deno = globalThis.Deno;
delete globalThis.Deno;
globalThis.Deno = { serve: deno.serve, listen: deno.listen };

const { SB_EXECUTION_ID, ...env} = deno.env.toObject();
globalThis.process = { env: Object.freeze(env) };

const _console = globalThis.console;
let sequence = 0;
const log = (type, level, ...args) =>
  _console.log(
    JSON.stringify({
      type,
      level,
      requestId: context.getStore(),
      sequence: sequence++,
      message: args.map((obj) => (typeof obj === "object" ? JSON.stringify(obj, null, 2) : obj)).join(" "),
    }),
  );

async function resolveDns(hostname, recordType) {
  try {
    return await deno.resolveDns(hostname, recordType);
  } catch (e) {
    if (e.name !== "NotFound") throw e;
  }
  return [];
}

const _fetch = globalThis.fetch;
globalThis.fetch = async (input, init) => {
  const url = new URL(typeof input === "string" || input instanceof URL ? input : input.url);

  const ips = await Promise.all([await resolveDns(url.hostname, "A"), await resolveDns(url.hostname, "AAAA")]);
  for (const ip of ips.flat())
    if (parse(ip).range() !== "unicast") throw new Error(`network access not allowed`);

  // TODO: instrument. log outbound requests and correlate them
  return _fetch(input, init);
};

globalThis.console = {
  assert(assertion, ...args){
    if (!assertion) log("FUNCTION_LOG", "error", "Assertion failed:", ...args);
  },
  clear: () => {}, // noop on purpose
  count() {},
  countReset() {},
  debug: (...args) => log("FUNCTION_LOG", "info", ...args),
  dir() {},
  dirxml() {},
  error: (...args) => log("FUNCTION_LOG","error", ...args),
  group() {},
  groupCollapsed() {},
  groupEnd() {},
  info: (...args) => log("FUNCTION_LOG", "info", ...args),
  log: (...args) => log("FUNCTION_LOG", "info", ...args),
  table() {},
  time() {},
  timeEnd() {},
  timeLog() {},
  trace() {},
  warn: (...args) => log("FUNCTION_LOG", "warn", ...args),
};
