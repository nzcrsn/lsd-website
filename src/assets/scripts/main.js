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
