import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  plugins: [],
  build: {
    manifest: true,
    outDir: "../dist",
    emptyOutDir: true,
    assetsDir: "assets",
    rollupOptions: {
      input: "src/assets/scripts/main.js",
    },
  },
});
