import { initMenu } from "./animations/menu.js";
import { initHero } from "./animations/hero.js";
import { setHeaderHeight } from "./utils/config.js";
import { initFaq, initFaqReveal } from "./animations/faq.js";

window.addEventListener("load", async () => {
  await document.fonts.ready;
  setHeaderHeight();
  initMenu();
  // initHero();

  initFaq();
  initFaqReveal();
});
