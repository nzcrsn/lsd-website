import { gsap } from "./base.js";
import { initMenu } from "./animations/menu.js";
import { initHero } from "./animations/hero.js";
// import { setHeaderHeight } from "./utils/config.js";
import { initFaq, initFaqReveal } from "./animations/faq.js";

import { initContact } from "./animations/contact.js";
import {
  initHeader,
  initOptLang,
  initSmoothScroll,
} from "./animations/header.js";
import { initBackToTop } from "./animations/to-top-button.js";
import { initMouse } from "./animations/mouse.js";
import { initSectionHeadings } from "./animations/headings.js";
import { initServices } from "./animations/services.js";
import { initTestimonials } from "./animations/testimonials.js";
import { initCompany } from "./animations/company.js";
// src/assets/js/main.js
import "/assets/styles/main.css";

const scheduleNonCritical = (callback) => {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(callback, { timeout: 1200 });
    return;
  }
  window.setTimeout(callback, 1);
};

document.addEventListener("DOMContentLoaded", () => {
  // Remove the class BEFORE fonts/images load
  document.documentElement.classList.remove("js-loading");

  gsap.to(["#page", "header"], {
    opacity: 1,
    duration: 0.5,
    ease: "power2.out",
  });

  initHeader();
  initHero();

  // 3. Cursor hover states — touches every interaction site-wide
  initMouse();

  // 4. Section h2 + eyebrow reveals — unifies feel across all sections
  initSectionHeadings();

  // 5. Services bento tile entrance
  initServices();

  // ── Utilities ──
  initMenu();
  initOptLang();
  initSmoothScroll();
  initBackToTop();

  // Defer below-the-fold work until browser is idle.
  scheduleNonCritical(() => {
    initTestimonials();
    initCompany();
    initFaq();
    initFaqReveal();
    initContact();
  });
});
