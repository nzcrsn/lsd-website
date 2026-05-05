export function deferUntilScrollOrIdle(callback) {
  let called = false;

  function run() {
    if (called) return;
    called = true;
    cleanup();
    callback();
  }

  function cleanup() {
    window.removeEventListener("scroll", onScroll, { passive: true });
  }

  function onScroll() {
    run();
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  if ("requestIdleCallback" in window) {
    requestIdleCallback(run, { timeout: 2000 });
  } else {
    setTimeout(run, 2000);
  }
}
