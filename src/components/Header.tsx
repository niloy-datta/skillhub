import { LogoMark, IconBookmark } from "./Icons";

export function Header({
  savedCount,
  onSavedClick,
}: {
  savedCount: number;
  onSavedClick: () => void;
}) {
  return (
    <header className="fixed top-0 z-50 w-full glass-dark">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" className="flex items-center gap-3 group">
          <div className="relative">
            <LogoMark className="h-7 w-7 text-indigo transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 blur-lg bg-indigo/30 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-white">
            Workwire
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#jobs"
            className="font-medium text-sm text-white/70 transition-colors hover:text-white"
          >
            Find Jobs
          </a>
          <a
            href="#companies"
            className="font-medium text-sm text-white/70 transition-colors hover:text-white"
          >
            Employers
          </a>
          <a
            href="#salaries"
            className="font-medium text-sm text-white/70 transition-colors hover:text-white"
          >
            Salary Guide
          </a>
          <a
            href="#how"
            className="font-medium text-sm text-white/70 transition-colors hover:text-white"
          >
            How it works
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onSavedClick}
            className="relative flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/90 transition-all hover:border-indigo hover:bg-indigo/10"
          >
            <IconBookmark className="h-4 w-4" />
            <span className="hidden sm:inline">Saved</span>
            {savedCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo text-xs font-bold text-white">
                {savedCount}
              </span>
            )}
          </button>
          <a
            href="#jobs"
            className="rounded-full bg-gradient-to-r from-indigo to-violet px-5 py-2 text-sm font-semibold text-white shadow-glow transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(99,102,241,0.5)]"
          >
            Post a job
          </a>
        </div>
      </div>
    </header>
  );
}
