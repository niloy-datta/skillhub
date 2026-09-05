import { useEffect, useState } from "react";
import { IconBookmark, IconX, LogoMark } from "./Icons";

const LINKS: [string, string][] = [
  ["Jobs", "#jobs"],
  ["Companies", "#companies"],
  ["Salaries", "#salaries"],
  ["Method", "#how"],
  ["Stories", "#stories"],
];

export function Header({
  savedCount,
  onSavedClick,
}: {
  savedCount: number;
  onSavedClick: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink/10 bg-paper/95 text-ink backdrop-blur-sm"
          : "text-paper"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:h-20 md:px-8">
        <a href="#top" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <LogoMark
            className={`h-6 w-6 transition-colors ${scrolled ? "text-ink" : "text-lime"}`}
          />
          <span className="font-display text-lg font-bold tracking-tight">Workwire</span>
          <span className="mt-1 hidden font-mono text-[9px] uppercase tracking-[0.2em] opacity-50 lg:inline">
            // live job wire
          </span>
        </a>

        <nav className="hidden items-center gap-7 font-mono text-[11px] uppercase tracking-[0.16em] md:flex">
          {LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={`transition-colors ${scrolled ? "hover:text-cobalt" : "hover:text-lime"}`}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onSavedClick}
            aria-label="View saved roles"
            className={`relative flex items-center gap-2 border px-3 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors ${
              scrolled
                ? "border-ink/25 hover:border-ink"
                : "border-paper/30 hover:border-paper"
            }`}
          >
            <IconBookmark className="h-3.5 w-3.5" filled={savedCount > 0} />
            <span className="hidden sm:inline">Saved</span>
            {savedCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-cobalt px-1 font-mono text-[9px] font-bold text-paper">
                {savedCount}
              </span>
            )}
          </button>

          <a
            href="#how"
            className="hidden bg-cobalt px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-cobalt-dark sm:block"
          >
            Post a role
          </a>

          <button
            className="border border-current p-2 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? (
              <IconX className="h-4 w-4" />
            ) : (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h10" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-paper/10 bg-ink px-5 py-6 text-paper md:hidden">
          {LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block border-b border-paper/10 py-3 font-mono text-sm uppercase tracking-[0.16em] last:border-0"
            >
              {label}
            </a>
          ))}
          <a
            href="#how"
            onClick={() => setOpen(false)}
            className="mt-5 block bg-cobalt px-4 py-3 text-center font-mono text-xs uppercase tracking-[0.14em]"
          >
            Post a role
          </a>
        </nav>
      )}
    </header>
  );
}
