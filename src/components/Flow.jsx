import { Link } from "react-router-dom";
import { useLang } from "../i18n";
import { brcko } from "../data/brcko";
import { container, grid, number } from "../grid";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

function Times({ label, times }) {
  return (
    <>
      <p className="mt-8 mb-3 font-mono text-xs text-muted">{label}</p>
      <div className="grid grid-cols-6 gap-y-1.5 font-mono text-sm">
        {times.map((time, i) => (
          <span key={i}>{time}</span>
        ))}
      </div>
    </>
  );
}

// Tri koraka na stvarnom primjeru: vozni red → stop_times.txt → trasa na karti.
function Flow({ more = false }) {
  const { t } = useLang();
  const { timetable, stopTimes, line } = brcko;

  const steps = [
    <>
      <p className="font-mono text-xs text-muted">
        {t.flow.line} {timetable.line}
      </p>
      <p className="mt-1 text-lg font-semibold tracking-tight">
        {timetable.from} → {timetable.to}
      </p>
      <Times label={t.flow.weekday} times={timetable.weekday} />
      <Times label={t.flow.weekend} times={timetable.weekend} />
    </>,
    <>
      <p className="mb-4 font-mono text-xs text-muted">stop_times.txt</p>
      <div className="font-mono text-xs leading-6">
        {stopTimes.map((row, i) => (
          <p key={i} className={`truncate ${i === 0 ? "text-muted" : ""}`}>
            {row}
          </p>
        ))}
      </div>
    </>,
    <svg viewBox={line.viewBox} className="w-full" aria-hidden="true">
      <path
        d={line.d}
        fill="none"
        className="stroke-signal"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      {line.stops.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="4"
          className="fill-paper stroke-ink"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>,
  ];

  return (
    <section className={`${container} ${grid} pb-[16vh]`}>
      <SectionLabel>{t.flow.label}</SectionLabel>
      <div className="col-span-12 md:col-span-9">
        <Reveal>
          <h2 className="mb-16 text-4xl font-extrabold tracking-[-0.03em] md:text-5xl">
            {t.flow.title}
          </h2>
        </Reveal>
        <div className="grid gap-20 md:grid-cols-3 md:gap-6">
          {steps.map((step, i) => (
            <Reveal key={i} delay={i * 0.12} className="min-w-0">
              <p className="mb-8 flex items-baseline gap-4">
                <span className="font-mono text-xs text-signal">
                  {number(i)}
                </span>
                <span className="text-xl font-semibold tracking-tight">
                  {t.flow.steps[i]}
                </span>
              </p>
              {step}
            </Reveal>
          ))}
        </div>
        {more && (
          <Link
            to="/gtfs"
            className="mt-16 inline-block text-lg transition-colors hover:text-signal"
          >
            {t.flow.more} <span className="text-signal">→</span>
          </Link>
        )}
      </div>
    </section>
  );
}

export default Flow;
