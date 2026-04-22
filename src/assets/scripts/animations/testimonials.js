import { gsap } from "../base.js";
import { guardMotion } from "../motion.js";

export function initTestimonials() {
  guardMotion(() => {
    const section = document.querySelector(".testimonials-section");
    if (!section) return;

    // ── Cards stagger in column by column ──
    // CSS masonry is column-based, so stagger reads naturally top→bottom left→right
    gsap.from(".review-card", {
      opacity: 0,
      y: 36,
      scale: 0.97,
      stagger: {
        each: 0.09,
        from: "start",
      },
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".testimonials__masonry",
        start: "top 84%",
      },
    });

    // ── Footer: text + platform pills ──
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".testimonials__footer",
        start: "top 92%",
      },
    });

    tl.from(".testimonials__footer-text", {
      opacity: 0,
      x: -16,
      duration: 0.7,
      ease: "power3.out",
    }).from(
      ".platform-pill",
      {
        opacity: 0,
        y: 12,
        stagger: 0.1,
        duration: 0.55,
        ease: "power2.out",
      },
      "-=0.4",
    );
  });
}
