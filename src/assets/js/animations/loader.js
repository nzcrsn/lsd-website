import { gsap } from "../base.js";

let resolveAnimation;
const animationPromise = new Promise((resolve) => {
  resolveAnimation = resolve;
});

export function initLoader() {
  document.documentElement.classList.add("is-loading");
  _startBrandAnimation();
}

export function exitLoader() {
  _exitLoader();
}

export async function waitForLoader() {
  await Promise.all([animationPromise, document.fonts.ready]);
}

function _startBrandAnimation() {
  const wordLift = document.getElementById("wordLift");
  const wordService = document.getElementById("wordService");
  const wordDemenage = document.getElementById("wordDemenagement");

  const tl = gsap.timeline({ onComplete: _exitLoader });

  // Fade all three words in together, instantly
  tl.to(
    [wordLift, wordService, wordDemenage],
    {
      translateY: "0%",
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
    },
    0,
  )

    // Hold briefly so the logo reads
    .to({}, { duration: 0.4 })

    // Fade out
    .to([wordLift, wordService, wordDemenage], {
      opacity: 0,
      y: -6,
      duration: 0.3,
      ease: "power2.in",
    });
}

function _exitLoader() {
  const panelTop = document.getElementById("panelTop");
  const panelBottom = document.getElementById("panelBottom");
  const loader = document.getElementById("loader");
  const loaderBrand = document.getElementById("loaderBrand");
  const page = document.getElementById("page");

  gsap
    .timeline({
      onComplete: () => {
        loader?.remove();
        loaderBrand?.remove();
        document.documentElement.classList.remove("is-loading");
        resolveAnimation();
      },
    })
    .to(panelTop, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, 0)
    .to(panelBottom, { yPercent: 100, duration: 0.9, ease: "power4.inOut" }, 0)
    .to(page, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0.25);
}
