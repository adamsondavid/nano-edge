const exists = (filename: string) =>
  Deno.stat(filename).then(() => true).catch(() => false);

Deno.serve(async (req: Request) => {
  const { pathname, hostname } = new URL(req.url);
  const deployment = hostname.split(".")[0];
  const functionName = pathname.split("/")[1];

  const staticPath = `deployments/${deployment}/static/${
    pathname.replace(`/${deployment}/`, "")
  }`;
  const functionPath = `deployments/${deployment}/functions/${functionName}`;

  if (await exists(staticPath)) {
    return new Response(await Deno.readFile(staticPath), {
      headers: {
        "Content-Type": staticPath.endsWith(".js") ? "text/javascript" : "",
      },
    });
  }
  if (!await exists(`${functionPath}/index.js`)) {
    return new Response(
      await Deno.readFile(`deployments/${deployment}/static/index.html`),
    );
  }

  try {
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    const worker = await EdgeRuntime.userWorkers.create({
      servicePath: functionPath,
      memoryLimitMb: 128,
      workerTimeoutMs: 15_000,
    });
    return await worker.fetch(req);
  } catch (e) {
    console.error(e);
    return new Response("internal server error", { status: 500 });
  }
});
