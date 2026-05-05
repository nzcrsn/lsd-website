import { guardMotion } from "../utils/motion.js";

let scrollY = 0;
const menuBtn = document.querySelector(".menu-btn");
const menuSection = document.querySelector(".menu-section");
const links = document.querySelectorAll(".menu-link");

/*
====================================================== 
Open/Close Menu Functions
====================================================== 
*/
function openMenu() {
  scrollY = window.scrollY;
  menuSection.classList.remove("hidden");
  document.body.style.top = `-${scrollY}px`;
  document.body.classList.add("scroll-locked");
}

function closeMenu(onDone) {
  menuSection.classList.add("hidden");

  const handler = (e) => {
    if (e.propertyName !== "opacity") return;

    const storedScrollY = scrollY;
    document.body.classList.remove("scroll-locked");
    document.body.style.top = "";
    window.scrollTo(0, storedScrollY);

    if (onDone) onDone();
  };

  menuSection.addEventListener("transitionend", handler, { once: true });
}

let isOpen = false;

/*
====================================================== 
Button Class
====================================================== 
*/
export function initMenu() {
  guardMotion(() => {
    if (!menuBtn) return;

    menuBtn.addEventListener("click", () => {
      isOpen = !isOpen;

      if (isOpen) {
        openMenu();
      } else {
        closeMenu();
      }
      menuBtn.classList.toggle("expanded", isOpen);
      menuBtn.setAttribute("aria-expanded", String(isOpen));
      menuBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });
  });
}

/*
====================================================== 
Links Class
====================================================== 
*/
links.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");

    // solo para anchors internos (#services)
    if (!href.startsWith("#")) return;

    e.preventDefault();

    isOpen = false;
    menuBtn.classList.remove("expanded");
    menuBtn.setAttribute("aria-expanded", "false");

    closeMenu(() => {
      const target = document.querySelector(href);

      if (target) {
        smoothScrollTo(target);
      }
    });
  });
});

/*
====================================================== 
NavLinks Class
====================================================== 
*/
const navLinks = document.querySelectorAll(
  ".nav-bar a[href^='#'], .hero-section a[href^='#'], .services-section a[href^='#']",
);

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    smoothScrollTo(target);
  });
});

function smoothScrollTo(target) {
  const headerOffset = 80;
  const elementPosition = target.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}
