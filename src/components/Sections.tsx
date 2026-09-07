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
              // Trusted Employers
            </p>
            <h2 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">
              Hiring right now
            </h2>
            <p className="mt-3 text-lg text-white/60">
              {COMPANIES.length} verified employers with open positions
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
  { role: "Warehouse Worker", min: 10000, max: 18000, avg: 14000 },
  { role: "Delivery Rider", min: 15000, max: 28000, avg: 21000 },
  { role: "Factory Worker", min: 9000, max: 16000, avg: 12500 },
  { role: "Cleaner", min: 8000, max: 15000, avg: 11000 },
  { role: "Construction Worker", min: 12000, max: 22000, avg: 17000 },
];

export function SalaryExplorer() {
  return (
    <section id="salaries" className="relative bg-cream py-24">
      <div className="gradient-mesh absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mb-12 text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
              // Salary Guide
            </p>
            <h2 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">
              What you can earn
            </h2>
            <p className="mt-3 text-lg text-midnight/60">
              Real monthly salaries from actual job listings — no guessing
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
                      ৳{item.min.toLocaleString()} – ৳{item.max.toLocaleString()}
                    </p>
                  </div>
                  <div className="relative h-3 overflow-hidden rounded-full bg-mist">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-indigo via-violet to-amber transition-all duration-1000"
                      style={{ width: `${(item.max / 30000) * 100}%` }}
                    />
                    <div
                      className="absolute inset-y-0 rounded-full bg-white/30 transition-all duration-1000"
                      style={{
                        left: `${(item.min / 30000) * 100}%`,
                        width: `${((item.max - item.min) / 30000) * 100}%`,
                      }}
                    />
                    <div
                      className="absolute top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-midnight shadow-lg transition-all duration-1000"
                      style={{ left: `${(item.avg / 30000) * 100}%` }}
                    />
                  </div>
                  <p className="mt-2 font-mono text-xs text-midnight/50">
                    Avg: ৳{item.avg.toLocaleString()}/month
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
    title: "Real jobs, real pay",
    desc: "Every job is verified with the employer. No fake listings, no agents asking for money. Only genuine local work.",
  },
  {
    num: "02",
    title: "Salary shown upfront",
    desc: "Every job shows the exact monthly salary range. Know what you'll earn before you apply. No surprises.",
  },
  {
    num: "03",
    title: "Quick hiring",
    desc: "Apply today, start working this week. Most employers respond within 24 hours. No long waiting periods.",
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
              // Simple & Honest
            </p>
            <h2 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">
              How it works
            </h2>
            <p className="mt-3 text-lg text-white/60">
              No agents. No fees. Just real jobs and real pay.
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
            <h3 className="font-display text-3xl font-black">Need workers?</h3>
            <p className="mt-3 text-lg text-white/90">
              Post your job for free. Reach local workers ready to start immediately.
            </p>
            <button className="mt-8 rounded-full bg-white px-8 py-4 font-semibold text-midnight shadow-premium transition-all hover:scale-105">
              Post a job →
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
    quote: "I found a warehouse job in Gazipur within 2 days. The salary was exactly what they showed. No surprises, no delays. Started working the next week!",
    author: "Rahim Uddin",
    role: "Warehouse Loader at Mega Warehouse Co.",
  },
  {
    quote: "As a delivery rider, I needed flexible hours and quick pay. Swift Delivery hired me same day through this site. Best decision I made.",
    author: "Kamal Hossain",
    role: "Delivery Rider at Swift Delivery",
  },
  {
    quote: "We needed 20 workers fast for our packaging line. Got applications within hours. These workers are reliable and hardworking.",
    author: "Fatema Begum",
    role: "HR Manager at FreshPack Foods",
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
              // Real Stories
            </p>
            <h2 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">
              Workers & employers say
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
            Get new jobs in your area
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Get notified when new jobs are posted near you. Free alerts via SMS or email.
          </p>
        </Reveal>

        <Reveal delay={200}>
          {submitted ? (
            <div className="mt-10 inline-flex items-center gap-3 rounded-full bg-white/20 px-8 py-4 backdrop-blur-sm">
              <IconCheck className="h-6 w-6" />
              <span className="font-semibold">You're on the list! We'll text you when new jobs appear.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your phone number or email"
                required
                className="flex-1 rounded-full border border-white/30 bg-white/10 px-6 py-4 text-base text-white backdrop-blur-sm outline-none placeholder:text-white/50 focus:border-white"
              />
              <button
                type="submit"
                className="rounded-full bg-white px-8 py-4 font-semibold text-midnight shadow-premium transition-all hover:scale-105"
              >
                Get Alerts
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
