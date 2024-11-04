import {existsSync} from "node:fs";
import {createJiti} from "jiti";
import {pathToFileURL} from "node:url";

export type Config = {
  /**
   * Configuration for the deploy-command.
   */
  deploy?: {
    /**
     * Token used to identify and authenticate against the nano-edge instance.
     * Recommendation: provide the token via environment variable 'NANO_EDGE_AUTH_TOKEN'
     */
    authToken?: string;
    /**
     * The root directory containing the pre-built application.
     * Defaults to `dist`.
     */
    root?: string;
    /**
     * An object of environment variables deployed alongside the application.
     */
    env?: Record<string, string>;
  };
};

export const defineConfig = (config: Config): Config => config;

export async function loadConfig(configFilePath: string) {
  // TODO
  cli
      .config("config", "Path to a config file", async (configFilePath) => {
        if (!existsSync(configFilePath)) configFilePath = "nano-edge.config.ts";
        if (!existsSync(configFilePath)) configFilePath = "nano-edge.config.js";
        if (!existsSync(configFilePath)) configFilePath = "nano-edge.config.json";
        if (!existsSync(configFilePath)) return {};
        const jiti = createJiti(pathToFileURL(configFilePath).toString());
        const k = await jiti.import(configFilePath, { default: true });
        console.log(k);
        return k;
      })
      .default("config", "nano-edge.config.ts")
      .alias("c", "config");
}
