import { useEffect, useRef, useState } from "react";

/* Starts visible right away when the visitor prefers reduced motion
   (or the browser has no IntersectionObserver), so nothing stays hidden. */
const shouldSkipAnimation = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window);

/* Returns [ref, visible]. `visible` turns true once the element scrolls into view. */
export const useReveal = (threshold = 0.25) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(shouldSkipAnimation);

  useEffect(() => {
    const el = ref.current;
    if (visible || !el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, visible]);

  return [ref, visible];
};
