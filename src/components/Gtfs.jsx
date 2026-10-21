import { useLang } from "../i18n";
import { brcko } from "../data/brcko";
import { container, grid, number } from "../grid";
import Contact from "./Contact";
import Flow from "./Flow";
import NetworkMap from "./NetworkMap";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

function Gtfs() {
  const { t } = useLang();
  const g = t.gtfs;
  const stats = [
    [brcko.stats.routes, g.stats.routes],
    [brcko.stats.stops, g.stats.stops],
    [brcko.stats.weekdayTrips, g.stats.trips],
  ];

  return (
    <>
      {/* Hero */}
      <section className={`${container} ${grid} pt-[14vh] pb-[16vh]`}>
        <Reveal className="col-span-12 lg:col-span-10">
          <h1 className="text-[clamp(3rem,9vw,8.5rem)] leading-[0.95] font-extrabold tracking-[-0.035em]">
            {g.title}
          </h1>
        </Reveal>
        <Reveal
          delay={0.15}
          className="col-span-12 mt-14 md:col-span-6 md:col-start-7 lg:col-span-4 lg:col-start-7"
        >
          <p className="text-lg leading-relaxed text-muted md:text-xl">
            {g.lead}
          </p>
        </Reveal>
      </section>

      <Flow />

      {/* Proces */}
      <section id="proces" className={`${container} ${grid} scroll-mt-8 pb-[16vh]`}>
        <SectionLabel>{g.processLabel}</SectionLabel>
        <div className="col-span-12 grid gap-14 sm:grid-cols-2 md:col-span-9 lg:grid-cols-4 lg:gap-6">
          {g.process.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <p className="mb-6 font-mono text-xs text-signal">{number(i)}</p>
              <h3 className="mb-3 text-xl font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="leading-relaxed text-muted">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Prednosti */}
      <section
        id="prednosti"
        className={`${container} ${grid} scroll-mt-8 pb-[16vh]`}
      >
        <SectionLabel>{g.benefitsLabel}</SectionLabel>
        <div className="col-span-12 md:col-span-9">
          <Reveal>
            <h2 className="mb-16 text-4xl font-extrabold tracking-[-0.03em] md:text-5xl">
              {g.benefitsTitle}
            </h2>
          </Reveal>
          <div className="grid gap-14 md:grid-cols-3 md:gap-6">
            {g.benefits.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <p className="mb-6 font-mono text-xs text-signal">{number(i)}</p>
                <h3 className="mb-3 text-xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="leading-relaxed text-muted">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Primjer */}
      <section id="primjer" className={`${container} ${grid} scroll-mt-8 pb-[16vh]`}>
        <SectionLabel>{g.demoLabel}</SectionLabel>
        <div className="col-span-12 md:col-span-9">
          <Reveal>
            <h2 className="text-5xl font-extrabold tracking-[-0.03em] md:text-7xl">
              {g.demoTitle}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {g.demoText}
            </p>
          </Reveal>
          <div className="mt-16 grid grid-cols-3 gap-6">
            {stats.map(([value, label], i) => (
              <Reveal key={label} delay={i * 0.1}>
                <p className="text-4xl font-extrabold tracking-[-0.03em] md:text-6xl">
                  {value}
                </p>
                <p className="mt-2 font-mono text-xs text-muted">{label}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-20">
            <NetworkMap />
          </Reveal>
        </div>
      </section>

      {/* Pitanja */}
      <section id="pitanja" className={`${container} ${grid} scroll-mt-8 pb-[16vh]`}>
        <SectionLabel>{g.faqLabel}</SectionLabel>
        <div className="col-span-12 space-y-10 md:col-span-9">
          {g.faq.map((item) => (
            <Reveal key={item.q} className="grid gap-2 md:grid-cols-2 md:gap-6">
              <h3 className="text-lg font-semibold tracking-tight">{item.q}</h3>
              <p className="leading-relaxed text-muted">{item.a}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Contact />
    </>
  );
}

export default Gtfs;
