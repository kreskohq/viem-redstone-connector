import { defineConfig } from "tsup";
export default defineConfig(() => {
  return {
    entry: ["index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    minify: true,
    outDir: "dist",
    splitting: true,
    target: ["esnext"],
    lib: ["esnext"],
    platform: "node",
    tsconfig: "./tsconfig.json",
    clean: true,
    bundle: true,
    treeshake: true,
  };
});
