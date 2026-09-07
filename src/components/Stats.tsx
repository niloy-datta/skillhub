import { useEffect, useRef, useState } from "react";
import { useCountUp } from "../hooks";

interface StatDef {
  value: number;
  suffix: string;
  label: string;
  note: string;
  gradient: string;
}

const STATS: StatDef[] = [
  { value: 205, suffix: "+", label: "local jobs available", note: "right now", gradient: "from-indigo to-violet" },
  { value: 8, suffix: "", label: "trusted employers", note: "verified & paying", gradient: "from-violet to-amber" },
  { value: 24, suffix: "h", label: "fastest hiring time", note: "apply today, start tomorrow", gradient: "from-amber to-emerald" },
  { value: 100, suffix: "%", label: "jobs with salary shown", note: "no hidden pay", gradient: "from-emerald to-indigo" },
];

function Stat({ value, suffix, label, note, gradient }: StatDef) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const n = useCountUp(value, active);

  return (
    <div ref={ref} className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-premium transition-all hover:scale-105 hover:shadow-glow md:p-10">
      <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${gradient} opacity-10 blur-2xl transition-opacity group-hover:opacity-20`} />
      <p className={`font-display text-5xl font-black tracking-tight bg-gradient-to-r ${gradient} bg-clip-text text-transparent md:text-6xl`}>
        {n.toLocaleString("en-US")}
        <span className="ml-1 text-3xl font-bold md:text-4xl">{suffix}</span>
      </p>
      <p className="mt-4 font-mono text-sm font-medium text-midnight/60">{label}</p>
      <p className="mt-1 font-mono text-xs text-midnight/40">{note}</p>
    </div>
  );
}

export function Stats() {
  return (
    <section className="relative bg-cream py-24">
      <div className="gradient-mesh absolute inset-0 opacity-50" />
      <div className="relative mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-2 md:px-8 lg:grid-cols-4">
        {STATS.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
