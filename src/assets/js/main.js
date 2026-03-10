// Hide page immediately — before any paint
document.getElementById("page").style.opacity = "0";
import { gsap } from "./base.js";
import { initMenu } from "./animations/menu.js";
import { initHero } from "./animations/hero.js";
// import { setHeaderHeight } from "./utils/config.js";
import { initFaq, initFaqReveal } from "./animations/faq.js";

import { initContact } from "./animations/contact.js";
import {
  initHeader,
  initOptLang,
  initSmoothScroll,
} from "./animations/header.js";
import { initBackToTop } from "./animations/to-top-button.js";
import { initMouse } from "./animations/mouse.js";
import { initSectionHeadings } from "./animations/headings.js";
import { initServices } from "./animations/services.js";
import { initTestimonials } from "./animations/testimonials.js";
import { initCompany } from "./animations/company.js";

document.addEventListener("DOMContentLoaded", () => {
  // Remove the class BEFORE fonts/images load
  document.documentElement.classList.remove("js-loading");

  gsap.to("#page", {
    opacity: 1,
    duration: 0.5,
    ease: "power2.out",
  });

  initHeader();
  initHero();

  // 3. Cursor hover states — touches every interaction site-wide
  initMouse();

  // 4. Section h2 + eyebrow reveals — unifies feel across all sections
  initSectionHeadings();

  // 5. Services bento tile entrance
  initServices();

  // 6. Testimonials — masonry card stagger
  initTestimonials();

  // 7. Company — image, stats count-up, values grid
  initCompany();

  // 8. FAQ — SplitText questions + parallax index numbers
  initFaq();
  initFaqReveal();

  // 9. Contact — clip-path form reveal + left-column entrance
  initContact();

  // ── Utilities ──
  initMenu();
  initOptLang();
  initSmoothScroll();
  initMouse();
  initBackToTop();
});
