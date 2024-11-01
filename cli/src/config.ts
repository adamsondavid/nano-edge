import { z } from "zod";
import { assert, Equals } from "tsafe";
import { existsSync } from "node:fs";
import { createJiti } from "jiti";
import { pathToFileURL } from "node:url";

// TODO: align config with config parsing from cli

export type Config = {
  /**
   * The directory that contains your built application in format of the build output api.
   * Defaults to `dist`.
   * @example .output
   */
  outputDirectory?: string;
  /**
   * An object of environment variables that are being distributed with your deployment.
   */
  env?: Record<string, string>;
};
export const defineConfig = (config: Config): Config => config;

const ConfigSchema = z.object({
  outputDirectory: z.string().optional().default("dist"),
  env: z.record(z.string(), z.string()).optional(),
});

assert<Equals<Config, z.input<typeof ConfigSchema>>>(); // ensure that Config and z.input<typeof ConfigSchema> do not drift!

function validateConfig(config: unknown) {
  const result = ConfigSchema.safeParse(config);
  if (result.error) throw { error: "invalid config", details: result.error.flatten().fieldErrors };
  return result.data;
}

export async function readConfig(configFilePath: string) {
  if (!existsSync(configFilePath)) return validateConfig({});
  const jiti = createJiti(pathToFileURL(configFilePath).toString());
  const config = await jiti.import(configFilePath, { default: true });
  return validateConfig(config);
}
