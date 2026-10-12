# Selliro

A responsive consumer marketing website for the Selliro recommerce app. Built with React, TypeScript, and Vite; all fonts and product imagery are served locally.

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

Playwright validates the production build: navigation, buying/selling steps, FAQ state, download and policy dialogs, keyboard focus, responsive overflow at 320/390/768/1024/1440px, axe WCAG A/AA checks, minimum mobile copy size, and motion preferences (13 checks total). The cloud machine has Chromium at `/usr/bin/chromium`; on another machine set `CHROMIUM_PATH` to your installed Chromium executable. Tests start and stop a production preview server automatically.

## Add the official app details

Edit `src/config.ts` when approved destinations are available:

- `appStoreUrl` and `googlePlayUrl`: official HTTPS store listing URLs. Populating these automatically turns the download buttons into real store links.
- `contactEmail`: public support email.
- `privacyUrl`, `termsUrl`, and `returnsUrl`: published, approved policy URLs.

Until supplied, these actions open accessible availability dialogs. No invented support address, legal policy, or store listing is used. After setting real store/policy links, update the availability-dialog tests to validate the new destinations.

## Visual assets and product claims

- The visual direction follows the supplied purple `#6045F4`, navy `#29235F`, and mint `#53E6D4` palette.
- `PhonePreview` in `src/App.tsx` is an **illustrative app concept**, not a screenshot of the Flutter app. Replace it with approved app screenshots before public launch.
- `public/images/product-editorial.png` is original AI-generated product imagery, arranged as a six-panel sprite with CSS positioning. It is illustrative, not an actual product listing or promise of stock. Replace or retain it after brand review.
- The typographic logo is an initial identity treatment, pending the official logo.
- Locally served Manrope and DM Sans fonts come from Fontsource under their included font licenses. Lucide icons use the ISC license.
- Features reflect the supplied product brief. Protection, verification, pickup, and rewards copy is qualified; no warranties, statistics, customer testimonials, prices, or return periods are fabricated. Verify feature availability against final policies before launch.
- `public/social-card.svg` is an editable brand card; the social metadata uses the PNG product image for crawler compatibility.

## Structure

- `src/App.tsx`: landing sections, reusable brand/store/phone components, and accessible interactions.
- `src/styles.css`: layout, readable type sizes, responsive breakpoints, entrance sequences, and reduced-motion support.
- `src/phone.css`: the decorative app mockup, scaled independently from marketing copy.
- `src/usePageMotion.ts`: one-shot section reveals and restrained pointer depth with animation-frame scheduling and listener cleanup.
- `src/config.ts`: official destinations.
- `tests/website.spec.ts`: browser regression and accessibility checks.

The native dialog provides focus containment and Escape dismissal. Reveals respect reduced-motion preferences. The mobile navigation has explicit expanded state and dismisses after selection. All category calls to action lead to app download, keeping this a marketing site.

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
