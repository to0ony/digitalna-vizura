import { Link, Navigate, useParams } from "react-router-dom";
import { useLang } from "../i18n";
import { projects } from "../content";
import { container, grid } from "../grid";
import Reveal from "./Reveal";
import ProjectVisual from "./ProjectVisual";
import Mockups from "./Mockups";
import PageMeta from "./PageMeta";

function Meta({ label, children }) {
  return (
    <div className="col-span-6 md:col-span-3">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
        {label}
      </p>
      {children}
    </div>
  );
}

function Project() {
  const { slug } = useParams();
  const { lang, t } = useLang();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/" replace />;

  const text = project[lang];

  return (
    <article>
      <PageMeta title={project.title} description={text.summary} />
      <section className={`${container} ${grid} pt-[8vh] pb-[14vh]`}>
        <Link
          to="/radovi"
          className="col-span-12 mb-16 font-mono text-xs text-muted transition-colors hover:text-signal"
        >
          ← {t.project.back}
        </Link>
        <Reveal className="col-span-12">
          <h1 className="text-[clamp(3.5rem,13vw,12rem)] leading-[0.9] font-extrabold tracking-[-0.04em]">
            {project.title}
          </h1>
        </Reveal>
        <Reveal
          delay={0.15}
          className="col-span-12 mt-14 md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-7"
        >
          <p className="mb-6 text-2xl leading-snug font-semibold tracking-tight">
            {text.summary}
          </p>
          {project.status && (
            <p className="mb-6 font-mono text-xs text-signal">
              {t.work.inProgress}
            </p>
          )}
          <p className="text-lg leading-relaxed text-muted">
            {text.description}
          </p>
        </Reveal>
      </section>

      <section className={`${container} ${grid} pb-[14vh]`}>
        <Reveal
          className={
            project.visual === "network"
              ? "col-span-12 md:col-span-9 md:col-start-4"
              : "col-span-12"
          }
        >
          <ProjectVisual project={project} />
        </Reveal>
      </section>

      {project.mockups && (
        <section className={`${container} pb-[14vh]`}>
          <Mockups mockups={project.mockups} />
        </section>
      )}

      <section className={`${container} ${grid} gap-y-14 pb-[14vh]`}>
        <div className="col-span-12 md:col-span-6">
          <p className="mb-8 font-mono text-xs uppercase tracking-widest text-muted">
            {t.project.features}
          </p>
          <ol className="space-y-4 text-lg">
            {text.features.map((feature, i) => (
              <li key={feature} className="flex gap-6">
                <span className="pt-1.5 font-mono text-xs text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {feature}
              </li>
            ))}
          </ol>
        </div>
        <div className="col-span-12 grid grid-cols-12 gap-x-6 gap-y-10 md:col-span-6">
          <Meta label={t.project.stack}>
            <ul className="space-y-1">
              {project.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </Meta>
          <Meta label={t.project.links}>
            <ul className="space-y-1">
              {project.liveLink && (
                <li>
                  <a
                    href={project.liveLink}
                    className="transition-colors hover:text-signal"
                  >
                    {t.project.live} ↗
                  </a>
                </li>
              )}
              <li>
                <a
                  href={project.githubLink}
                  className="transition-colors hover:text-signal"
                >
                  GitHub ↗
                </a>
              </li>
            </ul>
          </Meta>
        </div>
      </section>
    </article>
  );
}

export default Project;
