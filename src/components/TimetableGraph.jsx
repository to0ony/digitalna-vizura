import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import { useLang } from "../i18n";
import { brcko } from "../data/brcko";

const MotionDiv = motion.div;
const MotionPath = motion.path;

const { graph } = brcko;

// Razmještaj u jedinicama viewBoxa.
const W = 1000;
const H = 600;
const left = 190;
const right = 985;
const top = 30;
const bottom = 585;
const labelGap = 17;

const all = graph.trips.flatMap((trip) => trip.t).filter((t) => t != null);
const start = Math.floor(Math.min(...all) / 60) * 60;
const end = Math.ceil(Math.max(...all) / 60) * 60;
const x = (t) => left + ((t - start) / (end - start)) * (right - left);
const y = (row) => top + graph.pos[row] * (bottom - top);
const clock = (m) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

// Svaka vožnja kao niz točaka (vrijeme, redak) poredanih po vremenu, po tipu dana.
const days = ["weekday", "weekend"];
const tripsByDay = Object.fromEntries(
  days.map((day) => [
    day,
    graph.trips
      .filter((trip) => trip.day === day)
      .map((trip) => {
        const points = trip.t
          .map((t, row) => [t, row])
          .filter(([t]) => t != null)
          .sort((a, b) => a[0] - b[0]);
        return {
          dir: trip.dir,
          points,
          d: "M" + points.map(([t, row]) => `${x(t).toFixed(1)} ${y(row).toFixed(1)}`).join("L"),
        };
      }),
  ]),
);

// Natpisi stanica bez preklapanja; prva i zadnja uvijek.
// Od dvojnih naziva ("Veterinarska stanica / Soliter") ostaje kraći, drugi dio.
const short = (name) => name.split(" / ").pop();
const labels = [];
graph.stops.forEach((full, row) => {
  const name = short(full);
  const last = labels[labels.length - 1];
  const isEnd = row === graph.stops.length - 1;
  if (!last || y(row) - y(last.row) >= labelGap) labels.push({ name, row });
  else if (isEnd) labels[labels.length - 1] = { name, row };
});

const hours = [];
for (let t = start; t <= end; t += 60) hours.push(t);

// Položaj vozila u trenutku `now`, ili null ako vožnja tada ne vozi.
function position(points, now) {
  if (now < points[0][0] || now > points[points.length - 1][0]) return null;
  for (let i = 1; i < points.length; i++) {
    const [t1, r1] = points[i];
    if (now <= t1) {
      const [t0, r0] = points[i - 1];
      const k = t1 === t0 ? 0 : (now - t0) / (t1 - t0);
      return y(r0) + (y(r1) - y(r0)) * k;
    }
  }
  return null;
}

// Grafikon voznog reda (Mareyev dijagram) jedne linije, oba smjera.
// Stanice su redci, vrijeme ide vodoravno, a svaka vožnja je crta.
// Okomita crta prolazi kroz dan i pokazuje gdje su vozila u tom trenutku;
// vožnja se ističe prelaskom miša ili dodirom.
function TimetableGraph() {
  const { t } = useLang();
  const g = t.outcomes.graph;
  const box = useRef(null);
  const cursor = useRef(null);
  const dots = useRef([]);
  const inView = useInView(box, { margin: "-10% 0px" });
  // Crte se iscrtaju jednom i ostaju, i kad se grafikon brzo proscrolla.
  const seen = useInView(box, { once: true });
  const reduced = useReducedMotion();
  const [day, setDay] = useState("weekday");
  const rotateX = useMotionValue(12);
  const rotateY = useMotionValue(-10);
  const sway = useRef([]);
  const [active, setActive] = useState(null);

  const trips = tripsByDay[day];
  const selected = active == null ? null : trips[active];

  useEffect(() => {
    if (!inView || reduced) return;
    const period = 36000;
    const t0 = performance.now();
    let frame;
    const tick = (ms) => {
      const now = start + (((ms - t0) / period) % 1) * (end - start);
      const cx = x(now);
      cursor.current?.setAttribute("x1", cx);
      cursor.current?.setAttribute("x2", cx);
      tripsByDay[day].forEach((trip, i) => {
        const dot = dots.current[i];
        if (!dot) return;
        const cy = position(trip.points, now);
        dot.setAttribute("opacity", cy == null ? 0 : 1);
        if (cy != null) {
          dot.setAttribute("cx", cx);
          dot.setAttribute("cy", cy);
        }
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, day]);

  // Kartica se polako njiše; dok je miš iznad, stoji da se lakše klikne.
  useEffect(() => {
    if (reduced) return;
    const loop = { duration: 14, repeat: Infinity, ease: "easeInOut" };
    sway.current = [
      animate(rotateX, [12, 16, 12], loop),
      animate(rotateY, [-10, -14, -10], loop),
    ];
    return () => sway.current.forEach((a) => a.stop());
  }, [reduced, rotateX, rotateY]);

  const switchDay = (next) => {
    setActive(null);
    setDay(next);
  };

  const info = selected
    ? (() => {
        const [t0, r0] = selected.points[0];
        const [t1, r1] = selected.points[selected.points.length - 1];
        return `${g.departure} ${clock(t0)} · ${short(graph.stops[r0])} → ${short(graph.stops[r1])} ${clock(t1)}`;
      })()
    : `${graph.line} · ${graph.name} · ${trips.length} ${g.trips}`;

  return (
    <div ref={box} className="[perspective:1600px]">
      <MotionDiv
        className="border border-ink/15 bg-paper p-3 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.35)] md:p-5"
        style={{ transformStyle: "preserve-3d", scale: 0.94, rotateX, rotateY, rotateZ: 1.5 }}
        onPointerEnter={() => sway.current.forEach((a) => a.pause())}
        onPointerLeave={() => sway.current.forEach((a) => a.play())}
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <div className="flex font-mono text-xs">
            {days.map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={day === d}
                onClick={() => switchDay(d)}
                className={`border px-2.5 py-1 transition-colors ${
                  day === d
                    ? "border-ink bg-ink text-paper"
                    : "border-ink/15 text-muted hover:text-ink"
                } ${d === "weekend" ? "-ml-px" : ""}`}
              >
                {g[d]}
              </button>
            ))}
          </div>
          <p className="truncate font-mono text-xs text-muted">{info}</p>
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          onPointerLeave={() => setActive(null)}
        >
          {hours.map((h) => (
            <g key={h}>
              <line
                x1={x(h)}
                x2={x(h)}
                y1={top - 8}
                y2={bottom}
                className="stroke-ink"
                strokeOpacity="0.08"
              />
              {(h - start) % 120 === 0 && (
                <text
                  x={x(h)}
                  y={top - 16}
                  textAnchor="middle"
                  className="fill-muted font-mono"
                  fontSize="14"
                >
                  {clock(h)}
                </text>
              )}
            </g>
          ))}
          {graph.stops.map((name, row) => (
            <line
              key={row}
              x1={left}
              x2={right}
              y1={y(row)}
              y2={y(row)}
              className="stroke-ink"
              strokeOpacity="0.05"
            />
          ))}
          {labels.map(({ name, row }) => (
            <text
              key={row}
              x={left - 12}
              y={y(row)}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-muted"
              fontSize="13"
            >
              {name}
            </text>
          ))}
          {trips.map((trip, i) => (
            <MotionPath
              key={`${day}-${i}`}
              d={trip.d}
              fill="none"
              className={`transition-opacity duration-300 ${trip.dir === 0 ? "stroke-ink" : "stroke-signal"}`}
              strokeWidth={active === i ? 3.2 : 1.6}
              strokeOpacity={active == null || active === i ? 1 : 0.15}
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={seen || reduced ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.2, delay: reduced ? 0 : i * 0.04, ease: "easeOut" }}
            />
          ))}
          {selected?.points.map(([time, row]) => (
            <circle
              key={row}
              cx={x(time)}
              cy={y(row)}
              r="3.5"
              className={selected.dir === 0 ? "fill-ink" : "fill-signal"}
            />
          ))}
          {!reduced && (
            <g pointerEvents="none">
              <line
                ref={cursor}
                x1={left}
                x2={left}
                y1={top - 8}
                y2={bottom}
                className="stroke-ink"
                strokeOpacity="0.35"
                strokeDasharray="3 4"
              />
              {trips.map((trip, i) => (
                <circle
                  key={`${day}-${i}`}
                  ref={(el) => (dots.current[i] = el)}
                  r="5"
                  opacity="0"
                  className={`stroke-paper ${trip.dir === 0 ? "fill-ink" : "fill-signal"}`}
                  strokeWidth="2"
                />
              ))}
            </g>
          )}
          {/* Nevidljive šire crte da se vožnja lakše uhvati mišem ili prstom */}
          {trips.map((trip, i) => (
            <path
              key={`${day}-${i}`}
              d={trip.d}
              fill="none"
              stroke="transparent"
              strokeWidth="14"
              vectorEffect="non-scaling-stroke"
              pointerEvents="stroke"
              className="cursor-pointer"
              onPointerEnter={() => setActive(i)}
              onClick={() => setActive(i)}
            />
          ))}
        </svg>
      </MotionDiv>
    </div>
  );
}

export default TimetableGraph;
