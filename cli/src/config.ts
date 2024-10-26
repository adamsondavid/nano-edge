import { z } from "zod";
import { assert, Equals } from "tsafe";

export type Config = {
  /**
   * The base url of the NanoEdge instance you are deploying to.
   * Defaults to `http://localhost:8080`. // TODO: adjust url
   */
  nanoEdgeUrl?: string,
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

const ConfigSchema = z.object({
  nanoEdgeUrl: z.string().default("http://localhost:8080"), // TODO: adjust url
  outputDirectory: z.string().optional().default("dist"),
  env: z.record(z.string(), z.string()).optional(),
});

assert<Equals<Config, z.input<typeof ConfigSchema>>>(); // ensure that Config and z.input<typeof ConfigSchema> do not drift!

export const defineConfig = (config: Config): Config => config;
export const validateConfig = (config: unknown) => ConfigSchema.parse(config);
