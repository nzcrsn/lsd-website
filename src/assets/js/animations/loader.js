import { gsap } from "../base.js";

function _startBrandAnimation() {
  // Lock scroll
  document.documentElement.classList.add("is-loading");

  const wordLift = document.getElementById("wordLift");
  const wordService = document.getElementById("wordService");
  const wordDemenage = document.getElementById("wordDemenagement");
  const loaderLine = document.getElementById("loaderLine");

  const loaderWrap = document.getElementById("loader-line-wrap");

  const loaderCounter = document.getElementById("loaderCounter");
  const loaderAccent = document.getElementById("loaderAccent");

  const panelTop = document.getElementById("panelTop");
  const panelBottom = document.getElementById("panelBottom");
  const loaderBrand = document.getElementById("loaderBrand");
  const page = document.getElementById("page");

  // Animated counter object
  const counter = { val: 0 };

  const tl = gsap.timeline({
    onComplete: _exitLoader,
  });

  // ── 1. Words slide up sequentially ──
  tl.to(
    wordLift,
    {
      translateY: "0%",
      opacity: 1,
      duration: 0.9,
      ease: "power3.out",
    },
    0.2,
  )

    .to(
      wordService,
      {
        translateY: "0%",
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
      },
      0.42,
    )

    .to(
      wordDemenage,
      {
        translateY: "0%",
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
      },
      0.65,
    )

    // ── 2. Progress line fills ──
    .to(
      loaderLine,
      {
        width: "100%",
        duration: 1.6,
        ease: "power1.inOut",
      },
      0.7,
    )

    // ── 3. Counter counts to 100 alongside the line ──
    .to(
      counter,
      {
        val: 100,
        duration: 1.6,
        ease: "power1.inOut",
        onUpdate: () => {
          loaderCounter.textContent = Math.round(counter.val);
        },
      },
      0.7,
    )

    // ── 4. Accent line draws in ──
    .to(
      loaderAccent,
      {
        width: "3.5rem",
        duration: 0.5,
        ease: "power2.out",
      },
      1.4,
    )

    // ── 5. Brief hold at 100 so user reads the brand ──
    .to({}, { duration: 0.5 })

    // ── 6. Brand fades + lifts slightly before curtain ──
    .to(
      [
        wordLift,
        wordService,
        wordDemenage,
        loaderAccent,
        loaderWrap,
        loaderCounter,
      ],
      {
        opacity: 0,
        y: -8,
        duration: 0.4,
        stagger: 0.04,
        ease: "power2.in",
      },
    )
    .to(
      loaderLine,
      {
        opacity: 0,
        duration: 0.3,
      },
      "<",
    );
}

function _exitLoader() {
  const panelTop = document.getElementById("panelTop");
  const panelBottom = document.getElementById("panelBottom");
  const loaderBrand = document.getElementById("loaderBrand");
  const loader = document.getElementById("loader");
  const page = document.getElementById("page");

  const exit = gsap.timeline({
    onComplete: () => {
      // Clean up loader from DOM
      loader.remove();
      loaderBrand.remove();
      document.getElementById("loaderCounter")?.remove();
      document.getElementById("loaderAccent")?.remove();

      // Unlock scroll
      document.documentElement.classList.remove("is-loading");
    },
  });

  // ── Curtain splits: top goes up, bottom goes down ──
  exit
    .to(
      panelTop,
      {
        yPercent: -100,
        duration: 1.1,
        ease: "power4.inOut",
      },
      0,
    )

    .to(
      panelBottom,
      {
        yPercent: 100,
        duration: 1.1,
        ease: "power4.inOut",
      },
      0,
    )

    // ── Page fades in as curtain opens ──
    .to(
      page,
      {
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
      },
      0.35,
    );
}

let resolveAnimation;

// A promise that resolves when the brand animation finishes
const animationPromise = new Promise((resolve) => {
  resolveAnimation = resolve;
});

// Call this IMMEDIATELY in main.js — just locks scroll
// The loader is already visible via CSS
export function initLoader() {
  document.documentElement.classList.add("is-loading");
  _startBrandAnimation();
}

// Call this AFTER window load — triggers the exit
export function exitLoader() {
  _exitLoader();
}

export async function waitForLoader() {
  // Waits for BOTH: page resources AND minimum animation time
  await Promise.all([animationPromise, document.fonts.ready]);
}
