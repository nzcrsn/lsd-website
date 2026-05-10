import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  root: "src",
  plugins: [cloudflare()],
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
