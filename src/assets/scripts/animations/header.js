import { gsap } from "../base.js";
import { guardMotion } from "../motion.js";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export function initHeader() {
  guardMotion(() => {
    const header = document.querySelector("header");
    if (!header) return;

    gsap.set(header, { y: -20, opacity: 0 });

    gsap.to(header, {
      y: 0,
      opacity: 1,
      duration: 0.75,
      delay: 0.1,
      ease: "power3.out",
    });

    const navItems = header.querySelectorAll(".nav-bar li");
    const logo = header.querySelector(".logo");
    const networks = header.querySelector(".networks");
    const lang = header.querySelector(".language");

    const targets = [logo, ...navItems, networks, lang].filter(Boolean);

    gsap.from(targets, {
      opacity: 0,
      y: -8,
      stagger: 0.06,
      duration: 0.55,
      delay: 0.25,
      ease: "power2.out",
    });
  });
}

export function initOptLang() {
  const menuBtn = document.querySelector(".current-lang");
  const langWrap = document.querySelector(".language");
  const opts = document.querySelector(".opts-lang");
  if (!menuBtn) return;

  let open = false;
  const setExpandedState = (isExpanded) => {
    menuBtn.setAttribute("aria-expanded", String(isExpanded));
  };

  menuBtn.addEventListener("click", () => {
    open = !open;
    setExpandedState(open);

    if (open) {
      gsap.set(opts, { visibility: "visible", pointerEvents: "auto" });
      gsap.fromTo(
        opts,
        { opacity: 0, y: -6, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "power2.out" },
      );
      gsap.to("#chevron-down", {
        rotation: -180,
        duration: 0.2,
        ease: "power2.out",
      });
    } else {
      gsap.to(opts, {
        opacity: 0,
        y: -4,
        scale: 0.97,
        duration: 0.18,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(opts, {
            visibility: "hidden",
            pointerEvents: "none",
          });
        },
      });
      gsap.to("#chevron-down", {
        rotation: 0,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  });

  document.addEventListener("click", (e) => {
    if (open && langWrap && !langWrap.contains(e.target)) {
      open = false;
      setExpandedState(false);
      gsap.to(opts, {
        opacity: 0,
        y: -4,
        scale: 0.97,
        duration: 0.18,
        ease: "power2.in",
        onComplete: () =>
          gsap.set(opts, {
            visibility: "hidden",
            pointerEvents: "none",
          }),
      });
      gsap.to("#chevron-down", { rotation: 0, duration: 0.2 });
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
        scrollTo: { y: section, offsetY: 80 },
        ease: "power3.inOut",
      });
    });
  });
}
