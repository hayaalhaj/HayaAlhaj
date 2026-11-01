import { useSettings } from "../context/SettingsContext";
import { useReveal } from "../hooks/useReveal";
 
const CourseCard = ({ course, index }) => {
  const [ref, visible] = useReveal(0.3);
 
  return (
    /* Outer element handles the scroll reveal, inner element handles the hover lift */
    <div
      ref={ref}
      className={`courses-card transition-all duration-700 ${visible ? "courses-visible" : ""}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="relative h-full overflow-hidden rounded-2xl bg-surface p-6 shadow-lg shadow-brand/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/30 sm:p-8">
        {/* Coral edge that draws across the top of the card */}
        <span
          className="courses-edge absolute start-0 top-0 h-1.5 bg-coral"
          style={{ transitionDelay: `${index * 120 + 300}ms` }}
          aria-hidden="true"
        />
        <h3 className="text-xl text-brand sm:text-2xl">{course.title}</h3>
        <p className="mt-2 leading-relaxed">{course.provider}</p>
      </div>
    </div>
  );
};
 
const Courses = () => {
  const { t } = useSettings();
  const [headRef, headVisible] = useReveal(0.5);
 
  return (
    <div className="bg-alt font-serif">
      <style>{`
        .courses-text {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1);
        }
        .courses-card {
          opacity: 0;
          transform: translateY(32px);
        }
        .courses-edge { width: 0; transition: width .9s cubic-bezier(.2,.7,.2,1); }
        .courses-bar { width: 0; transition: width .8s cubic-bezier(.2,.7,.2,1) .3s; }
 
        .courses-visible.courses-card { opacity: 1; transform: none; }
        .courses-visible .courses-edge { width: 100%; }
        .courses-visible .courses-text { opacity: 1; transform: none; }
        .courses-visible .courses-bar { width: 5rem; }
 
        @media (prefers-reduced-motion: reduce) {
          .courses-card, .courses-text { opacity: 1; transform: none; transition: none; }
          .courses-edge { width: 100%; transition: none; }
          .courses-bar { width: 5rem; transition: none; }
        }
      `}</style>
 
      <section id="courses" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16 md:py-24">
        <div ref={headRef} className={headVisible ? "courses-visible" : ""}>
          <h2 className="courses-text text-4xl font-bold sm:text-5xl">{t.courses.heading}</h2>
          <span className="courses-bar mt-3 block h-1 rounded-full bg-coral" aria-hidden="true" />
        </div>
 
        {/* 1 column on phones, 2 on tablets, 3 on desktop */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.courses.items.map((course, i) => (
            <CourseCard key={i} course={course} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
};
 
export default Courses;
 