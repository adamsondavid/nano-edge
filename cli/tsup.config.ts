import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts", "./bin/index.ts"],
  format: "esm",
  dts: true,
  sourcemap: true,
  minify: true,
});
