import ipaddr from "npm:ipaddr.js@2.2.0";

const deno = globalThis.Deno;
delete globalThis.Deno;
globalThis.Deno = { serve: deno.serve, listen: deno.listen };

const { SB_EXECUTION_ID, ...env} = deno.env.toObject();
globalThis.process = { env };

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
    if (ipaddr.parse(ip).range() !== "unicast") throw new Error(`network access not allowed`);

  return _fetch(input, init);
};
