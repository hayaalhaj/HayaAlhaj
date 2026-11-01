import { useEffect, useState } from "react";
import img from "../assets/Untitled-1.png";
import { useSettings } from "../context/SettingsContext";
 
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 
/* Types and deletes each role in turn.
   With reduced motion it simply shows all roles as plain text. */
const Typewriter = ({ words, separator, typeSpeed = 80, deleteSpeed = 40, pause = 1600 }) => {
  const [reduced] = useState(prefersReducedMotion);
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
 
  useEffect(() => {
    if (reduced) return;
 
    const word = words[index];
    let delay = deleting ? deleteSpeed : typeSpeed;
    if (!deleting && text === word) delay = pause;
 
    const timer = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);
 
    return () => clearTimeout(timer);
  }, [reduced, text, deleting, index, words, typeSpeed, deleteSpeed, pause]);
 
  const full = words.join(separator);
 
  return (
    <>
      <span className="sr-only">{full}</span>
      <span aria-hidden="true">
        {reduced ? full : text}
        {!reduced && (
          <span className="hero-cursor ms-0.5 inline-block w-0.5 bg-coral align-middle" style={{ height: "1.2em" }} />
        )}
      </span>
    </>
  );
};
 
const primaryBtn =
  "group inline-flex items-center gap-2 rounded-full border-2 border-coral bg-coral px-6 py-2.5 font-medium text-cream " +
  "transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:bg-brand hover:shadow-lg hover:shadow-brand/30 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral";
 
const secondaryBtn =
  "inline-block rounded-full border-2 border-brand px-6 py-2.5 font-medium text-brand " +
  "transition-all duration-300 hover:-translate-y-1 hover:border-coral hover:bg-coral hover:text-cream hover:shadow-lg hover:shadow-coral/30 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral";
 
const Hero = () => {
  const { t, lang } = useSettings();
 
  return (
    <div className="overflow-hidden bg-alt">
      {/* Keyframes live here so no Tailwind config changes are needed */}
      <style>{`
        @keyframes hero-fade-up { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }
        @keyframes hero-pop { from { opacity: 0; transform: scale(.85); } to { opacity: 1; transform: none; } }
        @keyframes hero-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }
        @keyframes hero-blob {
          0%, 100% { border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%; transform: rotate(0deg) scale(1); }
          50% { border-radius: 42% 58% 46% 54% / 58% 42% 58% 42%; transform: rotate(14deg) scale(1.06); }
        }
        @keyframes hero-shine { to { background-position: 200% center; } }
        @keyframes hero-blink { 50% { opacity: 0; } }
        @keyframes hero-wave { 0%, 60%, 100% { transform: rotate(0); } 10%, 30% { transform: rotate(16deg); } 20%, 40% { transform: rotate(-10deg); } 50% { transform: rotate(8deg); } }
 
        .hero-in { animation: hero-fade-up .8s cubic-bezier(.2,.7,.2,1) both; }
        .hero-img-in { animation: hero-pop 1s cubic-bezier(.2,.7,.2,1) .3s both; }
        .hero-float { animation: hero-float 6s ease-in-out infinite; }
        .hero-blob { animation: hero-blob 12s ease-in-out infinite; }
        .hero-shine { background-size: 200% auto; animation: hero-shine 5s linear infinite; }
        .hero-cursor { animation: hero-blink 1s step-end infinite; }
        .hero-wave { display: inline-block; transform-origin: 70% 70%; animation: hero-wave 2.5s ease-in-out 1.2s 2; }
 
        @media (prefers-reduced-motion: reduce) {
          .hero-in, .hero-img-in, .hero-float, .hero-blob, .hero-shine, .hero-cursor, .hero-wave { animation: none; }
        }
      `}</style>
 
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-12 font-serif md:grid-cols-2 md:py-20">
        <div className="text-center md:text-start">
          <h1 className="text-4xl font-black leading-tight sm:text-5xl">
            <span className="hero-in block" style={{ animationDelay: "0.1s" }}>
              {t.hero.greeting} <span className="hero-wave" aria-hidden="true">👋</span>
            </span>
            <span
              className="hero-in hero-shine mt-2 block bg-linear-to-r from-brand via-coral to-brand bg-clip-text text-transparent"
              style={{ animationDelay: "0.25s" }}
            >
              {t.hero.name}
            </span>
          </h1>
 
          {/* key={lang} restarts the typing when the language changes */}
          <p className="hero-in mt-5 min-h-8 text-xl font-medium" style={{ animationDelay: "0.4s" }}>
            <Typewriter key={lang} words={t.hero.roles} separator={t.hero.separator} />
          </p>
 
          <p
            className="hero-in mx-auto mt-5 max-w-md leading-relaxed text-brand md:mx-0"
            style={{ animationDelay: "0.55s" }}
          >
            {t.hero.description}
          </p>
 
          <div
            className="hero-in mt-8 flex flex-wrap justify-center gap-3 md:justify-start"
            style={{ animationDelay: "0.7s" }}
          >
            <a href="#work" className={primaryBtn}>
              {t.hero.viewWork}
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
            </a>
            <a href="#contact" className={secondaryBtn}>
              {t.hero.letsWork}
            </a>
          </div>
        </div>
 
        {/* Image with animated blob, floating motion and small floating dots */}
        <div className="hero-img-in relative mx-auto w-full max-w-sm md:max-w-md">
          <div className="hero-blob absolute inset-6 bg-coral/25" aria-hidden="true" />
          <span
            className="hero-float absolute start-2 top-6 h-4 w-4 rounded-full bg-brand"
            style={{ animationDelay: "0.5s" }}
            aria-hidden="true"
          />
          <span
            className="hero-float absolute bottom-10 end-2 h-6 w-6 rounded-full bg-coral"
            style={{ animationDelay: "1.5s" }}
            aria-hidden="true"
          />
          <span
            className="hero-float absolute end-8 top-2 h-3 w-3 rounded-full border-2 border-brand"
            style={{ animationDelay: "2.5s" }}
            aria-hidden="true"
          />
          <img
            src={img}
            alt={t.hero.imageAlt}
            width={500}
            height={500}
            className="hero-float relative h-auto w-full object-contain"
          />
        </div>
      </section>
    </div>
  );
};
 
export default Hero;
 