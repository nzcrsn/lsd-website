import { bundle } from "lightningcss";
import { writeFileSync, mkdirSync } from "fs";

const { code } = bundle({
  filename: "src/assets/styles/main.css",
  minify: true,
});

writeFileSync("dist/assets/main.css", code);
