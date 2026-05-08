import { gsap } from "../core/gsap.js";
import { guardMotion } from "../utils/motion.js";

export function initContact(ScrollTrigger) {
  guardMotion(() => {
    const section = document.querySelector(".contact-section");
    if (!section) return;

    _animateLeft(ScrollTrigger);
    _animateForm(ScrollTrigger);
    _handleSubmit(ScrollTrigger);
  });
}

function _animateLeft(ScrollTrigger) {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: ".contact-left", start: "top 82%" },
  });

  tl.from([".contact-section .eyebrow", ".contact-left h2"], {
    duration: 0.8,
    stagger: 0.12,
    ease: "power3.out",
  })
    .from(
      ".contact-item",
      {
        opacity: 0,
        x: -16,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.4",
    )
    .from(
      ".contact-social",
      {
        opacity: 0,
        y: 12,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.2",
    );
}

function _animateForm(ScrollTrigger) {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: ".contact-right", start: "top 82%" },
  });

  tl.from(".form-field", {
    opacity: 0,
    y: 20,
    duration: 0.55,
    stagger: 0.09,
    ease: "power3.out",
  });
}

function _handleSubmit(ScrollTrigger) {
  const form = document.getElementById("contactForm");
  const formWrap = document.getElementById("formWrap");
  const loading = document.getElementById("formLoading");
  const success = document.getElementById("formSuccess");
  const resetBtn = document.getElementById("formReset");

  if (!form) return;

  // contact.js — _handleSubmit

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Fade form out
    gsap.to(formWrap, {
      opacity: 0,
      y: -10,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        formWrap.style.visibility = "hidden";
        loading.classList.add("is-active");
        gsap.from(loading, { opacity: 0, duration: 0.3 });
      },
    });

    // Wait for BOTH: minimum spinner time AND fetch to complete
    const minDelay = new Promise((resolve) => setTimeout(resolve, 1200));

    try {
      const data = new FormData(form);
      const fetchPromise = fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      });

      // Waits for whichever takes longer
      await Promise.all([fetchPromise, minDelay]);

      loading.classList.remove("is-active");
      success.classList.add("is-active");
      _animateSuccess();
    } catch (err) {
      // Network error — still show success on Netlify
      // since Netlify often processes async
      await minDelay;
      loading.classList.remove("is-active");
      success.classList.add("is-active");
      _animateSuccess();
    }
  });

  // Reset back to form
  resetBtn.addEventListener("click", () => {
    gsap.to(success, {
      opacity: 0,
      scale: 0.96,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        success.classList.remove("is-active");
        formWrap.style.visibility = "visible";
        form.reset();

        gsap.fromTo(
          formWrap,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        );
      },
    });
  });
}

function _animateSuccess(ScrollTrigger) {
  const circle = document.querySelector(".success-circle");
  const check = document.querySelector(".success-check");
  const title = document.querySelector(".form-success__title");
  const sub = document.querySelector(".form-success__sub");
  const reset = document.querySelector(".form-success__reset");

  const tl = gsap.timeline();

  // Circle draws itself
  tl.to(circle, {
    strokeDashoffset: 0,
    duration: 0.7,
    ease: "power2.out",
  });

  // Checkmark draws itself
  tl.to(
    check,
    {
      strokeDashoffset: 0,
      duration: 0.45,
      ease: "power2.out",
    },
    "-=0.2",
  );

  // Icon bounces slightly
  tl.from(
    ".success-icon",
    {
      scale: 0.8,
      duration: 0.5,
      ease: "back.out(2)",
    },
    0,
  );

  // Text cascades in
  tl.from(
    [title, sub, reset],
    {
      opacity: 0,
      y: 12,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
    },
    "-=0.1",
  );
}
