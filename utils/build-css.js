import { bundle } from "lightningcss";
import { writeFileSync, mkdirSync } from "fs";

export function buildCSS(minify = true, source) {
  const { code } = bundle({
    filename: `${source}`,
    minify: minify,
  });
  return code;
}

export function writeCssOnAssetsDir(code) {
  mkdirSync("dist/assets", { recursive: true });
  writeFileSync("dist/assets/main.css", code);
}

// buildCSS(true);
