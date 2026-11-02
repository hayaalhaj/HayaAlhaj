import { Link } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";
import { useReveal } from "../hooks/useReveal";
import { designs } from "../data/designs";

const EMAIL = "alhajhaya567@gmail.com";

// Same sections as the Navbar. "Design" only appears once designs have been added.
const navLinks = [
  { key: "about", to: "/#about" },
  { key: "work", to: "/#work" },
  { key: "design", to: "/#design" },
  { key: "experience", to: "/#experience" },
  { key: "skills", to: "/#skills" },
  { key: "courses", to: "/#courses" },
  { key: "contact", to: "/#contact" },
].filter(({ key }) => key !== "design" || designs.length > 0);

const socialBtn =
  "inline-flex items-center gap-2 rounded-full border-2 border-brand/40 px-4 py-1.5 text-sm font-medium text-brand " +
  "transition-all duration-300 hover:-translate-y-0.5 hover:border-coral hover:bg-coral hover:text-cream " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral";

const Footer = () => {
  const { t } = useSettings();
  const [ref, visible] = useReveal(0.2);

  // Smooth scroll to the top, unless the visitor prefers reduced motion
  const backToTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  const socials = [
    { label: "GitHub", href: "https://github.com/hayaalhaj", external: true },
    { label: "Behance", href: "https://www.behance.net/hayaalhaj/", external: true },
    { label: t.footer.email, href: `mailto:${EMAIL}` },
  ];

  return (
    <footer ref={ref} className={`ftr-root border-t border-brand/20 bg-alt font-serif ${visible ? "ftr-visible" : ""}`}>
      <style>{`
        .ftr-item {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1);
        }
        .ftr-visible .ftr-item { opacity: 1; transform: none; }

        @keyframes ftr-shine { to { background-position: 200% center; } }
        .ftr-shine { background-size: 200% auto; animation: ftr-shine 5s linear infinite; }

        @media (prefers-reduced-motion: reduce) {
          .ftr-item { opacity: 1; transform: none; transition: none; }
          .ftr-shine { animation: none; }
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Name and one-line description */}
          <div className="ftr-item">
            <p className="ftr-shine bg-linear-to-r from-brand via-coral to-brand bg-clip-text text-2xl font-bold tracking-wide text-transparent rtl:tracking-normal">
              {t.brand}
            </p>
            <p className="mt-2 max-w-xs leading-relaxed text-brand">{t.footer.tagline}</p>
          </div>

          {/* Quick links to the sections */}
          <nav className="ftr-item" style={{ transitionDelay: "0.1s" }} aria-label={t.footer.navHeading}>
            <h2 className="font-bold">{t.footer.navHeading}</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {navLinks.map(({ key, to }) => (
                <li key={key}>
                  <Link
                    to={to}
                    className="text-muted transition-colors duration-300 hover:text-coral focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
                  >
                    {t.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Profiles and email */}
          <div className="ftr-item" style={{ transitionDelay: "0.2s" }}>
            <h2 className="font-bold">{t.footer.connectHeading}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {socials.map(({ label, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={socialBtn}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="ftr-item mt-10 flex flex-col items-center justify-between gap-4 border-t border-brand/20 pt-6 text-sm text-muted sm:flex-row"
          style={{ transitionDelay: "0.3s" }}
        >
          <p>
            © {new Date().getFullYear()} {t.hero.name}. {t.footer.rights}
          </p>
          <p>{t.footer.builtWith}</p>
          <button
            type="button"
            onClick={backToTop}
            className="group inline-flex items-center gap-2 text-brand transition-colors duration-300 hover:text-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
          >
            {t.footer.backToTop}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-1"
            >
              <path d="M12 19V5M6 11l6-6 6 6" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;