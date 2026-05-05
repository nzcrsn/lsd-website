import { gsap, SplitText } from "../core/gsap.js";
import { guardMotion } from "../utils/motion.js";

export function initHero() {
  guardMotion(() => {
    const heading = document.querySelector(".hero-section .heading");
    const subHeading = document.querySelector(".hero-section .sub-heading");
    const stats = document.querySelectorAll(".hero-stat");
    const ctaBtn = document.querySelector("a.cta-heading");
    const ctaArrow = ctaBtn?.querySelector(".arrow");
    const badges = document.querySelector(".proof__badges");
    const proof = document.querySelector(".proof");
    const gridItems = document.querySelectorAll(".grid .item");
    const scrollHint = document.getElementById("scroll-hint");

    if (!heading) return;

    const EASE_MAIN = "power3.out";
    const EASE_DRIFT = "power2.out";

    // ── 1. Headline — soft clip reveal per line ──────────────────────────────
    // const splitParent = SplitText.create(heading, {
    //   type: "lines",
    //   // linesClass: "line-parent",
    // });

    let split;

    const splitContainer = SplitText.create(heading, {
      type: "lines",
      mask: "lines",
      onSplit: (self) => {
        split = gsap.from(self.lines, {
          duration: 1.0,
          yPercent: 100,
          stagger: 0.1,
          ease: "expo.out",
          delay: 0.2,
        });
        return split;
      },
    });

    const tl = gsap.timeline();
    tl.add(split);

    // ── 2. Grid images — fade up from below ──────────────────────────────────────

    // if (gridItems.length) {
    //   tl.from(
    //     gridItems,
    //     {
    //       opacity: 0,
    //       y: 28,
    //       stagger: {
    //         each: 0.15,
    //         ease: "power1.inOut",
    //       },
    //       duration: 1.2,
    //       ease: "power3.out",
    //     },
    //     0.1, // slight delay behind the headline — text leads, images follow
    //   );
    // }

    // ── 3. Subheading — blur-to-sharp, one composed breath ───────────────────
    if (subHeading) {
      tl.from(
        subHeading,
        {
          y: 14,
          opacity: 0,
          duration: 1.2,
          ease: EASE_MAIN,
        },
        "-=0.55",
      );
    }

    // ── 4. Stats — soft expansion, each number breathes in ───────────────────
    if (stats.length) {
      tl.from(
        stats,
        {
          opacity: 0,
          y: 10,
          scale: 0.92,
          transformOrigin: "center bottom",
          stagger: 0.13,
          duration: 1.0,
          ease: EASE_MAIN,
        },
        "-=0.55",
      );
    }

    // ── 5. CTA button — scale + blur in, no wipe ─────────────────────────────
    if (ctaBtn) {
      gsap.set(ctaBtn, {
        opacity: 0,
        y: 6,
      });

      tl.to(
        ctaBtn,
        {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: EASE_MAIN,
          onComplete() {
            // Release GPU compositing after animation settles
            ctaBtn.style.willChange = "auto";
          },
        },
        "-=.7",
      );
    }

    // ── 6. Proof badges — floats up softly ───────────────────────────────────
    if (badges) {
      tl.from(
        badges,
        {
          opacity: 0,
          y: 10,
          filter: "blur(3px)",
          duration: 0.9,
          ease: EASE_MAIN,
        },
        "-=0.35",
      );
    }
  });
}
