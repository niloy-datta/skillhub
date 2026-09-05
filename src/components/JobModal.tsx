import { useEffect, useState } from "react";
import { COMPANIES, formatAgo, type Job } from "../data";
import {
  CompanyMark,
  IconArrow,
  IconBolt,
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
      <div className="fixed inset-0 bg-ink/75" onClick={onClose} />
      <div className="card-in relative mx-auto my-[6vh] w-[min(92vw,44rem)]">
        <article className="border border-ink/20 bg-card text-ink shadow-2xl">
          {/* header */}
          <div className="flex items-start gap-4 border-b border-ink/10 p-6 md:p-7">
            {company && <CompanyMark company={company} size="lg" />}
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-2xl font-extrabold leading-tight">{job.title}</h2>
              <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-ink/55">
                {job.company}
                <span className="text-ink/30">·</span>
                <span className="flex items-center gap-1">
                  <IconPin className="h-3 w-3" />
                  {job.location}
                </span>
                <span className="text-ink/30">·</span>
                <span className="flex items-center gap-1">
                  <IconClock className="h-3 w-3" />
                  {formatAgo(job.postedHours)}
                </span>
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close role details"
              className="border border-ink/20 p-2 transition-colors hover:bg-ink hover:text-paper"
            >
              <IconX className="h-4 w-4" />
            </button>
          </div>

          {/* body */}
          <div className="space-y-7 p-6 md:p-7">
            <div className="flex flex-wrap gap-1.5">
              <span className="bg-ink px-3 py-1.5 font-mono text-xs font-bold text-lime">
                €{job.salaryMin}–{job.salaryMax}k gross/yr
              </span>
              {[job.category, job.level, job.type, job.mode, ...job.tags].map((t) => (
                <span
                  key={t}
                  className="border border-ink/15 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-ink/60"
                >
                  {t}
                </span>
              ))}
            </div>

            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-cobalt">
                // the role
              </h3>
              <p className="mt-3 leading-relaxed text-ink/75">{job.description}</p>
            </div>

            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-cobalt">
                // what you’ll do
              </h3>
              <ul className="mt-3 space-y-2.5">
                {job.responsibilities.map((r) => (
                  <li key={r} className="flex gap-2.5 text-sm leading-relaxed text-ink/75">
                    <IconBolt className="mt-0.5 h-4 w-4 shrink-0 text-cobalt" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {company && (
              <div className="flex items-center gap-4 border border-ink/10 bg-paper p-4">
                <CompanyMark company={company} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="font-display font-bold">{company.name}</p>
                  <p className="truncate font-mono text-[11px] text-ink/55">{company.tagline}</p>
                </div>
                <p className="flex shrink-0 items-center gap-1.5 font-mono text-xs">
                  <IconStar className="h-3.5 w-3.5 text-tang" />
                  {company.rating}
                  <span className="text-ink/40">({company.reviews})</span>
                </p>
              </div>
            )}
          </div>

          {/* footer */}
          <div className="flex flex-wrap items-center gap-3 border-t border-ink/10 p-6 md:p-7">
            <button
              onClick={() => setApplied(true)}
              disabled={applied}
              className={`flex items-center gap-2 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-paper transition-colors ${
                applied ? "cursor-default bg-pine text-lime" : "bg-cobalt hover:bg-cobalt-dark"
              }`}
            >
              {applied ? (
                <>
                  <IconCheck className="h-4 w-4" /> Application started
                </>
              ) : (
                <>
                  Apply now <IconArrow className="h-4 w-4" />
                </>
              )}
            </button>
            <button
              onClick={onSave}
              aria-pressed={saved}
              className={`flex items-center gap-2 border px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] transition-colors ${
                saved
                  ? "border-cobalt text-cobalt"
                  : "border-ink/25 hover:border-ink"
              }`}
            >
              <IconBookmark className="h-3.5 w-3.5" filled={saved} />
              {saved ? "Saved" : "Save"}
            </button>
            <p className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45">
              Avg. first response 48h
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
