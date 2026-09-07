import { useEffect, useState, type FormEvent } from "react";
import { TICKER_ITEMS, formatAgo, type Job } from "../data";
import { usePrefersReducedMotion, useScramble } from "../hooks";
import { CompanyMark, IconArrow, IconPin, IconSearch, LogoMark } from "./Icons";
import { COMPANIES } from "../data";

const CHIPS = ["Remote", "€100k+", "Engineering", "Design", "Data", "Product"];

const SLOT_STYLES = [
  "z-30 rotate-[-1deg]",
  "z-20 translate-x-6 translate-y-8 rotate-[2.5deg] scale-[0.96] opacity-85",
  "z-10 -translate-x-6 translate-y-16 rotate-[-5deg] scale-[0.92] opacity-50",
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
      4200
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
    <section className="relative min-h-screen overflow-hidden bg-midnight text-white">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://image.qwenlm.ai/generated-images/f9b50c79-1e02-46da-9781-e6ecfbe959fa/_result.png"
          alt=""
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 via-midnight/80 to-midnight" />
        <div className="bg-hero-grid absolute inset-0" />
      </div>

      {/* Decorative elements */}
      <div
        className="pointer-events-none absolute -right-32 top-20 hidden text-white/[0.04] md:block"
        aria-hidden="true"
      >
        <LogoMark className="spin-slow h-[500px] w-[500px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-20 px-5 pb-24 pt-40 md:px-8 md:pt-48 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left: headline + search */}
        <div>
          <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur-sm">
            <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-emerald" />
            <span className="font-mono text-xs font-medium text-white/80">
              2,847 live roles · updated 60s ago
            </span>
          </div>

          <h1 className="mt-8 font-display text-[clamp(3rem,9vw,7rem)] font-black leading-[0.9] tracking-tight">
            <span className="block">{line1}</span>
            <span className="block gradient-text">{line2}</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl">
            Workwire streams every open role from 600+ vetted companies onto one
            live feed — with real salary bands on every listing. No ghost jobs.
            No salary roulette. Just the wire.
          </p>

          {/* Search form */}
          <form
            onSubmit={submit}
            className="mt-10 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl md:flex-row"
          >
            <label className="flex flex-1 items-center gap-3 rounded-xl bg-white/5 px-4">
              <IconSearch className="h-5 w-5 shrink-0 text-white/40" />
              <span className="sr-only">Role, company or skill</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Role, company or skill…"
                className="w-full min-w-0 bg-transparent py-4 text-base text-white outline-none placeholder:text-white/40"
              />
            </label>
            <label className="flex items-center gap-3 rounded-xl bg-white/5 px-4 md:w-56">
              <IconPin className="h-5 w-5 shrink-0 text-white/40" />
              <span className="sr-only">City or remote</span>
              <input
                value={loc}
                onChange={(e) => setLoc(e.target.value)}
                placeholder="City or Remote"
                className="w-full min-w-0 bg-transparent py-4 text-base text-white outline-none placeholder:text-white/40"
              />
            </label>
            <button
              type="submit"
              className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo to-violet px-8 py-4 font-semibold text-white shadow-glow transition-all hover:scale-105 hover:shadow-[0_0_80px_rgba(99,102,241,0.6)]"
            >
              Search
              <IconArrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          {/* Hot chips */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-white/40">Hot:</span>
            {CHIPS.map((chip) => (
              <button
                key={chip}
                onClick={() => onChip(chip)}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-sm transition-all hover:border-indigo hover:bg-indigo/20 hover:text-white"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Right: rotating featured stack */}
        <div className="hidden lg:block">
          <div className="relative h-[480px] select-none">
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
                    className={`rounded-2xl border border-white/10 bg-white/10 p-7 backdrop-blur-xl ${
                      isFront
                        ? "card-in cursor-pointer shadow-premium"
                        : "pointer-events-none"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 font-mono text-xs font-semibold text-emerald">
                        <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-emerald" />
                        Just in — {formatAgo(job.postedHours)}
                      </span>
                      <span className="font-mono text-xs text-white/50">
                        {job.category}
                      </span>
                    </div>
                    <div className="mt-5 flex items-start gap-4">
                      {company && <CompanyMark company={company} />}
                      <div>
                        <h3 className="font-display text-2xl font-bold leading-tight">
                          {job.title}
                        </h3>
                        <p className="mt-1 font-mono text-sm text-white/60">
                          {job.company} · {job.location}
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {job.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/20 bg-white/5 px-3 py-1 font-mono text-xs text-white/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <p className="font-display text-2xl font-bold">
                        €{job.salaryMin}–{job.salaryMax}k
                        <span className="ml-1 text-xs font-medium text-white/50">
                          /yr
                        </span>
                      </p>
                      <span className="rounded-full bg-gradient-to-r from-indigo to-violet px-4 py-2 font-mono text-xs font-semibold text-white">
                        View role →
                      </span>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {featured.map((job, i) => (
              <button
                key={job.id}
                onClick={() => setIdx(i)}
                aria-label={`Show featured role ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === idx ? "w-10 bg-gradient-to-r from-indigo to-violet" : "w-4 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="marquee relative border-t border-white/10 py-5" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0">
              {TICKER_ITEMS.map((item) => (
                <span
                  key={`${dup}-${item}`}
                  className="flex items-center font-mono text-sm text-white/50"
                >
                  <span className="mx-8 text-indigo">◆</span>
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
