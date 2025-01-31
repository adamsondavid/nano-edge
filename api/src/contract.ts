import { initContract } from "@ts-rest/core";
import { z } from "zod";

const Deployment = z.string().regex(/^[a-z]{1,12}$/);

export const contract = initContract().router(
  {
    putDeployment: {
      method: "PUT",
      path: "/deployments/:deployment",
      pathParams: z.object({
        deployment: Deployment,
      }),
      headers: z.object({
        "content-type": z.literal("application/gzip"),
      }),
      body: z.any(),
      responses: {
        200: z.string(),
      },
    },
  },
  { strictStatusCodes: true },
);
