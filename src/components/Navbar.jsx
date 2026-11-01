import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";
import { designs } from "../data/designs";

const allLinks = [
  { key: "about", href: "/#about" },
  { key: "work", href: "/#work" },
  { key: "design", href: "/#design" },
  { key: "experience", href: "/#experience" },
  { key: "skills", href: "/#skills" },
  { key: "courses", href: "/#courses" },
  { key: "contact", href: "/#contact" },
];

// The Design link only appears once designs have been added to data/designs.js
const links = allLinks.filter(({ key }) => key !== "design" || designs.length > 0);

const linkBase =
  "relative inline-block transition-colors duration-300 hover:text-coral " +
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral " +
  "after:absolute after:start-0 after:-bottom-1 after:h-0.5 after:bg-coral after:transition-all after:duration-300 hover:after:w-full";

const resumeStyle =
  "inline-block rounded-full border-2 border-brand px-5 py-1.5 font-medium text-brand " +
  "transition-all duration-300 hover:-translate-y-1 hover:border-coral hover:bg-coral hover:text-cream hover:shadow-lg hover:shadow-coral/30 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral";

const controlStyle =
  "inline-flex h-10 min-w-10 items-center justify-center rounded-full border-2 border-brand/50 text-brand " +
  "transition-all duration-300 hover:-translate-y-0.5 hover:border-coral hover:text-coral " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral";

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

const Navbar = () => {
  const { t, theme, toggleTheme, toggleLang } = useSettings();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 10);
  const [active, setActive] = useState("");

  const close = () => setOpen(false);

  // Compact the navbar and add a shadow once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link of the section currently in view (if the section has a matching id)
  useEffect(() => {
    const sections = links.map(({ href }) => document.querySelector(href.slice(1))).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  // Close the mobile menu with Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`nav-drop sticky top-0 z-50 border-b border-brand/20 bg-nav/90 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "shadow-md shadow-brand/20" : ""
      }`}
    >
      <style>{`
        @keyframes nav-drop { from { opacity: 0; transform: translateY(-100%); } to { opacity: 1; transform: none; } }
        @keyframes nav-fade { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }
        @keyframes nav-shine { to { background-position: 200% center; } }
        @keyframes nav-spin { from { opacity: 0; transform: rotate(-90deg) scale(.5); } to { opacity: 1; transform: none; } }

        .nav-drop { animation: nav-drop .7s cubic-bezier(.2,.7,.2,1) both; }
        .nav-item { animation: nav-fade .6s cubic-bezier(.2,.7,.2,1) both; }
        .nav-shine { background-size: 200% auto; animation: nav-shine 5s linear infinite; }
        .nav-spin { display: inline-flex; animation: nav-spin .4s cubic-bezier(.2,.7,.2,1) both; }

        @media (prefers-reduced-motion: reduce) {
          .nav-drop, .nav-item, .nav-shine, .nav-spin { animation: none; }
        }
      `}</style>

      <nav
        aria-label={t.nav.mainLabel}
        className={`mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 font-serif text-brand transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        {/* Logo with the same moving gradient as the Hero name */}
        <Link
          to="/"
          onClick={close}
          className="nav-shine bg-linear-to-r from-brand via-coral to-brand bg-clip-text text-2xl font-bold tracking-wide text-transparent rtl:tracking-normal"
        >
          {t.brand}
        </Link>

        {/* Desktop links (the menu button takes over below 1024px) */}
        <ul className="hidden items-center gap-6 font-medium lg:flex xl:gap-8">
          {links.map(({ key, href }, i) => {
            const isActive = active === href.slice(1);
            return (
              <li key={key} className="nav-item" style={{ animationDelay: `${0.25 + i * 0.08}s` }}>
                <Link
                  to={href}
                  aria-current={isActive ? "location" : undefined}
                  className={`${linkBase} ${isActive ? "text-coral after:w-full" : "after:w-0"}`}
                >
                  {t.nav[key]}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language switch: shows the language you will switch to */}
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t.nav.switchLanguage}
            className={`${controlStyle} px-3 text-sm font-medium`}
          >
            {t.nav.otherLanguage}
          </button>

          {/* Theme switch: sun in dark mode, moon in light mode */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? t.nav.switchToLight : t.nav.switchToDark}
            className={controlStyle}
          >
            <span key={theme} className="nav-spin">
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </span>
          </button>

          <a href="/resume.pdf" download="Haya-Alhaj-Resume.pdf" className={`hidden lg:inline-block ${resumeStyle}`}>
            {t.nav.resume}
          </a>

          {/* Mobile menu button: three lines that morph into an X */}
          <button
            type="button"
            className="relative h-10 w-10 lg:hidden"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`absolute start-2.5 top-[13px] h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute start-2.5 top-[20px] h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute start-2.5 top-[27px] h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu: slides open smoothly, links are unreachable by keyboard while closed */}
      <div
        id="mobile-menu"
        className={`grid font-serif text-brand transition-[grid-template-rows,visibility] duration-300 lg:hidden ${
          open ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-5 border-t border-brand/20 px-6 py-5 text-lg font-medium">
            {links.map(({ key, href }, i) => (
              <li
                key={key}
                className={`transition-all duration-300 ${
                  open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0 rtl:translate-x-4"
                }`}
                style={{ transitionDelay: open ? `${i * 50}ms` : "0ms" }}
              >
                <Link
                  to={href}
                  onClick={close}
                  className={`transition-colors hover:text-coral ${active === href.slice(1) ? "text-coral" : ""}`}
                >
                  {t.nav[key]}
                </Link>
              </li>
            ))}
            <li>
              <a href="/resume.pdf" download="Haya-Alhaj-Resume.pdf" onClick={close} className={resumeStyle}>
                {t.nav.resume}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;