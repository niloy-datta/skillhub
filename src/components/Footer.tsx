import { LogoMark } from "./Icons";

const COLUMNS: { heading: string; links: [string, string][] }[] = [
  {
    heading: "Job seekers",
    links: [
      ["Browse the board", "#jobs"],
      ["Salary explorer", "#salaries"],
      ["Job alerts", "#alerts"],
      ["Companies", "#companies"],
    ],
  },
  {
    heading: "Employers",
    links: [
      ["Post a role", "#how"],
      ["The method", "#how"],
      ["Talent search", "#companies"],
      ["Success stories", "#stories"],
    ],
  },
  {
    heading: "The wire",
    links: [
      ["How it works", "#how"],
      ["Signed offers", "#stories"],
      ["Join the digest", "#alerts"],
      ["Back to top", "#top"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-deep text-paper">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <LogoMark className="h-6 w-6 text-lime" />
              <span className="font-display text-lg font-bold tracking-tight">Workwire</span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/55">
              The live wire for open roles. Every listing vetted, banded and
              streamed — so good work finds you back.
            </p>
            <p className="mt-7 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-lime">
              <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-lime" />
              All systems hiring
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/40">
                {col.heading}
              </p>
              {col.links.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="block w-fit py-1.5 text-sm text-paper/70 transition-colors hover:text-lime"
                >
                  {label}
                </a>
              ))}
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-paper/10 pt-6 font-mono text-[11px] text-paper/40 md:flex-row">
          <p>© 2026 Workwire B.V. — Made on the wire.</p>
          <p className="tracking-[0.18em]">AMS · BER · LIS · NYC · REMOTE</p>
          <div className="flex gap-5">
            <a href="#top" className="transition-colors hover:text-lime">Privacy</a>
            <a href="#top" className="transition-colors hover:text-lime">Terms</a>
            <a href="#alerts" className="transition-colors hover:text-lime">Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
