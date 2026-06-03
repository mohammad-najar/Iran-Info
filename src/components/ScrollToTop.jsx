import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frameId;

    const updateVisibility = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const scrollableHeight =
          document.documentElement.scrollHeight - window.innerHeight;

        setIsVisible(scrollableHeight > 0 && window.scrollY >= scrollableHeight / 2);
      });
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      title="Back to top"
      className={`fixed bottom-28 right-5 z-40 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-gray-950/70 text-white/80 shadow-[0_0_18px_rgba(255,255,255,0.08)] backdrop-blur-xl transition duration-300 hover:border-white/30 hover:text-white md:bottom-6 md:right-6 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
      onClick={() => window.dispatchEvent(new Event("app:scroll-to-top"))}
    >
      <ArrowUp size={18} strokeWidth={2} />
    </button>
  );
}
