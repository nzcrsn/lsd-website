// import { gsap } from "./base.js";
// import { initMenu } from "./animations/menu.js";
// import { initHero } from "./animations/hero.js";

// import { initOptLang, initSmoothScroll } from "./animations/header.js";
// import { initBackToTop } from "./animations/to-top-button.js";
// import { initSectionHeadings } from "./animations/headings.js";

// // import { initFaq, initFaqReveal } from "./animations/faq.js";
// // import { initContact } from "./animations/contact.js";
// // import { initServices } from "./animations/services.js";
// // import { initTestimonials } from "./animations/testimonials.js";
// // import { initCompany } from "./animations/company.js";

// const scheduleNonCritical = (callback) => {
//   if ("requestIdleCallback" in window) {
//     window.requestIdleCallback(callback, { timeout: 1200 });
//     return;
//   }
//   window.setTimeout(callback, 1);
// };

// document.addEventListener("DOMContentLoaded", () => {
//   // Remove the class BEFORE fonts/images load
//   document.documentElement.classList.remove("js-loading");
//   gsap.to(["#page", "header"], {
//     opacity: 1,
//     duration: 0.5,
//     // ease: "power2.out",
//   });
// initHeader();
// initHero();
//   // 4. Section h2 + eyebrow reveals — unifies feel across all sections
//   initSectionHeadings();
//   // 5. Services bento tile entrance
//   // initServices();
//   // ── Utilities ──
// initMenu();
// initOptLang();
// initSmoothScroll();
//   initBackToTop();
//   // Defer below-the-fold work until browser is idle.
//   scheduleNonCritical(() => {
//     // initTestimonials();
//     // initCompany();
//     // initFaq();
//     // initFaqReveal();
//     // initContact();
//   });
// });

// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import SplitText from "gsap/SplitText";
// import Lenis from "lenis";

// gsap.registerPlugin(ScrollTrigger, SplitText);

// const lenis = new Lenis({
//   duration: 1.2,
//   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//   orientation: "vertical",
//   gestureOrientation: "vertical",
//   smoothWheel: true,
//   wheelMultiplier: 1,
//   touchMultiplier: 1,
//   autoRaf: false,
// });

// lenis.on("scroll", ScrollTrigger.update);

// gsap.ticker.add((time) => {
//   lenis.raf(time * 1000);
// });

// gsap.ticker.lagSmoothing(0);

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
