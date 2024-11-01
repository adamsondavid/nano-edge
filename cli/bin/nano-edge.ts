#!/usr/bin/env node --enable-source-maps

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { create } from "tar";
import { name, version } from "../package.json";
import { z } from "zod";
import { createValidator } from "./utils/validation";
import { PassThrough } from "node:stream";

const cli = yargs(hideBin(process.argv))
  .scriptName(`npx ${name}`)
  .version(version)
  .alias("v", "version")
  .help()
  .alias("h", "help")
  .epilogue("Note: all options can also be passed via environment variables by prepending the prefix 'NANO_EDGE_' to the MACRO_CASE version of the option name.") // TODO: add config file hint
  .recommendCommands()
  .demandCommand()
  .strictCommands();

cli.wrap(cli.terminalWidth());

// TODO: enable config parsing
// TODO: const config = await readConfig("./nano-edge.config.ts");
cli.env("NANO_EDGE");

cli.command({
  command: "deploy",
  describe: "deploy a pre-built application",
  builder: (yargs) =>
    yargs
      .example("$0 deploy --env.GREETING=hi", "provide an environment variable")
      .example("$0 deploy --root=out", "assumes that the built application is in the 'out' directory")
      .example("NANO_EDGE_AUTH_TOKEN=xxx $0 deploy", "provide the auth-token via environment variable")
      .option("auth-token", {
        describe: "token used to identify and authenticate against the nano-edge instance (recommendation: provide the token via environment variable 'NANO_EDGE_AUTH_TOKEN')",
        type: "string",
        demandOption: true,
        // TODO: create better validator
        coerce: (authToken) => createValidator("auth-token", z.string().min(1)).validate(authToken),
      })
      .option("env", {
        describe: "an object of environment variables deployed alongside the application",
        coerce: (env) => createValidator("env", z.record(z.string(), z.coerce.string())).validate(env),
      })
      .option("root", {
        describe: "the root directory containing the pre-built application",
        type: "string",
        default: "dist",
        coerce: (root) =>
          createValidator(
            "root",
            z.string().refine(existsSync, { message: `directory '${root}' does not exist` }),
          ).validate(root),
      }),
  // TODO: extract handler code into src/
  async handler(args) {
    if (args.env) {
      const functionsDirectory = `${args.root}/functions`;
      if (!existsSync(functionsDirectory)) mkdirSync(functionsDirectory, { recursive: true });
      writeFileSync(`${functionsDirectory}/env.json`, JSON.stringify(args.env));
    }

    const tarball = create(
      {
        gzip: true,
        cwd: args.root,
      },
      readdirSync(args.root),
    ).pipe(new PassThrough());

    // TODO: extract endpoint base url from NANO_EDGE_AUTH_TOKEN in the future
    // TODO: use token for auth and not directly in the url path
    // TODO: connect to deploy server not storage server!
    const res = await fetch(`http://localhost:8080/deployments/${args.authToken}.tar.gz`, {
      method: "PUT",
      // @ts-ignore
      body: tarball,
      duplex: "half",
    });
    if (!res.ok) throw new Error(`failed to deploy: ${res.status}`);
    else console.log(await res.text());
  },
});

await cli.parse();
