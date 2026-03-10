import { gsap } from "../base.js";

export function initMouse() {
  const cd = document.getElementById("cd");
  const cr = document.getElementById("cr");

  if (!cd || !cr) return;

  let mx = 0,
    my = 0,
    rx = 0,
    ry = 0;

  // ── Core follow ──
  window.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    gsap.set(cd, { x: mx, y: my });
  });

  gsap.ticker.add(() => {
    rx += (mx - rx) * 0.09;
    ry += (my - ry) * 0.09;
    gsap.set(cr, { x: rx, y: ry });
  });

  // ── Expand on interactive elements ──
  const interactives = document.querySelectorAll(
    "a, button, .svc-tile, .vitem, .review-card, .faq__trigger, .platform-pill, .contact-item",
  );

  interactives.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      gsap.to(cr, {
        scale: 1.4,
        opacity: 0.8,
        borderColor: "#b8904a",
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(cd, {
        scale: 0,
        duration: 0.2,
        ease: "power2.out",
      });
    });

    el.addEventListener("mouseleave", () => {
      gsap.to(cr, {
        scale: 1,
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(cd, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    });
  });

  // ── Shrink on click ──
  window.addEventListener("mousedown", () => {
    gsap.to(cd, { scale: 0.6, duration: 0.1 });
    gsap.to(cr, { scale: 0.85, duration: 0.1 });
  });

  window.addEventListener("mouseup", () => {
    gsap.to(cd, { scale: 1, duration: 0.2, ease: "back.out(2)" });
    gsap.to(cr, { scale: 1, duration: 0.2, ease: "back.out(2)" });
  });
}
