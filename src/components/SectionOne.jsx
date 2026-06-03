import { useEffect, useRef } from "react";
import heroVideo from "../assets/animation.mp4";

export default function SectionOne() {
  const grainRef = useRef(null);

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animId;
    let isVisible = true;
    let lastDrawTime = 0;

    const resize = () => {
      canvas.width = Math.ceil(canvas.offsetWidth / 2);
      canvas.height = Math.ceil(canvas.offsetHeight / 2);
    };

    const drawGrain = (time = 0) => {
      if (!isVisible) {
        animId = undefined;
        return;
      }

      if (time - lastDrawTime < 80) {
        animId = requestAnimationFrame(drawGrain);
        return;
      }

      lastDrawTime = time;
      const { width, height } = canvas;
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const val = (Math.random() * 255) | 0;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = 24;
      }

      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(drawGrain);
    };

    resize();
    drawGrain();
    window.addEventListener("resize", resize);

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;

      if (isVisible && !animId) {
        animId = requestAnimationFrame(drawGrain);
      }
    });

    observer.observe(canvas);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-0 animate-fadeIn md:object-[center_36%]"
        autoPlay
        muted
        loop
        playsInline
        src={heroVideo}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/70 via-gray-950/35 to-gray-950/85" />

      <canvas
        ref={grainRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ mixBlendMode: "overlay" }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 38%, rgba(3,7,18,0.86) 100%)",
        }}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-36 transform-gpu bg-gradient-to-b from-transparent via-gray-950/75 to-gray-950 [backface-visibility:hidden]" />

      <div className="relative z-30 flex min-h-[100dvh] flex-col items-center justify-center px-5 pb-36 pt-28 text-center sm:px-6 md:pb-16 md:pt-36">
        <h1
          className="max-w-5xl text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
          style={{
            animation: "fadeUp 0.8s 0.15s ease both",
            fontFamily: "'Georgia', serif",
          }}
        >
          Remembering
          <br />
          <span
            className="italic font-light"
            style={{
              background: "linear-gradient(90deg, #22c55e, #ffffff, #ef4444)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <span className="whitespace-nowrap text-[0.72em] sm:text-[1em]">
              Iran's silenced voices.
            </span>
          </span>
        </h1>

        <p
          className="mt-6 max-w-2xl text-base font-light leading-relaxed text-white/70 sm:text-lg md:text-xl"
          style={{ animation: "fadeUp 0.8s 0.3s ease both" }}
        >
          Stories, records, and context for people outside Iran to understand
          what peaceful citizens have endured while asking for basic rights,
          dignity, and freedom.
        </p>

        <div
          className="absolute bottom-24 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-10"
          style={{ animation: "fadeUp 0.8s 0.7s ease both" }}
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
            Scroll
          </span>
          <div className="relative h-10 w-px overflow-hidden bg-gradient-to-b from-white/30 to-transparent">
            <div
              className="absolute top-0 h-1/2 w-full bg-white/60"
              style={{ animation: "scrollLine 1.6s ease-in-out infinite" }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scrollLine {
          0% { transform: translateY(-100%); opacity: 0; }
          40% { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
