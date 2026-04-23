import { bundle } from "lightningcss";
import { writeFileSync, mkdirSync } from "fs";

export function buildCSS(minify = true) {
  const { code } = bundle({
    filename: "src/assets/styles/main.css",
    minify: minify,
  });
  mkdirSync("dist/assets", { recursive: true });
  writeFileSync("dist/assets/main.css", code);
}

buildCSS(true);
