import { Link } from "react-router-dom";
import { useLang } from "../i18n";
import { projects } from "../content";
import { container, grid, number } from "../grid";
import Contact from "./Contact";
import PageTitle from "./PageTitle";
import Reveal from "./Reveal";
import ProjectVisual from "./ProjectVisual";

function Work() {
  const { lang, t } = useLang();

  return (
    <>
      <PageTitle>{t.work.title.replace(/\.$/, "")}</PageTitle>
      <section className={`${container} ${grid} pt-[14vh] pb-[14vh]`}>
        <Reveal className="col-span-12 lg:col-span-10">
          <h1 className="text-[clamp(3rem,9vw,8.5rem)] leading-[0.95] font-extrabold tracking-[-0.035em]">
            {t.work.title}
          </h1>
        </Reveal>
        <Reveal
          delay={0.15}
          className="col-span-12 mt-14 md:col-span-6 md:col-start-7 lg:col-span-4 lg:col-start-7"
        >
          <p className="text-lg leading-relaxed text-muted md:text-xl">
            {t.work.lead}
          </p>
        </Reveal>
      </section>

      <section className={`${container} ${grid} pb-[16vh]`}>
        <div className="col-span-12 space-y-28 md:col-span-9 md:col-start-4">
          {projects.map((project, i) => (
            <Reveal key={project.slug}>
              <Link to={`/radovi/${project.slug}`} className="group block">
                <div className="mb-12 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-4">
                  <div className="flex items-baseline gap-6">
                    <span className="font-mono text-xs text-signal">
                      {number(i)}
                    </span>
                    <h2 className="text-5xl font-extrabold tracking-[-0.03em] transition-colors group-hover:text-signal md:text-7xl">
                      {project.title}
                    </h2>
                  </div>
                  <p className="font-mono text-xs text-muted">
                    {project.stack.join(" · ")}
                    {project.status && ` · ${t.work.inProgress}`}
                  </p>
                </div>
                <ProjectVisual project={project} lift caption={false} />
                <p className="mt-10 max-w-xl text-lg text-muted">
                  {project[lang].summary}{" "}
                  <span className="text-ink transition-colors group-hover:text-signal">
                    {t.work.view} →
                  </span>
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <Contact />
    </>
  );
}

export default Work;
