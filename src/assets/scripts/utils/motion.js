export const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

export function guardMotion(fn) {
  if (!prefersReducedMotion) fn();
}
