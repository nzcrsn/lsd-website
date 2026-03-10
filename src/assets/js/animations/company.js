import { gsap, SplitText, ScrollTrigger } from "../base.js";
import { guardMotion } from "../motion.js";

export function initCompany() {
  guardMotion(() => {
    const section = document.querySelector(".company-section");
    if (!section) return;

    _animateLeft();
    _animateRight();
  });
}

// ── LEFT column: intro text → values label → vgrid items ──
function _animateLeft() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".company-section .left",
      start: "top 82%",
    },
  });

  // Intro paragraph word-by-word
  const intro = document.querySelector(".company-intro");
  if (intro) {
    const split = new SplitText(intro, {
      type: "words",
      wordsClass: "intro-word",
    });
    gsap.set(intro, { visibility: "visible" });

    tl.from(
      ".intro-word",
      {
        opacity: 0,
        y: 10,
        stagger: 0.018,
        duration: 0.5,
        ease: "power2.out",
      },
      0,
    );
  }

  // Values label
  tl.from(
    ".values__label",
    { opacity: 0, x: -10, duration: 0.5, ease: "power2.out" },
    "-=0.2",
  );

  // Value grid items stagger in
  tl.from(
    ".vitem",
    {
      opacity: 0,
      y: 22,
      stagger: 0.07,
      duration: 0.65,
      ease: "power3.out",
      clearProps: "transform", // don't interfere with CSS hover
    },
    "-=0.3",
  );
}

// ── RIGHT column: image frame → stats count-up → quote ──
function _animateRight() {
  // Image frame slides in
  gsap.from(".img-frame", {
    opacity: 0,
    x: 24,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".img-frame",
      start: "top 85%",
    },
  });

  // Image strip
  gsap.from(".img-strip", {
    opacity: 0,
    y: 8,
    duration: 0.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".img-frame",
      start: "top 75%",
    },
  });

  // Stats — count-up on scroll entry
  const statEls = document.querySelectorAll(".stat__n");

  if (statEls.length) {
    ScrollTrigger.create({
      trigger: ".stats",
      start: "top 88%",
      once: true,
      onEnter: () => {
        statEls.forEach((el) => {
          const val = parseFloat(el.dataset.val);
          const suf = el.dataset.suf || "";
          const obj = { n: 0 };

          gsap.to(obj, {
            n: val,
            duration: 1.8,
            ease: "power3.out",
            onUpdate() {
              el.innerHTML = `${Math.round(obj.n)}<em>${suf}</em>`;
            },
          });
        });

        // Stat items slide up as count starts
        gsap.from(".stat", {
          opacity: 0,
          y: 16,
          stagger: 0.1,
          duration: 0.65,
          ease: "power2.out",
        });
      },
    });
  }

  // Quote — clip reveal
  gsap.from(".qtext", {
    opacity: 0,
    y: 18,
    duration: 0.75,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".qtext",
      start: "top 90%",
    },
  });
}
