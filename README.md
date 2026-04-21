# lsd-website
Corporative website for Lift Service Demenagement

## Optimization Changes Applied

### Code optimizations
- Refactored `src/assets/js/main.js` startup flow to avoid duplicate `initMouse()` execution.
- Deferred non-critical animation initializers (`testimonials`, `company`, `faq`, `contact`) using `requestIdleCallback` fallback, improving first-load responsiveness.
- Kept critical interactions initialized on `DOMContentLoaded` (header, hero, services, nav utilities) to preserve UX while reducing main-thread pressure.

### Template/head optimizations
- Fixed the `viewport` meta syntax in `src/_includes/partials/head.njk` by adding the missing separator for standards-compliant rendering.
- Added DNS prefetch and preconnect hints for Google Tag Manager to reduce third-party connection setup time.

### Asset optimization
- Re-encoded `src/assets/images/img-8.webp` with lower WebP quality/effort tradeoff for smaller payload size.
- File size reduced from approximately `178 KB` to `147 KB` (~17% smaller).

## Notes
- Existing unrelated git changes in `src/notre-travail.njk` and `src/services.njk` were not modified.

## Standardization and Refactor Pass

### HTML standardization
- Improved header semantics in `src/_includes/partials/header.njk`:
  - Converted menu trigger wrapper from `div` to semantic `button`.
  - Added `type="button"` and ARIA attributes for language and menu controls.
- Optimized hero media markup in all locale pages:
  - `src/index.njk`
  - `src/en/index.njk`
  - `src/es/index.njk`
  - Added `decoding` / `loading` / `fetchpriority` on hero images.
  - Added `aria-hidden="true"` to decorative hero video.

### CSS standardization
- Fixed selector scoping bug in `src/assets/css/core/global.css`:
  - `html.js-loading #page, header` -> `html.js-loading #page, html.js-loading header`
- Replaced invalid/mismatched tokens with canonical variables:
  - `var(---color-primary)` -> `var(--color-primary)`
  - `var(--primary-color)` -> `var(--color-primary)`
  - `var(--muted)` -> `var(--color-muted)`
- Added button reset styles for `.menu-btn` in `src/assets/css/components/header.css`.

### JS standardization and accessibility
- Refactored `src/assets/js/animations/header.js`:
  - Language dropdown now keeps `aria-expanded` synchronized.
  - Reused cached DOM references for cleaner behavior.
- Refactored `src/assets/js/animations/menu.js`:
  - Added guard for missing menu button.
  - Synchronizes `aria-expanded` and accessible label text.
- Refactored `src/assets/js/animations/faq.js`:
  - Auto-generates consistent FAQ `id`, `aria-controls`, `aria-labelledby`, and `aria-expanded` attributes for all FAQ items.

### Font and icon optimization
- Switched all `@font-face` rules to `font-display: swap` in `src/assets/css/core/font-family.css`.
- Optimized all SVG icon files in `src/assets/images/icons` with SVGO multipass compression.

### Validation
- Build completed successfully after refactor with:
  - `npm run build`
