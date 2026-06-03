import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const chartStart = new Date("2026-01-01T00:00:00");
const chartEnd = new Date("2026-06-01T00:00:00");
const comparisonGap = 30;

const statuses = {
  free: {
    label: "Free International Internet",
    shortLabel: "Free International Internet",
    color: "#22c55e",
    height: 105,
    description:
      "A reference point for comparison: people can connect to the international internet freely, without state filtering, shutdowns, or censorship.",
  },
  restricted: {
    label: "Restricted Internet",
    shortLabel: "Restricted Internet",
    color: "#94a3b8",
    height: 70,
    description:
      "International internet access has been restricted and filtered in Iran for years, including before January.",
  },
  complete: {
    label: "Complete Blackout",
    shortLabel: "Complete Blackout",
    color: "#590f0f",
    height: 5,
    description:
      "Communication was cut to an extreme level. Many people could not reliably reach the outside world or connect with each other through ordinary services.",
  },
  partial: {
    label: "Partial Restoration",
    shortLabel: "Partial Restoration",
    color: "#f59e0b",
    height: 50,
    description:
      "Connections to the outside world became more available, but access remained filtered, censored, unstable, and often dependent on circumvention tools such as VPNs.",
  },
  nearTotal: {
    label: "Near-total Blackout",
    shortLabel: "Near-total Blackout",
    color: "#991b1b",
    height: 10,
    description:
      "Most people were isolated from the global internet. A closed domestic network and limited exceptions did not amount to normal internet access.",
  },
};

const statusWindows = [
  {
    start: "2026-01-01",
    end: "2026-01-08",
    status: "restricted",
    note: "Filtered internet before the nationwide January shutdown.",
  },
  {
    start: "2026-01-08",
    end: "2026-01-18",
    status: "complete",
    note: "Nationwide shutdown imposed during protests.",
  },
  {
    start: "2026-01-18",
    end: "2026-01-27",
    status: "nearTotal",
    note: "Near-total isolation remained in place through a restricted and heavily controlled network.",
  },
  {
    start: "2026-01-27",
    end: "2026-02-28",
    status: "partial",
    note: "Uneven, heavily filtered access returned.",
  },
  {
    start: "2026-02-28",
    end: "2026-05-26",
    status: "nearTotal",
    note: "Near-total national isolation lasting 2,093 hours.",
  },
  {
    start: "2026-05-26",
    end: "2026-06-01",
    status: "partial",
    note: "Partial restoration reported; restrictions remained.",
  },
];

const parseDate = d3.timeParse("%Y-%m-%d");
const formatDate = d3.timeFormat("%B %-d, %Y");

const shutdownDays = d3.timeDay.range(chartStart, chartEnd).map((date) => {
  const window = statusWindows.find(
    (period) => date >= parseDate(period.start) && date < parseDate(period.end)
  );

  return {
    date,
    note: window.note,
    status: window.status,
  };
});

const freeInternetReference = {
  date: null,
  note: "Iranians have never had unrestricted international internet access.",
  status: "free",
};

export default function InternetShutdownChart() {
  const containerRef = useRef(null);
  const dragOffsetRef = useRef(0);
  const scrollAnimationRef = useRef(null);
  const scrollTrackRef = useRef(null);
  const svgRef = useRef(null);
  const selectedDayRef = useRef(shutdownDays[7]);
  const [selectedDay, setSelectedDay] = useState(shutdownDays[7]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const svg = d3.select(svgRef.current);
    if (!container) return;

    const drawChart = () => {
      const cellWidth = 14;
      const cellGap = 3;
      const barMaxHeight = 104;
      const margin = { top: 36, right: 18, bottom: 46, left: 18 };
      const comparisonSlotWidth = cellWidth + comparisonGap;
      const innerWidth = comparisonSlotWidth + shutdownDays.length * cellWidth;
      const chartHeight = margin.top + barMaxHeight + margin.bottom;

      svg.selectAll("*").remove();
      svg
        .attr("viewBox", `0 0 ${innerWidth + margin.left + margin.right} ${chartHeight}`)
        .attr("width", innerWidth + margin.left + margin.right)
        .attr("height", chartHeight)
        .attr("role", "img")
        .attr(
          "aria-label",
          "Interactive qualitative timeline of reported internet conditions in Iran from January through May 2026."
        );

      const defs = svg.append("defs");
      const glow = defs
        .append("filter")
        .attr("id", "shutdown-glow")
        .attr("x", "-80%")
        .attr("width", "260%")
        .attr("y", "-80%")
        .attr("height", "260%");

      glow.append("feGaussianBlur").attr("stdDeviation", 3).attr("result", "blur");
      const merge = glow.append("feMerge");
      merge.append("feMergeNode").attr("in", "blur");
      merge.append("feMergeNode").attr("in", "SourceGraphic");

      const chart = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      chart
        .append("line")
        .attr("x1", 0)
        .attr("x2", innerWidth)
        .attr("y1", barMaxHeight)
        .attr("y2", barMaxHeight)
        .attr("stroke", "rgba(255,255,255,0.18)");

      chart
        .append("rect")
        .attr("x", 0)
        .attr("y", barMaxHeight - statuses.free.height)
        .attr("width", cellWidth - cellGap)
        .attr("height", statuses.free.height)
        .attr("rx", 2)
        .attr("fill", statuses.free.color)
        .attr("opacity", 0.9);

      chart
        .append("circle")
        .attr("cx", (cellWidth - cellGap) / 2)
        .attr("cy", barMaxHeight + 20)
        .attr("r", 3)
        .attr("fill", statuses.free.color);

      const freeHitArea = chart
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", cellWidth)
        .attr("height", barMaxHeight)
        .attr("fill", "transparent")
        .attr("tabindex", 0)
        .style("cursor", "pointer");

      const cells = chart
        .selectAll(".shutdown-day")
        .data(shutdownDays)
        .join("rect")
        .attr("class", "shutdown-day")
        .attr("x", (_, index) => comparisonSlotWidth + index * cellWidth)
        .attr("y", (day) => barMaxHeight - statuses[day.status].height)
        .attr("width", cellWidth - cellGap)
        .attr("height", (day) => statuses[day.status].height)
        .attr("rx", 2)
        .attr("fill", (day) => statuses[day.status].color)
        .attr("opacity", 0.78)
        .style("pointer-events", "none");

      const hitAreas = chart
        .selectAll(".shutdown-day-hit-area")
        .data(shutdownDays)
        .join("rect")
        .attr("class", "shutdown-day-hit-area")
        .attr("x", (_, index) => comparisonSlotWidth + index * cellWidth)
        .attr("y", 0)
        .attr("width", cellWidth)
        .attr("height", barMaxHeight)
        .attr("fill", "transparent")
        .attr("tabindex", 0)
        .style("cursor", "pointer");

      const marker = chart
        .append("rect")
        .attr("y", -5)
        .attr("width", cellWidth - cellGap + 4)
        .attr("height", barMaxHeight + 10)
        .attr("rx", 3)
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 1.5)
        .attr("filter", "url(#shutdown-glow)")
        .style("pointer-events", "none");

      const selectDay = (day) => {
        selectedDayRef.current = day;
        setSelectedDay(day);
        const isReference = day.status === "free";
        const markerX = isReference
          ? -2
          : comparisonSlotWidth + shutdownDays.indexOf(day) * cellWidth - 1.5;

        marker
          .interrupt()
          .transition()
          .duration(isReference ? 0 : 180)
          .ease(d3.easeCubicOut)
          .attr("x", markerX);

        cells
          .interrupt()
          .transition()
          .duration(isReference ? 0 : 140)
          .attr("opacity", (item) => (item === day ? 1 : 0.68));
      };

      freeHitArea
        .on("pointerenter", () => selectDay(freeInternetReference))
        .on("click", () => selectDay(freeInternetReference))
        .on("focus", () => selectDay(freeInternetReference));

      hitAreas
        .on("pointerenter", (_, day) => selectDay(day))
        .on("click", (_, day) => selectDay(day))
        .on("focus", (_, day) => selectDay(day));

      selectDay(
        selectedDayRef.current.status === "free"
          ? freeInternetReference
          : selectedDayRef.current
      );

      const monthStarts = d3.timeMonth.range(chartStart, chartEnd);

      chart
        .selectAll(".month-label")
        .data(monthStarts)
        .join("text")
        .attr("x", (date) => comparisonSlotWidth + d3.timeDay.count(chartStart, date) * cellWidth)
        .attr("y", -18)
        .attr("fill", "rgba(255,255,255,0.72)")
        .attr("font-size", 12)
        .attr("font-weight", 700)
        .text((date) => d3.timeFormat("%b")(date));

      chart
        .selectAll(".month-divider")
        .data(monthStarts)
        .join("line")
        .attr("x1", (date) => comparisonSlotWidth + d3.timeDay.count(chartStart, date) * cellWidth - 3)
        .attr("x2", (date) => comparisonSlotWidth + d3.timeDay.count(chartStart, date) * cellWidth - 3)
        .attr("y1", -8)
        .attr("y2", barMaxHeight + 8)
        .attr("stroke", "rgba(255,255,255,0.28)")
        .attr("stroke-dasharray", "3 4");

      statusWindows.forEach((period) => {
        const x = comparisonSlotWidth + d3.timeDay.count(chartStart, parseDate(period.start)) * cellWidth;

        chart
          .append("circle")
          .attr("cx", x)
          .attr("cy", barMaxHeight + 20)
          .attr("r", 3)
          .attr("fill", statuses[period.status].color);
      });
    };

    drawChart();
  }, []);

  const updateScrollProgress = () => {
    const container = containerRef.current;
    if (!container) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    setScrollProgress(maxScroll > 0 ? container.scrollLeft / maxScroll : 0);
  };

  const getScrollLeftFromPointer = (event, pointerOffset) => {
    const container = containerRef.current;
    const track = scrollTrackRef.current;
    if (!container || !track) return 0;

    const bounds = track.getBoundingClientRect();
    const thumbWidth = bounds.width / 3;
    const travelWidth = bounds.width - thumbWidth;
    const offset = pointerOffset ?? thumbWidth / 2;
    const progress = Math.max(
      0,
      Math.min(1, (event.clientX - bounds.left - offset) / travelWidth)
    );

    return progress * (container.scrollWidth - container.clientWidth);
  };

  const animateScrollTo = (targetScrollLeft) => {
    const container = containerRef.current;
    if (!container) return;

    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current);
    }

    const startScrollLeft = container.scrollLeft;
    const distance = targetScrollLeft - startScrollLeft;
    const startTime = performance.now();
    const duration = 360;

    const animate = (time) => {
      const progress = Math.min(1, (time - startTime) / duration);
      const easedProgress = 1 - (1 - progress) ** 3;

      container.scrollLeft = startScrollLeft + distance * easedProgress;

      if (progress < 1) {
        scrollAnimationRef.current = requestAnimationFrame(animate);
      } else {
        scrollAnimationRef.current = null;
      }
    };

    scrollAnimationRef.current = requestAnimationFrame(animate);
  };

  const startDraggingScrollThumb = (event) => {
    event.preventDefault();
    const container = containerRef.current;
    if (!container) return;

    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }

    const targetScrollLeft = getScrollLeftFromPointer(event);
    const isThumbClick = event.target.dataset.scrollThumb === "true";

    if (!isThumbClick) {
      animateScrollTo(targetScrollLeft);
      return;
    }

    const thumbBounds = event.target.getBoundingClientRect();
    dragOffsetRef.current = event.clientX - thumbBounds.left;

    const handlePointerMove = (moveEvent) => {
      container.scrollLeft = getScrollLeftFromPointer(
        moveEvent,
        dragOffsetRef.current
      );
    };
    const stopDragging = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopDragging);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopDragging);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const preventPageWheel = (event) => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 0) return;

      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;

      event.preventDefault();
      event.stopPropagation();
      container.scrollLeft += delta;
    };

    container.addEventListener("wheel", preventPageWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", preventPageWheel);
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current);
      }
    };
  }, []);

  const selectedStatus = statuses[selectedDay.status];

  return (
    <figure className="my-10 border-y border-white/10 bg-gray-950 py-7 sm:my-12 sm:py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
            January - May 2026
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
            Internet Conditions Across Iran
          </h3>
        </div>
        <p className="text-sm text-white/55">Scroll horizontally, then hover or tap a day</p>
      </div>

      <div className="mt-5 border-l-2 border-white/60 pl-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-white">
            {selectedDay.status === "free" ? "Never" : formatDate(selectedDay.date)}
          </p>
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              backgroundColor: `${selectedStatus.color}28`,
              color: selectedStatus.color,
            }}
          >
            {selectedStatus.shortLabel}
          </span>
        </div>
        <p className="mt-2 max-w-4xl text-sm leading-6 text-white/55">{selectedDay.note}</p>
      </div>

      <div className="mt-4 bg-gray-950 py-2">
        <div
          ref={containerRef}
          onScroll={updateScrollProgress}
          className="chart-scroll w-full overflow-x-auto overscroll-x-contain"
        >
          <svg ref={svgRef} className="block max-w-none" />
        </div>
      </div>

      <div
        ref={scrollTrackRef}
        onPointerDown={startDraggingScrollThumb}
        className="mt-2 h-1 cursor-pointer overflow-hidden rounded-full bg-white/8"
      >
        <div
          data-scroll-thumb="true"
          className="h-full w-1/3 rounded-full bg-white/45"
          style={{ transform: `translateX(${scrollProgress * 200}%)` }}
        />
      </div>

      <div className="mt-4 grid gap-3 text-xs leading-5 text-white/55">
        {["free", "restricted", "complete", "nearTotal", "partial"].map((status) => (
          <p key={status}>
            <span className="inline-flex items-center gap-2 font-semibold text-white/75">
              <span
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: statuses[status].color }}
              />
              {statuses[status].label}:
            </span>{" "}
            {statuses[status].description}
          </p>
        ))}
      </div>

      <figcaption className="mt-5 text-xs leading-6 text-white/45">
        This is a qualitative timeline of documented phases, not a daily
        bandwidth measurement. It summarizes NetBlocks reporting and the
        published shutdown chronology: the January 8 nationwide cutoff,
        continuing near-total isolation later in January, renewed isolation from February
        28, and partial restoration reported on May 26 after 2,093 hours. Source:{" "}
        <a
          href="https://netblocks.org/"
          target="_blank"
          rel="noreferrer"
          className="text-white/70 underline decoration-white/30 underline-offset-4 transition hover:text-white"
        >
          NetBlocks
        </a>
        .
      </figcaption>
    </figure>
  );
}
