import { gsap } from "../core/gsap.js";
import { guardMotion } from "../utils/motion.js";

export function initSectionHeadings(ScrollTrigger) {
  guardMotion(() => {
    const headings = document.querySelectorAll(
      ".services-section h2, .testimonials-section h2, .company-section h2, .faq-section h2, .contact-section h2",
    );
    const eyebrows = document.querySelectorAll(
      ".services-section .eyebrow, .company-section .eyebrow, .testimonials-section .eyebrow, .contact-section .eyebrow, .faq-section .eyebrow",
    );

    headings.forEach((el) => {
      gsap.from(el, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      });
    });

    eyebrows.forEach((el) => {
      gsap.from(el, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
        },
      });
    });
  });
}
