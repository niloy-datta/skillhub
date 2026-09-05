import { useEffect, useRef, useState } from "react";
import { useCountUp } from "../hooks";

interface StatDef {
  value: number;
  suffix: string;
  label: string;
  note: string;
}

const STATS: StatDef[] = [
  { value: 2847, suffix: "", label: "live roles on the wire", note: "right now" },
  { value: 612, suffix: "", label: "companies hiring", note: "vetted & paying" },
  { value: 48, suffix: "h", label: "median first response", note: "last 90 days" },
  { value: 92, suffix: "%", label: "listings with salary bands", note: "and climbing" },
];

function Stat({ value, suffix, label, note }: StatDef) {
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
    <div ref={ref} className="bg-paper p-7 transition-colors duration-300 hover:bg-card md:p-9">
      <p className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
        {n.toLocaleString("en-US")}
        <span className="ml-0.5 font-mono text-xl font-semibold text-cobalt md:text-2xl">
          {suffix}
        </span>
      </p>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
        {label}
      </p>
      <p className="mt-1 font-mono text-[10px] text-ink/35">{note}</p>
    </div>
  );
}

export function Stats() {
  return (
    <section className="border-b border-ink/10 bg-paper">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px border-x border-ink/15 bg-ink/15 lg:grid-cols-4">
        {STATS.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
