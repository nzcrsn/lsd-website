import { initMenu } from "./animations/menu.js";
import { initHero } from "./animations/hero.js";
// import { setHeaderHeight } from "./utils/config.js";
import { initFaq, initFaqReveal } from "./animations/faq.js";
import { initLoader, waitForLoader } from "./animations/loader.js";
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

// initLoader();

window.addEventListener("load", async () => {
  await document.fonts.ready;

  // await waitForLoader();
  // setHeaderHeight();

  // 1. Header — slides down first
  initHeader();

  // 2. Hero — first thing the user sees
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
