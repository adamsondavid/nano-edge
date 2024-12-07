import {serveDir, serveFile} from "std/http";
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
      const fn = await EdgeRuntime.userWorkers.create({ // TODO: wrap in try catch
        servicePath: `${this.basePath}/functions/${functionName}`,
        memoryLimitMb: 128,
        workerTimeoutMs: 15_000,
        remoteModules: false,
        envVars: this.env,
      // deno-lint-ignore no-explicit-any
      }).catch((e: any) => {
        if (e.stack.startsWith("InvalidWorkerCreation")) {
          logger.log({
            labels: {deployment: this.name},
            level: "error",
            message: e.stack.replace("InvalidWorkerCreation: worker boot error:", "FunctionBootError:"),
            type: "FUNCTION_LOG",
            requestId: request.headers.get("x-nano-edge-id"),
          });
          return undefined;
        }
        return e;
      });
      const response = await fn?.fetch(request) ?? new Response("internal server error", { status: 500 });
      const duration = performance.now() - start;
      logger.log({
        labels: { deployment: this.name },
        level: response.status >= 400 ? "error" : "info",
        message: "",
        type: "INBOUND_FUNCTION_REQUEST",
        requestId: request.headers.get("x-nano-edge-id"),
        functionId: fn?.key,
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
    logger.log({
      labels: { deployment: this.name },
      level: response.status >= 400 ? "error" : "info",
      message: "",
      type: "INBOUND_STATIC_REQUEST",
      requestId: request.headers.get("x-nano-edge-id"),
      method: request.method,
      host: url.host,
      path: url.pathname,
      status: response.status
    });
    return response;
  }
}
