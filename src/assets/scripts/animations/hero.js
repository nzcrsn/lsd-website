// import { gsap, SplitText } from "../base.js";
// import { guardMotion } from "../motion.js";

// export function initHero() {
//   guardMotion(() => {
//     const heading = document.querySelector(".hero-section .heading");
//     const subHeading = document.querySelector(".hero-section .sub-heading");
//     const stats = document.querySelectorAll(".hero-stat");
//     const ctaBtn = document.querySelector("a.cta-heading");
//     const ctaArrow = ctaBtn?.querySelector(".arrow");
//     const badges = document.querySelector(".proof__badges");
//     const proof = document.querySelector(".proof");
//     const gridItems = document.querySelectorAll(".grid .item");
//     const scrollHint = document.getElementById("scroll-hint");

//     if (!heading) return;

//     // ── Shared easing tokens ─────────────────────────────────────────────────
//     // One easing language across the whole section so everything
//     // feels like it belongs to the same breath.
//     const EASE_MAIN = "power3.out";
//     const EASE_DRIFT = "power2.out";

//     // ── 1. Headline — soft clip reveal per line ──────────────────────────────
//     const splitParent = new SplitText(heading, {
//       type: "lines",
//       linesClass: "line-parent",
//     });
//     new SplitText(".line-parent", {
//       type: "lines",
//       linesClass: "line-child",
//     });
//     gsap.set(".line-parent", { overflow: "hidden" });
//     gsap.set(heading, { visibility: "visible" });

//     const tl = gsap.timeline({ delay: 0.05 });

//     tl.from(".line-child", {
//       yPercent: 105,
//       filter: "blur(3px)", // lines sharpen as they rise
//       stagger: 0.12,
//       duration: 1.1,
//       ease: "expo.out",
//     });
//     // ── 2. Grid images — fade up from below ──────────────────────────────────────
//     // Simple and clean — lets the text entrance be the hero moment.
//     if (gridItems.length) {
//       tl.from(
//         gridItems,
//         {
//           opacity: 0,
//           y: 28,
//           stagger: {
//             each: 0.15,
//             ease: "power1.inOut",
//           },
//           duration: 1.2,
//           ease: "power3.out",
//         },
//         0.1, // slight delay behind the headline — text leads, images follow
//       );
//     }

//     // ── 3. Subheading — blur-to-sharp, one composed breath ───────────────────
//     if (subHeading) {
//       gsap.set(subHeading, { visibility: "visible" });

//       tl.from(
//         subHeading,
//         {
//           opacity: 0,
//           y: 14,
//           filter: "blur(5px)",
//           duration: 1.2,
//           ease: EASE_MAIN,
//         },
//         "-=0.55",
//       );
//     }

//     // ── 4. Stats — soft expansion, each number breathes in ───────────────────
//     if (stats.length) {
//       tl.from(
//         stats,
//         {
//           opacity: 0,
//           y: 10,
//           scale: 0.92,
//           filter: "blur(3px)",
//           transformOrigin: "center bottom",
//           stagger: 0.13,
//           duration: 1.0,
//           ease: EASE_MAIN,
//         },
//         "-=0.55",
//       );
//     }

//     // ── 5. CTA button — scale + blur in, no wipe ─────────────────────────────
//     if (ctaBtn) {
//       gsap.set(ctaBtn, { opacity: 0, scale: 0.94, filter: "blur(4px)", y: 8 });

//       tl.to(
//         ctaBtn,
//         {
//           opacity: 1,
//           scale: 1,
//           filter: "blur(0px)",
//           y: 0,
//           duration: 1.1,
//           ease: EASE_MAIN,
//           onComplete() {
//             // Release GPU compositing after animation settles
//             ctaBtn.style.willChange = "auto";
//           },
//         },
//         "-=0.2",
//       );

//       if (ctaArrow) {
//         gsap.set(ctaArrow, { x: -12, opacity: 0 });
//         tl.to(
//           ctaArrow,
//           {
//             x: 0,
//             opacity: 1,
//             duration: 0.9,
//             ease: EASE_DRIFT,
//           },
//           "-=0.7",
//         );
//       }

//       // Hover — arrow floats, asymmetric timing feels organic
//       ctaBtn.addEventListener("mouseenter", () => {
//         if (ctaArrow)
//           gsap.to(ctaArrow, { x: 3, y: -3, duration: 0.4, ease: EASE_DRIFT });
//       });
//       ctaBtn.addEventListener("mouseleave", () => {
//         if (ctaArrow)
//           gsap.to(ctaArrow, { x: 0, y: 0, duration: 0.65, ease: EASE_DRIFT });
//       });
//     }

//     // ── 6. Proof badges — floats up softly ───────────────────────────────────
//     if (badges) {
//       tl.from(
//         badges,
//         {
//           opacity: 0,
//           y: 10,
//           filter: "blur(3px)",
//           duration: 0.9,
//           ease: EASE_MAIN,
//         },
//         "-=0.35",
//       );
//     }

//     // ── 7. Google proof block — same language as badges ───────────────────────
//     if (proof) {
//       tl.from(
//         proof,
//         {
//           opacity: 0,
//           y: 10,
//           filter: "blur(3px)",
//           duration: 0.9,
//           ease: EASE_MAIN,
//         },
//         "-=0.5", // overlaps badges slightly — they arrive together
//       );
//     }

//     // ── 8. Scroll hint — last to arrive, lingers ─────────────────────────────
//     if (scrollHint) {
//       tl.to(
//         scrollHint,
//         {
//           opacity: 1,
//           duration: 1.0,
//           ease: EASE_DRIFT,
//         },
//         "+=0.15", // deliberate pause — feels like the page exhales
//       );

//       let hintHidden = false;
//       window.addEventListener(
//         "scroll",
//         () => {
//           if (window.scrollY > 60 && !hintHidden) {
//             hintHidden = true;
//             gsap.to(scrollHint, {
//               opacity: 0,
//               y: 8,
//               filter: "blur(3px)",
//               duration: 0.55,
//               ease: "expo.out",
//             });
//           } else if (window.scrollY <= 60 && hintHidden) {
//             hintHidden = false;
//             gsap.to(scrollHint, {
//               opacity: 1,
//               y: 0,
//               filter: "blur(0px)",
//               duration: 0.55,
//               ease: "expo.out",
//             });
//           }
//         },
//         { passive: true },
//       );
//     }
//   });
// }

import { gsap, SplitText } from "../core/gsap.js";
import { guardMotion } from "../utils/motion.js";

export function initHero() {
  guardMotion(() => {
    const heading = document.querySelector(".hero-section .heading");
    const subheading = document.querySelector(".hero-section .sub-heading");
    const trust = document.querySelector(".hero-trust");
    const cta = document.querySelector(".cta-heading");
    const badge = document.querySelector(".proof__badges");

    if (!heading) return;

    const split = new SplitText(heading, { type: "lines" });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(split.lines, {
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
    })
      .from(
        subheading,
        {
          y: 20,
          opacity: 0,
          duration: 0.7,
        },
        "-=0.5",
      )
      .from(
        trust,
        {
          y: 16,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.4",
      )
      .from(
        [cta, badge],
        {
          y: 12,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
        },
        "-=0.3",
      );
  });
}
