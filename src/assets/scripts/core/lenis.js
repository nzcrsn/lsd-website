import gsap from "gsap";
import Lenis from "lenis";

export const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical",
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1,
  autoRaf: false,
});

let rafId;

function raf(time) {
  lenis.raf(time);
  rafId = requestAnimationFrame(raf);
}

rafId = requestAnimationFrame(raf);

export function connectLenisToScrollTrigger(ScrollTrigger) {
  lenis.on("scroll", ScrollTrigger.update);
  cancelAnimationFrame(rafId);
  import("./gsap.js").then(({ gsap }) => {
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  });
}
