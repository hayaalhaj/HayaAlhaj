import { Link } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";
import { useReveal } from "../hooks/useReveal";
import { projectMeta } from "../data/projects";

const detailsBtn =
  "group inline-flex items-center gap-2 rounded-full border-2 border-brand px-5 py-2 font-medium text-brand " +
  "transition-all duration-300 hover:-translate-y-1 hover:border-coral hover:bg-coral hover:text-cream hover:shadow-lg hover:shadow-coral/30 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral";

const liveBtn =
  "group inline-flex items-center gap-2 rounded-full border-2 border-coral bg-coral px-5 py-2 font-medium text-cream " +
  "transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:bg-brand hover:shadow-lg hover:shadow-brand/30 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral";

const ProjectCard = ({ meta, text, labels, reversed }) => {
  const [ref, visible] = useReveal(0.2);

  return (
    <article
      ref={ref}
      className={`grid items-center gap-6 lg:gap-10 ${
        reversed ? "lg:grid-cols-[3fr_2fr]" : "lg:grid-cols-[2fr_3fr]"
      } ${visible ? "proj-visible" : ""}`}
    >
      {/* Screenshot: slides in from its side, zooms slightly on hover */}
      <div
        className={`proj-img mx-auto w-full max-w-md overflow-hidden rounded-2xl border-2 border-brand/25 shadow-lg shadow-brand/15 lg:max-w-none ${
          reversed ? "proj-from-end lg:order-last" : "proj-from-start"
        }`}
      >
        <img
          src={meta.image}
          alt={text.imageAlt}
          className="h-auto w-full transition-transform duration-700 ease-out hover:scale-105"
        />
      </div>

      <div>
        <h3 className="proj-text text-3xl font-bold sm:text-4xl" style={{ transitionDelay: "0.15s" }}>
          {text.title}
        </h3>
        <p className="proj-text mt-1 text-xl text-brand sm:text-2xl" style={{ transitionDelay: "0.25s" }}>
          {text.subtitle}
        </p>

        <p className="proj-text mt-3 leading-relaxed" style={{ transitionDelay: "0.35s" }}>
          {text.description}
        </p>

        <p className="proj-text mt-4" style={{ transitionDelay: "0.45s" }}>
          <span className="pe-2.5 font-extrabold">{labels.roleLabel}</span>
          {labels.roleValue}
        </p>

        <div className="proj-text mt-4 flex flex-wrap items-center gap-2" style={{ transitionDelay: "0.55s" }}>
          <span className="pe-1 font-extrabold">{labels.toolsLabel}</span>
          {meta.tools.map((tool) => (
            <span key={tool} dir="ltr" className="rounded-full bg-brand/15 px-3 py-1 text-sm font-medium text-brand">
              {tool}
            </span>
          ))}
        </div>

        {(meta.hasDetails || meta.github || meta.liveUrl) && (
        <div className="proj-text mt-6 flex flex-wrap items-center gap-3" style={{ transitionDelay: "0.65s" }}>
          {/* Live demo button: appears only when liveUrl is set in data/projects.js */}
          {meta.liveUrl && (
            <a href={meta.liveUrl} target="_blank" rel="noopener noreferrer" className={liveBtn}>
              {labels.details.live}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
              >
                <path d="M7 17L17 7M8 7h9v9" />
              </svg>
            </a>
          )}

          {meta.hasDetails && (
          <Link to={`/projects/${meta.slug}`} className={detailsBtn} aria-label={labels.viewDetailsOf(text.title)}>
            {labels.viewDetails}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          )}

          {/* GitHub button: appears only when a link is set in data/projects.js */}
          {meta.github && (
            <a
              href={meta.github}
              target="_blank"
              rel="noopener noreferrer"
              className={detailsBtn}
              aria-label={labels.details.github}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
              </svg>
              GitHub
            </a>
          )}
        </div>
        )}
      </div>
    </article>
  );
};

const Projects = () => {
  const { t } = useSettings();
  const [headRef, headVisible] = useReveal(0.5);

  return (
    <div className="bg-alt font-serif">
      <style>{`
        .proj-text {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity .8s cubic-bezier(.2,.7,.2,1), transform .8s cubic-bezier(.2,.7,.2,1);
        }
        .proj-img {
          opacity: 0;
          transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1);
        }
        /* --dir is 1 in English and -1 in Arabic, so images slide in from the correct side */
        .proj-from-start { transform: translateX(calc(-48px * var(--dir, 1))); }
        .proj-from-end { transform: translateX(calc(48px * var(--dir, 1))); }
        .proj-bar { width: 0; transition: width .8s cubic-bezier(.2,.7,.2,1) .3s; }

        .proj-visible .proj-text,
        .proj-visible .proj-img { opacity: 1; transform: none; }
        .proj-visible .proj-bar { width: 5rem; }

        /* On phones the image rises up instead of sliding sideways, so nothing causes horizontal scroll */
        @media (max-width: 1023px) {
          .proj-from-start, .proj-from-end { transform: translateY(32px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .proj-text, .proj-img { opacity: 1; transform: none; transition: none; }
          .proj-bar { width: 5rem; transition: none; }
        }
      `}</style>

      <section id="work" className="mx-auto max-w-6xl scroll-mt-20 overflow-hidden px-6 py-16 md:py-24">
        <div ref={headRef} className={headVisible ? "proj-visible" : ""}>
          <h2 className="proj-text text-4xl font-bold sm:text-5xl">{t.projects.heading}</h2>
          <span className="proj-bar mt-3 block h-1 rounded-full bg-coral" aria-hidden="true" />
        </div>

        <div className="mt-12 flex flex-col gap-16 md:gap-24">
          {projectMeta.map((meta, i) => (
            <ProjectCard
              key={i}
              meta={meta}
              text={t.projects.items[i]}
              labels={t.projects}
              reversed={i % 2 === 1}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;