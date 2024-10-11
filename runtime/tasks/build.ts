import esbuild from "esbuild";

await esbuild.build({
    entryPoints: ["src/main.ts"],
    outfile: "dist/main/index.js",
    bundle: true,
    platform: "neutral",
    sourcemap: true,
    minify: true
});
