import { useEffect, useState } from "react";
import { COMPANIES, formatAgo, type Job } from "../data";
import {
  CompanyMark,
  IconArrow,
  IconBookmark,
  IconCheck,
  IconClock,
  IconPin,
  IconStar,
  IconX,
} from "./Icons";

export function JobModal({
  job,
  saved,
  onSave,
  onClose,
}: {
  job: Job;
  saved: boolean;
  onSave: () => void;
  onClose: () => void;
}) {
  const [applied, setApplied] = useState(false);
  const company = COMPANIES.find((c) => c.id === job.companyId);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[90] overflow-y-auto" role="dialog" aria-modal="true" aria-label={job.title}>
      <div className="fixed inset-0 bg-midnight/80 backdrop-blur-sm" onClick={onClose} />
      <div className="card-in relative mx-auto my-[5vh] w-[min(94vw,48rem)]">
        <article className="overflow-hidden rounded-3xl bg-white shadow-premium">
          {/* Gradient header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo via-violet to-amber p-8 text-white">
            <div className="absolute inset-0 bg-hero-grid opacity-10" />
            <div className="relative flex items-start justify-between">
              <div className="flex items-start gap-5">
                {company && <CompanyMark company={company} size="lg" />}
                <div>
                  <h2 className="font-display text-3xl font-black leading-tight">
                    {job.title}
                  </h2>
                  <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm text-white/80">
                    {job.company}
                    <span className="text-white/40">·</span>
                    <span className="flex items-center gap-1.5">
                      <IconPin className="h-3.5 w-3.5" />
                      {job.location}
                    </span>
                    <span className="text-white/40">·</span>
                    <span className="flex items-center gap-1.5">
                      <IconClock className="h-3.5 w-3.5" />
                      {formatAgo(job.postedHours)}
                    </span>
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-full bg-white/10 p-2.5 backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <IconX className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="space-y-8 p-8">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-gradient-to-r from-indigo to-violet px-4 py-2 font-mono text-sm font-bold text-white">
                ৳{job.salaryMin.toLocaleString()}–{job.salaryMax.toLocaleString()} gross/month
              </span>
              {[job.category, job.level, job.type, job.mode, ...job.tags].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-midnight/15 bg-cream px-4 py-2 font-mono text-sm text-midnight/70"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
                // The role
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-midnight/75">{job.description}</p>
            </div>

            {/* Responsibilities */}
            <div>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
                // What you'll do
              </h3>
              <ul className="mt-4 space-y-3">
                {job.responsibilities.map((r) => (
                  <li key={r} className="flex gap-3 text-base leading-relaxed text-midnight/75">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-indigo to-violet" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Company card */}
            {company && (
              <div className="rounded-2xl border border-midnight/10 bg-cream p-5">
                <div className="flex items-center gap-4">
                  <CompanyMark company={company} size="md" />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-lg font-bold">{company.name}</p>
                    <p className="truncate font-mono text-sm text-midnight/60">{company.tagline}</p>
                  </div>
                  <p className="flex shrink-0 items-center gap-1.5 font-mono text-sm">
                    <IconStar className="h-4 w-4 text-amber" />
                    {company.rating}
                    <span className="text-midnight/40">({company.reviews})</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex flex-wrap items-center gap-3 border-t border-midnight/10 bg-cream p-8">
            <button
              onClick={() => setApplied(true)}
              disabled={applied}
              className={`flex items-center gap-2 rounded-full px-8 py-3.5 font-semibold text-white shadow-glow transition-all hover:scale-105 ${
                applied
                  ? "cursor-default bg-emerald"
                  : "bg-gradient-to-r from-indigo to-violet"
              }`}
            >
              {applied ? (
                <>
                  <IconCheck className="h-5 w-5" /> Application started
                </>
              ) : (
                <>
                  Apply now <IconArrow className="h-5 w-5" />
                </>
              )}
            </button>
            <button
              onClick={onSave}
              aria-pressed={saved}
              className={`flex items-center gap-2 rounded-full border px-6 py-3.5 font-semibold transition-all ${
                saved
                  ? "border-indigo bg-indigo/10 text-indigo"
                  : "border-midnight/20 text-midnight/70 hover:border-midnight"
              }`}
            >
              <IconBookmark className="h-4 w-4" filled={saved} />
              {saved ? "Saved" : "Save"}
            </button>
            <p className="ml-auto font-mono text-xs text-midnight/50">
              Most employers reply within 24h
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
