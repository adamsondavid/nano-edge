#!/usr/bin/env node

import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { validateConfig } from "../src";
import { createJiti } from "jiti";
import { pathToFileURL } from "node:url";
import { create } from "tar";
import { z } from "zod";
import { request } from "node:http";

// TODO: use commander for proper cli tooling

const env = z
  .object({
    NANO_EDGE_AUTH_TOKEN: z.string(),
  })
  .parse(process.env);

async function readConfig() {
  const configFile = "./nano-edge.config.ts";
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

const tarball = create(
  {
    gzip: true,
    cwd: config.outputDirectory,
  },
  readdirSync(config.outputDirectory),
);

const req = request(`${config.nanoEdgeUrl}/deployments/${env.NANO_EDGE_AUTH_TOKEN}.tar.gz`, { method: "PUT" }, (res) => {
  // TODO: adjust endpoint url
  // TODO: use token for auth
  // TODO: print success message with deployed url
  res.on("data", () => {});
  if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) return;
  else throw new Error("failed to push deployment" + res.statusCode);
});

tarball.pipe(req);
