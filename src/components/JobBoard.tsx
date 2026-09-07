import { useMemo, useState } from "react";
import { COMPANIES, JOBS, type Job } from "../data";
import { Reveal } from "../hooks";
import {
  CompanyMark,
  IconArrow,
  IconBookmark,
  IconChevron,
  IconClock,
  IconFilter,
  IconPin,
  IconSearch,
  IconX,
} from "./Icons";

const CATEGORIES = ["All", "Engineering", "Design", "Data", "Product", "Marketing", "Sales"];
const MODES = ["Remote", "Hybrid", "On-site"];
const TYPES = ["Full-time", "Part-time", "Contract"];
const LEVELS = ["Junior", "Mid", "Senior", "Lead"];

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
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-midnight/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-indigo/30 hover:shadow-premium"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo/5 to-violet/5 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            {company && <CompanyMark company={company} />}
            <div>
              <h3 className="font-display text-xl font-bold leading-tight transition-colors group-hover:text-indigo">
                {job.title}
              </h3>
              <p className="mt-1 font-mono text-sm text-midnight/60">{job.company}</p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSave();
            }}
            aria-pressed={saved}
            className={`rounded-full p-2 transition-all ${
              saved
                ? "bg-indigo/10 text-indigo"
                : "bg-mist/50 text-midnight/40 hover:bg-mist hover:text-midnight"
            }`}
          >
            <IconBookmark className="h-5 w-5" filled={saved} />
          </button>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="flex items-center gap-1.5 rounded-full bg-mist/50 px-3 py-1.5 text-midnight/70">
            <IconPin className="h-3 w-3" />
            {job.location}
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-mist/50 px-3 py-1.5 text-midnight/70">
            <IconClock className="h-3 w-3" />
            {job.mode}
          </span>
          <span className="rounded-full bg-mist/50 px-3 py-1.5 text-midnight/70">{job.level}</span>
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {job.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-md border border-midnight/10 bg-cream px-2.5 py-1 font-mono text-xs text-midnight/60"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-midnight/10 pt-5">
          <p className="font-display text-lg font-bold">
            €{job.salaryMin}–{job.salaryMax}k
            <span className="ml-1 text-xs font-medium text-midnight/50">/yr</span>
          </p>
          <span className="flex items-center gap-1.5 font-mono text-xs font-semibold text-indigo opacity-0 transition-opacity group-hover:opacity-100">
            View role <IconArrow className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
}

export function JobBoard({
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
}: {
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
}) {
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState<"newest" | "salary">("newest");
  const [page, setPage] = useState(1);
  const perPage = 9;

  const filtered = useMemo(() => {
    let list = JOBS;
    if (savedOnly) list = list.filter((j) => savedIds.has(j.id));
    if (category !== "All") list = list.filter((j) => j.category === category);
    if (modes.size > 0) list = list.filter((j) => modes.has(j.mode));
    if (salaryFloor > 30) list = list.filter((j) => j.salaryMin >= salaryFloor);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (location.trim()) {
      const l = location.toLowerCase();
      list = list.filter((j) => j.location.toLowerCase().includes(l));
    }
    if (sort === "salary") list = [...list].sort((a, b) => b.salaryMax - a.salaryMax);
    else list = [...list].sort((a, b) => a.postedHours - b.postedHours);
    return list;
  }, [query, location, category, modes, salaryFloor, savedOnly, savedIds, sort]);

  const visible = filtered.slice(0, page * perPage);
  const hasMore = visible.length < filtered.length;

  const toggleMode = (mode: string) => {
    const next = new Set(modes);
    if (next.has(mode)) next.delete(mode);
    else next.add(mode);
    setModes(next);
    setPage(1);
  };

  const clearFilters = () => {
    setQuery("");
    setLocation("");
    setCategory("All");
    setModes(new Set());
    setSalaryFloor(30);
    setSavedOnly(false);
    setPage(1);
  };

  const activeFilterCount =
    (query ? 1 : 0) +
    (location ? 1 : 0) +
    (category !== "All" ? 1 : 0) +
    modes.size +
    (salaryFloor > 30 ? 1 : 0) +
    (savedOnly ? 1 : 0);

  return (
    <section id="jobs" className="relative bg-cream py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
                // The Board
              </p>
              <h2 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">
                {savedOnly ? "Saved roles" : "Live on the wire"}
              </h2>
              <p className="mt-3 text-lg text-midnight/60">
                {filtered.length} open role{filtered.length !== 1 ? "s" : ""} · updated 60s ago
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 rounded-full border px-5 py-2.5 font-mono text-sm font-semibold transition-all ${
                  showFilters || activeFilterCount > 0
                    ? "border-indigo bg-indigo/10 text-indigo"
                    : "border-midnight/20 text-midnight/70 hover:border-midnight"
                }`}
              >
                <IconFilter className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo text-xs text-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>
              <div className="flex items-center gap-1 rounded-full border border-midnight/20 p-1">
                <button
                  onClick={() => setSort("newest")}
                  className={`rounded-full px-4 py-1.5 font-mono text-xs font-semibold transition-all ${
                    sort === "newest" ? "bg-midnight text-white" : "text-midnight/60"
                  }`}
                >
                  Newest
                </button>
                <button
                  onClick={() => setSort("salary")}
                  className={`rounded-full px-4 py-1.5 font-mono text-xs font-semibold transition-all ${
                    sort === "salary" ? "bg-midnight text-white" : "text-midnight/60"
                  }`}
                >
                  Salary
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Search bar */}
        <Reveal delay={100}>
          <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-midnight/10 bg-white p-3 shadow-sm md:flex-row">
            <label className="flex flex-1 items-center gap-3 rounded-xl bg-cream px-4">
              <IconSearch className="h-5 w-5 text-midnight/40" />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search roles, companies, skills…"
                className="w-full bg-transparent py-3 text-base outline-none placeholder:text-midnight/40"
              />
            </label>
            <label className="flex items-center gap-3 rounded-xl bg-cream px-4 md:w-64">
              <IconPin className="h-5 w-5 text-midnight/40" />
              <input
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setPage(1);
                }}
                placeholder="Location"
                className="w-full bg-transparent py-3 text-base outline-none placeholder:text-midnight/40"
              />
            </label>
          </div>
        </Reveal>

        {/* Filters panel */}
        {showFilters && (
          <Reveal delay={150}>
            <div className="mb-8 rounded-2xl border border-midnight/10 bg-white p-6 shadow-sm">
              <div className="space-y-6">
                <div>
                  <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">
                    Category
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setCategory(cat);
                          setPage(1);
                        }}
                        className={`rounded-full border px-4 py-2 font-mono text-sm font-medium transition-all ${
                          category === cat
                            ? "border-indigo bg-indigo text-white"
                            : "border-midnight/20 text-midnight/70 hover:border-midnight"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">
                    Mode
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {MODES.map((mode) => (
                      <button
                        key={mode}
                        onClick={() => toggleMode(mode)}
                        className={`rounded-full border px-4 py-2 font-mono text-sm font-medium transition-all ${
                          modes.has(mode)
                            ? "border-indigo bg-indigo text-white"
                            : "border-midnight/20 text-midnight/70 hover:border-midnight"
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">
                    Minimum salary: €{salaryFloor}k+
                  </p>
                  <input
                    type="range"
                    min={30}
                    max={150}
                    step={10}
                    value={salaryFloor}
                    onChange={(e) => {
                      setSalaryFloor(Number(e.target.value));
                      setPage(1);
                    }}
                    className="w-full"
                  />
                </div>

                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 font-mono text-sm font-semibold text-indigo hover:underline"
                  >
                    <IconX className="h-4 w-4" />
                    Clear all filters
                  </button>
                )}
              </div>
            </div>
          </Reveal>
        )}

        {/* Job grid */}
        {visible.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((job, i) => (
                <Reveal key={job.id} delay={i * 50}>
                  <JobCard
                    job={job}
                    saved={savedIds.has(job.id)}
                    onSave={() => onToggleSave(job.id)}
                    onOpen={() => onOpen(job)}
                  />
                </Reveal>
              ))}
            </div>
            {hasMore && (
              <div className="mt-12 text-center">
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="inline-flex items-center gap-2 rounded-full border border-midnight/20 px-8 py-3 font-semibold text-midnight transition-all hover:border-indigo hover:bg-indigo/5 hover:text-indigo"
                >
                  Load more roles
                  <IconChevron className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-2xl border border-midnight/10 bg-white p-16 text-center shadow-sm">
            <p className="font-display text-2xl font-bold text-midnight/80">No roles found</p>
            <p className="mt-3 text-midnight/60">Try adjusting your filters or search terms</p>
            <button
              onClick={clearFilters}
              className="mt-6 rounded-full bg-gradient-to-r from-indigo to-violet px-6 py-3 font-semibold text-white shadow-glow transition-all hover:scale-105"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
