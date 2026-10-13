# Selliro mobile app marketing direction

The website introduces the Selliro mobile app and encourages downloads. This revision centers the supplied app home screen, clearer buying and selling stories, secure delivery, and the requested 3-day return window. The visual direction combines a front-facing phone, large readable type, human editorial photography, and restrained 2D motion.

## Visual and technical references

- The user's supplied Selliro app home screenshot is the primary product reference. Its navigation, categories, and listings communicate the actual app interface; a revised photographic “Buy. Sell. Repeat.” banner replaces the earlier rendered illustration.
- [GSAP responsive animation guidance](<https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/>) and [official GSAP package documentation](https://github.com/greensock/GSAP) inform media-query scoping, animation cleanup, ScrollTrigger, and reduced-motion conditions. The installed version is 3.15.0.
- [Codrops on-scroll typography reference](https://github.com/codrops/OnScrollTypographyAnimations) informed the short headline entrances. The implementation preserves native scrolling.

Earlier research included Awwwards and consumer ecommerce sites. The current page structure follows the clarified mobile app marketing brief. Selliro does not claim an award or a third-party endorsement.

## Implementation decisions

- Preserve purple `#6045F4`, navy `#29235F`, and mint `#53E6D4`. Warm white and pale tints support the original brand colors.
- Lead with “Buy. Sell. Repeat.”, a direct explanation of the app, both store actions, and a large phone displaying the supplied screen. The phone is front-facing, with no perspective rotation or 3D rendering.
- Use `public/images/app-home.webp` for the phone in the hero and final download section. Image generation revised the banner to a photographic recommerce composition. Keep the screen's proportions intact and use deliberate framing on small displays.
- Replace the storefront-style category chapter with app benefits, an interactive buying/selling walkthrough, delivery and returns, rewards, FAQs, and download actions. Visitors discover the service on the website and complete transactions in the app.
- Show a seller packing a pre-owned camera and a buyer receiving a parcel with `public/images/recommerce-stories.webp`. Show a buyer checking her delivered camera with `public/images/check-your-find.webp`. Both are original generated editorial photographs with natural materials, human detail, and subtle navy/mint clothing.
- Make secure delivery and the 3-day return window easy to find in the opening benefits, a dedicated section, and explanatory FAQs. Qualify availability and eligibility without inventing policy conditions or refund promises. Approved policy destinations remain configurable.
- Maintain a 16px minimum for website marketing text, with larger core paragraphs, headings, and actions. Tiny interface text within the supplied screenshot belongs to the reference image and is not used for website instructions.
- Recompose mobile layouts around the headline, download actions, clearly framed app screen, full-width photographs, and readable buying/selling steps. The mobile download control appears after the hero and clears at the final download section.
- Use GSAP for staged headline entrances, section reveals, a photograph mask transition, reading progress, and limited desktop 2D movement. Native scrolling remains intact. Changing reduced-motion preferences restores a static page immediately.
- Serve optimized WebP images and fonts locally. Three.js and the previous WebGL product scene have been removed; there is no 3D artwork on the page.

## Asset provenance and content boundaries

The app screen is based on the user-supplied screenshot with an edited banner. Its visible products, prices, and controls are reference content, not live website inventory. The editorial photographs are generated campaign imagery, not evidence of actual customers or transactions. The walkthroughs explain the app experience rather than simulating a live order.

Store URLs, support details, and approved policies remain pending as requested. The website uses accessible availability dialogs until those destinations are supplied. The delivery and 3-day return messaging comes from the user's brief; final eligibility and transaction terms belong in the approved app policies. No testimonials, business statistics, awards, or additional guarantees have been invented.

## Validation scope

The 21-check browser suite covers five layout widths (320–1440px), navigation and buying/selling interactions, screenshot proportions and phone framing, delivery and return explanations, keyboard focus, mobile download behavior, axe accessibility, readable marketing copy, and live motion-preference changes. Production builds and current test results must be checked before publication; this document describes the suite rather than recording a run result.
