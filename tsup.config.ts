import { defineConfig } from "tsup";
export default defineConfig(() => {
  return {
    entry: ["index.ts", "types.ts"],
    format: ["cjs", "esm"],
    dts: true,
    minify: true,
    sourcemap: true,
    outDir: "dist",
    splitting: false,
    target: ["es2021"],
    lib: ["esnext"],
    platform: "node",
    tsconfig: "./tsconfig.json",
    clean: true,
    bundle: true,
    treeshake: false,
    onSuccess: "tsc --emitDeclarationOnly --declarationMap",
  };
});
