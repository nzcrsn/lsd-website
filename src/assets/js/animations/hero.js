import { gsap, SplitText, ScrollTrigger } from "../base.js";
import { guardMotion } from "../motion.js";

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

    // ── 1. Headline — clip reveal per line ──
    const splitParent = new SplitText(heading, {
      type: "lines",
      linesClass: "line-parent",
    });
    new SplitText(".line-parent", {
      type: "lines",
      linesClass: "line-child",
    });
    gsap.set(".line-parent", { overflow: "hidden" });
    gsap.set(heading, { visibility: "visible" });

    const tl = gsap.timeline({ delay: 0.15 });

    tl.from(".line-child", {
      yPercent: 110,
      stagger: 0.09,
      duration: 1.05,
      ease: "power4.out",
    });

    // ── 2. Subheading words fade + rise ──
    if (subHeading) {
      const splitSub = new SplitText(subHeading, {
        type: "words",
        wordsClass: "sub-word",
      });
      gsap.set(subHeading, { visibility: "visible" });

      tl.from(
        ".sub-word",
        {
          opacity: 0,
          y: 14,
          stagger: 0.025,
          duration: 0.65,
          ease: "power3.out",
        },
        "-=0.55",
      );
    }

    // ── 3. Stats stagger up ──
    if (stats.length) {
      tl.from(
        stats,
        {
          opacity: 0,
          y: 14,
          stagger: 0.08,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.45",
      );
    }

    // ── 4. CTA button — wipe in from left edge, arrow pops ──
    if (ctaBtn) {
      // Start clipped from left
      gsap.set(ctaBtn, { clipPath: "inset(0 100% 0 0)", opacity: 1 });

      tl.to(
        ctaBtn,
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.65,
          ease: "power3.inOut",
        },
        "-=0.3",
      );

      // Arrow bounces in after the button reveals
      if (ctaArrow) {
        gsap.set(ctaArrow, { x: -6, opacity: 0 });
        tl.to(
          ctaArrow,
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(2)",
          },
          "-=0.2",
        );
      }

      // Hover: arrow nudges diagonally (CSS already handles rotate on hover,
      // GSAP adds the extra nudge on mouseenter/leave)
      ctaBtn.addEventListener("mouseenter", () => {
        if (ctaArrow) {
          gsap.to(ctaArrow, {
            x: 2,
            y: -2,
            duration: 0.25,
            ease: "power2.out",
          });
        }
      });
      ctaBtn.addEventListener("mouseleave", () => {
        if (ctaArrow) {
          gsap.to(ctaArrow, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
        }
      });
    }

    // ── 5. Proof badges (response-time badge) ──
    if (badges) {
      tl.from(
        badges,
        { opacity: 0, y: 8, duration: 0.45, ease: "power2.out" },
        "-=0.3",
      );
    }

    // ── 6. Google proof block ──
    if (proof) {
      tl.from(
        proof,
        {
          opacity: 0,
          y: 10,
          duration: 0.55,
          ease: "power2.out",
        },
        "-=0.3",
      );
    }

    // ── 6. Photo grid items stagger in from slight right + scale ──
    if (gridItems.length) {
      tl.from(
        gridItems,
        {
          opacity: 0,
          x: 18,
          scale: 0.97,
          stagger: 0.07,
          duration: 0.75,
          ease: "power3.out",
        },
        "-=0.6",
      );
    }

    // ── 7. Scroll hint fades in last ──
    if (scrollHint) {
      tl.to(
        scrollHint,
        {
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.1",
      );

      // Hide scroll hint once user starts scrolling
      let hintHidden = false;
      window.addEventListener(
        "scroll",
        () => {
          if (window.scrollY > 60 && !hintHidden) {
            hintHidden = true;
            gsap.to(scrollHint, {
              opacity: 0,
              y: 8,
              duration: 0.45,
              ease: "expo.out",
            });
          } else if (window.scrollY <= 60 && hintHidden) {
            hintHidden = false;
            gsap.to(scrollHint, {
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: "expo.out",
            });
          }
        },
        { passive: true },
      );
    }

    // ── 8. Scroll progress bar ──
    const progressBar = document.getElementById("progress-bar");
    if (progressBar) {
      window.addEventListener(
        "scroll",
        () => {
          const scrollTop = window.scrollY;
          const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
          progressBar.style.height = pct + "%";
        },
        { passive: true },
      );
    }
  });
}
