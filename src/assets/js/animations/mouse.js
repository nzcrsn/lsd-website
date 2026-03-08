import { gsap } from "../base.js";

const cd = document.getElementById("cd"),
  cr = document.getElementById("cr");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;

export function initMouse() {
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
}
