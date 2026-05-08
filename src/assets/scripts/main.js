import { initMenu } from "./animations/menu.js";
import { deferUntilScrollOrIdle } from "./utils/scheduler.js";

// Remove loading class — reveals content, stops CSS fallback timer
document.documentElement.classList.remove("js-loading");

document.addEventListener("DOMContentLoaded", async () => {
  initMenu();
  const isMobile = window.matchMedia("(max-width: 767px)").matches;

  if (!isMobile) {
    const { initHero } = await import("./animations/hero.js");
    const { initOptLang } = await import("./animations/header.js");
    initHero();
    initOptLang();
  }

  // Below the fold — defer until scroll or idle
  deferUntilScrollOrIdle(() => {
    import("./deferred.js");
  });
});
