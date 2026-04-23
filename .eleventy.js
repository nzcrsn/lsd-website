import fs from "fs";

const isDev = process.env.NODE_ENV !== "production";

export default function (eleventyConfig) {
  const sharedAssets = ["fonts", "media", "favicon", "icons"];

  if (isDev) {
    sharedAssets.forEach((dir) =>
      eleventyConfig.addPassthroughCopy(`src/assets/${dir}`),
    );
    eleventyConfig.addPassthroughCopy({
      "dist/assets/main.css": "assets/main.css",
    });
  } else {
    sharedAssets.forEach((dir) =>
      eleventyConfig.addPassthroughCopy({ [`src/assets/${dir}`]: "assets" }),
    );
    eleventyConfig.addPassthroughCopy({ "dist/assets/**/*.js": "assets" });
    eleventyConfig.addPassthroughCopy({ "dist/assets/**/*.css": "assets" });
  }

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

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
  };
}
