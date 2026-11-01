import flower from "../assets/pngegg - 2026-09-29T093627.929.png";
import { useSettings } from "../context/SettingsContext";
import { useReveal } from "../hooks/useReveal";
 
const About = () => {
  const { t } = useSettings();
  const [ref, visible] = useReveal(0.2);
 
  return (
    <div className="relative overflow-hidden">
      <style>{`
        .about-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity .8s cubic-bezier(.2,.7,.2,1), transform .8s cubic-bezier(.2,.7,.2,1);
        }
        .about-line {
          height: 0;
          transition: height 1.2s cubic-bezier(.2,.7,.2,1) .2s;
        }
        .about-bar {
          width: 0;
          transition: width .8s cubic-bezier(.2,.7,.2,1) .35s;
        }
        .about-flower {
          opacity: 0;
          transform: rotate(calc(18deg * var(--dir, 1))) scale(.9);
          transform-origin: top right;
          transition: opacity 1s ease .3s, transform 1.2s cubic-bezier(.2,.7,.2,1) .3s;
        }
        .about-visible .about-reveal,
        .about-visible .about-flower { opacity: 1; transform: none; }
        .about-visible .about-line { height: 100%; }
        .about-visible .about-bar { width: 5rem; }
 
        /* The flower sways gently from the corner, like it is hanging there */
        @keyframes about-sway {
          0%, 100% { transform: rotate(calc(-4deg * var(--dir, 1))); }
          50% { transform: rotate(calc(5deg * var(--dir, 1))); }
        }
        .about-sway { transform-origin: top right; animation: about-sway 8s ease-in-out infinite; }
 
        /* In Arabic the flower moves to the top-left corner, so it hangs from the left */
        [dir="rtl"] .about-flower,
        [dir="rtl"] .about-sway { transform-origin: top left; }
 
        @media (prefers-reduced-motion: reduce) {
          .about-reveal, .about-flower { opacity: 1; transform: none; transition: none; }
          .about-line { height: 100%; transition: none; }
          .about-bar { width: 5rem; transition: none; }
          .about-sway { animation: none; }
        }
      `}</style>
 
      {/* Flower stays in the top corner (top-right in English, top-left in Arabic), smaller on phones */}
      <div className="about-flower pointer-events-none absolute end-0 top-0 z-10 w-24 sm:w-32 md:w-44 lg:w-52">
        <img src={flower} alt="" aria-hidden="true" width={200} height={200} className="about-sway h-auto w-full" />
      </div>
 
      <section
        id="about"
        ref={ref}
        className={`mx-auto max-w-6xl scroll-mt-20 px-6 pb-16 pt-20 font-serif md:py-24 ${
          visible ? "about-visible" : ""
        }`}
      >
        {/* A coral line draws itself down the side of the text */}
        <div className="relative max-w-3xl ps-6 md:ps-8">
          <span
            className="about-line absolute start-0 top-0 w-1 rounded-full bg-coral"
            aria-hidden="true"
          />
 
          <h2 className="about-reveal text-4xl font-bold sm:text-5xl" style={{ transitionDelay: "0.1s" }}>
            {t.about.title}
          </h2>
          <span className="about-bar mt-3 block h-1 rounded-full bg-brand" aria-hidden="true" />
 
          <p
            className="about-reveal mt-5 text-xl font-medium text-brand sm:text-2xl"
            style={{ transitionDelay: "0.25s" }}
          >
            {t.about.subtitle}
          </p>
 
          <p className="about-reveal mt-5 leading-relaxed" style={{ transitionDelay: "0.4s" }}>
            {t.about.p1}
          </p>
 
          <p className="about-reveal mt-3 leading-relaxed" style={{ transitionDelay: "0.55s" }}>
            {t.about.p2}
          </p>
        </div>
      </section>
    </div>
  );
};
 
export default About;