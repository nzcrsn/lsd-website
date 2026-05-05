import { gsap } from "../core/gsap.js";
import { guardMotion } from "../utils/motion.js";

export function initOptLang() {
  const menuBtn = document.querySelector(".current-lang");
  const langWrap = document.querySelector(".language");
  const opts = document.querySelector(".opts-lang");
  if (!menuBtn) return;

  let open = false;
  const setExpandedState = (isExpanded) => {
    menuBtn.setAttribute("aria-expanded", String(isExpanded));
  };

  menuBtn.addEventListener("click", () => {
    open = !open;
    setExpandedState(open);

    if (open) {
      gsap.set(opts, { visibility: "visible", pointerEvents: "auto" });
      gsap.fromTo(
        opts,
        { opacity: 0, y: -6, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "power2.out" },
      );
      gsap.to("#chevron-down", {
        rotation: -90,
        duration: 0.2,
        ease: "power2.out",
      });
    } else {
      gsap.to(opts, {
        opacity: 0,
        y: -4,
        scale: 0.97,
        duration: 0.18,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(opts, {
            visibility: "hidden",
            pointerEvents: "none",
          });
        },
      });
      gsap.to("#chevron-down", {
        rotation: 0,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  });

  document.addEventListener("click", (e) => {
    if (open && langWrap && !langWrap.contains(e.target)) {
      open = false;
      setExpandedState(false);
      gsap.to(opts, {
        opacity: 0,
        y: -4,
        scale: 0.97,
        duration: 0.18,
        ease: "power2.in",
        onComplete: () =>
          gsap.set(opts, {
            visibility: "hidden",
            pointerEvents: "none",
          }),
      });
      gsap.to("#chevron-down", { rotation: 0, duration: 0.2 });
    }
  });
}
