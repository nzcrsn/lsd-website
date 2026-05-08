import ScrollTrigger from "gsap/ScrollTrigger";
import { initMenu } from "./animations/menu.js";
import { gsap } from "./core/gsap.js";
import { connectLenisToScrollTrigger } from "./core/lenis.js";
import { initSectionHeadings } from "./animations/headings.js";
import { initServices } from "./animations/services.js";
import { initTestimonials } from "./animations/testimonials.js";
import { initCompany } from "./animations/company.js";
import { initFaq } from "./animations/faq.js";
import { initContact } from "./animations/contact.js";

gsap.registerPlugin(ScrollTrigger);

connectLenisToScrollTrigger(ScrollTrigger);

initMenu();
initSectionHeadings(ScrollTrigger);
initServices(ScrollTrigger);
initTestimonials(ScrollTrigger);

initCompany(ScrollTrigger);
initFaq(ScrollTrigger);
initContact(ScrollTrigger);

ScrollTrigger.refresh();
