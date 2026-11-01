import { Link, Navigate, useParams } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";
import { useReveal } from "../hooks/useReveal";
import { projectMeta } from "../data/projects";
import { getEmbedUrl } from "../utils/embed";

const linkBtn =
  "group inline-flex items-center gap-2 rounded-full border-2 border-brand px-5 py-2 font-medium text-brand " +
  "transition-all duration-300 hover:-translate-y-1 hover:border-coral hover:bg-coral hover:text-cream hover:shadow-lg hover:shadow-coral/30 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral";

/* Fades each block in when it scrolls into view */
const Block = ({ children, delay = 0, className = "" }) => {
  const [ref, visible] = useReveal(0.15);
  return (
    <div
      ref={ref}
      className={`pd-block ${visible ? "pd-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

const ProjectDetailsView = ({ meta, text, labels }) => {
  const d = labels.details;
  const features = d.features[meta.slug] ?? [];
  const embedUrl = meta.video ? getEmbedUrl(meta.video) : null;

  return (
    <div className="font-serif">
      <style>{`
        .pd-block {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity .8s cubic-bezier(.2,.7,.2,1), transform .8s cubic-bezier(.2,.7,.2,1);
        }
        .pd-visible { opacity: 1; transform: none; }
        @media (prefers-reduced-motion: reduce) {
          .pd-block { opacity: 1; transform: none; transition: none; }
        }
      `}</style>

      <section className="mx-auto max-w-5xl px-6 py-12 md:py-20">
        <Block>
          <Link
            to="/#work"
            className="group inline-flex items-center gap-2 text-brand transition-colors duration-300 hover:text-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
          >
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
              className="transition-transform duration-300 group-hover:-translate-x-1 rtl:-scale-x-100 rtl:group-hover:translate-x-1"
            >
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
            {d.back}
          </Link>
        </Block>

        <Block delay={0.1} className="mt-8">
          <h1 className="text-4xl font-bold sm:text-5xl">{text.title}</h1>
          <p className="mt-2 text-xl text-brand sm:text-2xl">{text.subtitle}</p>
          <span className="mt-4 block h-1 w-20 rounded-full bg-coral" aria-hidden="true" />
        </Block>

        {/* Main visual: the video when there is one, otherwise the project image */}
        <Block delay={0.2} className="mt-10">
          {meta.video ? (
            <div className="relative aspect-video overflow-hidden rounded-2xl border-2 border-brand/25 bg-black shadow-lg shadow-brand/15">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={d.videoTitle(text.title)}
                  loading="lazy"
                  allow="encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <video
                  src={meta.video}
                  controls
                  preload="metadata"
                  poster={meta.image}
                  aria-label={d.videoTitle(text.title)}
                  className="absolute inset-0 h-full w-full object-contain"
                />
              )}
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border-2 border-brand/25 shadow-lg shadow-brand/15">
              <img src={meta.image} alt={text.imageAlt} className="h-auto w-full" />
            </div>
          )}
        </Block>

        <div className="mt-12 grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <Block>
              <h2 className="text-2xl font-bold sm:text-3xl">{d.overview}</h2>
              <p className="mt-3 leading-relaxed">{text.description}</p>
            </Block>

            {features.length > 0 && (
              <Block delay={0.1} className="mt-10">
                <h2 className="text-2xl font-bold sm:text-3xl">{d.featuresHeading}</h2>
                <ul className="mt-3 list-disc space-y-2 ps-5 marker:text-coral">
                  {features.map((feature, i) => (
                    <li key={i} className="leading-relaxed">
                      {feature}
                    </li>
                  ))}
                </ul>
              </Block>
            )}
          </div>

          {/* Side card: role, tools and links */}
          <Block delay={0.15}>
            <aside className="rounded-2xl bg-surface p-6 shadow-lg shadow-brand/20 sm:p-8">
              <p>
                <span className="block font-extrabold">{labels.roleLabel}</span>
                <span className="text-muted">{labels.roleValue}</span>
              </p>

              <div className="mt-5">
                <span className="block font-extrabold">{labels.toolsLabel}</span>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {meta.tools.map((tool) => (
                    <li
                      key={tool}
                      dir="ltr"
                      className="rounded-full bg-brand/15 px-3 py-1 text-sm font-medium text-brand"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>

              {(meta.github || meta.liveUrl) && (
                <div className="mt-6 flex flex-col items-start gap-3">
                  {meta.liveUrl && (
                    <a href={meta.liveUrl} target="_blank" rel="noopener noreferrer" className={linkBtn}>
                      {d.live}
                    </a>
                  )}
                  {meta.github && (
                    <a href={meta.github} target="_blank" rel="noopener noreferrer" className={linkBtn}>
                      {d.github}
                    </a>
                  )}
                </div>
              )}
            </aside>
          </Block>
        </div>

        {meta.screenshots.length > 0 && (
          <Block className="mt-14">
            <h2 className="text-2xl font-bold sm:text-3xl">{d.screenshots}</h2>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              {meta.screenshots.map((shot, i) => (
                <div key={i} className="overflow-hidden rounded-2xl border-2 border-brand/25 shadow-lg shadow-brand/15">
                  <img
                    src={shot}
                    alt={`${text.title} – ${d.screenshots} ${i + 1}`}
                    loading="lazy"
                    className="h-auto w-full transition-transform duration-700 ease-out hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </Block>
        )}
      </section>
    </div>
  );
};

/* Finds the project from the address (/projects/hawan). Unknown or unfinished projects go back home. */
const ProjectDetails = () => {
  const { slug } = useParams();
  const { t } = useSettings();

  const index = projectMeta.findIndex((p) => p.slug === slug && p.hasDetails);
  if (index === -1) return <Navigate to="/" replace />;

  return <ProjectDetailsView meta={projectMeta[index]} text={t.projects.items[index]} labels={t.projects} />;
};

export default ProjectDetails;