export function setHeaderHeight() {
  const header = document.querySelector("header");
  if (!header) return;

  const update = () => {
    document.documentElement.style.setProperty(
      "--header-height",
      `${header.offsetHeight}px`,
    );
  };

  update(); // run once on call

  // re-run if window resizes (e.g. padding changes at breakpoints)
  window.addEventListener("resize", update);
}
