import { useSettings } from "../context/SettingsContext";
import { useReveal } from "../hooks/useReveal";
 
const EMAIL = "alhajhaya567@gmail.com";
 
const fieldStyle =
  "mt-1 w-full rounded-lg border border-brand/40 bg-surface p-2.5 text-ink transition-colors duration-300 " +
  "focus:border-coral focus:outline-2 focus:outline-offset-2 focus:outline-coral/40";
 
const sendBtn =
  "group inline-flex items-center gap-2 rounded-full border-2 border-coral bg-coral px-6 py-2.5 font-medium text-cream " +
  "transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:bg-brand hover:shadow-lg hover:shadow-brand/30 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral";
 
const Contact = () => {
  const { t } = useSettings();
  const [headRef, headVisible] = useReveal(0.5);
  const [formRef, formVisible] = useReveal(0.2);
  const [infoRef, infoVisible] = useReveal(0.2);
 
  // Email, phone and links are always written left-to-right, even inside the Arabic page
  const info = [
    { label: t.contact.labels.location, value: t.contact.location },
    { label: t.contact.labels.email, value: EMAIL, href: `mailto:${EMAIL}`, ltr: true },
    { label: t.contact.labels.phone, value: "+963945520788", href: "tel:+963945520788", ltr: true },
    {
      label: t.contact.labels.github,
      value: "https://github.com/hayaalhaj",
      href: "https://github.com/hayaalhaj",
      external: true,
      ltr: true,
    },
    {
      label: t.contact.labels.behance,
      value: "https://www.behance.net/hayaalhaj/",
      href: "https://www.behance.net/hayaalhaj/",
      external: true,
      ltr: true,
    },
  ];
 
  /* Opens the visitor's email app with the message ready to send.
     To send directly from the site later, replace this with EmailJS or Formspree. */
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const message = data.get("message");
 
    const subject = encodeURIComponent(t.contact.mailSubject(name));
    const body = encodeURIComponent(`${message}\n\n${name} (${email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };
 
  return (
    <div className="font-serif">
      <style>{`
        .contact-text {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1);
        }
        .contact-card {
          opacity: 0;
          transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1);
        }
        /* --dir is 1 in English and -1 in Arabic, so cards slide in from the correct side */
        .contact-from-start { transform: translateX(calc(-48px * var(--dir, 1))); }
        .contact-from-end { transform: translateX(calc(48px * var(--dir, 1))); }
        .contact-bar { width: 0; transition: width .8s cubic-bezier(.2,.7,.2,1) .3s; }
        .contact-edge { height: 0; transition: height 1s cubic-bezier(.2,.7,.2,1) .4s; }
 
        .contact-visible .contact-text { opacity: 1; transform: none; }
        .contact-visible.contact-card { opacity: 1; transform: none; }
        .contact-visible .contact-bar { width: 5rem; }
        .contact-visible .contact-edge { height: 100%; }
 
        /* On phones the cards rise up instead of sliding sideways, so nothing causes horizontal scroll */
        @media (max-width: 1023px) {
          .contact-from-start, .contact-from-end { transform: translateY(32px); }
        }
 
        @media (prefers-reduced-motion: reduce) {
          .contact-text, .contact-card { opacity: 1; transform: none; transition: none; }
          .contact-bar { width: 5rem; transition: none; }
          .contact-edge { height: 100%; transition: none; }
        }
      `}</style>
 
      <section id="contact" className="mx-auto max-w-6xl scroll-mt-20 overflow-hidden px-6 py-16 md:py-24">
        <div ref={headRef} className={headVisible ? "contact-visible" : ""}>
          <h2 className="contact-text text-4xl font-bold sm:text-5xl">{t.contact.heading}</h2>
          <span className="contact-bar mt-3 block h-1 rounded-full bg-coral" aria-hidden="true" />
        </div>
 
        {/* Stacked on phones and tablets, side by side on desktop, both cards the same height */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-10">
          {/* Form card */}
          <div
            ref={formRef}
            className={`contact-card contact-from-start relative overflow-hidden rounded-2xl bg-surface p-6 shadow-lg shadow-brand/20 sm:p-10 ${
              formVisible ? "contact-visible" : ""
            }`}
          >
            <span className="contact-edge absolute start-0 top-0 w-1.5 bg-coral" aria-hidden="true" />
 
            <h3 className="contact-text text-xl text-brand sm:text-2xl" style={{ transitionDelay: "0.3s" }}>
              {t.contact.getInTouch}
            </h3>
 
            <form onSubmit={handleSubmit}>
              <div className="contact-text mt-5" style={{ transitionDelay: "0.4s" }}>
                <label htmlFor="name" className="block text-brand">
                  {t.contact.name}
                </label>
                <input type="text" id="name" name="name" dir="auto" required autoComplete="name" className={fieldStyle} />
              </div>
              <div className="contact-text mt-5" style={{ transitionDelay: "0.5s" }}>
                <label htmlFor="email" className="block text-brand">
                  {t.contact.email}
                </label>
                <input type="email" id="email" name="email" dir="auto" required autoComplete="email" className={fieldStyle} />
              </div>
              <div className="contact-text mt-5" style={{ transitionDelay: "0.6s" }}>
                <label htmlFor="message" className="block text-brand">
                  {t.contact.message}
                </label>
                <textarea id="message" name="message" dir="auto" rows="4" required className={fieldStyle} />
              </div>
              <div className="contact-text mt-6" style={{ transitionDelay: "0.7s" }}>
                <button type="submit" className={sendBtn}>
                  {t.contact.send}
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
                </button>
              </div>
            </form>
          </div>
 
          {/* Contact information card */}
          <div
            ref={infoRef}
            className={`contact-card contact-from-end relative flex flex-col overflow-hidden rounded-2xl bg-surface p-6 shadow-lg shadow-brand/20 sm:p-10 ${
              infoVisible ? "contact-visible" : ""
            }`}
          >
            <span className="contact-edge absolute start-0 top-0 w-1.5 bg-brand" aria-hidden="true" />
 
            <h3 className="contact-text text-xl text-brand sm:text-2xl" style={{ transitionDelay: "0.3s" }}>
              {t.contact.infoHeading}
            </h3>
 
            {/* Each detail sits in its own box; the boxes stretch so the card matches the form's height */}
            <ul className="mt-5 flex flex-1 flex-col gap-3">
              {info.map((item, i) => (
                <li
                  key={i}
                  className="contact-text flex flex-1"
                  style={{ transitionDelay: `${0.4 + i * 0.1}s` }}
                >
                  <div className="group relative flex w-full flex-col items-start justify-center rounded-xl border border-brand/35 px-4 py-3 transition-colors duration-300 hover:border-coral hover:bg-alt">
                    <span className="block text-sm text-brand">{item.label}</span>
                    {item.href ? (
                      /* The empty ::after makes the whole box clickable */
                      <a
                        href={item.href}
                        dir={item.ltr ? "ltr" : undefined}
                        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="break-all text-muted transition-colors duration-300 after:absolute after:inset-0 after:rounded-xl group-hover:text-coral focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-muted">{item.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
 
export default Contact;
 