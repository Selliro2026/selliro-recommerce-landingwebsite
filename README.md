# Selliro

A responsive consumer marketing website for the Selliro recommerce app. Built with React, TypeScript, Vite, GSAP 3.15, and Three.js. The opening pairs large typography with an interactive 3D phone and headphones, followed by campaign photography and dedicated mobile layouts. Fonts, textures, and product imagery are served locally. See [design direction and references](docs/design-direction.md).

## Development

Use Node.js 22.12+ (validated with Node 24.19.0 and npm 11.9.0).

```sh
npm ci
npm run dev
```

The development server listens on port 5173. Use the existing checkout; cloud tasks are already isolated and do not need a separate Git worktree.

## Production and validation

```sh
npm run build
npm run preview -- --port 4173 --strictPort
```

Deploy the generated `dist/` directory to any static hosting service. The website currently assumes deployment at the domain root of `selliro.in`. No backend, credentials, or external runtime services are needed.

```sh
npm run build
npm test
```

Playwright validates the production build: navigation, buying/selling modes and individual steps, category rail controls, FAQ state, download and policy dialogs, keyboard focus, mobile menu resizing, the mobile download control, responsive overflow at 320/390/768/1024/1440px, axe WCAG A/AA checks, readable copy at phone and desktop widths, live motion-preference changes, actual WebGL rendering/rotation/reset, and the no-WebGL artwork fallback (21 checks total). The cloud machine has Chromium at `/usr/bin/chromium`; on another machine set `CHROMIUM_PATH` to your installed Chromium executable. Tests use one browser worker to avoid contention in the cloud machine's software graphics renderer. They start and stop a production preview server automatically, or reuse a running preview when not in CI.

## Add the official app details

Edit `src/config.ts` when approved destinations are available:

- `appStoreUrl` and `googlePlayUrl`: official HTTPS store listing URLs. Populating these automatically turns the download buttons into real store links.
- `contactEmail`: public support email.
- `privacyUrl`, `termsUrl`, and `returnsUrl`: published, approved policy URLs.

Until supplied, these actions open accessible availability dialogs. No invented support address, legal policy, or store listing is used. After setting real store/policy links, update the availability-dialog tests to validate the new destinations.

## Visual assets and product claims

- The visual direction follows the supplied purple `#6045F4`, navy `#29235F`, and mint `#53E6D4` palette.
- `AppPreview` in `src/App.tsx` and the 3D phone screen are **illustrative app concepts**, not screenshots of the Flutter app. Replace it with approved app screenshots before public launch. The buying/selling demonstrations are also illustrative.
- `public/images/selliro-editorial.webp` is original AI-generated campaign photography. `product-editorial.webp` is the optimized six-panel product sprite. These are illustrative, not actual listings or promises of stock. Both displayed images total approximately 242 KB. The original PNG remains for social metadata.
- The typographic logo is an initial identity treatment, pending the official logo.
- Locally served Manrope and DM Sans fonts come from Fontsource under their included font licenses. Functional arrows are simple custom SVGs; marketing sections do not use an icon pack. GSAP is used under its included standard license; Three.js uses the MIT license.
- Features reflect the supplied product brief. Protection, verification, pickup, and rewards copy is qualified; no warranties, statistics, customer testimonials, prices, or return periods are fabricated. Verify feature availability against final policies before launch.
- `public/social-card.svg` is an editable brand card; the social metadata uses the PNG product image for crawler compatibility.

## Structure

- `src/App.tsx`: landing sections, reusable brand/store/phone components, and accessible interactions.
- `src/styles.css`: base layout, responsive breakpoints, and interaction states.
- `src/premium.css`: campaign composition, large typography, section layouts, and mobile refinements.
- `src/components/ProductScene.tsx` and `product-scene.css`: local 3D geometry, materials, pointer/keyboard rotation controls, and the static product-art fallback.
- `src/phone.css`: the decorative app mockup, scaled independently from marketing copy.
- `src/usePageMotion.ts`: GSAP hero sequencing, one-shot section reveals, photo mask transitions, desktop-only product/photo movement, and reading progress. `gsap.matchMedia()` reverts animations on breakpoint changes, motion-preference changes, and unmount.
- `src/config.ts`: official destinations.
- `tests/website.spec.ts`: browser regression and accessibility checks.

Three.js loads dynamically after a WebGL2 capability check. Rendering stops after the entrance and interaction settle, pauses off-screen or when the tab is hidden, and caps pixel density at 1.5. The scene supports drag, keyboard-operable rotation/reset buttons, live reduced-motion preferences, and static artwork when WebGL is unavailable or its context is lost. Its deferred engine chunk is approximately 192 KB gzipped; Vite reports a non-blocking chunk-size advisory.

Native dialogs provide modal semantics and Escape dismissal, with explicit Tab wrapping. The mobile menu also closes on navigation and desktop resizing. Reduced-motion users receive the complete static composition. The category rail uses native scrolling and scroll snap, with previous/next controls and keyboard access. All category calls to action lead to app download, keeping this a marketing site.

## Deploy from GitHub to Vercel

Import `Selliro2026/selliro-recommerce-landingwebsite` into Vercel and deploy the `main` branch.

- Framework preset: **Vite**
- Root directory: repository root (`.`)
- Build command: `npm run build`
- Output directory: `dist`
- Node.js: **24.x** recommended (the validated cloud version)
- Runtime environment variables: none required

`vercel.json` already configures the framework, build command, output directory, and static asset headers. Once connected, future pushes to `main` can deploy automatically. Official store links and approved policies remain configurable in `src/config.ts`.

## Vercel preview

`vercel.json` configures the Vite build and static output. A temporary Vercel preview can be updated with `vercel deploy --temporary --yes --non-interactive` while its deployment is unclaimed and unexpired. Keep the CLI's ignored `.vercel/` metadata private: it contains deployment credentials. Temporary deployments expire; use the claim link provided by Vercel to retain the site in your account. After claiming, authenticate to that account for subsequent deployments.
