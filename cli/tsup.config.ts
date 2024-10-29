import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts", "./bin/index.ts"],
  format: "esm",
  dts: true,
  minify: true,
});
