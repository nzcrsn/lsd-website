import { gsap } from "../base.js";

export function initBackToTop() {
  const button = document.querySelector("#backToTop");

  if (!button) return;

  let visible = false;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const threshold = window.innerHeight; // 100vh

    if (scrollY > threshold && !visible) {
      visible = true;

      gsap.to(button, {
        autoAlpha: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }

    if (scrollY <= threshold && visible) {
      visible = false;

      gsap.to(button, {
        autoAlpha: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  });

  button.addEventListener("click", () => {
    gsap.to(window, {
      duration: 1.2,
      scrollTo: {
        y: 0,
      },
      ease: "power3.inOut",
    });
  });
}
