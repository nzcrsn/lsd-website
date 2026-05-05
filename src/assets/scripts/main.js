/*
import { gsap } from "./base.js";
import { initMenu } from "./animations/menu.js";
import { initHero } from "./animations/hero.js";

import { initOptLang, initSmoothScroll } from "./animations/header.js";
import { initBackToTop } from "./animations/to-top-button.js";
import { initSectionHeadings } from "./animations/headings.js";

import { initFaq, initFaqReveal } from "./animations/faq.js";
import { initContact } from "./animations/contact.js";
import { initServices } from "./animations/services.js";
import { initTestimonials } from "./animations/testimonials.js";
import { initCompany } from "./animations/company.js";

const scheduleNonCritical = (callback) => {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(callback, { timeout: 1200 });
    return;
  }
  window.setTimeout(callback, 1);
};

document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.classList.remove("js-loading");
  gsap.to(["#page", "header"], {
    opacity: 1,
    duration: 0.5,
  });
  initHeader();
  initHero();
  initSectionHeadings();
  initServices();
  // ── Utilities ──
  initMenu();
  initOptLang();
  initSmoothScroll();
  initBackToTop();
  // Defer below-the-fold work until browser is idle.
  scheduleNonCritical(() => {
    // initTestimonials();
    // initCompany();
    // initFaq();
    // initFaqReveal();
    // initContact();
  });
});

console.log("your rock");

const video = document.querySelector(".video-media");

if (video) {
  video.addEventListener(
    "canplay",
    () => {
      video.classList.add("is-playing");
    },
    { once: true },
  );
}
  */

// import { gsap } from "./core/gsap.js";
// import { lenis } from "./core/lenis.js";;
import { initMenu } from "./animations/menu.js";
import { deferUntilScrollOrIdle } from "./utils/scheduler.js";

// Remove loading class — reveals content, stops CSS fallback timer
document.documentElement.classList.remove("js-loading");

const isMobile = window.matchMedia("(max-width: 767px)").matches;
// Video fade-in
const video = document.querySelector(".video-media");
if (video) {
  if (isMobile) {
    video.remove(); // Don't load video on mobile
  } else {
    video.addEventListener(
      "canplay",
      () => {
        video.classList.add("is-playing");
      },
      { once: true },
    );
  }
}

// Above the fold — run immediately
document.addEventListener("DOMContentLoaded", async () => {
  initMenu();

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
