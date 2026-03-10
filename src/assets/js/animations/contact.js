import { gsap, ScrollTrigger } from "../base.js";

export function initContact() {
  const section = document.querySelector(".contact-section");
  if (!section) return;

  _animateLeft();
  _animateForm();
  _handleSubmit();
}

// ── Left column: eyebrow → heading → contact items → socials ──
function _animateLeft() {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: ".contact-left", start: "top 82%" },
  });

  tl.from([".contact-section .eyebrow", ".contact-left h2"], {
    opacity: 0,
    y: 20,
    duration: 0.8,
    stagger: 0.12,
    ease: "power3.out",
  });

  // Contact items slide in with a left-edge reveal
  tl.from(
    ".contact-item",
    { opacity: 0, x: -20, stagger: 0.1, duration: 0.6, ease: "power3.out" },
    "-=0.4",
  );

  tl.from(
    ".contact-social",
    { opacity: 0, y: 12, duration: 0.5, ease: "power2.out" },
    "-=0.2",
  );
}

// ── Right column: clip-path wipe upward per field ──
function _animateForm() {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: ".contact-right", start: "top 82%" },
  });

  // Form title
  tl.from(".form__title", {
    opacity: 0,
    y: 14,
    duration: 0.55,
    ease: "power3.out",
  });

  // Fields clip-wipe from bottom
  tl.from(
    ".form-field",
    {
      clipPath: "inset(0 0 100% 0)",
      opacity: 0,
      stagger: 0.07,
      duration: 0.55,
      ease: "power3.out",
    },
    "-=0.3",
  );

  // Service pills
  tl.from(
    ".service-pills",
    { opacity: 0, y: 10, duration: 0.45, ease: "power2.out" },
    "-=0.2",
  );

  // Submit button
  tl.from(
    ".form-submit, .cta-btn[type='submit']",
    { opacity: 0, y: 12, duration: 0.45, ease: "power2.out" },
    "-=0.15",
  );
}

// ── Form submission — loading + success states ──
function _handleSubmit() {
  const form = document.getElementById("contactForm");
  const formWrap = document.getElementById("formWrap");
  const loading = document.getElementById("formLoading");
  const success = document.getElementById("formSuccess");
  const resetBtn = document.getElementById("formReset");

  if (!form) return;

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

    const minDelay = new Promise((resolve) => setTimeout(resolve, 1200));

    try {
      const data = new FormData(form);
      const fetchPromise = fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      });
      await Promise.all([fetchPromise, minDelay]);
    } catch (_) {
      await minDelay;
    }

    loading.classList.remove("is-active");
    success.classList.add("is-active");
    _animateSuccess();
  });

  resetBtn?.addEventListener("click", () => {
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

// ── Success checkmark draw ──
function _animateSuccess() {
  const circle = document.querySelector(".success-circle");
  const check = document.querySelector(".success-check");
  const title = document.querySelector(".form-success__title");
  const sub = document.querySelector(".form-success__sub");
  const reset = document.querySelector(".form-success__reset");

  const tl = gsap.timeline();

  tl.to(circle, { strokeDashoffset: 0, duration: 0.7, ease: "power2.out" })
    .to(
      check,
      { strokeDashoffset: 0, duration: 0.45, ease: "power2.out" },
      "-=0.2",
    )
    .from(
      ".success-icon",
      { scale: 0.8, duration: 0.5, ease: "back.out(2)" },
      0,
    )
    .from(
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
