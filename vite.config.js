import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  build: {
    manifest: true,
    outDir: "../dist",
    emptyOutDir: true,
    assetsDir: "assets",
    rollupOptions: {
      input: "src/assets/scripts/main.js",
      output: {
        // Keep vendor chunks separate for better caching
        manualChunks: {
          gsap: ["gsap"],
          lenis: ["lenis"],
        },
      },
    },
  },
});
