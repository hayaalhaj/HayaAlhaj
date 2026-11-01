import { useSettings } from "../context/SettingsContext";
import { useReveal } from "../hooks/useReveal";
 
const Education = () => {
  const { t } = useSettings();
  const [ref, visible] = useReveal(0.3);
 
  return (
    <div className="bg-alt font-serif">
      <style>{`
        .edu-text {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1);
        }
        .edu-card {
          opacity: 0;
          transform: translateY(32px) scale(.97);
          transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1), box-shadow .3s ease;
        }
        .edu-bar { width: 0; transition: width .8s cubic-bezier(.2,.7,.2,1) .3s; }
        .edu-accent { height: 0; transition: height 1s cubic-bezier(.2,.7,.2,1) .5s; }
 
        .edu-visible .edu-text { opacity: 1; transform: none; }
        .edu-visible .edu-card { opacity: 1; transform: none; }
        .edu-visible .edu-bar { width: 5rem; }
        .edu-visible .edu-accent { height: 100%; }
 
        @media (prefers-reduced-motion: reduce) {
          .edu-text, .edu-card { opacity: 1; transform: none; transition: none; }
          .edu-bar { width: 5rem; transition: none; }
          .edu-accent { height: 100%; transition: none; }
        }
      `}</style>
 
      <section
        id="education"
        ref={ref}
        className={`mx-auto max-w-6xl scroll-mt-20 px-6 py-16 md:py-24 ${visible ? "edu-visible" : ""}`}
      >
        <h2 className="edu-text text-4xl font-bold sm:text-5xl">{t.education.heading}</h2>
        <span className="edu-bar mt-3 block h-1 rounded-full bg-coral" aria-hidden="true" />
 
        {/* Card: full width on phones, capped width on larger screens */}
        <div
          className="edu-card relative mt-12 w-full max-w-2xl overflow-hidden rounded-2xl bg-surface p-6 shadow-lg shadow-brand/20 hover:shadow-xl hover:shadow-brand/30 sm:p-10"
          style={{ transitionDelay: "0.2s" }}
        >
          {/* Coral edge that draws down the side of the card */}
          <span className="edu-accent absolute start-0 top-0 w-1.5 bg-coral" aria-hidden="true" />
 
          <p className="edu-text text-lg text-brand sm:text-xl" style={{ transitionDelay: "0.4s" }}>
            {t.education.degree}
          </p>
          <h3 className="edu-text my-3 text-2xl font-bold sm:text-3xl" style={{ transitionDelay: "0.5s" }}>
            {t.education.university}
          </h3>
 
          <p className="edu-text mt-8 text-brand sm:mt-10" style={{ transitionDelay: "0.65s" }}>
            {t.education.projectLabel}
          </p>
          <p className="edu-text" style={{ transitionDelay: "0.75s" }}>
            {t.education.projectName}
          </p>
        </div>
      </section>
    </div>
  );
};
 
export default Education;
 