import { initContract } from "@ts-rest/core";
import { z } from "zod";

const deploymentSchema = z.string().regex(/^[a-z]{1,12}$/);

export const contract = initContract().router(
  {
    getLogs: {
      method: "GET",
      path: "/deployments/:deployment/logs",
      pathParams: z.object({
        deployment: deploymentSchema,
      }),
      responses: {
        200: z.any(), // TODO better schema,
      },
    },
  },
  { strictStatusCodes: true },
);
