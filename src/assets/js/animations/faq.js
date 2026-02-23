import { gsap } from "../base.js";

export function initFaq() {
  const items = document.querySelectorAll(".faq__item");

  items.forEach((item) => {
    const trigger = item.querySelector(".faq__trigger");
    const panel = item.querySelector(".faq__panel");
    const vBar = item.querySelector(".v-bar");
    const answer = item.querySelector(".faq__answer");

    // Set initial state
    gsap.set(panel, { height: 0 });
    gsap.set(answer, { opacity: 0, y: 10 });

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      // Close all others first
      closeAll(item);

      if (isOpen) {
        close(item);
      } else {
        open(item);
      }
    });
  });

  function open(item) {
    const panel = item.querySelector(".faq__panel");
    const vBar = item.querySelector(".v-bar");
    const answer = item.querySelector(".faq__answer");
    const trigger = item.querySelector(".faq__trigger");

    item.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");

    const tl = gsap.timeline();

    tl.to(panel, {
      height: "auto",
      duration: 0.55,
      ease: "power3.out",
    });

    tl.to(
      answer,
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.25",
    );

    tl.to(
      vBar,
      {
        scaleY: 0,
        duration: 0.3,
        ease: "power2.inOut",
        transformOrigin: "50% 50%",
      },
      0,
    );
  }

  function close(item) {
    const panel = item.querySelector(".faq__panel");
    const vBar = item.querySelector(".v-bar");
    const answer = item.querySelector(".faq__answer");
    const trigger = item.querySelector(".faq__trigger");

    item.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");

    const tl = gsap.timeline();

    tl.to(answer, {
      opacity: 0,
      y: 6,
      duration: 0.2,
      ease: "power2.in",
    });

    tl.to(
      panel,
      {
        height: 0,
        duration: 0.45,
        ease: "power3.inOut",
      },
      "-=0.05",
    );

    tl.to(
      vBar,
      {
        scaleY: 1,
        duration: 0.3,
        ease: "power2.out",
        transformOrigin: "50% 50%",
      },
      0,
    );
  }

  function closeAll(except) {
    items.forEach((item) => {
      if (item !== except && item.classList.contains("is-open")) {
        close(item);
      }
    });
  }
}

// Scroll-in reveal for each row
export function initFaqReveal() {
  gsap.from(".faq__item", {
    opacity: 0,
    y: 30,
    stagger: 0.08,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".faq__list",
      start: "top 85%",
    },
  });

  gsap.from(".faq__header", {
    opacity: 0,
    y: 20,
    duration: 0.9,
    ease: "power3.out",
  });
}
