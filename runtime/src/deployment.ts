import { serveDir, serveFile } from "std/http";

export class Deployment {
  public readonly name;
  private readonly basePath;
  private readonly functions;
  private readonly env;

  constructor(options: { name: string; basePath: string; functions: Set<string>; env: Record<string, string> }) {
    this.name = options.name;
    this.basePath = options.basePath;
    this.functions = options.functions;
    this.env = [...Object.entries(options.env).filter(([key]) => !key.startsWith("FUNCTIONS_")), [
      "FUNCTIONS_BLOCKED_NETWORKS",
      Deno.env.get("FUNCTIONS_BLOCKED_NETWORKS"),
    ]];
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    const functionName = url.pathname.split("/")[1];
    if (this.functions.has(functionName)) {
      // deno-lint-ignore ban-ts-comment
      // @ts-ignore
      const fn = await EdgeRuntime.userWorkers.create({
        servicePath: `${this.basePath}/functions/${functionName}`,
        memoryLimitMb: 128,
        workerTimeoutMs: 15_000,
        remoteModules: false,
        envVars: this.env,
      });
      return fn.fetch(request);
    }

    const response = await serveDir(request, { fsRoot: `${this.basePath}/static` });
    if (response.status === 404) return serveFile(request, `${this.basePath}/static/index.html`);
    return response;
  }
}
