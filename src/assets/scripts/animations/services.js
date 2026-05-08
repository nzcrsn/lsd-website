import { gsap } from "../core/gsap.js";
import { guardMotion } from "../utils/motion.js";

export function initServices(ScrollTrigger) {
  guardMotion(() => {
    const tiles = document.querySelectorAll(".svc-tile");
    if (!tiles.length) return;

    gsap.from(tiles, {
      opacity: 0,
      y: 32,
      scale: 0.97,
      stagger: 0.1,
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".services-bento__layout",
        start: "top 82%",
      },
    });
  });
}
