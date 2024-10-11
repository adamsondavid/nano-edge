const exists = (filename: string) => Deno.stat(filename).then(() => true).catch(() => false);

Deno.serve(async (req: Request) => {
  const { pathname } = new URL(req.url);
  const [, appName, functionName] = pathname.split("/");

  const staticPath = `deployments/${appName}/static/${pathname.replace(`/${appName}/`, "")}`;
  const functionPath = `deployments/${appName}/functions/${functionName}`;

  if (await exists(staticPath)) {
    return new Response(await Deno.readFile(staticPath));
  }
  if (!await exists(`${functionPath}/index.js`)) {
    return new Response(
      await Deno.readFile(`deployments/${appName}/static/index.html`),
    );
  }

  try {
    const worker = await EdgeRuntime.userWorkers.create({
      servicePath: functionPath,
      memoryLimitMb: 128,
      workerTimeoutMs: 15_000,
    });
    return await worker.fetch(req);
  } catch (e) {
    return new Response("internal server error", { status: 500 });
  }
});
