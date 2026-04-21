import { gsap } from "../base.js";

export function initMouse() {
  const mq = window.matchMedia("(min-width: 1201px)");

  let cleanup = null;

  function enable() {
    const cd = document.getElementById("cd");
    const cr = document.getElementById("cr");
    if (!cd || !cr) return;

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;

    const moveHandler = (e) => {
      mx = e.clientX;
      my = e.clientY;
      gsap.set(cd, { x: mx, y: my });
    };

    window.addEventListener("mousemove", moveHandler);

    const tickerFn = () => {
      rx += (mx - rx) * 0.09;
      ry += (my - ry) * 0.09;
      gsap.set(cr, { x: rx, y: ry });
    };

    gsap.ticker.add(tickerFn);

    cleanup = () => {
      window.removeEventListener("mousemove", moveHandler);
      gsap.ticker.remove(tickerFn);
    };
  }

  function disable() {
    if (cleanup) cleanup();
    cleanup = null;
  }

  function check(e) {
    if (e.matches) enable();
    else disable();
  }

  check(mq);
  mq.addEventListener("change", check);
}
