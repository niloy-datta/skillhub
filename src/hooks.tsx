import { useEffect, useRef, useState, type ReactNode } from "react";

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** Wrap content to fade/slide it in when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("is-in");
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/** Count from 0 to target once `active` flips true. */
export function useCountUp(target: number, active: boolean, duration = 1500): number {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setValue(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration, reduced]);
  return value;
}

const GLYPHS = "#/<>_+*%$&@";

function scrambled(text: string): string {
  return text
    .split("")
    .map((c) =>
      c === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
    )
    .join("");
}

/** Decode-style text scramble that settles left to right. */
export function useScramble(text: string, delay = 0): string {
  const reduced = usePrefersReducedMotion();
  const [out, setOut] = useState(() => (reduced ? text : scrambled(text)));
  useEffect(() => {
    if (reduced) {
      setOut(text);
      return;
    }
    let interval = 0;
    let tick = 0;
    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        tick += 1;
        const settled = Math.floor(tick / 2);
        if (settled >= text.length) {
          setOut(text);
          window.clearInterval(interval);
          return;
        }
        let s = text.slice(0, settled);
        for (let i = settled; i < text.length; i += 1) {
          const c = text[i];
          s +=
            c === " "
              ? " "
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setOut(s);
      }, 30);
    }, delay);
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [text, delay, reduced]);
  return out;
}
