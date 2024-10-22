import { defineConfig } from "tsup";
const isDev = process.env.npm_lifecycle_event === "dev";
export default defineConfig({
  entry: ["src/index.ts"],
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: "dist",
  onSuccess: isDev ? "node dist/index.js" : undefined,
  shims: true,
  format: ["esm"],
});
