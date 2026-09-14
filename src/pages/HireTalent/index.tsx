import { Link } from 'react-router-dom';
import { COMPANIES } from '../../data';

export function HireTalentPage() {
  return (
    <div className="min-h-screen bg-cream pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-8">
          <h1 className="mb-2 font-display text-4xl font-black text-midnight">Hire Talent</h1>
          <p className="text-midnight/60">Find trusted companies and post jobs</p>
        </div>

        <div className="mb-8 flex gap-4">
          <Link
            to="/post-work"
            className="flex-1 rounded-2xl bg-gradient-to-r from-indigo to-violet p-6 text-white shadow-xl transition-all hover:scale-105"
          >
            <h3 className="mb-2 font-display text-2xl font-bold">Post a Job</h3>
            <p className="text-white/80">Find skilled workers for your business</p>
          </Link>
        </div>

        <h2 className="mb-6 font-display text-2xl font-bold text-midnight">Verified Companies</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {COMPANIES.map((company) => (
            <Link 
              key={company.id} 
              to={`/company/${company.id}`}
              className="no-underline"
            >
              <div className="rounded-2xl border-2 border-midnight/10 bg-white p-6 shadow-sm hover:border-indigo/30 hover:shadow-lg transition-all">
                <div className="mb-4 flex items-start justify-between">
                  <span className="text-4xl">{company.logo}</span>
                  {company.verified && (
                    <span className="rounded-full bg-emerald/10 px-3 py-1 font-mono text-xs font-semibold text-emerald">
                      ✓ Verified
                    </span>
                  )}
                </div>

                <h3 className="mb-2 font-display text-xl font-bold">{company.name}</h3>
                <p className="mb-4 text-sm text-midnight/60">{company.tagline}</p>

                <div className="mb-4 flex items-center gap-2">
                  <span className="text-amber">★</span>
                  <span className="font-semibold">{company.workerRating}</span>
                  <span className="text-sm text-midnight/50">rating</span>
                </div>

                <div className="flex items-center justify-between border-t border-midnight/10 pt-4">
                  <div>
                    <p className="font-display text-lg font-bold">{company.activeJobs}</p>
                    <p className="text-xs text-midnight/60">Active jobs</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg font-bold">{company.activeShifts}</p>
                    <p className="text-xs text-midnight/60">Shifts</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
