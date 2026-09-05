import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import {
  ALERT_WORDS,
  COMPANIES,
  SALARY_BANDS,
  TESTIMONIALS,
} from "../data";
import { Reveal } from "../hooks";
import { CompanyMark, IconArrow, IconCheck, IconStar } from "./Icons";

/* ================= Companies ================= */

export function CompanySpotlight({ onBrowse }: { onBrowse: (company: string) => void }) {
  const [following, setFollowing] = useState<Set<string>>(new Set());

  const toggleFollow = (id: string) => {
    setFollowing((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section id="companies" className="scroll-mt-20 border-b border-ink/10 bg-mist">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cobalt">
            // who’s hiring
          </p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-6xl">
              Companies on the wire.
            </h2>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">
              612 companies · refreshed hourly · drag →
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative mt-12">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-mist to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-mist to-transparent" />
            <div className="scroll-row flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6">
              {COMPANIES.map((c) => {
                const isFollowing = following.has(c.id);
                return (
                  <article
                    key={c.id}
                    className="flex w-[300px] shrink-0 snap-start flex-col border border-ink/15 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink/40 hover:shadow-[8px_8px_0_0_rgba(16,25,19,0.1)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <CompanyMark company={c} size="lg" />
                      <button
                        onClick={() => toggleFollow(c.id)}
                        aria-pressed={isFollowing}
                        className={`border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                          isFollowing
                            ? "border-ink bg-ink text-lime"
                            : "border-ink/25 hover:border-ink"
                        }`}
                      >
                        {isFollowing ? "Following ✓" : "+ Follow"}
                      </button>
                    </div>
                    <h3 className="mt-4 font-display text-xl font-bold">{c.name}</h3>
                    <p className="mt-1 flex-1 text-sm leading-relaxed text-ink/60">{c.tagline}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-ink/70">
                      <IconStar className="h-3.5 w-3.5 text-tang" />
                      <span className="font-bold">{c.rating}</span>
                      <span className="text-ink/40">({c.reviews})</span>
                      <span className="text-ink/30">·</span>
                      <span>{c.hq}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {c.perks.map((p) => (
                        <span
                          key={p}
                          className="border border-ink/15 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-ink/60"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => onBrowse(c.name)}
                      className="group mt-5 flex items-center justify-between border-t border-ink/10 pt-4 font-mono text-[11px] uppercase tracking-wider text-cobalt"
                    >
                      <span>{c.openRoles} open roles</span>
                      <IconArrow className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= Salary explorer ================= */

const SCALE_MAX = 200;

export function SalaryExplorer() {
  const roles = Object.keys(SALARY_BANDS);
  const [role, setRole] = useState(roles[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const bands = SALARY_BANDS[role];

  return (
    <section id="salaries" className="scroll-mt-20 border-b border-ink/10 bg-paper">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cobalt">
            // comp intel
          </p>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
            Know your number before they ask.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/65">
            Every band below is built from verified offers — not surveys, not
            vibes. Pick a role and see what the market actually pays at your
            level.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-all active:scale-95 ${
                  role === r
                    ? "border-ink bg-ink text-lime"
                    : "border-ink/20 bg-card hover:border-ink/50"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40">
            Source: 12,400 verified offers · EUR gross/yr · updated Jan 2026
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="bg-hero-grid relative overflow-hidden border border-ink bg-ink p-7 text-paper md:p-10">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-2xl font-bold">{role}</h3>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/50">
                EUR / yr
              </span>
            </div>
            {bands.map((b, i) => (
              <div key={b.level} className="mt-7">
                <div className="mb-2 flex justify-between font-mono text-xs">
                  <span className="uppercase tracking-[0.16em] text-paper/60">{b.level}</span>
                  <span className="font-semibold text-lime">
                    €{b.min}k – €{b.max}k
                  </span>
                </div>
                <div className="relative h-2.5 bg-paper/15">
                  <div
                    className="absolute inset-y-0 transition-all duration-700 ease-out"
                    style={{
                      left: `${(b.min / SCALE_MAX) * 100}%`,
                      width: mounted ? `${((b.max - b.min) / SCALE_MAX) * 100}%` : "0%",
                      backgroundColor: `rgba(201, 241, 88, ${1 - i * 0.17})`,
                      transitionDelay: `${i * 90}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
            <div className="mt-9 flex justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-paper/35">
              <span>€0</span>
              <span>€100k</span>
              <span>€200k+</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= How it works ================= */

const STEPS = [
  {
    n: "01",
    title: "Build your wire profile",
    body: "One profile does the applying. Import a CV or LinkedIn — Workwire parses skills, seniority and comp range into a match graph.",
  },
  {
    n: "02",
    title: "Match, don’t spray",
    body: "Instead of 200 cold applications, get a daily shortlist of five roles that fit your stack, level and salary floor. Reply only to the ones worth it.",
  },
  {
    n: "03",
    title: "Interview with intel",
    body: "Before every call: verified salary bands, team size, interview-loop notes from past candidates — and red flags, if any.",
  },
  {
    n: "04",
    title: "Sign with leverage",
    body: "Offer comes in? Benchmark it against 12,400 verified data points and counter with numbers, not nerves.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 border-b border-ink/10 bg-paper">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="self-start lg:sticky lg:top-28">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cobalt">
              // the method
            </p>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
              Less applying.
              <br />
              More landing.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/65">
              The average Workwire member sends 14 applications per search — not
              140 — because every one is aimed. Here’s the loop.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#alerts"
                className="bg-ink px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-cobalt"
              >
                Create a profile
              </a>
              <a
                href="#jobs"
                className="border border-ink/30 px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:border-ink hover:bg-card"
              >
                Browse the board →
              </a>
            </div>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40">
              Avg. 11 days from profile to first interview
            </p>
          </Reveal>
        </div>

        <div>
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 70}>
              <div className="group grid grid-cols-[64px_1fr] gap-6 border-t border-ink/15 px-2 py-9 transition-colors hover:bg-card">
                <span className="pt-1.5 font-mono text-sm font-bold text-cobalt">{s.n}</span>
                <div>
                  <h3 className="font-display text-2xl font-bold transition-colors group-hover:text-cobalt">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 leading-relaxed text-ink/65">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={120}>
            <div className="mt-2 flex flex-col justify-between gap-4 border border-ink/15 bg-lime p-6 md:flex-row md:items-center">
              <p className="font-display text-xl font-bold leading-snug">
                Hiring? Post a role in 4 minutes. First candidates the same day.
              </p>
              <button
                onClick={() =>
                  (document.getElementById("alert-email") as HTMLInputElement | null)?.focus()
                }
                className="shrink-0 bg-ink px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-lime transition-colors hover:bg-pine"
              >
                Post a role ↗
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= Testimonials ================= */

export function Testimonials() {
  return (
    <section id="stories" className="bg-dots scroll-mt-20 overflow-hidden border-b border-ink/10 bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cobalt">
            // signed offers
          </p>
          <h2 className="mt-4 max-w-xl font-display text-4xl font-extrabold tracking-tight md:text-6xl">
            In their words, not ours.
          </h2>
        </Reveal>

        <div className="mt-16 grid items-start gap-10 md:grid-cols-3 md:gap-8">
          {TESTIMONIALS.map((t, i) => {
            const company = COMPANIES.find((c) => c.id === t.companyId);
            return (
              <Reveal key={t.name} delay={i * 110} className={t.offset}>
                <figure
                  className={`relative border border-ink/15 bg-card p-7 shadow-[6px_8px_0_0_rgba(16,25,19,0.08)] transition-transform duration-500 hover:-translate-y-1 hover:rotate-0 ${t.tilt}`}
                >
                  <span className="tape" aria-hidden="true" />
                  <div className="flex gap-1 text-tang">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <IconStar key={s} className="h-3.5 w-3.5" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-[17px] font-medium leading-relaxed">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-4">
                    {company && <CompanyMark company={company} size="sm" />}
                    <div>
                      <p className="font-mono text-xs font-bold">{t.name}</p>
                      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-ink/50">
                        {t.role} · {t.company}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================= Job alerts band ================= */

export function AlertBand() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError(true);
      return;
    }
    setError(false);
    setDone(true);
  };

  return (
    <section id="alerts" className="relative scroll-mt-20 overflow-hidden bg-ink text-paper">
      <div
        className="pointer-events-none absolute inset-x-0 top-8 select-none opacity-[0.06]"
        aria-hidden="true"
      >
        <div className="marquee">
          <div
            className="marquee-track"
            style={{ "--marquee-dur": "60s" } as CSSProperties}
          >
            {[0, 1].map((dup) => (
              <span
                key={dup}
                className="whitespace-nowrap px-4 font-display text-7xl font-extrabold text-paper"
              >
                {ALERT_WORDS.map((w) => `${w}  ·  `).join("")}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-lime">
            // job alerts
          </p>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
            Get the good jobs before they’re famous.
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-paper/65">
            One digest, every Friday at 07:00 CET — the 20 best new roles for
            your stack, with bands. 41,209 readers. Zero spam, ever.
          </p>
        </Reveal>

        <Reveal delay={140}>
          {done ? (
            <div className="flex items-start gap-4 border border-lime/40 bg-lime/10 p-6">
              <span className="grid h-9 w-9 shrink-0 place-items-center bg-lime text-ink">
                <IconCheck className="h-4 w-4" />
              </span>
              <div>
                <p className="font-display text-xl font-bold">You’re on the wire.</p>
                <p className="mt-1.5 font-mono text-xs leading-relaxed text-paper/60">
                  First digest lands Friday, 07:00 CET — {email}
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={submit}>
              <label
                htmlFor="alert-email"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/50"
              >
                Your email
              </label>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <input
                  id="alert-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder="you@somewhere.com"
                  className={`flex-1 border-b-2 bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-paper/30 ${
                    error ? "border-tang" : "border-paper/25 focus:border-lime"
                  }`}
                />
                <button
                  type="submit"
                  className="bg-lime px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-ink transition-all hover:bg-paper active:scale-95"
                >
                  Join the wire
                </button>
              </div>
              {error && (
                <p className="mt-2 font-mono text-xs text-tang">
                  That email doesn’t look right — try again?
                </p>
              )}
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/35">
                Unsubscribe anytime · we never sell your data
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
