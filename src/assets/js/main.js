import { initMenu } from "./animations/menu.js";
// import { initHero } from "./animations/hero.js";
// import { setHeaderHeight } from "./utils/config.js";
import { initFaq, initFaqReveal } from "./animations/faq.js";
// import { initLoader, exitLoader, waitForLoader } from "./animations/loader.js";
import { initContact } from "./animations/contact.js";
import { initOptLang, initSmoothScroll } from "./animations/header.js";
import { initBackToTop } from "./animations/to-top-button.js";
import { initMouse } from "./animations/mouse.js";

// initLoader();

window.addEventListener("load", async () => {
  await document.fonts.ready;

  // setHeaderHeight();
  initMenu();
  // initHero();
  initFaq();
  initFaqReveal();
  initContact();
  initOptLang();
  initSmoothScroll();
  initBackToTop();
  // await waitForLoader();
  // exitLoader();
  initMouse();
});
