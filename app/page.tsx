"use client";

import { useEffect, useSyncExternalStore } from "react";
import linksData from "@/data/links.json";
import translationsData from "@/data/translations.json";

type Lang = "zh" | "en";
type Theme = "dark" | "light";

type LinkItem = {
  id: string;
  label: {
    zh: string;
    en: string;
  };
  href: string;
  display: string;
};

const links = linksData as LinkItem[];

type TranslationItem = {
  name: string;
  icp: string;
  langBtn: string;
  themeLight: string;
  themeDark: string;
  htmlLang: string;
};

const translations = translationsData as Record<Lang, TranslationItem>;

const storageEventName = "local-storage";

const subscribeToStorage = (callback: () => void) => {
  if (typeof window === "undefined") {
    return () => {};
  }
  const handler = () => callback();
  window.addEventListener("storage", handler);
  window.addEventListener(storageEventName, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(storageEventName, handler);
  };
};

const getLangSnapshot = () => {
  if (typeof window === "undefined") {
    return "zh";
  }
  return window.localStorage.getItem("lang") ?? "zh";
};

const getThemeSnapshot = () => {
  if (typeof window === "undefined") {
    return "light";
  }
  const stored = window.localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") {
    return stored;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const emitStorage = () => {
  if (typeof window === "undefined") {
    return;
  }
  window.dispatchEvent(new Event(storageEventName));
};

export default function Home() {
  const storedLang = useSyncExternalStore(
    subscribeToStorage,
    getLangSnapshot,
    () => "zh",
  );
  const storedTheme = useSyncExternalStore(
    subscribeToStorage,
    getThemeSnapshot,
    () => "light",
  );
  const currentLang: Lang = storedLang === "en" ? "en" : "zh";
  const isDark: boolean = storedTheme === "dark";
  const currentTheme: Theme = isDark ? "dark" : "light";

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    document.documentElement.lang = translations[currentLang].htmlLang;
  }, [currentLang]);

  const setTheme = (next: Theme) => {
    if (next === currentTheme) {
      return;
    }
    localStorage.setItem("theme", next);
    emitStorage();
  };

  const setLanguage = (next: Lang) => {
    if (next === currentLang) {
      return;
    }
    localStorage.setItem("lang", next);
    emitStorage();
  };

  const t = translations[currentLang];
  const year = new Date().getFullYear();

  return (
    <div className="max-w-xl mx-auto px-6 min-h-screen flex flex-col">
      <nav className="absolute top-0 right-0 p-6 md:p-10 flex items-center gap-4 text-xs font-mono z-50">
        <div className="relative inline-grid grid-cols-2 items-center pb-1">
          <span
            aria-hidden="true"
            className={`absolute bottom-0 left-0 h-px w-1/2 bg-black dark:bg-white transition-transform duration-300 ease-out ${
              currentLang === "zh" ? "translate-x-0" : "translate-x-full"
            }`}
          />
          <button
            type="button"
            onClick={() => setLanguage("zh")}
            aria-pressed={currentLang === "zh"}
            className={`relative w-8 text-center transition-opacity ${
              currentLang === "zh"
                ? "text-black dark:text-white"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            中
          </button>
          <button
            type="button"
            onClick={() => setLanguage("en")}
            aria-pressed={currentLang === "en"}
            className={`relative w-8 text-center transition-opacity ${
              currentLang === "en"
                ? "text-black dark:text-white"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            EN
          </button>
        </div>

        <div className="relative inline-grid grid-cols-2 items-center pb-1">
          <span
            aria-hidden="true"
            className={`absolute bottom-0 left-0 h-px w-1/2 bg-black dark:bg-white transition-transform duration-300 ease-out ${
              currentTheme === "light" ? "translate-x-0" : "translate-x-full"
            }`}
          />
          <button
            type="button"
            onClick={() => setTheme("light")}
            aria-pressed={currentTheme === "light"}
            className={`relative w-12 text-center transition-opacity ${
              currentTheme === "light"
                ? "text-black dark:text-white"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            {t.themeLight}
          </button>
          <button
            type="button"
            onClick={() => setTheme("dark")}
            aria-pressed={currentTheme === "dark"}
            className={`relative w-12 text-center transition-opacity ${
              currentTheme === "dark"
                ? "text-black dark:text-white"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            {t.themeDark}
          </button>
        </div>
      </nav>

      <header className="mt-32 mb-12">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
          {t.name}
        </h1>
        {/* <p className="font-mono text-sm opacity-50">
          ID: WallBreakerNO4
        </p> */}
      </header>

      <main className="grow">
        <ul className="space-y-6">
          {links.map((link) => {
            const label = link.label[currentLang] ?? link.label.zh;
            return (
              <li key={link.id}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between border-b border-gray-200 dark:border-gray-800 pb-2 hover:border-black dark:hover:border-white transition-colors"
                >
                  <span className="font-medium">{label}</span>
                  <span className="font-mono text-xs opacity-40 group-hover:opacity-100 transition-opacity">
                    {link.display} {"\u2197"}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </main>

      <footer className="py-10 text-xs font-mono opacity-40">
        <div className="flex flex-col items-center gap-2">
          <span>&copy; {year} WallBreakerNO4</span>
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {t.icp}
          </a>
        </div>
      </footer>
    </div>
  );
}
