import { useEffect, useRef, useState } from "react";

const STAR_LAYERS = [
  {
    count: 44,
    depth: "far",
    opacity: [0.28, 0.5],
    size: [0.7, 1.35],
    speed: [0.012, 0.02],
  },
  {
    count: 30,
    depth: "middle",
    opacity: [0.42, 0.72],
    size: [1, 1.9],
    speed: [0.024, 0.038],
  },
  {
    count: 16,
    depth: "near",
    opacity: [0.55, 0.9],
    size: [1.4, 2.8],
    speed: [0.044, 0.062],
  },
];

const randomBetween = ([min, max]) => min + Math.random() * (max - min);

function createStars() {
  let id = 0;

  return STAR_LAYERS.flatMap((layer) =>
    Array.from({ length: layer.count }, () => ({
      id: id++,
      depth: layer.depth,
      initialY: Math.random() * 100,
      left: Math.random() * 100,
      opacity: randomBetween(layer.opacity),
      size: randomBetween(layer.size),
      speed: randomBetween(layer.speed),
      duration: 2.8 + Math.random() * 5.2,
      delay: Math.random() * 7,
    }))
  );
}

export default function StarsBackground() {
  const starElements = useRef([]);
  const [stars] = useState(createStars);

  useEffect(() => {
    let frameId;
    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;

    const updateStars = () => {
      currentScroll += (targetScroll - currentScroll) * 0.06;

      stars.forEach((star, index) => {
        const element = starElements.current[index];
        if (!element) return;

        const offset = currentScroll * star.speed;
        element.style.transform = `translate3d(0, ${offset}px, 0)`;
      });

      const isSettled = Math.abs(targetScroll - currentScroll) < 0.08;

      if (isSettled) {
        frameId = undefined;
        return;
      }

      frameId = requestAnimationFrame(updateStars);
    };

    const handleScroll = () => {
      targetScroll = window.scrollY;

      if (!frameId) {
        frameId = requestAnimationFrame(updateStars);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [stars]);

  return (
    <div className="star-container" aria-hidden="true">
      {stars.map((star, index) => (
        <span
          key={star.id}
          ref={(element) => {
            starElements.current[index] = element;
          }}
          className={`star-position star-position-${star.depth}`}
          style={{
            left: `${star.left}%`,
            top: `${star.initialY}%`,
          }}
        >
          <span
            className="star"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        </span>
      ))}
    </div>
  );
}
