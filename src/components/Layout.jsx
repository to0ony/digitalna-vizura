import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useLang } from "../i18n";
import { contact } from "../content";
import { container } from "../grid";

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

// Tema prati sustav dok je korisnik ručno ne promijeni.
function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch {
      // localStorage nije dostupan
    }
    return systemDark.matches ? "dark" : "light";
  });

  useEffect(() => {
    const follow = (e) => {
      try {
        if (localStorage.getItem("theme")) return;
      } catch {
        // localStorage nije dostupan
      }
      setTheme(e.matches ? "dark" : "light");
    };
    systemDark.addEventListener("change", follow);
    return () => systemDark.removeEventListener("change", follow);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      flushSync(() => setTheme(next));
    };
    try {
      localStorage.setItem("theme", next);
    } catch {
      // localStorage nije dostupan
    }

    // Crossfade između tema, gdje preglednik to podržava
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (document.startViewTransition && !reduced) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  };

  return [theme, toggle];
}

// Duotone: tamni tonovi → tamna boja teme, svijetli → svijetla.
// U tamnoj temi svijetli tonovi su prigušeni da ekrani ne "sjaje".
const duotones = {
  light: ["0.082 0.953", "0.082 0.945", "0.082 0.925"],
  dark: ["0.078 0.741", "0.078 0.729", "0.078 0.702"],
};

function Layout() {
  const { lang, setLang, t } = useLang();
  const [theme, toggleTheme] = useTheme();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <ScrollToHash />

      <svg className="absolute h-0 w-0" aria-hidden="true">
        {Object.entries(duotones).map(([name, tables]) => (
          <filter
            key={name}
            id={`duotone-${name}`}
            colorInterpolationFilters="sRGB"
          >
            <feColorMatrix
              type="matrix"
              values=".2126 .7152 .0722 0 0  .2126 .7152 .0722 0 0  .2126 .7152 .0722 0 0  0 0 0 1 0"
            />
            <feComponentTransfer>
              <feFuncR type="table" tableValues={tables[0]} />
              <feFuncG type="table" tableValues={tables[1]} />
              <feFuncB type="table" tableValues={tables[2]} />
            </feComponentTransfer>
          </filter>
        ))}
      </svg>

      <header
        className={`${container} flex items-baseline justify-between py-8`}
      >
        <Link to="/" className="text-lg font-semibold tracking-tight">
          digitalna vizura<span className="text-signal">.</span>
        </Link>

        <nav className="flex items-baseline gap-6 text-sm md:gap-10">
          <Link
            to="/gtfs"
            className="hidden transition-colors hover:text-signal md:inline"
          >
            {t.nav.gtfs}
          </Link>
          <Link
            to="/radovi"
            className="hidden transition-colors hover:text-signal md:inline"
          >
            {t.nav.work}
          </Link>
          <Link
            to="/#kontakt"
            className="hidden transition-colors hover:text-signal md:inline"
          >
            {t.nav.contact}
          </Link>
          <button
            onClick={toggleTheme}
            className="cursor-pointer font-mono text-xs text-muted transition-colors hover:text-signal"
          >
            {theme === "dark" ? t.theme.light : t.theme.dark}
          </button>
          <div className="font-mono text-xs">
            {["hr", "en"].map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`cursor-pointer px-1 uppercase transition-colors ${
                  lang === code ? "text-ink" : "text-muted hover:text-signal"
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer
        className={`${container} flex flex-wrap justify-between gap-4 py-10 font-mono text-xs text-muted`}
      >
        <span>© {new Date().getFullYear()} Digitalna Vizura</span>
        <a href={`mailto:${contact.email}`} className="hover:text-signal">
          {contact.email}
        </a>
      </footer>
    </div>
  );
}

export default Layout;
