import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.82,
      touchMultiplier: 1,
    });

    let frameId;

    const raf = (time) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    const scrollToTop = () => {
      lenis.scrollTo(0, { duration: 1.25 });
    };

    frameId = requestAnimationFrame(raf);
    window.addEventListener("app:scroll-to-top", scrollToTop);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("app:scroll-to-top", scrollToTop);
      lenis.destroy();
    };
  }, []);

  return null;
}
