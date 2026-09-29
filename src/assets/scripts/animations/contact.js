import { gsap } from "../core/gsap.js";
import { guardMotion } from "../utils/motion.js";

export function initContact(ScrollTrigger) {
  guardMotion(() => {
    const section = document.querySelector(".contact-section");
    if (!section) return;

    _animateLeft(ScrollTrigger);
    _animateForm(ScrollTrigger);
    _handleSubmit();

    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
}

/* ── Animations ──────────────────────────────────────────────── */

function _animateLeft(ScrollTrigger) {
  // Set initial state BEFORE ScrollTrigger so nothing flashes
  gsap.set([".contact-section .eyebrow", ".contact-left h2"], {
    autoAlpha: 0,
    y: 16,
  });
  gsap.set(".contact-item", { autoAlpha: 0, x: -16 });
  gsap.set(".contact-social", { autoAlpha: 0, y: 12 });

  gsap
    .timeline({
      scrollTrigger: { trigger: ".contact-left", start: "top 82%", once: true },
    })
    .to([".contact-section .eyebrow", ".contact-left h2"], {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
    })
    .to(
      ".contact-item",
      { autoAlpha: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.4",
    )
    .to(
      ".contact-social",
      { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "-=0.2",
    );
}

function _animateForm(ScrollTrigger) {
  // Guard: if no .form-field exists (empty form), bail early
  const fields = document.querySelectorAll(".form-field");
  if (!fields.length) return;

  // Set invisible BEFORE creating the ScrollTrigger
  gsap.set(fields, { autoAlpha: 0, y: 20 });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".contact-right",
        start: "top 85%",
        once: true,
      },
    })
    .to(fields, {
      autoAlpha: 1,
      y: 0,
      duration: 0.55,
      stagger: 0.09,
      ease: "power3.out",
    });
}

/* ── Form submission ─────────────────────────────────────────── */

function _handleSubmit() {
  const form = document.getElementById("contactForm");
  const formWrap = document.getElementById("formWrap");
  const loading = document.getElementById("formLoading");
  const success = document.getElementById("formSuccess");
  const errorBox = document.getElementById("formError");
  const resetBtn = document.getElementById("formReset");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    _showLoading(formWrap, loading);

    const minDelay = new Promise((r) => setTimeout(r, 1200));

    try {
      const payload = Object.fromEntries(new FormData(form));

      const [res] = await Promise.all([
        fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }),
        minDelay,
      ]);

      loading.classList.remove("is-active");

      if (res.ok) {
        _showSuccess(success);
      } else {
        const { error } = await res.json().catch(() => ({}));
        _showError(formWrap, errorBox, error ?? "Une erreur est survenue.");
      }
    } catch {
      await minDelay;
      loading.classList.remove("is-active");
      _showError(
        formWrap,
        errorBox,
        "Impossible d'envoyer le message. Vérifiez votre connexion.",
      );
    }
  });

  resetBtn?.addEventListener("click", () => {
    gsap.to(success, {
      autoAlpha: 0,
      scale: 0.96,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        success.classList.remove("is-active");
        form.reset();
        formWrap.style.visibility = "visible";
        gsap.fromTo(
          formWrap,
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" },
        );
      },
    });
  });
}

/* ── State helpers ───────────────────────────────────────────── */

function _showLoading(formWrap, loading) {
  gsap.to(formWrap, {
    autoAlpha: 0,
    y: -10,
    duration: 0.3,
    ease: "power2.in",
    onComplete: () => {
      formWrap.style.visibility = "hidden";
      loading.classList.add("is-active");
      gsap.from(loading, { autoAlpha: 0, duration: 0.3 });
    },
  });
}

function _showSuccess(success) {
  success.classList.add("is-active");
  _animateSuccess();
}

function _showError(formWrap, errorBox, message) {
  formWrap.style.visibility = "visible";
  gsap.fromTo(
    formWrap,
    { autoAlpha: 0, y: 6 },
    { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" },
  );

  if (errorBox) {
    errorBox.textContent = message;
    errorBox.classList.add("is-active");
    gsap.from(errorBox, { autoAlpha: 0, y: -6, duration: 0.3 });

    setTimeout(() => {
      gsap.to(errorBox, {
        autoAlpha: 0,
        duration: 0.3,
        onComplete: () => errorBox.classList.remove("is-active"),
      });
    }, 6000);
  }
}

/* ── Success animation ───────────────────────────────────────── */

function _animateSuccess() {
  const circle = document.querySelector(".success-circle");
  const check = document.querySelector(".success-check");
  const title = document.querySelector(".form-success__title");
  const sub = document.querySelector(".form-success__sub");
  const reset = document.querySelector(".form-success__reset");

  gsap
    .timeline()
    .to(circle, { strokeDashoffset: 0, duration: 0.7, ease: "power2.out" })
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
      { autoAlpha: 0, y: 12, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      "-=0.1",
    );
}

/* ── CSS to add to home.css ──────────────────────────────────────

.form-field {
  opacity: 1;
  visibility: visible;
}

.form-error {
  display: none;
  background-color: #fdf2f2;
  border-left: 2px solid #c0392b;
  color: #7b1e1e;
  font-family: var(--font-secondary);
  font-size: var(--fs-p-sm);
  font-weight: 400;
  line-height: 1.6;
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
}
.form-error.is-active {
  display: block;
}

@media (prefers-reduced-motion: reduce) {
  .form-field {
    opacity: 1 !important;
    visibility: visible !important;
  }
}

─────────────────────────────────────────────────────────────── */
