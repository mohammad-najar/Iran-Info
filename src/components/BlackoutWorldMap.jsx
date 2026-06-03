import { useMemo, useState } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";
import world from "world-atlas/countries-110m.json";

const IRAN_ID = "364";
const impactMessages = [
  "A student cannot access class.",
  "A family cannot reach a loved one.",
  "A small business loses its customers.",
  "A witness cannot share what happened.",
  "A patient cannot reach support.",
  "A worker cannot reach their tools.",
  "A voice cannot reach the outside world.",
  "A family waits without news.",
];

const impactPoints = [
  [48.1, 37.3],
  [53.2, 36.5],
  [46.7, 33.9],
  [55.3, 33.5],
  [50.4, 31.6],
  [58.2, 30.6],
  [52.7, 28.6],
  [59.1, 27.8],
  [57, 35.8],
  [49.7, 30.5],
  [51.5, 34.5],
  [55.7, 29.3],
  [46.1, 37.8],
];

export default function BlackoutWorldMap() {
  const [isIranFocused, setIsIranFocused] = useState(false);
  const map = useMemo(() => {
    const countries = feature(world, world.objects.countries).features;
    const iran = countries.find((country) => String(country.id) === IRAN_ID);
    const overviewProjection = d3.geoNaturalEarth1().fitExtent(
      [
        [34, 30],
        [926, 430],
      ],
      { type: "Sphere" }
    );
    const focusProjection = d3.geoMercator().fitExtent(
      [
        [190, 38],
        [770, 422],
      ],
      iran
    );
    const overviewPath = d3.geoPath(overviewProjection);
    const focusPath = d3.geoPath(focusProjection);

    return {
      countries: countries.map((country) => ({
        id: String(country.id),
        path: overviewPath(country),
      })),
      iranOverviewPath: overviewPath(iran),
      iranFocusPath: focusPath(iran),
      popupPoints: impactPoints.map((coordinates) => focusProjection(coordinates)),
    };
  }, []);

  return (
    <div className="my-10 border-y border-white/10 bg-gray-950 py-5 sm:my-12 sm:py-7">
      <div className="relative overflow-hidden rounded-md border border-white/10 bg-gray-950">
        <svg
          viewBox="0 0 960 460"
          className="block h-auto w-full"
          role="img"
          aria-label={
            isIranFocused
              ? "Enlarged map of Iran with looping messages about the human effects of an internet blackout."
              : "World map showing Iran disconnected from the online world."
          }
          onClick={() => isIranFocused && setIsIranFocused(false)}
        >
          <defs>
            <radialGradient id="iran-blackout-glow">
              <stop offset="0%" stopColor="#7f1d1d" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#030712" stopOpacity="0" />
            </radialGradient>
            <filter id="iran-shadow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="13" />
            </filter>
          </defs>

          <rect width="960" height="460" fill="#030712" />

          <g className={`map-world-layer ${isIranFocused ? "map-world-layer-hidden" : ""}`}>
            {map.countries.map((country) => {
              const isIran = country.id === IRAN_ID;

              return (
                <path
                  key={country.id}
                  d={country.path}
                  className={isIran ? "map-country map-country-iran" : "map-country"}
                  onClick={
                    isIran
                      ? (event) => {
                          event.stopPropagation();
                          setIsIranFocused(true);
                        }
                      : undefined
                  }
                />
              );
            })}
            <path
              d={map.iranOverviewPath}
              className="map-iran-overview-glow"
              pointerEvents="none"
            />
          </g>

          <g className={`map-iran-focus-layer ${isIranFocused ? "map-iran-focus-layer-visible" : ""}`}>
            <ellipse cx="480" cy="236" rx="350" ry="214" fill="url(#iran-blackout-glow)" />
            <path
              d={map.iranFocusPath}
              fill="#5b111a"
              opacity="0.7"
              filter="url(#iran-shadow)"
            />
            <path d={map.iranFocusPath} className="map-iran-focus-country" />

            <g pointerEvents="none">
              {map.popupPoints.map(([x, y], index) => {
                const message = impactMessages[index % impactMessages.length];

                return (
                  <g
                    key={`${message}-${x}-${y}`}
                    className="map-impact-message"
                    style={{ animationDelay: `${index * 0.7}s` }}
                  >
                    <circle cx={x} cy={y} r="3" fill="#ef4444" />
                    <circle cx={x} cy={y} r="7" className="map-impact-dot-pulse" />
                    <text
                      x={x + 10}
                      y={y + 4}
                      fill="#fecaca"
                      fontSize="11"
                      fontWeight="700"
                      textAnchor="start"
                    >
                      {message}
                    </text>
                  </g>
                );
              })}
            </g>
          </g>
        </svg>
      </div>
      <p className="mt-4 text-center text-sm leading-6 text-white/55 sm:text-base">
        Click Iran to see what happens there during an internet blackout.
      </p>
    </div>
  );
}
