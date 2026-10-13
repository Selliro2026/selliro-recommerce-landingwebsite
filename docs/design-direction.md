# Selliro product-led redesign

This revision responds to the request for larger readable type, a cleaner hero, richer motion, and real 3D. The opening gives the message, store actions, and interactive products space; each following section uses its own composition within the original brand palette.

## Reference research

Reviewed on 13 October 2026:

- [Awwwards ecommerce collection](https://www.awwwards.com/websites/e-commerce/): retail presentation, product discovery, and customer journeys. Used as a direction reference, not a template or an assertion that Selliro has received an award.
- [Nothing](https://nothing.tech/): a consumer-product-first content structure, direct product/category labels, and clear purchase actions. Selliro retains its own palette and identity.
- [GSAP responsive animation guidance](<https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/>) and [official GSAP package documentation](https://github.com/greensock/GSAP): media-query scoping, automatic animation cleanup, ScrollTrigger, and reduced-motion conditions. The installed version is 3.15.0.
- [Codrops on-scroll typography reference](https://github.com/codrops/OnScrollTypographyAnimations): text choreography as an accent. The implementation uses short line entrances and preserves native scrolling.

## Implementation decisions

- Preserve purple `#6045F4`, navy `#29235F`, and mint `#53E6D4`. Warm white and pale tints support those brand colors.
- Remove decorative feature icons, numbered labels, and redundant microcopy. Use product imagery, editorial rows, and simple functional arrows. Marketing text has a 16px minimum; core body copy is generally 18–26px.
- Set a direct headline: “Great things. Better prices.” Explain buying and selling in the opening paragraph, with both store actions immediately underneath.
- Build a pale-lavender 3D hero, a large photographic benefits section, a navy collection chapter, an interactive buying/selling story, and a mint trust chapter. The 3D phone and headphones use local geometry, bevels, studio reflections, a canvas screen texture, and soft grounding shadows.
- Recompose the mobile page: left-aligned headline, readable copy, large store buttons, a dedicated portrait product stage, native category swipe, instructions before the product demonstration, and a download action that clears when the final download section is visible.
- Use GSAP for staged headline entrances, section reveals, a photograph mask transition, reading progress, and desktop scroll movement. Keep native scrolling. Changing reduced-motion preferences restores a static page immediately.
- Let visitors drag the 3D products or use keyboard-accessible rotation and reset buttons. Preserve vertical touch scrolling. The scene renders on demand after a finite entrance, caps pixel density, pauses off-screen, and provides a static-art fallback without WebGL2. Three.js is loaded dynamically.
- Encode local imagery as WebP without altering its composition. The campaign photograph and product sprite together are approximately 242 KB. No third-party image, font, or animation CDN is required at runtime.

The generated photography, app concept, and demonstration panels are illustrative. Store links, official app screenshots, contact details, and approved policies remain pending as requested; the site does not invent stock, prices, guarantees, customer quotes, or awards.

Validation covers five layout widths (320–1440px), meaningful browser interactions, keyboard focus, axe accessibility, readable marketing copy, motion preferences, actual WebGL image changes during rotation, and the artwork fallback. The app concepts and 3D display do not represent approved Flutter assets.
