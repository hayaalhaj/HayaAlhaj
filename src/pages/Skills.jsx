import { useSettings } from "../context/SettingsContext";
import { useReveal } from "../hooks/useReveal";
 
const SkillCard = ({ category, index }) => {
  const [ref, visible] = useReveal(0.25);
 
  return (
    /* Outer element handles the scroll reveal, inner element handles the hover lift */
    <div
      ref={ref}
      className={`skills-card transition-all duration-700 ${visible ? "skills-visible" : ""}`}
      style={{ transitionDelay: `${(index % 2) * 120}ms` }}
    >
      <div className="h-full rounded-2xl border-2 border-brand/25 bg-alt p-6 transition-all duration-300 hover:-translate-y-1 hover:border-coral/60 hover:shadow-lg hover:shadow-brand/20 sm:p-8">
        <h3 className="skills-text text-xl text-brand sm:text-2xl">{category.title}</h3>
 
        <ul className="mt-5 flex flex-wrap gap-2">
          {category.skills.map((skill, i) => (
            <li
              key={skill}
              className="skills-chip rounded-full border border-brand/40 bg-surface px-4 py-1.5 text-sm font-medium text-brand hover:border-coral hover:bg-coral hover:text-cream"
              style={{ "--chip-delay": `${0.2 + i * 0.07}s` }}
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
 
const Skills = () => {
  const { t } = useSettings();
  const [headRef, headVisible] = useReveal(0.5);
 
  return (
    <div className="font-serif">
      <style>{`
        .skills-text {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1);
        }
        .skills-card {
          opacity: 0;
          transform: translateY(32px);
        }
        .skills-chip {
          opacity: 0;
          transform: scale(.8);
          transition: opacity .5s ease var(--chip-delay), transform .5s cubic-bezier(.3,1.6,.5,1) var(--chip-delay),
                      background-color .3s ease 0s, border-color .3s ease 0s, color .3s ease 0s;
        }
        .skills-bar { width: 0; transition: width .8s cubic-bezier(.2,.7,.2,1) .3s; }
 
        .skills-visible.skills-card { opacity: 1; transform: none; }
        .skills-visible .skills-text { opacity: 1; transform: none; }
        .skills-visible .skills-chip { opacity: 1; transform: none; }
        .skills-visible .skills-bar { width: 5rem; }
 
        @media (prefers-reduced-motion: reduce) {
          .skills-card, .skills-text, .skills-chip { opacity: 1; transform: none; transition: none; }
          .skills-bar { width: 5rem; transition: none; }
        }
      `}</style>
 
      <section id="skills" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16 md:py-24">
        <div ref={headRef} className={headVisible ? "skills-visible" : ""}>
          <h2 className="skills-text text-4xl font-bold sm:text-5xl">{t.skills.heading}</h2>
          <span className="skills-bar mt-3 block h-1 rounded-full bg-coral" aria-hidden="true" />
        </div>
 
        {/* 1 column on phones, 2 columns from tablet up */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {t.skills.categories.map((category, i) => (
            <SkillCard key={i} category={category} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
};
 
export default Skills;
 