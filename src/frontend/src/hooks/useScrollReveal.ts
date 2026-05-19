import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to a container element.
 * Adds the 'revealed' CSS class when the element enters the viewport,
 * removes it when it leaves (so re-entry replays the animation).
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = "0px 0px -60px 0px",
  once = true,
}: {
  threshold?: number;
  rootMargin?: string;
  /** If true (default), the animation only fires once. */
  once?: boolean;
} = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Add the base class so the element starts hidden
    el.classList.add("reveal-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("revealed");
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}
