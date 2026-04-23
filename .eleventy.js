import fs from "fs";
import { buildCSS } from "./utils/build-css.js";

const isDev = process.env.NODE_ENV !== "production";

export default function (eleventyConfig) {
  eleventyConfig.addWatchTarget("src/assets/styles");
  eleventyConfig.on("eleventy.before", async () => {
    buildCSS(!isDev);
  });

  ["fonts", "media", "favicon", "icons"].forEach((dir) =>
    eleventyConfig.addPassthroughCopy({
      [`src/assets/${dir}`]: `assets/${dir}`,
    }),
  );

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

  if (isDev) {
    eleventyConfig.addPassthroughCopy({
      "dist/assets/main.css": "assets/main.css",
    });
  } else {
    eleventyConfig.addPassthroughCopy({ "dist/assets/*.js": "assets" });
    eleventyConfig.addPassthroughCopy({ "dist/assets/main.css": "assets" });
  }

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
  };
}
