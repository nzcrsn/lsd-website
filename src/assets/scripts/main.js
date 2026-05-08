import { deferUntilScrollOrIdle } from "./utils/scheduler.js";

document.addEventListener("DOMContentLoaded", async () => {
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  if (!isMobile) {
    const { initHero } = await import("./animations/hero.js");
    const { initOptLang } = await import("./animations/header.js");
    document.getElementById("html").classList.remove("js-loading");
    initHero();
    initOptLang();
  }

  // Below the fold — defer until scroll or idle
  deferUntilScrollOrIdle(() => {
    import("./deferred.js");
  });
});
