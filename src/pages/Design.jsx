import { useCallback, useEffect, useRef, useState } from "react";
import { useSettings } from "../context/SettingsContext";
import { useReveal } from "../hooks/useReveal";
import { designs, behanceUrl } from "../data/designs";
import { getEmbedUrl, parseEmbed } from "../utils/embed";

const badgeStyle = "rounded-full bg-page/85 px-3 py-1 text-xs font-medium text-brand backdrop-blur";

const iconBtn =
  "grid h-11 w-11 place-items-center rounded-full bg-page/90 text-brand transition-all duration-300 " +
  "hover:bg-coral hover:text-cream disabled:pointer-events-none disabled:opacity-30 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral";

const behanceBtn =
  "group inline-flex items-center gap-2 rounded-full border-2 border-brand px-6 py-2.5 font-medium text-brand " +
  "transition-all duration-300 hover:-translate-y-1 hover:border-coral hover:bg-coral hover:text-cream hover:shadow-lg hover:shadow-coral/30 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral";

const Chevron = ({ flip }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={flip ? "-scale-x-100 rtl:scale-x-100" : "rtl:-scale-x-100"}
  >
    <path d="M15 5l-7 7 7 7" />
  </svg>
);

/* ---------- Card in the gallery ---------- */
const DesignCard = ({ item, title, onOpen, t }) => {
  const [ref, visible] = useReveal(0.15);
  const cover = item.cover ?? item.slides?.[0];
  const count = item.slides?.length ?? 0;

  // Behance projects are shown directly inside the page as a Behance card
  const embed = item.embed ? parseEmbed(item.embed) : null;
  if (item.embed && !embed) return null; // not a Behance embed code, so ignore it

  return (
    <div ref={ref} className={`dsg-card mb-6 break-inside-avoid ${visible ? "dsg-visible" : ""}`}>
      {embed ? (
        <div className="overflow-hidden rounded-2xl border-2 border-brand/25 bg-surface shadow-lg shadow-brand/15">
          <div className="relative w-full" style={{ aspectRatio: embed.ratio }}>
            <iframe
              src={embed.src}
              title={title}
              loading="lazy"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
          <span className="block p-3 text-sm font-medium">{title}</span>
        </div>
      ) : (
      <button
        type="button"
        onClick={onOpen}
        aria-label={t.design.open(title)}
        className="group relative block w-full overflow-hidden rounded-2xl border-2 border-brand/25 bg-surface text-start shadow-lg shadow-brand/15 transition-all duration-300 hover:-translate-y-1 hover:border-coral/60 hover:shadow-xl hover:shadow-brand/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
      >
        <img
          src={cover}
          alt=""
          loading="lazy"
          className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="absolute start-3 top-3 flex flex-wrap gap-2">
          {item.concept && <span className={badgeStyle}>{t.design.conceptLabel}</span>}
          {count > 1 && <span className={badgeStyle}>{t.design.slidesLabel(count)}</span>}
          {item.video && <span className={badgeStyle}>{t.design.videoLabel}</span>}
        </div>

        <span className="block p-3 text-sm font-medium">{title}</span>
      </button>
      )}
    </div>
  );
};

/* ---------- Full-screen viewer (slides or video) ---------- */
const Lightbox = ({ item, title, onClose, t, isRtl }) => {
  const slides = item.slides ?? [];
  const total = slides.length;
  const [index, setIndex] = useState(0);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const touchStartX = useRef(null);
  const embedUrl = item.video ? getEmbedUrl(item.video) : null;

  const next = useCallback(() => setIndex((i) => Math.min(i + 1, total - 1)), [total]);
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);

  // Move focus into the viewer, lock the page scroll, and give focus back when it closes
  useEffect(() => {
    const previousFocus = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      previousFocus?.focus?.();
    };
  }, []);

  // Keyboard: Esc closes, arrows change slide (reversed in Arabic), Tab stays inside the viewer
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        (isRtl ? prev : next)();
      } else if (e.key === "ArrowLeft") {
        (isRtl ? next : prev)();
      } else if (e.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll("button:not(:disabled), a[href]");
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, next, prev, isRtl]);

  // Swipe on phones
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 50) return;
    const goForward = isRtl ? dx > 0 : dx < 0;
    (goForward ? next : prev)();
  };

  return (
    <div
      className="dsg-overlay fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative flex w-full max-w-5xl flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t.design.close}
          className={`${iconBtn} fixed end-4 top-4 z-10`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {item.video ? (
          <div className="aspect-video w-full max-w-4xl overflow-hidden rounded-2xl bg-black">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={title}
                allow="encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                className="h-full w-full"
              />
            ) : (
              <video src={item.video} controls preload="metadata" poster={item.cover} aria-label={title} className="h-full w-full object-contain" />
            )}
          </div>
        ) : (
          <div className="flex w-full items-center justify-center gap-2 sm:gap-4">
            {/* In Arabic this row flips automatically, so "previous" stays on the reading-start side */}
            <button type="button" onClick={prev} disabled={index === 0} aria-label={t.design.prev} className={`${iconBtn} shrink-0`}>
              <Chevron />
            </button>

            <img
              key={index}
              src={slides[index]}
              alt={`${title} – ${t.design.counter(index + 1, total)}`}
              className="dsg-slide max-h-[72vh] min-w-0 max-w-full rounded-xl object-contain"
            />

            <button type="button" onClick={next} disabled={index === total - 1} aria-label={t.design.next} className={`${iconBtn} shrink-0`}>
              <Chevron flip />
            </button>
          </div>
        )}

        <div className="text-center text-cream">
          <p className="font-medium">{title}</p>
          {!item.video && total > 1 && (
            <>
              <p className="mt-1 text-sm opacity-80" aria-live="polite">
                {t.design.counter(index + 1, total)}
              </p>
              <div className="mt-3 flex justify-center gap-2" aria-hidden="true">
                {slides.map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-coral" : "w-2 bg-cream/50"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* ---------- The section ---------- */
const Design = () => {
  const { t, lang, isRtl } = useSettings();
  const [headRef, headVisible] = useReveal(0.5);
  const [filter, setFilter] = useState("all");
  const [openIndex, setOpenIndex] = useState(null);
  const closeLightbox = useCallback(() => setOpenIndex(null), []);

  // Nothing to show yet: the section (and its Navbar link) stay hidden until designs are added
  if (designs.length === 0) return null;

  const categories = ["social", "carousel", "motion"].filter((c) => designs.some((d) => d.category === c));
  const shown = designs.map((item, i) => ({ item, i })).filter(({ item }) => filter === "all" || item.category === filter);
  const openItem = openIndex === null ? null : designs[openIndex];

  return (
    <div className="font-serif">
      <style>{`
        .dsg-text {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1);
        }
        .dsg-card {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity .8s cubic-bezier(.2,.7,.2,1), transform .8s cubic-bezier(.2,.7,.2,1);
        }
        .dsg-bar { width: 0; transition: width .8s cubic-bezier(.2,.7,.2,1) .3s; }

        .dsg-visible .dsg-text, .dsg-visible.dsg-card { opacity: 1; transform: none; }
        .dsg-visible .dsg-bar { width: 5rem; }

        @keyframes dsg-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes dsg-slide { from { opacity: 0; transform: scale(.97); } to { opacity: 1; transform: none; } }
        .dsg-overlay { animation: dsg-fade .25s ease both; }
        .dsg-slide { animation: dsg-slide .35s cubic-bezier(.2,.7,.2,1) both; }

        @media (prefers-reduced-motion: reduce) {
          .dsg-text, .dsg-card { opacity: 1; transform: none; transition: none; }
          .dsg-bar { width: 5rem; transition: none; }
          .dsg-overlay, .dsg-slide { animation: none; }
        }
      `}</style>

      <section id="design" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16 md:py-24">
        <div ref={headRef} className={headVisible ? "dsg-visible" : ""}>
          <h2 className="dsg-text text-4xl font-bold sm:text-5xl">{t.design.heading}</h2>
          <span className="dsg-bar mt-3 block h-1 rounded-full bg-coral" aria-hidden="true" />
          <p className="dsg-text mt-5 max-w-2xl leading-relaxed text-brand" style={{ transitionDelay: "0.15s" }}>
            {t.design.intro}
          </p>
        </div>

        {/* Filters appear only when there is more than one kind of work */}
        {categories.length > 1 && (
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label={t.design.heading}>
            {["all", ...categories].map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={filter === key}
                onClick={() => setFilter(key)}
                className={`rounded-full border-2 px-4 py-1.5 text-sm font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral ${
                  filter === key
                    ? "border-coral bg-coral text-cream"
                    : "border-brand/40 text-brand hover:border-coral hover:text-coral"
                }`}
              >
                {t.design.filters[key]}
              </button>
            ))}
          </div>
        )}

        {/* Masonry: each design keeps its own proportions, nothing gets cropped */}
        <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {shown.map(({ item, i }) => (
            <DesignCard key={item.id} item={item} title={item.title[lang]} onOpen={() => setOpenIndex(i)} t={t} />
          ))}
        </div>

        <div className="mt-6 text-center md:text-start">
          <a href={behanceUrl} target="_blank" rel="noopener noreferrer" className={behanceBtn}>
            {t.design.behance}
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
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
            >
              <path d="M7 17L17 7M8 7h9v9" />
            </svg>
          </a>
        </div>
      </section>

      {openItem && (
        <Lightbox item={openItem} title={openItem.title[lang]} onClose={closeLightbox} t={t} isRtl={isRtl} />
      )}
    </div>
  );
};

export default Design;