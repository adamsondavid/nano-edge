import { z } from "zod";

const EnvSchema = z.object({
  NANO_EDGE_AUTH_TOKEN: z.string(),
});

export function validateEnv(env: unknown) {
  const result = EnvSchema.safeParse(env);
  if (result.error)
    throw {
      error: "invalid environment vars",
      details: result.error.flatten().fieldErrors,
    };
  return result.data;
}
