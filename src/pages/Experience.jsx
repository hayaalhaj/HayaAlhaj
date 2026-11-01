import { useSettings } from "../context/SettingsContext";
import { useReveal } from "../hooks/useReveal";
 
const ExperienceItem = ({ item, isLast }) => {
  const [ref, visible] = useReveal(0.25);
 
  return (
    <article
      ref={ref}
      className={`relative ps-8 md:ps-10 ${isLast ? "" : "pb-12"} ${visible ? "exp-visible" : ""}`}
    >
      {/* The line draws itself down to the next job (skipped on the last one) */}
      {!isLast && (
        <span className="exp-line absolute start-[7px] top-4 w-0.5 rounded-full bg-brand/40" aria-hidden="true" />
      )}
 
      {/* Dot pops in when the item appears */}
      <span
        className="exp-dot absolute start-0 top-2 h-4 w-4 rounded-full border-[3px] border-coral bg-page"
        aria-hidden="true"
      />
 
      <h3 className="exp-text text-2xl font-bold" style={{ transitionDelay: "0.1s" }}>
        {item.title}
      </h3>
      <p className="exp-text mt-2 text-brand" style={{ transitionDelay: "0.2s" }}>
        <span className="font-semibold">{item.company}</span>
        <span className="block sm:ms-2 sm:inline">{item.period}</span>
      </p>
 
      <ul className="mt-4 list-disc space-y-2 ps-5 marker:text-coral">
        {item.points.map((point, i) => (
          <li key={i} className="exp-text leading-relaxed" style={{ transitionDelay: `${0.3 + i * 0.12}s` }}>
            {point}
          </li>
        ))}
      </ul>
    </article>
  );
};
 
const Experience = () => {
  const { t } = useSettings();
  const [headRef, headVisible] = useReveal(0.5);
  const items = t.experience.items;
 
  return (
    <div className="font-serif">
      <style>{`
        .exp-text {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1);
        }
        .exp-dot {
          opacity: 0;
          transform: scale(0);
          transition: opacity .4s ease, transform .5s cubic-bezier(.3,1.6,.5,1);
        }
        .exp-line {
          height: 0;
          transition: height 1.2s cubic-bezier(.2,.7,.2,1) .3s;
        }
        .exp-bar { width: 0; transition: width .8s cubic-bezier(.2,.7,.2,1) .3s; }
 
        .exp-visible .exp-text { opacity: 1; transform: none; }
        .exp-visible .exp-dot { opacity: 1; transform: none; }
        .exp-visible .exp-line { height: calc(100% - 1rem); }
        .exp-visible .exp-bar { width: 5rem; }
 
        @media (prefers-reduced-motion: reduce) {
          .exp-text, .exp-dot { opacity: 1; transform: none; transition: none; }
          .exp-line { height: calc(100% - 1rem); transition: none; }
          .exp-bar { width: 5rem; transition: none; }
        }
      `}</style>
 
      <section id="experience" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16 md:py-24">
        <div ref={headRef} className={headVisible ? "exp-visible" : ""}>
          <h2 className="exp-text text-4xl font-bold sm:text-5xl">{t.experience.heading}</h2>
          <span className="exp-bar mt-3 block h-1 rounded-full bg-coral" aria-hidden="true" />
        </div>
 
        {/* Vertical timeline: the jobs really are in sequence, so the line carries meaning */}
        <div className="mt-12 max-w-3xl">
          {items.map((item, i) => (
            <ExperienceItem key={i} item={item} isLast={i === items.length - 1} />
          ))}
        </div>
      </section>
    </div>
  );
};
 
export default Experience;
 