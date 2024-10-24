#!/usr/bin/env node

import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { validateConfig } from "../src";
import { createJiti } from "jiti";
import { pathToFileURL } from "node:url";
import { create } from "tar";
import { z } from "zod";

const env = z
  .object({
    HOMEBREW_SERVERLESS_APPLICATION_TOKEN: z.string().optional(), // TODO: make required!
  })
  .parse(process.env);

async function readConfig() {
  const configFile = "./homebrew-serverless.config.ts";
  if (!existsSync(configFile)) return validateConfig({});
  const jiti = createJiti(pathToFileURL(configFile).toString());
  const config = await jiti.import(configFile, { default: true });
  return validateConfig(config);
}

const config = await readConfig();
if (config.env) {
  const functionsDirectory = `${config.outputDirectory}/functions`;
  if (!existsSync(functionsDirectory)) mkdirSync(functionsDirectory, { recursive: true });
  writeFileSync(`${functionsDirectory}/env.json`, JSON.stringify(config.env));
}

await create(
  {
    gzip: true,
    cwd: config.outputDirectory,
    file: "tapw.tar.gz", // TODO: do not write to file
  },
  readdirSync(config.outputDirectory),
);
