import { Link } from "react-router-dom";
import { useLang } from "../i18n";
import { container, grid } from "../grid";
import Contact from "./Contact";
import Flow from "./Flow";
import Reveal from "./Reveal";

function Home() {
  const { t } = useLang();

  return (
    <>
      {/* Hero */}
      <section className={`${container} ${grid} pt-[14vh] pb-[16vh]`}>
        <Reveal className="col-span-12 lg:col-span-10">
          <h1 className="text-[clamp(3rem,9vw,8.5rem)] leading-[0.95] font-extrabold tracking-[-0.035em]">
            {t.hero.title}
          </h1>
        </Reveal>
        <Reveal
          delay={0.15}
          className="col-span-12 mt-14 md:col-span-6 md:col-start-7 lg:col-span-4 lg:col-start-7"
        >
          <p className="text-lg leading-relaxed text-muted md:text-xl">
            {t.hero.lead}
          </p>
          <Link
            to="/gtfs"
            className="mt-10 inline-block text-lg transition-colors hover:text-signal"
          >
            {t.hero.cta} <span className="text-signal">→</span>
          </Link>
        </Reveal>
      </section>

      <Flow more />

      <Contact />
    </>
  );
}

export default Home;
