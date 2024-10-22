const deno = globalThis.Deno;
delete globalThis.Deno;
globalThis.Deno = { serve: deno.serve, listen: deno.listen };

const { SB_EXECUTION_ID, ...env } = deno.env.toObject();
globalThis.process = { env };
