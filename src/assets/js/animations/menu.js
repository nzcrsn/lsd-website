import { gsap } from "../base.js";
import { guardMotion } from "../motion.js";

export function initMenu() {
  const menuBtn = document.querySelector(".menu-btn");

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
      pointerEvents: "visible",
      ease: "power2.inOut",
    },
    0,
  );
  tl.to(
    ".menu-link",
    { opacity: 1, stagger: 0.05, ease: "power2.inOut" },
    0.05,
  );

  let scrollY = 0;

  function openMenu() {
    smoothWrapper.classList.add("scroll-locked");
    scrollY = window.scrollY;
    document.body.style.top = `-${scrollY}px`;
  }

  function closeMenu() {
    smoothWrapper.classList.remove("scroll-locked");
    document.body.style.top = "";
    window.scrollTo(0, scrollY);
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
