const deno = globalThis.Deno;
delete globalThis.Deno;
globalThis.Deno = { serve: deno.serve, listen: deno.listen };

const {
  SB_EXECUTION_ID,
  FUNCTIONS_BLOCKED_NETWORKS,
  ...env
} = deno.env.toObject();
globalThis.process = { env };

function ipV4ToNumber(ip) {
  return ip.split(".").reduce((acc, octet) => (acc << 8) | Number(octet), 0);
}

function isIpInSameNetwork(ip, cidr) {
  const [networkAddress, prefixLength] = cidr.split("/");
  const ipNumber = ipV4ToNumber(ip);
  const networkNumber = ipV4ToNumber(networkAddress);
  const subnetMask = ~(2 ** (32 - parseInt(prefixLength)) - 1);
  return (ipNumber & subnetMask) === (networkNumber & subnetMask);
}

const blockedNetworks = FUNCTIONS_BLOCKED_NETWORKS.split(",").map(nw => nw);
const _fetch = globalThis.fetch;
globalThis.fetch = async (input, init) => {
  const url = new URL(
    typeof input === "string" || input instanceof URL ? input : input.url);
  
  for (const ip of await deno.resolveDns(url.hostname, "A")) {
    for (const blockedNetwork of blockedNetworks) {
      if (isIpInSameNetwork(ip, blockedNetwork)) {
        throw new Error(`network access not allowed`);
      }
    }
  }

  return _fetch(input, init);
};
