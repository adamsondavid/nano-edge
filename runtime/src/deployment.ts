import {serveDir, serveFile} from "std/http";
import {crypto} from "std/crypto";
import {logger} from "./logger.ts";
import qs from "qs";

export class Deployment {
  public readonly name;
  private readonly basePath;
  private readonly functions;
  private readonly env;

  constructor(options: { name: string; basePath: string; functions: Set<string>; env: Record<string, string> }) {
    this.name = options.name;
    this.basePath = options.basePath;
    this.functions = options.functions;
    this.env = Object.entries(options.env);
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    const functionName = url.pathname.split("/")[1];
    if (this.functions.has(functionName)) {
      const start = performance.now();
      // deno-lint-ignore ban-ts-comment
      // @ts-ignore
      const fn = await EdgeRuntime.userWorkers.create({
        servicePath: `${this.basePath}/functions/${functionName}`,
        memoryLimitMb: 128,
        workerTimeoutMs: 15_000,
        remoteModules: false,
        envVars: this.env,
      });
      const response = await fn.fetch(request);
      const duration = performance.now() - start;
      response.headers ??= new Headers();
      response.headers.set("x-nano-edge-id", fn.key);
      logger.log({
        labels: { deployment: this.name },
        level: response.ok ? "info" : "error",
        message: "",
        type: "FUNCTION",
        requestId: response.headers.get("x-nano-edge-id"),
        function: functionName,
        method: request.method,
        host: url.host,
        path: url.pathname,
        params: qs.parse(url.search.substring(1)),
        status: response.status,
        duration: duration,
      });
      return response;
    }

    let response = await serveDir(request, { fsRoot: `${this.basePath}/static` });
    if (url.pathname === "/index.html" || response.status === 404) url.pathname = "/";
    if (response.status === 404) response = await serveFile(request, `${this.basePath}/static/index.html`);
    response.headers.set("x-nano-edge-id", crypto.randomUUID());
    logger.log({
      labels: { deployment: this.name },
      level: response.ok ? "info" : "error",
      message: "",
      type: "STATIC",
      requestId: response.headers.get("x-nano-edge-id"),
      method: request.method,
      host: url.host,
      path: url.pathname,
      status: response.status
    });
    return response;
  }
}
