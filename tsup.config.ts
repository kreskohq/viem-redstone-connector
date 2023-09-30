import { defineConfig } from "tsup";
export default defineConfig(() => {
  return {
    entry: ["index.ts", "extensions.ts", "types.ts", "viem-contract.ts"],
    format: ["cjs", "esm"],
    dts: true,
    minify: true,
    sourcemap: true,
    outDir: "dist",
    splitting: false,
    target: ["esnext"],
    lib: ["esnext"],
    platform: "node",
    tsconfig: "./tsconfig.json",
    clean: true,
    bundle: true,
    treeshake: false,
    onSuccess: "tsc --emitDeclarationOnly --declarationMap",
  };
});
