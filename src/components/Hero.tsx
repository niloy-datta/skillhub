import { useEffect, useState, type FormEvent } from "react";
import { TICKER_ITEMS, formatAgo, type Job } from "../data";
import { usePrefersReducedMotion, useScramble } from "../hooks";
import { CompanyMark, IconArrow, IconPin, IconSearch, LogoMark } from "./Icons";
import { COMPANIES } from "../data";

const CHIPS = ["Remote only", "€80k+", "Engineering", "Design", "Data", "Product"];

const SLOT_STYLES = [
  "z-30 rotate-[-1.2deg]",
  "z-20 translate-x-5 translate-y-7 rotate-[2.4deg] scale-[0.965] opacity-80",
  "z-10 -translate-x-5 translate-y-14 rotate-[-4.5deg] scale-[0.93] opacity-55",
];

export function Hero({
  featured,
  onSearch,
  onChip,
  onOpen,
}: {
  featured: Job[];
  onSearch: (query: string, location: string) => void;
  onChip: (chip: string) => void;
  onOpen: (job: Job) => void;
}) {
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");
  const [idx, setIdx] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || featured.length < 2) return;
    const id = window.setInterval(
      () => setIdx((i) => (i + 1) % featured.length),
      3800
    );
    return () => window.clearInterval(id);
  }, [reduced, featured.length]);

  const line1 = useScramble("GOOD WORK", 200);
  const line2 = useScramble("IS HIRING.", 650);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(q.trim(), loc.trim());
  };

  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div className="bg-hero-grid absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-28 top-10 hidden text-paper/[0.05] md:block"
        aria-hidden="true"
      >
        <LogoMark className="spin-slow h-[430px] w-[430px]" />
      </div>
      <p
        className="absolute bottom-24 left-8 hidden font-mono text-[10px] uppercase tracking-[0.22em] text-paper/30 xl:block"
        aria-hidden="true"
      >
        52.37°N 4.89°E — AMS wire node
      </p>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 pb-20 pt-32 md:px-8 md:pt-40 lg:grid-cols-[1.1fr_0.9fr]">
        {/* ---- left: headline + search ---- */}
        <div>
          <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-paper/70">
            <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-lime" />
            Live — 2,847 open roles · updated 60s ago
          </p>

          <h1 className="mt-6 font-display text-[clamp(2.6rem,8vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.02em]">
            <span className="block whitespace-nowrap">{line1}</span>
            <span className="block whitespace-nowrap text-lime">{line2}</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-paper/70">
            Workwire streams every open role from 600+ vetted companies onto one
            live feed — with real salary bands on every listing. No ghost jobs.
            No salary roulette. Just the wire.
          </p>

          <form
            onSubmit={submit}
            className="mt-10 flex flex-col gap-2.5 border border-ink/10 bg-card p-2.5 text-ink shadow-[8px_8px_0_0_rgba(201,241,88,0.22)] md:flex-row"
          >
            <label className="flex flex-1 items-center gap-3 px-3">
              <IconSearch className="h-4 w-4 shrink-0 text-ink/40" />
              <span className="sr-only">Role, company or skill</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Role, company or skill…"
                className="w-full min-w-0 bg-transparent py-3 text-base outline-none placeholder:text-ink/40"
              />
            </label>
            <div className="hidden w-px bg-ink/10 md:block" />
            <label className="flex items-center gap-3 border-t border-ink/10 px-3 md:w-52 md:border-t-0">
              <IconPin className="h-4 w-4 shrink-0 text-ink/40" />
              <span className="sr-only">City or remote</span>
              <input
                value={loc}
                onChange={(e) => setLoc(e.target.value)}
                placeholder="City or “Remote”"
                className="w-full min-w-0 bg-transparent py-3 text-base outline-none placeholder:text-ink/40"
              />
            </label>
            <button
              type="submit"
              className="group flex items-center justify-center gap-2 bg-cobalt px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-cobalt-dark"
            >
              Search the wire
              <IconArrow className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/40">
              Hot right now:
            </span>
            {CHIPS.map((chip) => (
              <button
                key={chip}
                onClick={() => onChip(chip)}
                className="border border-paper/25 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-paper/80 transition-all hover:border-lime hover:bg-lime hover:text-ink active:scale-95"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* ---- right: rotating featured stack ---- */}
        <div className="hidden lg:block">
          <div className="relative h-[430px] select-none">
            {featured.map((job, i) => {
              const slot = (i - idx + featured.length) % featured.length;
              const isFront = slot === 0;
              const company = COMPANIES.find((c) => c.id === job.companyId);
              return (
                <div
                  key={job.id}
                  className={`absolute inset-x-0 top-0 transition-all duration-700 ${SLOT_STYLES[slot] ?? ""}`}
                >
                  <article
                    key={`${job.id}-${slot}`}
                    onClick={() => isFront && onOpen(job)}
                    className={`border border-ink/10 bg-card p-6 text-ink ${
                      isFront
                        ? "card-in cursor-pointer shadow-[14px_16px_0_0_rgba(11,18,13,0.55)]"
                        : "pointer-events-none shadow-[10px_12px_0_0_rgba(11,18,13,0.4)]"
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em]">
                      <span className="flex items-center gap-2 font-semibold text-cobalt">
                        <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-tang" />
                        Just in — {formatAgo(job.postedHours)}
                      </span>
                      <span className="text-ink/45">{job.category}</span>
                    </div>
                    <div className="mt-4 flex items-start gap-4">
                      {company && <CompanyMark company={company} />}
                      <div>
                        <h3 className="font-display text-2xl font-bold leading-tight">
                          {job.title}
                        </h3>
                        <p className="mt-1 font-mono text-xs text-ink/55">
                          {job.company} · {job.location} · {job.mode}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {job.tags.map((t) => (
                        <span
                          key={t}
                          className="border border-ink/15 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-ink/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <p className="font-mono text-lg font-bold">
                        €{job.salaryMin}–{job.salaryMax}k
                        <span className="ml-1 text-[10px] font-medium uppercase text-ink/45">
                          / yr
                        </span>
                      </p>
                      <span className="border border-cobalt/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-cobalt">
                        Open role ↗
                      </span>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex justify-center gap-1.5">
            {featured.map((job, i) => (
              <button
                key={job.id}
                onClick={() => setIdx(i)}
                aria-label={`Show featured role ${i + 1}`}
                className={`h-1 transition-all duration-500 ${
                  i === idx ? "w-8 bg-lime" : "w-3 bg-paper/25 hover:bg-paper/50"
                }`}
              />
            ))}
          </div>
          <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-paper/40">
            // 3 of 41 featured today — curated 06:00 CET
          </p>
        </div>
      </div>

      {/* ---- ticker ---- */}
      <div className="marquee relative border-t border-paper/15 py-4" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0">
              {TICKER_ITEMS.map((item) => (
                <span
                  key={`${dup}-${item}`}
                  className="flex items-center font-mono text-[11px] uppercase tracking-[0.2em] text-paper/55"
                >
                  <span className="mx-6 text-lime">◆</span>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
