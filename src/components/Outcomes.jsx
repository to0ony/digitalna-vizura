import { Link } from "react-router-dom";
import { useLang } from "../i18n";
import { container, grid, number } from "../grid";
import Reveal from "./Reveal";
import Screenshot from "./Screenshot";
import SectionLabel from "./SectionLabel";
import StopBoard from "./StopBoard";
import TimetableGraph from "./TimetableGraph";

// Mogućnosti koje otvara jedan vozni red, svaka sa svojim vizualom.
function Outcomes() {
  const { t } = useLang();
  const o = t.outcomes;

  const visuals = [
    <StopBoard />,
    <TimetableGraph />,
    <Screenshot
      src="/terminus/timetable-pdf.webp"
      alt={o.items[2].title}
      className="max-w-sm"
      zoomable
    />,
  ];

  return (
    <section className={`${container} ${grid} pb-[16vh]`}>
      <SectionLabel>{o.label}</SectionLabel>
      <div className="col-span-12 md:col-span-9">
        <Reveal>
          <h2 className="text-4xl font-extrabold tracking-[-0.03em] md:text-5xl">
            {o.title}
          </h2>
          <p className="mt-6 mb-20 max-w-xl text-lg leading-relaxed text-muted">
            {o.intro}
          </p>
        </Reveal>
        <div className="space-y-24">
          {o.items.map((item, i) => (
            <div
              key={item.title}
              className="grid items-center gap-x-6 gap-y-10 md:grid-cols-12"
            >
              <Reveal className="md:col-span-4">
                <p className="mb-6 font-mono text-xs text-signal">{number(i)}</p>
                <h3 className="mb-3 text-xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="leading-relaxed text-muted">{item.text}</p>
              </Reveal>
              <Reveal delay={0.12} className="md:col-span-8">
                {visuals[i]}
              </Reveal>
            </div>
          ))}
        </div>
        <Reveal className="mt-24">
          <p className="max-w-xl text-2xl leading-snug font-semibold tracking-tight">
            {o.note}
          </p>
          <Link
            to="/gtfs"
            className="mt-10 inline-block text-lg transition-colors hover:text-signal"
          >
            {o.more} <span className="text-signal">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export default Outcomes;
