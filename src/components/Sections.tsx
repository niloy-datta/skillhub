import { useState } from "react";
import { COMPANIES } from "../data";
import { Reveal } from "../hooks";
import { CompanyMark, IconArrow, IconCheck, IconStar } from "./Icons";

/* ---------- Company Spotlight ---------- */
export function CompanySpotlight({ onBrowse }: { onBrowse: (name: string) => void }) {
  const [followed, setFollowed] = useState<Set<string>>(new Set());

  const toggleFollow = (id: string) => {
    setFollowed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section id="companies" className="relative bg-midnight py-24 text-white">
      <div className="gradient-mesh absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mb-12">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
              // Company Spotlight
            </p>
            <h2 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">
              Hiring right now
            </h2>
            <p className="mt-3 text-lg text-white/60">
              {COMPANIES.length} vetted companies with open roles
            </p>
          </div>
        </Reveal>

        <div className="scroll-row flex gap-6 overflow-x-auto pb-6">
          {COMPANIES.map((company, i) => (
            <Reveal key={company.id} delay={i * 80}>
              <div className="group w-[320px] shrink-0 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-indigo/50 hover:bg-white/10">
                <div className="flex items-start justify-between">
                  <CompanyMark company={company} size="lg" />
                  <button
                    onClick={() => toggleFollow(company.id)}
                    className={`rounded-full border px-4 py-1.5 font-mono text-xs font-semibold transition-all ${
                      followed.has(company.id)
                        ? "border-indigo bg-indigo text-white"
                        : "border-white/30 text-white/70 hover:border-white"
                    }`}
                  >
                    {followed.has(company.id) ? "Following" : "Follow"}
                  </button>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{company.name}</h3>
                <p className="mt-1 font-mono text-sm text-white/60">{company.tagline}</p>
                <div className="mt-4 flex items-center gap-2 font-mono text-sm">
                  <IconStar className="h-4 w-4 text-amber" />
                  <span className="font-semibold">{company.rating}</span>
                  <span className="text-white/40">({company.reviews} reviews)</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {company.perks.slice(0, 3).map((perk) => (
                    <span
                      key={perk}
                      className="rounded-full border border-white/20 bg-white/5 px-3 py-1 font-mono text-xs text-white/70"
                    >
                      {perk}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => onBrowse(company.name)}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo to-violet py-3 font-semibold text-white shadow-glow transition-all hover:scale-105"
                >
                  {company.openRoles} open roles <IconArrow className="h-4 w-4" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Salary Explorer ---------- */
const SALARY_DATA = [
  { role: "Frontend Engineer", min: 70, max: 120, avg: 95 },
  { role: "Product Designer", min: 65, max: 110, avg: 88 },
  { role: "Data Scientist", min: 80, max: 140, avg: 110 },
  { role: "Product Manager", min: 90, max: 150, avg: 120 },
  { role: "DevOps Engineer", min: 75, max: 130, avg: 102 },
];

export function SalaryExplorer() {
  return (
    <section id="salaries" className="relative bg-cream py-24">
      <div className="gradient-mesh absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mb-12 text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
              // Comp Intel
            </p>
            <h2 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">
              Salary explorer
            </h2>
            <p className="mt-3 text-lg text-midnight/60">
              Real salary bands from live listings — no guessing
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="rounded-3xl border border-midnight/10 bg-white p-8 shadow-premium md:p-12">
            <div className="space-y-8">
              {SALARY_DATA.map((item, i) => (
                <div key={item.role}>
                  <div className="mb-3 flex items-baseline justify-between">
                    <p className="font-display text-lg font-bold">{item.role}</p>
                    <p className="font-mono text-sm text-midnight/60">
                      €{item.min}k – €{item.max}k
                    </p>
                  </div>
                  <div className="relative h-3 overflow-hidden rounded-full bg-mist">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-indigo via-violet to-amber transition-all duration-1000"
                      style={{ width: `${(item.max / 160) * 100}%` }}
                    />
                    <div
                      className="absolute inset-y-0 rounded-full bg-white/30 transition-all duration-1000"
                      style={{
                        left: `${(item.min / 160) * 100}%`,
                        width: `${((item.max - item.min) / 160) * 100}%`,
                      }}
                    />
                    <div
                      className="absolute top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-midnight shadow-lg transition-all duration-1000"
                      style={{ left: `${(item.avg / 160) * 100}%` }}
                    />
                  </div>
                  <p className="mt-2 font-mono text-xs text-midnight/50">
                    Avg: €{item.avg}k
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- How It Works ---------- */
const STEPS = [
  {
    num: "01",
    title: "Every role vetted",
    desc: "We verify every listing with the hiring team. No ghost jobs. No stale postings. Only live, real roles.",
  },
  {
    num: "02",
    title: "Salary bands on every listing",
    desc: "Every role shows the real salary range. No more salary roulette. Know what you're worth before you apply.",
  },
  {
    num: "03",
    title: "Live feed, updated hourly",
    desc: "New roles stream in every hour. The wire never sleeps. Be first to apply to the best opportunities.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative bg-midnight py-24 text-white">
      <div className="gradient-mesh absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mb-16 text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
              // The Method
            </p>
            <h2 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">
              How it works
            </h2>
            <p className="mt-3 text-lg text-white/60">
              Three simple principles. Zero fluff.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 150}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-indigo/50 hover:bg-white/10">
                <div className="absolute -right-4 -top-4 font-display text-[120px] font-black leading-none text-white/5 transition-all group-hover:text-indigo/10">
                  {step.num}
                </div>
                <div className="relative">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
                    Step {step.num}
                  </p>
                  <h3 className="mt-4 font-display text-2xl font-bold">{step.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-white/70">{step.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={450}>
          <div className="mt-16 rounded-3xl bg-gradient-to-r from-indigo via-violet to-amber p-12 text-center shadow-glow">
            <h3 className="font-display text-3xl font-black">Ready to hire?</h3>
            <p className="mt-3 text-lg text-white/90">
              Post your role on the wire. Reach 50k+ qualified candidates.
            </p>
            <button className="mt-8 rounded-full bg-white px-8 py-4 font-semibold text-midnight shadow-premium transition-all hover:scale-105">
              Post a role →
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
const TESTIMONIALS = [
  {
    quote: "Workwire is the only job board I trust. Every listing is real, every salary is transparent. I landed my dream role in 3 weeks.",
    author: "Sarah Chen",
    role: "Senior Product Designer at Stripe",
  },
  {
    quote: "The quality of candidates we get from Workwire is unmatched. They're pre-qualified, motivated, and ready to interview.",
    author: "Marcus Johnson",
    role: "Head of Engineering at Linear",
  },
  {
    quote: "I've tried every job board. Workwire is the only one that actually delivers. The salary transparency alone is worth it.",
    author: "Elena Rodriguez",
    role: "Data Scientist at Notion",
  },
];

export function Testimonials() {
  return (
    <section id="stories" className="relative bg-cream py-24">
      <div className="gradient-mesh absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mb-12 text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
              // Signed off the wire
            </p>
            <h2 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">
              What people are saying
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.author} delay={i * 150}>
              <div className="group relative overflow-hidden rounded-2xl border border-midnight/10 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-premium">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-indigo to-violet opacity-10 blur-2xl transition-opacity group-hover:opacity-20" />
                <div className="relative">
                  <p className="text-lg leading-relaxed text-midnight/80">"{t.quote}"</p>
                  <div className="mt-6 border-t border-midnight/10 pt-6">
                    <p className="font-display text-base font-bold">{t.author}</p>
                    <p className="mt-1 font-mono text-sm text-midnight/60">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Alert Band ---------- */
export function AlertBand() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section id="alerts" className="relative overflow-hidden bg-gradient-to-br from-indigo via-violet to-amber py-24 text-white">
      <div className="bg-hero-grid absolute inset-0 opacity-10" />
      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
        <Reveal>
          <h2 className="font-display text-4xl font-black tracking-tight md:text-5xl">
            Get the Friday digest
          </h2>
          <p className="mt-4 text-lg text-white/90">
            The best new roles, delivered every Friday. No spam. Unsubscribe anytime.
          </p>
        </Reveal>

        <Reveal delay={200}>
          {submitted ? (
            <div className="mt-10 inline-flex items-center gap-3 rounded-full bg-white/20 px-8 py-4 backdrop-blur-sm">
              <IconCheck className="h-6 w-6" />
              <span className="font-semibold">You're on the list. See you Friday.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 rounded-full border border-white/30 bg-white/10 px-6 py-4 text-base text-white backdrop-blur-sm outline-none placeholder:text-white/50 focus:border-white"
              />
              <button
                type="submit"
                className="rounded-full bg-white px-8 py-4 font-semibold text-midnight shadow-premium transition-all hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
