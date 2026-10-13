# Selliro

A responsive mobile app marketing website for Selliro, the recommerce app for buying and selling pre-owned products. Built with React, TypeScript, Vite, and GSAP 3.15. The opening pairs large typography and download actions with the supplied Selliro home screen in a front-facing phone frame. Editorial photography introduces selling, secure delivery, and checking a purchase during the 3-day return window. Fonts and images are served locally. See [design direction and references](docs/design-direction.md).

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

The 21-check Playwright suite covers the production build: navigation, buying/selling modes and individual steps, FAQs and policy dialogs, download dialogs, keyboard focus, mobile menu resizing, the mobile download control, responsive overflow at 320/390/768/1024/1440px, axe WCAG A/AA checks, readable copy at phone and desktop widths, live motion-preference changes, app screenshot proportions and phone layouts, and delivery/return explanations. The cloud machine has Chromium at `/usr/bin/chromium`; on another machine set `CHROMIUM_PATH` to your installed Chromium executable. Tests use one browser worker and start and stop a production preview server automatically, or reuse a running preview when not in CI.

## Add the official app details

Edit `src/config.ts` when approved destinations are available:

- `appStoreUrl` and `googlePlayUrl`: official HTTPS store listing URLs. Populating these automatically turns the download buttons into real store links.
- `contactEmail`: public support email.
- `privacyUrl`, `termsUrl`, and `returnsUrl`: published, approved policy URLs.

Until supplied, these actions open accessible availability dialogs. No invented support address, legal policy, or store listing is used. After setting real store/policy links, update the availability-dialog tests to validate the new destinations.

## Visual assets and product claims

- The visual direction uses the supplied purple `#6045F4`, navy `#29235F`, and mint `#53E6D4` palette, with pale neutral backgrounds.
- `public/images/app-home.webp` is based on the user's supplied Selliro app home screenshot. Its banner was revised with image generation to a photographic “Buy. Sell. Repeat.” treatment. The phone component displays this image with its original proportions; the listings, prices, and controls shown within it are reference content from the supplied screen, not live inventory or interactive website features.
- `public/images/recommerce-stories.webp` is original AI-generated editorial photography showing a seller packing a pre-owned camera and a buyer receiving a parcel. `public/images/check-your-find.webp` shows a buyer inspecting her delivered camera. These are illustrative campaign scenes, not photographs of actual Selliro customers, listings, or delivery partners.
- The phone presentation is flat and front-facing. Photography, typography, and 2D transitions form the visual direction. There is no Three.js dependency, WebGL scene, or 3D product artwork on the page.
- The site introduces the app and guides visitors to download it. Product browsing and purchases take place in the app; there is no website catalog or checkout.
- Secure delivery and the 3-day return window reflect the user's requested product messaging. Copy qualifies delivery availability and return eligibility and directs users to the applicable in-app terms. No additional return conditions, guarantee, or refund timing has been invented; final approved policies remain pending.
- Buying/selling walkthroughs explain the app experience. Rewards copy directs visitors to the app for current availability and terms. No customer testimonials, business statistics, or awards are fabricated.
- The typographic website logo is an initial identity treatment, pending the official logo asset.
- Locally served Manrope and DM Sans fonts come from Fontsource under their included font licenses. Functional arrows are simple custom SVGs. GSAP is used under its included standard license.
- `public/social-card.svg` is an editable brand card. Social metadata uses the local recommerce photograph in JPEG format for crawler compatibility.

## Structure

- `src/App.tsx`: app marketing sections, supplied-screen phone component, brand/store components, and accessible interactions.
- `src/styles.css`: base layout, responsive breakpoints, and interaction states.
- `src/premium.css`: app-focused composition, large typography, photographic sections, and mobile refinements.
- `src/phone.css`: flat phone frame, screenshot sizing, and mobile phone presentation.
- `src/usePageMotion.ts`: GSAP headline sequencing, one-shot section reveals, photo mask transitions, desktop-only 2D movement, and reading progress. `gsap.matchMedia()` reverts animations on breakpoint changes, motion-preference changes, and unmount.
- `src/config.ts`: official destinations.
- `public/images/`: locally served app-screen and editorial images.
- `tests/website.spec.ts`: browser regression and accessibility checks.

Native dialogs provide modal semantics and Escape dismissal, with explicit Tab wrapping. The mobile menu closes on navigation and desktop resizing. Reduced-motion users receive the complete static composition. A mobile download action appears after the hero and clears as the final download section enters view. All primary calls to action lead to the app download flow.

## Deploy from GitHub to Vercel

Import `Selliro2026/selliro-recommerce-landingwebsite` into Vercel and deploy the `main` branch.

- Framework preset: **Vite**
- Root directory: repository root (`.`)
- Build command: `npm run build`
- Output directory: `dist`
- Node.js: **24.x** recommended (the validated cloud version)
- Runtime environment variables: none required

`vercel.json` already configures the framework, build command, output directory, and static asset headers. Once connected, future pushes to `main` can deploy automatically. Official store links and approved policies remain configurable in `src/config.ts`.
