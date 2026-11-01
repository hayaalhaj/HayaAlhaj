import { createContext, useContext, useLayoutEffect, useMemo, useState } from "react";
import { translations } from "../i18n/translations";

const SettingsContext = createContext(null);

const readSaved = (key, allowed) => {
  try {
    const value = localStorage.getItem(key);
    return allowed.includes(value) ? value : null;
  } catch {
    return null;
  }
};

/* First visit: follow the device's colour scheme. Later visits: use the saved choice. */
const getInitialTheme = () =>
  readSaved("theme", ["light", "dark"]) ??
  (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

/* First visit: Arabic for browsers set to Arabic, English for everyone else. */
const getInitialLang = () =>
  readSaved("lang", ["en", "ar"]) ?? (navigator.language?.toLowerCase().startsWith("ar") ? "ar" : "en");

export const SettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);
  const [lang, setLang] = useState(getInitialLang);

  // Runs before the browser paints, so there is no flash of the wrong theme or direction.
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* storage can be blocked; the choice just won't be remembered */
    }
  }, [theme]);

  useLayoutEffect(() => {
    const rtl = lang === "ar";
    const root = document.documentElement;
    root.lang = lang;
    root.dir = rtl ? "rtl" : "ltr";
    // Used by the slide-in animations so they come from the correct side in Arabic
    root.style.setProperty("--dir", rtl ? "-1" : "1");
    try {
      localStorage.setItem("lang", lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const value = useMemo(
    () => ({
      theme,
      lang,
      isRtl: lang === "ar",
      t: translations[lang],
      toggleTheme: () => setTheme((current) => (current === "dark" ? "light" : "dark")),
      toggleLang: () => setLang((current) => (current === "ar" ? "en" : "ar")),
    }),
    [theme, lang]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings must be used inside <SettingsProvider>");
  return context;
};
