import fs from "fs";
import { buildCSS, writeCssOnAssetsDir } from "./utils/build-css.js";

const isDev = process.env.NODE_ENV !== "production";

export default function (eleventyConfig) {
  eleventyConfig.addWatchTarget("src/assets/styles");
  eleventyConfig.on("eleventy.before", async () => {
    const code = buildCSS(!isDev, "src/assets/styles/main.css");
    writeCssOnAssetsDir(code);
  });
  eleventyConfig.addShortcode("vite", function (route) {
    if (isDev) {
      return `<script type="module" src="http://localhost:5173/${route}"></script>`;
    }
    const manifest = JSON.parse(
      fs.readFileSync("dist/.vite/manifest.json", "utf-8"),
    );
    const { file } = manifest[route];
    const script = `<script type="module" src="/${file}"></script>`;

    return `${script}`;
  });

  eleventyConfig.addShortcode("criticalCss", function () {
    try {
      const code = buildCSS(true, "src/assets/styles/core/critical.css");
      let tag = `<style>${code}</style>`;
      return tag;
    } catch (err) {
      console.error("Critical CSS build failed:", err);
      return;
    }
  });

  ["fonts", "media", "favicon", "icons"].forEach((dir) =>
    eleventyConfig.addPassthroughCopy({
      [`src/assets/${dir}`]: `assets/${dir}`,
    }),
  );

  if (isDev) {
    eleventyConfig.addPassthroughCopy({
      "dist/assets": "assets",
    });
  } else {
    eleventyConfig.addPassthroughCopy({ "dist/assets": "assets" });
  }

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
  };
}
