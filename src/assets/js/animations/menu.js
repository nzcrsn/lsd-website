import { gsap } from "../base.js";
import { guardMotion } from "../motion.js";

export function initMenu() {
  const menuBtn = document.querySelector(".menu-btn");
  if (!menuBtn) return;

  const tl = gsap.timeline({
    paused: true,
    reversed: true,
    duration: 0.2,
    ease: "power2.inOut",
  });

  tl.to(
    "#line-top",
    { rotation: -45, transformOrigin: "100% 50%", scaleX: 0.8, x: -2 },
    0,
  );
  tl.to(
    "#line-bottom",
    { rotation: -45, scaleX: 0.8, transformOrigin: "0% 0%", x: 2 },
    0,
  );
  tl.to("#line-middle", { rotation: 45, transformOrigin: "50% 50%" }, 0);
  tl.to(
    "#menu-section",
    {
      opacity: 1,
      visibility: "visible",
      pointerEvents: "auto",
      ease: "power2.inOut",
    },
    0,
  );

  let scrollY = 0;

  function openMenu() {
    scrollY = window.scrollY;

    document.body.style.top = `-${scrollY}px`;
    document.body.classList.add("scroll-locked");
    menuBtn.setAttribute("aria-expanded", "true");
    menuBtn.setAttribute("aria-label", "Close menu");
  }

  function closeMenu() {
    document.body.classList.remove("scroll-locked");

    const storedScrollY = scrollY;
    document.body.style.top = "";

    window.scrollTo(0, storedScrollY);
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open menu");
  }

  menuBtn.addEventListener("click", () => {
    if (tl.reversed()) {
      guardMotion(() => tl.play());
      openMenu();
    } else {
      guardMotion(() => tl.reverse());
      closeMenu();
    }
  });
}
