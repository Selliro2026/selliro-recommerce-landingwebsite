import { useEffect, useRef } from "react";

/** One-shot reveals and restrained pointer depth, with no React updates per frame. */
export function usePageMotion() {
  const artRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }),
      { threshold: 0.12 },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));

    const art = artRef.current;
    const motion = window.matchMedia(
      "(prefers-reduced-motion: no-preference) and (pointer: fine)",
    );
    let frame = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      art?.style.setProperty("--pointer-x", "0px");
      art?.style.setProperty("--pointer-y", "0px");
    };
    const move = (event: PointerEvent) => {
      if (!motion.matches || !art) return;
      const bounds = art.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 18;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 14;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        art.style.setProperty("--pointer-x", `${x}px`);
        art.style.setProperty("--pointer-y", `${y}px`);
      });
    };
    art?.addEventListener("pointermove", move);
    art?.addEventListener("pointerleave", reset);
    motion.addEventListener("change", reset);
    return () => {
      observer.disconnect();
      art?.removeEventListener("pointermove", move);
      art?.removeEventListener("pointerleave", reset);
      motion.removeEventListener("change", reset);
      cancelAnimationFrame(frame);
    };
  }, []);

  return artRef;
}
