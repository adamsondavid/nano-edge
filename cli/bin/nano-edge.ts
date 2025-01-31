#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { create as createTar } from "tar";
import { name, version } from "../package.json";
import { z } from "zod";
import { createValidator } from "./utils/option-validation";
import { relative } from "node:path";
import { useApi } from "../src/api";

const cli = yargs(hideBin(process.argv))
  .scriptName(`npx ${name}`)
  .version(version)
  .alias("v", "version")
  .help()
  .alias("h", "help")
  .epilogue(
    "Note: All options can also be set using environment variables by adding the prefix NANO_EDGE_ to the CONSTANT_CASE version of the option name. Alternatively, options can be defined in a configuration file (default: nano-edge.config.json). You can specify a different config file using the --config option.",
  )
  .recommendCommands()
  .demandCommand()
  .strict();

cli.wrap(cli.terminalWidth());

cli.env("NANO_EDGE");

cli
  .config("config", "Path to JSON config file", (configPath) => {
    const config = readFileSync(configPath, "utf-8");
    try {
      return JSON.parse(config);
    } catch (e: any) {
      throw new Error(`Failed to parse config ${relative(".", configPath)}: ${e.toString()}`);
    }
  })
  .default("config", existsSync("nano-edge.config.json") ? "nano-edge.config.json" : undefined)
  .alias("c", "config");

cli.command({
  command: "deploy",
  describe: "deploy a pre-built application",
  builder: (yargs) =>
    yargs
      .example("$0 deploy --env.GREETING=hi", "provide an environment variable")
      .example("$0 deploy --root=out", "assumes that the built application is in the 'out' directory")
      .example("NANO_EDGE_AUTH_TOKEN=xxx $0 deploy", "provide the auth-token via environment variable")
      .option("auth-token", {
        describe:
          "Token used to identify and authenticate against the nano-edge instance. Recommendation: provide the token via environment variable 'NANO_EDGE_AUTH_TOKEN'.",
        type: "string",
        demandOption: true,
        // TODO: create better validator
        coerce: (authToken) => createValidator("auth-token", z.string().min(1)).validate(authToken),
      })
      .option("env", {
        describe: "An object of environment variables deployed alongside the application.",
        coerce: (env) => createValidator("env", z.record(z.string(), z.coerce.string())).validate(env),
      })
      .option("root", {
        describe: "The root directory containing the pre-built application.",
        type: "string",
        default: "dist",
        coerce: (root) =>
          createValidator(
            "root",
            z.string().refine(existsSync, { message: `Directory '${root}' does not exist` }),
          ).validate(root),
      }),
  // TODO: extract handler code into src/
  async handler(args) {
    if (args.env) {
      const functionsDirectory = `${args.root}/functions`;
      if (!existsSync(functionsDirectory)) mkdirSync(functionsDirectory, { recursive: true });
      writeFileSync(`${functionsDirectory}/env.json`, JSON.stringify(args.env));
    }

    const tarball = createTar(
      {
        gzip: true,
        cwd: args.root,
        follow: true,
        portable: true,
      },
      readdirSync(args.root),
    );

    // TODO: extract base url from auth token in the future
    const api = useApi("http://localhost:3000");

    // TODO: pass auth token to the server in the future
    const res = await api.putDeployment({
      headers: { "content-type": "application/gzip" },
      params: { deployment: args.authToken }, // TODO: extract deployment name from auth token in the future
      bodyOverride: tarball,
      // @ts-expect-error TODO: remove ts-comment later once ts fixed fetch options types
      fetchOptions: { duplex: "half" },
    });

    if (res.status !== 200) throw new Error(`failed to deploy (status ${res.status}): ${res.body}`);
    else console.log(res.body);
  },
});

await cli.parse();
