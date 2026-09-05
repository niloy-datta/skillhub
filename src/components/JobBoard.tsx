import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  CATEGORIES,
  COMPANIES,
  JOBS,
  formatAgo,
  type Job,
  type JobLevel,
  type JobType,
  type WorkMode,
} from "../data";
import { Reveal } from "../hooks";
import {
  CompanyMark,
  IconBookmark,
  IconCheck,
  IconChevron,
  IconClock,
  IconFilter,
  IconPin,
  IconX,
} from "./Icons";

const TYPES: JobType[] = ["Full-time", "Contract", "Part-time", "Internship"];
const LEVELS: JobLevel[] = ["Junior", "Mid", "Senior", "Lead"];
const MODES: WorkMode[] = ["Remote", "Hybrid", "On-site"];
const MODE_DOT: Record<WorkMode, string> = {
  Remote: "bg-lime",
  Hybrid: "bg-cobalt",
  "On-site": "bg-tang",
};

type Sort = "new" | "high" | "low";

interface BoardProps {
  query: string;
  setQuery: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  modes: Set<string>;
  setModes: (v: Set<string>) => void;
  salaryFloor: number;
  setSalaryFloor: (v: number) => void;
  savedOnly: boolean;
  setSavedOnly: (v: boolean) => void;
  savedIds: Set<string>;
  onToggleSave: (id: string) => void;
  onOpen: (job: Job) => void;
}

interface FilterControls {
  types: Set<string>;
  onToggleType: (t: string) => void;
  levels: Set<string>;
  onToggleLevel: (l: string) => void;
  modes: Set<string>;
  onToggleMode: (m: string) => void;
  salaryFloor: number;
  setSalaryFloor: (n: number) => void;
  activeCount: number;
  onClearAll: () => void;
}

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-t border-ink/15 pt-4">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">
        {label}
      </p>
      {children}
    </div>
  );
}

function CheckRow({
  label,
  active,
  onClick,
  count,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  count: number;
}) {
  return (
    <button onClick={onClick} className="group flex w-full items-center gap-3 py-1.5 text-left">
      <span
        className={`grid h-4 w-4 shrink-0 place-items-center border transition-colors ${
          active ? "border-ink bg-ink" : "border-ink/30 group-hover:border-ink/70"
        }`}
      >
        {active && <IconCheck className="h-2.5 w-2.5 text-lime" />}
      </span>
      <span
        className={`text-sm transition-colors ${
          active ? "font-semibold" : "text-ink/70 group-hover:text-ink"
        }`}
      >
        {label}
      </span>
      <span className="ml-auto font-mono text-[10px] text-ink/40">{count}</span>
    </button>
  );
}

function FilterGroups({ f }: { f: FilterControls }) {
  const typeCounts = useMemo(() => {
    const m: Record<string, number> = {};
    JOBS.forEach((j) => (m[j.type] = (m[j.type] ?? 0) + 1));
    return m;
  }, []);
  const levelCounts = useMemo(() => {
    const m: Record<string, number> = {};
    JOBS.forEach((j) => (m[j.level] = (m[j.level] ?? 0) + 1));
    return m;
  }, []);

  return (
    <div className="space-y-7">
      <Group label="01 — Type">
        {TYPES.map((t) => (
          <CheckRow
            key={t}
            label={t}
            count={typeCounts[t] ?? 0}
            active={f.types.has(t)}
            onClick={() => f.onToggleType(t)}
          />
        ))}
      </Group>
      <Group label="02 — Level">
        {LEVELS.map((l) => (
          <CheckRow
            key={l}
            label={l}
            count={levelCounts[l] ?? 0}
            active={f.levels.has(l)}
            onClick={() => f.onToggleLevel(l)}
          />
        ))}
      </Group>
      <Group label="03 — Workplace">
        <div className="flex flex-wrap gap-1.5">
          {MODES.map((m) => {
            const active = f.modes.has(m);
            return (
              <button
                key={m}
                onClick={() => f.onToggleMode(m)}
                className={`flex items-center gap-1.5 border px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                  active
                    ? "border-ink bg-ink text-paper"
                    : "border-ink/20 hover:border-ink/50"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${MODE_DOT[m]}`} />
                {m}
              </button>
            );
          })}
        </div>
      </Group>
      <Group label="04 — Salary floor">
        <input
          type="range"
          min={30}
          max={160}
          step={5}
          value={f.salaryFloor}
          onChange={(e) => f.setSalaryFloor(Number(e.target.value))}
          className="w-full cursor-pointer"
          aria-label="Minimum salary in thousands of euros"
        />
        <p className="mt-2 font-mono text-xs text-ink/70">
          {f.salaryFloor <= 30 ? "Any salary" : `€${f.salaryFloor}k+ / year`}
        </p>
      </Group>
      {f.activeCount > 0 && (
        <button
          onClick={f.onClearAll}
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-cobalt underline underline-offset-4 transition-colors hover:text-cobalt-dark"
        >
          Clear all filters ({f.activeCount})
        </button>
      )}
    </div>
  );
}

function JobCard({
  job,
  saved,
  onSave,
  onOpen,
}: {
  job: Job;
  saved: boolean;
  onSave: () => void;
  onOpen: () => void;
}) {
  const company = COMPANIES.find((c) => c.id === job.companyId);
  return (
    <article
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter") onOpen();
      }}
      tabIndex={0}
      role="button"
      aria-label={`${job.title} at ${job.company}`}
      className="group relative cursor-pointer border border-ink/15 bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/45 hover:shadow-[7px_7px_0_0_rgba(16,25,19,0.09)]"
    >
      {job.featured && (
        <span className="absolute -top-2.5 left-4 bg-lime px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
          Featured
        </span>
      )}
      <div className="flex items-start gap-4">
        {company && <CompanyMark company={company} />}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="font-display text-lg font-bold leading-snug group-hover:text-cobalt">
              {job.title}
            </h3>
            {job.postedHours <= 24 && (
              <span className="inline-flex items-center gap-1.5 bg-tang px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-ink">
                <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-lime" />
                New
              </span>
            )}
          </div>
          <p className="mt-1 flex items-center gap-1.5 font-mono text-xs text-ink/60">
            {job.company}
            <span className="text-ink/30">·</span>
            <IconPin className="h-3 w-3" />
            {job.location}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="flex items-center gap-1.5 border border-ink/15 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-ink/60">
              <span className={`h-1.5 w-1.5 rounded-full ${MODE_DOT[job.mode]}`} />
              {job.mode}
            </span>
            {[job.level, job.type, ...job.tags.slice(0, 2)].map((t) => (
              <span
                key={t}
                className="border border-ink/15 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-ink/60"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2.5">
          <button
            aria-label={saved ? "Remove from saved" : "Save role"}
            aria-pressed={saved}
            onClick={(e) => {
              e.stopPropagation();
              onSave();
            }}
            className={`border p-2 transition-colors ${
              saved
                ? "border-cobalt bg-cobalt text-paper"
                : "border-ink/20 text-ink/50 hover:border-ink hover:text-ink"
            }`}
          >
            <IconBookmark className="h-3.5 w-3.5" filled={saved} />
          </button>
          <p className="font-mono text-sm font-bold">
            €{job.salaryMin}–{job.salaryMax}k
          </p>
          <p className="flex items-center gap-1 font-mono text-[11px] text-ink/50">
            <IconClock className="h-3 w-3" />
            {formatAgo(job.postedHours)}
          </p>
        </div>
      </div>
    </article>
  );
}

export function JobBoard(props: BoardProps) {
  const {
    query,
    setQuery,
    location,
    setLocation,
    category,
    setCategory,
    modes,
    setModes,
    salaryFloor,
    setSalaryFloor,
    savedOnly,
    setSavedOnly,
    savedIds,
    onToggleSave,
    onOpen,
  } = props;

  const [types, setTypes] = useState<Set<string>>(new Set());
  const [levels, setLevels] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<Sort>("new");
  const [visible, setVisible] = useState(8);
  const [showFilters, setShowFilters] = useState(false);

  const toggleIn = (set: Set<string>, value: string): Set<string> => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    return next;
  };

  const categoryCounts = useMemo(() => {
    const m: Record<string, number> = { All: JOBS.length };
    JOBS.forEach((j) => (m[j.category] = (m[j.category] ?? 0) + 1));
    return m;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const loc = location.trim().toLowerCase();
    const list = JOBS.filter((job) => {
      if (savedOnly && !savedIds.has(job.id)) return false;
      if (category !== "All" && job.category !== category) return false;
      if (modes.size > 0 && !modes.has(job.mode)) return false;
      if (types.size > 0 && !types.has(job.type)) return false;
      if (levels.size > 0 && !levels.has(job.level)) return false;
      if (job.salaryMax < salaryFloor) return false;
      if (loc && !job.location.toLowerCase().includes(loc)) return false;
      if (q) {
        const hay =
          `${job.title} ${job.company} ${job.category} ${job.location} ${job.tags.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    if (sort === "high") return [...list].sort((a, b) => b.salaryMax - a.salaryMax);
    if (sort === "low") return [...list].sort((a, b) => a.salaryMin - b.salaryMin);
    return [...list].sort((a, b) => a.postedHours - b.postedHours);
  }, [query, location, category, modes, types, levels, salaryFloor, savedOnly, savedIds, sort]);

  useEffect(() => {
    setVisible(8);
  }, [query, location, category, modes, types, levels, salaryFloor, savedOnly, sort]);

  const activeCount =
    (category !== "All" ? 1 : 0) +
    types.size +
    levels.size +
    modes.size +
    (salaryFloor > 30 ? 1 : 0) +
    (query || location ? 1 : 0) +
    (savedOnly ? 1 : 0);

  const clearAll = () => {
    setCategory("All");
    setTypes(new Set());
    setLevels(new Set());
    setModes(new Set());
    setSalaryFloor(30);
    setQuery("");
    setLocation("");
    setSavedOnly(false);
  };

  const filterControls: FilterControls = {
    types,
    onToggleType: (t) => setTypes((s) => toggleIn(s, t)),
    levels,
    onToggleLevel: (l) => setLevels((s) => toggleIn(s, l)),
    modes,
    onToggleMode: (m) => setModes(toggleIn(modes, m)),
    salaryFloor,
    setSalaryFloor,
    activeCount,
    onClearAll: clearAll,
  };

  const visibleJobs = filtered.slice(0, visible);

  return (
    <section id="jobs" className="scroll-mt-20 border-b border-ink/10 bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cobalt">
            // the board — live feed
          </p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-6xl">
              Every opening,
              <br className="hidden md:block" /> one wire.
            </h2>
            <button
              onClick={() => setSavedOnly(!savedOnly)}
              aria-pressed={savedOnly}
              className={`flex items-center gap-2 border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                savedOnly
                  ? "border-cobalt bg-cobalt text-paper"
                  : "border-ink/25 bg-card hover:border-ink/60"
              }`}
            >
              <IconBookmark className="h-3.5 w-3.5" filled={savedOnly} />
              Saved · {savedIds.size}
            </button>
          </div>
        </Reveal>

        {/* category chips */}
        <Reveal delay={80}>
          <div className="no-scrollbar mt-10 flex gap-2 overflow-x-auto pb-1">
            {["All", ...CATEGORIES].map((c) => {
              const active = category === c;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`shrink-0 border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-all active:scale-95 ${
                    active
                      ? "border-ink bg-ink text-lime"
                      : "border-ink/20 bg-card hover:border-ink/50"
                  }`}
                >
                  {c} <span className={active ? "text-paper/60" : "text-ink/40"}>{categoryCounts[c] ?? 0}</span>
                </button>
              );
            })}
            <button
              onClick={() => setShowFilters((v) => !v)}
              className={`flex shrink-0 items-center gap-2 border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors lg:hidden ${
                showFilters ? "border-ink bg-ink text-lime" : "border-ink/20 bg-card"
              }`}
            >
              <IconFilter className="h-3.5 w-3.5" />
              Refine{activeCount > 0 ? ` · ${activeCount}` : ""}
            </button>
          </div>
        </Reveal>

        {/* mobile filters */}
        {showFilters && (
          <div className="mt-6 border border-ink/15 bg-card p-5 lg:hidden">
            <FilterGroups f={filterControls} />
          </div>
        )}

        {/* toolbar */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink/60">
            <span className="font-bold text-cobalt">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "role" : "roles"} on the wire
          </p>
          {(query || location) && (
            <button
              onClick={() => {
                setQuery("");
                setLocation("");
              }}
              className="flex items-center gap-2 border border-cobalt/40 bg-cobalt/10 px-2.5 py-1 font-mono text-[11px] text-cobalt transition-colors hover:bg-cobalt hover:text-paper"
            >
              “{query}
              {query && location ? " · " : ""}
              {location}” <IconX className="h-3 w-3" />
            </button>
          )}
          {savedOnly && (
            <span className="flex items-center gap-2 border border-cobalt/40 bg-cobalt/10 px-2.5 py-1 font-mono text-[11px] uppercase text-cobalt">
              Saved only
            </span>
          )}
          <div className="relative ml-auto">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="cursor-pointer appearance-none border border-ink/20 bg-card py-2.5 pl-3 pr-9 font-mono text-[11px] uppercase tracking-[0.12em] hover:border-ink/50 focus:border-cobalt focus:outline-none"
              aria-label="Sort roles"
            >
              <option value="new">Newest first</option>
              <option value="high">Salary · high → low</option>
              <option value="low">Salary · low → high</option>
            </select>
            <IconChevron className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink/50" />
          </div>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[250px_1fr]">
          {/* sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <FilterGroups f={filterControls} />
            </div>
          </aside>

          {/* results */}
          <div className="space-y-4">
            {visibleJobs.map((job, i) => (
              <Reveal key={job.id} delay={Math.min(i, 6) * 45}>
                <JobCard
                  job={job}
                  saved={savedIds.has(job.id)}
                  onSave={() => onToggleSave(job.id)}
                  onOpen={() => onOpen(job)}
                />
              </Reveal>
            ))}

            {filtered.length === 0 && (
              <div className="border border-dashed border-ink/25 bg-card px-8 py-20 text-center">
                <p className="font-mono text-sm uppercase tracking-[0.2em] text-ink/50">
                  ∅ Nothing on the wire matches
                </p>
                <p className="mt-3 text-ink/60">
                  Loosen a filter or two — new roles land every hour.
                </p>
                <button
                  onClick={clearAll}
                  className="mt-6 bg-ink px-5 py-3 font-mono text-xs uppercase tracking-wider text-lime transition-colors hover:bg-pine"
                >
                  Reset all filters
                </button>
              </div>
            )}

            {visible < filtered.length && (
              <div className="pt-4 text-center">
                <button
                  onClick={() => setVisible((v) => v + 12)}
                  className="border border-ink/25 bg-card px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:border-ink hover:bg-ink hover:text-lime"
                >
                  Load {Math.min(12, filtered.length - visible)} more
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
