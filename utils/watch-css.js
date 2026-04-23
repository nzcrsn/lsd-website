import { buildCSS } from "./build-css.js";
import chokidar from "chokidar";

chokidar.watch("src/assets/styles").on("change", () => buildCSS(false));
