import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { initApi } from "./server/main";

const app = new Hono();

app.mount("/api", await initApi(process.env), {
  replaceRequest: (req) => new Request(new URL(req.url), req),
});

const server = serve({ fetch: app.fetch, port: Number(process.env.PORT) || 3000 }, ({ port }) => {
  console.log(`server started on http://localhost:${port}/`);
});
process.on("SIGINT", () => {
  server.close();
});
