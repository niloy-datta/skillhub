import { useState } from 'react';
import { Link } from 'react-router-dom';
import { WORKERS } from '../../data';

export function FindWorkPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');

  const skills = ['All', 'Cleaning', 'Plumbing', 'Moving', 'Cooking', 'Caregiving', 'Electrical'];

  const filteredWorkers = WORKERS.filter((worker) => {
    const matchesSearch = worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSkill = selectedSkill === 'All' || worker.skills.includes(selectedSkill);
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="min-h-screen bg-cream pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 font-display text-4xl font-black text-midnight">Find Work</h1>
          <p className="text-midnight/60">Browse verified workers near you</p>
        </div>

        {/* Search */}
        <div className="mb-8 flex flex-col gap-3 rounded-2xl border-2 border-midnight/10 bg-white p-3 shadow-sm md:flex-row">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or skill..."
            className="flex-1 rounded-xl bg-cream px-5 py-3 outline-none"
          />
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="rounded-xl bg-cream px-5 py-3 outline-none md:w-64"
          >
            {skills.map((skill) => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
        </div>

        {/* Workers Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredWorkers.map((worker) => (
            <Link
              key={worker.id}
              to="/profile"
              className="group rounded-2xl border-2 border-midnight/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-indigo/30 hover:shadow-xl"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{worker.avatar}</span>
                  <div>
                    <h3 className="font-display text-lg font-bold group-hover:text-indigo">{worker.name}</h3>
                    <p className="text-sm text-midnight/60">{worker.title}</p>
                  </div>
                </div>
                {worker.humanVerified && (
                  <span className="rounded-full bg-emerald/10 px-2 py-1 font-mono text-xs font-semibold text-emerald">
                    ✓ Verified
                  </span>
                )}
              </div>

              <p className="mb-4 text-sm text-midnight/60">{worker.city}, {worker.country}</p>

              <div className="mb-4 flex flex-wrap gap-1">
                {worker.skills.slice(0, 3).map((skill) => (
                  <span key={skill} className="rounded-full bg-mist/50 px-2 py-1 font-mono text-xs text-midnight/70">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-midnight/10 pt-4">
                <div className="flex items-center gap-1">
                  <span className="text-amber">★</span>
                  <span className="font-semibold">{worker.rating}</span>
                  <span className="text-sm text-midnight/50">({worker.reviews})</span>
                </div>
                <div className="text-right">
                  <p className="font-display text-lg font-bold">
                    {worker.currency}{worker.expectedRate}
                    <span className="text-xs font-medium text-midnight/50">/hr</span>
                  </p>
                  {worker.availableNow && (
                    <p className="text-xs text-emerald">Available now</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredWorkers.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-xl text-midnight/60">No workers found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
