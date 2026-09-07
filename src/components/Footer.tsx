import { LogoMark } from "./Icons";

const COLUMNS: { heading: string; links: [string, string][] }[] = [
  {
    heading: "For Workers",
    links: [
      ["Find jobs", "#jobs"],
      ["Salary guide", "#salaries"],
      ["Job alerts", "#alerts"],
      ["Top employers", "#companies"],
    ],
  },
  {
    heading: "For Employers",
    links: [
      ["Post a job", "#how"],
      ["How it works", "#how"],
      ["Find workers", "#companies"],
      ["Success stories", "#stories"],
    ],
  },
  {
    heading: "About",
    links: [
      ["How it works", "#how"],
      ["Worker stories", "#stories"],
      ["Get job alerts", "#alerts"],
      ["Back to top", "#top"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-midnight text-white">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-3 group">
              <div className="relative">
                <LogoMark className="h-7 w-7 text-indigo transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 blur-lg bg-indigo/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight">
                Workwire
              </span>
            </a>
            <p className="mt-6 max-w-xs text-base leading-relaxed text-white/60">
              Find real local jobs with real pay. Warehouse, delivery, factory,
              cleaning and more — all verified, all paying.
            </p>
            <p className="mt-8 flex items-center gap-2.5 font-mono text-sm text-emerald">
              <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-emerald" />
              205+ jobs available now
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                {col.heading}
              </p>
              {col.links.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="block w-fit py-2 text-base text-white/70 transition-colors hover:text-indigo"
                >
                  {label}
                </a>
              ))}
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 font-mono text-sm text-white/40 md:flex-row">
          <p>© 2026 LocalJobs BD — Connecting workers with employers.</p>
          <p className="tracking-[0.18em]">DHAKA · GAZIPUR · SAVAR · NARAYANGANJ · MIRPUR</p>
          <div className="flex gap-6">
            <a href="#top" className="transition-colors hover:text-indigo">Privacy</a>
            <a href="#top" className="transition-colors hover:text-indigo">Terms</a>
            <a href="#alerts" className="transition-colors hover:text-indigo">Help</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
