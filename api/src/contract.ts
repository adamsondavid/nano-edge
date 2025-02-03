import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { jwtDecode } from "jwt-decode";

export const Deployment = z.string().regex(/^[a-z]{1,12}$/);

export const JWT = z
  .string()
  .jwt()
  .transform((jwt) => ({ raw: jwt, payload: jwtDecode(jwt) }))
  .pipe(
    z.object({
      raw: z.string().jwt(),
      payload: z.object({ iss: z.string(), deployment: Deployment }),
    }),
  );

export const contract = initContract().router(
  {
    putDeployment: {
      method: "PUT",
      path: "/deployments/:deployment",
      pathParams: z.object({
        deployment: Deployment,
      }),
      body: z.any(),
      responses: {
        200: z.string(),
      },
    },
  },
  {
    baseHeaders: z.object({ authorization: JWT }),
    strictStatusCodes: true,
  },
);

// @ts-ignore
contract.putDeployment.contentType = "application/gzip";
