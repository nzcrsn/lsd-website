// import { gsap, SplitText, ScrollTrigger } from "../base.js";
// import { guardMotion } from "../motion.js";

// export function initSectionHeadings() {
//   guardMotion(() => {
//     const headings = document.querySelectorAll(
//       ".services-section h2, .company-section h2, .testimonials-section h2, .contact-section h2, .faq-section h2",
//     );

//     headings.forEach((h2) => {
//       const splitParent = new SplitText(h2, {
//         type: "lines",
//         linesClass: "h2-line-parent",
//       });

//       splitParent.lines.forEach((line) => {
//         const inner = document.createElement("span");
//         inner.className = "h2-line-child";
//         inner.style.display = "block";
//         inner.innerHTML = line.innerHTML;
//         line.innerHTML = "";
//         line.style.overflow = "hidden";
//         line.appendChild(inner);
//       });

//       gsap.set(h2, { visibility: "visible" });

//       gsap.from(h2.querySelectorAll(".h2-line-child"), {
//         yPercent: 106,
//         stagger: 0.08,
//         duration: 0.95,
//         ease: "power4.out",
//         scrollTrigger: {
//           trigger: h2,
//           start: "top 88%",
//         },
//       });
//     });

//     const eyebrows = document.querySelectorAll(
//       ".services-section .eyebrow, .company-section .eyebrow, .testimonials-section .eyebrow, .contact-section .eyebrow, .faq-section .eyebrow",
//     );

//     eyebrows.forEach((el) => {
//       gsap.from(el, {
//         opacity: 0,
//         x: -12,
//         duration: 0.7,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: el,
//           start: "top 90%",
//         },
//       });
//     });

//     const leadParas = document.querySelectorAll(
//       ".services-section > p, .company-section > p, .testimonials-section > p, .contact-section > p",
//     );

//     leadParas.forEach((p) => {
//       gsap.from(p, {
//         opacity: 0,
//         y: 14,
//         duration: 0.75,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: p,
//           start: "top 90%",
//         },
//       });
//     });
//   });
// }

import { gsap } from "../core/gsap.js";

// ScrollTrigger is passed in — not imported here
// because this file loads as part of the deferred bundle
export function initSectionHeadings(ScrollTrigger) {
  const headings = document.querySelectorAll(
    ".services-section h2, .testimonials-section h2, .company-section h2, .faq-section h2, .contact-section h2",
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
        once: true,
      },
    });
  });
}
