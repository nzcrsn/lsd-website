import { gsap, SplitText } from "../base.js";
import { guardMotion } from "../motion.js";

export function initHero() {
  guardMotion(() => {
    const split1 = new SplitText(".reveal", {
      type: "lines",
      linesClass: "lineParent",
    });

    new SplitText(".lineParent", { type: "lines", linesClass: "lineChild" });

    gsap.set(".lineParent", { overflow: "hidden" });
    gsap.set(".reveal", { visibility: "visible" });

    gsap.from(".lineChild", {
      scrollTrigger: { trigger: ".reveal", start: "top 80%" },
      yPercent: 100,
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
    });
  });
}
