import { initApi } from "./server/main";
import { name, version } from "../package.json";
import { generateOpenApi } from "@ts-rest/open-api";
import { contract } from "./contract";
import { swaggerUI } from "@hono/swagger-ui";
import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

app.mount("/api", await initApi(process.env), {
  replaceRequest: (req) => new Request(new URL(req.url), req),
});

app.get("/openapi", swaggerUI({ url: "/openapi-spec" }));
app.get("/openapi-spec", (c) =>
  c.json(
    generateOpenApi(
      contract,
      {
        info: { title: name, version },
        servers: [{ url: "/api" }],
      },
      { setOperationId: true },
    ),
  ),
);

serve({ fetch: app.fetch, port: 3000 }, ({ port }) => {
  console.log(`server started on http://localhost:${port}/`);
});
