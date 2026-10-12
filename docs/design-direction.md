# Selliro editorial redesign

The prior version relied on a small simulated phone screen, decorative feature icons, and repeated rounded cards. On a phone, that composition pushed readable product information too far down the page. This revision gives the campaign photography, message, and download actions priority.

## Reference research

Reviewed on 13 October 2026:

- [Awwwards ecommerce collection](https://www.awwwards.com/websites/e-commerce/): retail presentation, product discovery, and customer journeys. Used as a direction reference, not a template or an assertion that Selliro has received an award.
- [Nothing](https://nothing.tech/): a consumer-product-first content structure, direct product/category labels, and clear purchase actions. Selliro retains its own palette and identity.
- [GSAP responsive animation guidance](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/) and [official GSAP package documentation](https://github.com/greensock/GSAP): media-query scoping, automatic animation cleanup, ScrollTrigger, and reduced-motion conditions. The installed version is 3.15.0.
- [Codrops on-scroll typography reference](https://github.com/codrops/OnScrollTypographyAnimations): text choreography as an accent. The implementation uses short line entrances and preserves native scrolling.

## Implementation decisions

- Preserve purple `#6045F4`, navy `#29235F`, and mint `#53E6D4`. Warm white and pale tints support those brand colors.
- Replace decorative feature icons with numbered editorial rows and product imagery. Use the same simple arrow geometry for functional controls throughout.
- Set a direct headline: “Great things. Better prices.” Explain buying and selling in the opening paragraph, with both store actions immediately underneath.
- Build a photographic hero, a navy collection chapter, an interactive buying/selling story, and a mint trust chapter. Change the composition across sections without adding unrelated decoration.
- Recompose the mobile page: left-aligned headline, readable copy, large store buttons, compact campaign photo, native category swipe, instructions before the product demonstration, and a download action that clears when the final download section is visible.
- Use GSAP for a short staged entrance, section reveals, reading progress, and restrained desktop scroll movement. No scroll hijacking, pinned mobile sequences, or continuous background animations. Changing reduced-motion preferences restores a static page immediately.
- Encode local imagery as WebP without altering its composition. The hero and product sprite together are approximately 242 KB. No third-party image, font, or animation CDN is required at runtime.

The generated photography, app concept, and demonstration panels are illustrative. Store links, official app screenshots, contact details, and approved policies remain pending as requested; the site does not invent stock, prices, guarantees, customer quotes, or awards.
