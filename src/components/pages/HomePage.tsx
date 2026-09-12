import { useState } from "react";
import { useScramble } from "../../hooks";

interface HomePageProps {
  onNavigate: (view: any) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [outcomeInput, setOutcomeInput] = useState("");
  const line1 = useScramble("DESCRIBE THE", 200);
  const line2 = useScramble("OUTCOME.", 650);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (outcomeInput.trim()) {
      onNavigate("mission-compiler");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight via-charcoal to-midnight text-white">
      {/* Background effects */}
      <div className="absolute inset-0 bg-hero-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-midnight/50 to-midnight" />

      <div className="relative mx-auto max-w-7xl px-5 pt-32 pb-20 md:px-8 md:pt-40">
        {/* Hero Section */}
        <div className="text-center">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-emerald/30 bg-emerald/10 px-5 py-2 backdrop-blur-sm">
            <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-emerald" />
            <span className="font-mono text-sm text-emerald">
              Outcome Network Live
            </span>
          </div>

          <h1 className="mb-6 font-display text-[clamp(3rem,10vw,7rem)] font-black leading-[0.85] tracking-tight">
            <span className="block">{line1}</span>
            <span className="block gradient-text">{line2}</span>
          </h1>

          <p className="mx-auto mb-12 max-w-3xl text-xl text-white/70 md:text-2xl">
            We assemble human + AI crews to get it done.
            <br />
            <span className="text-white/50">You purchase outcomes, not hours.</span>
          </p>

          {/* Giant Input */}
          <form onSubmit={handleSubmit} className="mx-auto max-w-4xl">
            <div className="rounded-3xl border-2 border-white/20 bg-white/5 p-2 backdrop-blur-xl">
              <div className="flex flex-col gap-3 p-4">
                <textarea
                  value={outcomeInput}
                  onChange={(e) => setOutcomeInput(e.target.value)}
                  placeholder="e.g., Launch my e-commerce store in Bangladesh within 21 days, budget $10,000..."
                  className="min-h-[120px] w-full resize-none bg-transparent text-xl text-white outline-none placeholder:text-white/40 md:text-2xl"
                  rows={3}
                />
                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/70 transition-all hover:bg-white/10"
                    >
                      💡 Examples
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/70 transition-all hover:bg-white/10"
                    >
                      📎 Attach files
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={!outcomeInput.trim()}
                    className="rounded-full bg-gradient-to-r from-indigo to-violet px-8 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Compile Mission →
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Example Missions */}
          <div className="mt-16">
            <p className="mb-6 font-mono text-sm uppercase tracking-[0.2em] text-white/50">
              Recent Missions
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "E-commerce Launch",
                  outcome: "Launch clothing store in 21 days",
                  budget: "$10,000",
                  progress: 62,
                  confidence: 93,
                  status: "in-progress",
                },
                {
                  title: "Restaurant Opening",
                  outcome: "Open Mediterranean restaurant in Dubai",
                  budget: "$120,000",
                  progress: 25,
                  confidence: 78,
                  status: "compiling",
                },
                {
                  title: "App Development",
                  outcome: "Build fitness app with 10k users",
                  budget: "$45,000",
                  progress: 100,
                  confidence: 100,
                  status: "completed",
                },
              ].map((mission, i) => (
                <div
                  key={i}
                  className="group cursor-pointer rounded-2xl border-2 border-white/10 bg-white/5 p-6 text-left backdrop-blur-sm transition-all hover:border-indigo/50 hover:bg-white/10"
                  onClick={() => onNavigate("mission-detail")}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <h3 className="font-display text-xl font-bold group-hover:text-indigo">
                      {mission.title}
                    </h3>
                    <span
                      className={`rounded-full px-3 py-1 font-mono text-xs font-semibold ${
                        mission.status === "completed"
                          ? "bg-emerald/10 text-emerald"
                          : mission.status === "in-progress"
                            ? "bg-indigo/10 text-indigo"
                            : "bg-amber/10 text-amber"
                      }`}
                    >
                      {mission.status}
                    </span>
                  </div>
                  <p className="mb-4 text-sm text-white/60">{mission.outcome}</p>
                  <div className="mb-4 flex items-center justify-between text-sm">
                    <span className="text-white/50">Budget</span>
                    <span className="font-semibold">{mission.budget}</span>
                  </div>
                  <div className="mb-2">
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-white/50">Progress</span>
                      <span className="font-semibold">{mission.progress}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo to-violet transition-all"
                        style={{ width: `${mission.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/50">Deadline confidence</span>
                    <span className="font-semibold text-emerald">
                      {mission.confidence}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-24">
            <h2 className="mb-12 font-display text-4xl font-bold">
              How Skillhub Works
            </h2>
            <div className="grid gap-8 md:grid-cols-5">
              {[
                {
                  step: "1",
                  title: "Describe Outcome",
                  desc: "Tell us what you need achieved",
                  icon: "🎯",
                },
                {
                  step: "2",
                  title: "Mission Compiler",
                  desc: "AI creates work graph & dependencies",
                  icon: "🧠",
                },
                {
                  step: "3",
                  title: "Crew Assembly",
                  desc: "Optimized human + AI team",
                  icon: "👥",
                },
                {
                  step: "4",
                  title: "Autonomous Execution",
                  desc: "Self-managing with self-healing",
                  icon: "⚡",
                },
                {
                  step: "5",
                  title: "Outcome Delivered",
                  desc: "Verified results with evidence",
                  icon: "✅",
                },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo to-violet text-3xl">
                    {item.icon}
                  </div>
                  <h3 className="mb-2 font-display text-lg font-bold">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-24 grid gap-6 md:grid-cols-4">
            {[
              { value: "2,847", label: "Missions delivered", gradient: "from-indigo to-violet" },
              { value: "94%", label: "Success rate", gradient: "from-emerald to-indigo" },
              { value: "18 days", label: "Avg. completion", gradient: "from-amber to-violet" },
              { value: "$12M", label: "Value created", gradient: "from-violet to-amber" },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <p className={`font-display text-4xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
                <p className="mt-2 font-mono text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
