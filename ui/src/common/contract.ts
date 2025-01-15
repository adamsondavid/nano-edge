import { initContract } from "@ts-rest/core";
import { z } from "zod";

const Deployment = z.string().regex(/^[a-z]{1,12}$/);

const Log = z.object({
  level: z.enum(["info", "error", "warn"]),
  timestamp: z.coerce.date(),
  message: z.string(),
});
export type Log = z.infer<typeof Log>;

const Request = z.object({
  type: z.enum(["INBOUND_STATIC_REQUEST", "INBOUND_FUNCTION_REQUEST"]),
  level: z.enum(["info", "error", "warn"]),
  timestamp: z.coerce.date(),
  requestId: z.string().uuid(),
  function: z.string().optional(),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
  host: z.string(),
  path: z.string(),
  params: z.record(z.string(), z.any()).optional(),
  status: z.number(),
  duration: z.number().optional(),
  logs: z.array(Log).optional(),
});
export type Request = z.infer<typeof Request>;

export const contract = initContract().router(
  {
    getLogs: {
      method: "GET",
      path: "/deployments/:deployment/logs",
      pathParams: z.object({
        deployment: Deployment,
      }),
      responses: {
        200: z.array(Request),
      },
    },
  },
  { strictStatusCodes: true },
);
