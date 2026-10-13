import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/** One coordinated motion system, restored completely when preferences change. */
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
            { yPercent: 110, duration: 1.1, stagger: 0.13 },
            0.06,
          )
          .from(
            ".hero-copy > p, .hero-copy .store-buttons, .hero-explore",
            { y: 22, opacity: 0, duration: 0.85, stagger: 0.12 },
            0.4,
          )
          .from(".hero-stage", { opacity: 0, duration: 1.4 }, 0.3);
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
          gsap.from(element, {
            y: 35,
            opacity: 0,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 94%", once: true },
          });
        });
        gsap.from(".life-photo", {
          clipPath: "inset(12% 0% 12% 0% round 4px 72px 4px 4px)",
          duration: 1.3,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".life-photo",
            start: "top 90%",
            once: true,
          },
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
        gsap.to(".hero-stage", {
          y: 65,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.fromTo(
          ".life-photo img",
          { scale: 1.13, yPercent: -3 },
          {
            scale: 1.03,
            yPercent: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".life-photo",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
        gsap.fromTo(
          ".download-phone",
          { y: 55 },
          {
            y: 0,
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
