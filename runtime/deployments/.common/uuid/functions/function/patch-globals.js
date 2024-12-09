import {parse} from "../../../../.common/uuid/functions/function/ipaddr.js";

const deno = globalThis.Deno;
delete globalThis.Deno;
globalThis.Deno = { serve: deno.serve, listen: deno.listen };

const { SB_EXECUTION_ID, ...env} = deno.env.toObject();
globalThis.process = { env: Object.freeze(env) };

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

  return _fetch(input, init);
};

// TODO: logging the nano edge id!!
/*const log = console.log;
globalThis.console.log = (...args) => {
  log("hello", ...args);
}

console.dir({}, {depth: Infinity});
console.log("log");
console.info("info");
console.count("count");
console.error("error");
console.warn("warn");
console.assert(true, "assert true")
console.assert(false, "assert false")
console.debug("debug");*/
