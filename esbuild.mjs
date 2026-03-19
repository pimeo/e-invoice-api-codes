import * as esbuild from 'esbuild'
import { nodeExternalsPlugin } from "esbuild-node-externals"

await esbuild
  .build({
    entryPoints: ["./src/server.js"],
    outfile: "dist/server.js",
    bundle: true,
    minify: true,
    treeShaking: true,
    platform: "node",
    format: "cjs",
    target: "node24",
    plugins: [nodeExternalsPlugin()],
  })
  .catch(() => process.exit(1));
