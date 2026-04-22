import fs from "fs";

const isDev = process.env.NODE_ENV !== "production";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "dist/assets/**/*.js": "assets" });
  eleventyConfig.addPassthroughCopy({ "dist/assets/**/*.css": "assets" });
  eleventyConfig.addPassthroughCopy("src/assets/favicon");
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/icons");
  eleventyConfig.addPassthroughCopy("src/assets/media");

  const manifest = !isDev
    ? JSON.parse(fs.readFileSync("dist/.vite/manifest.json", "utf-8"))
    : null;

  eleventyConfig.addShortcode("vite", function (route) {
    if (isDev) {
      return `<script type="module" src="http://localhost:5173/${route}"></script>`;
    }
    const { file, css = [] } = manifest[route];
    const script = `<script type="module" src="/${file}"></script>`;
    const style = `<link rel="stylesheet" href="/${css[0]}">`;

    return `${script}\n${style}`;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
  };
}
