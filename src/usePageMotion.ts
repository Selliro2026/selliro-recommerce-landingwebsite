import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/** Media-scoped animation is reverted on preference changes and React unmount. */
export function usePageMotion() {
  const pageRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const media = gsap.matchMedia();
    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(
            ".hero-line > span",
            { yPercent: 110, duration: 1, stagger: 0.12 },
            0.05,
          )
          .from(
            ".hero-copy > p, .hero-copy .store-buttons, .hero-explore",
            { y: 16, opacity: 0, duration: 0.7, stagger: 0.08 },
            0.35,
          )
          .from(
            ".hero-image-wrap",
            { clipPath: "inset(0% 0% 100% 0%)", duration: 1.25 },
            0.08,
          )
          .from(
            ".image-note, .image-index",
            { opacity: 0, y: 12, duration: 0.7, stagger: 0.1 },
            0.75,
          );
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
          gsap.from(element, {
            y: 28,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 94%", once: true },
          });
        });
        gsap.to(".reading-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: page,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.2,
          },
        });
      },
      page,
    );
    media.add(
      "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.fromTo(
          ".hero-image",
          { yPercent: -4, scale: 1.09 },
          {
            yPercent: 4,
            scale: 1.09,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero-art",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
        gsap.fromTo(
          ".download-phone",
          { y: 55, rotate: 12 },
          {
            y: 0,
            rotate: 5,
            ease: "none",
            scrollTrigger: {
              trigger: ".download-section",
              start: "top bottom",
              end: "center center",
              scrub: 1,
            },
          },
        );
      },
      page,
    );
    let disposed = false;
    void document.fonts.ready.then(() => {
      if (!disposed) ScrollTrigger.refresh();
    });
    return () => {
      disposed = true;
      media.revert();
    };
  }, []);
  return pageRef;
}
