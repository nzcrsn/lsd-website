import { gsap } from "../base.js";
import { guardMotion } from "../motion.js";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export function initOptLang() {
  const menuBtn = document.querySelector(".current-lang");

  let open = false;

  menuBtn.addEventListener("click", () => {
    open = !open;

    if (open) {
      gsap.to(".opts-lang", {
        opacity: 1,
        visibility: "visible",
        pointerEvents: "auto",
        duration: 0.25,
        ease: "power2.out",
      });
      gsap.to("#chevron-down", {
        opacity: 1,
        transform: "rotate(-90deg)",

        duration: 0.15,
        ease: "power2.out",
      });
    } else {
      gsap.set(".opts-lang", {
        opacity: 0,
        visibility: "hidden",
        pointerEvents: "none",
      });
      gsap.to("#chevron-down", {
        transform: "rotate(0)",
        duration: 0.25,
        ease: "power2.out",
      });
    }
  });
}

export function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = link.getAttribute("href");

      if (!target || target === "#") return;

      const section = document.querySelector(target);

      if (!section) return;

      e.preventDefault();

      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: section,
          offsetY: 80, // useful if you have a fixed header
        },
        ease: "power3.inOut",
      });
    });
  });
}
