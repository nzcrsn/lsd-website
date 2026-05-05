// This entire file is one dynamic import chunk.
// Vite will code-split it automatically.

import ScrollTrigger from "gsap/ScrollTrigger";
import { gsap } from "./core/gsap.js";
import { connectLenisToScrollTrigger } from "./core/lenis.js";
import { initSectionHeadings } from "./animations/headings.js";
import { initServices } from "./animations/services.js";
// import { initTestimonials } from "./animations/testimonials.js";
// import { initCompany } from "./animations/company.js";
// import { initFaq } from "./animations/faq.js";
// import { initContact } from "./animations/contact.js";

gsap.registerPlugin(ScrollTrigger);

// Now that ScrollTrigger exists, sync Lenis with it
connectLenisToScrollTrigger(ScrollTrigger);

// Initialize all scroll-triggered animations
initSectionHeadings(ScrollTrigger);
initServices(ScrollTrigger);
// initTestimonials(ScrollTrigger);
// initCompany(ScrollTrigger);
// initFaq(ScrollTrigger);
// initContact(ScrollTrigger);

// Recalculate ScrollTrigger positions after everything initialized
ScrollTrigger.refresh();
