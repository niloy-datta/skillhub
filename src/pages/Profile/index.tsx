import { WORKERS } from '../../data';

export function ProfilePage() {
  const worker = WORKERS[0];

  return (
    <div className="min-h-screen bg-cream pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        {/* Profile Header */}
        <div className="mb-8 rounded-3xl border-2 border-midnight/10 bg-white p-8">
          <div className="flex items-start gap-6">
            <span className="text-6xl">{worker.avatar}</span>
            <div className="flex-1">
              <h1 className="mb-2 font-display text-4xl font-black text-midnight">{worker.name}</h1>
              <p className="mb-2 text-lg text-midnight/70">{worker.title}</p>
              <p className="text-sm text-midnight/50">{worker.city}, {worker.country}</p>
              
              <div className="mt-4 flex gap-2">
                {worker.humanVerified && (
                  <span className="rounded-full bg-emerald/10 px-3 py-1 font-mono text-xs font-semibold text-emerald">
                    ✓ Verified
                  </span>
                )}
                {worker.availableNow && (
                  <span className="rounded-full bg-indigo/10 px-3 py-1 font-mono text-xs font-semibold text-indigo">
                    Available Now
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border-2 border-midnight/10 bg-white p-6 text-center">
            <p className="font-display text-3xl font-bold text-midnight">{worker.rating}</p>
            <p className="text-sm text-midnight/60">Rating</p>
          </div>
          <div className="rounded-2xl border-2 border-midnight/10 bg-white p-6 text-center">
            <p className="font-display text-3xl font-bold text-midnight">{worker.completedWork}</p>
            <p className="text-sm text-midnight/60">Jobs Done</p>
          </div>
          <div className="rounded-2xl border-2 border-midnight/10 bg-white p-6 text-center">
            <p className="font-display text-3xl font-bold text-midnight">{worker.responseTime}</p>
            <p className="text-sm text-midnight/60">Response</p>
          </div>
          <div className="rounded-2xl border-2 border-midnight/10 bg-white p-6 text-center">
            <p className="font-display text-3xl font-bold text-midnight">{worker.currency}{worker.expectedRate}</p>
            <p className="text-sm text-midnight/60">Hourly Rate</p>
          </div>
        </div>

        {/* About */}
        <div className="mb-8 rounded-2xl border-2 border-midnight/10 bg-white p-6">
          <h2 className="mb-4 font-display text-2xl font-bold text-midnight">About</h2>
          <p className="text-midnight/70">{worker.bio}</p>
        </div>

        {/* Skills */}
        <div className="mb-8 rounded-2xl border-2 border-midnight/10 bg-white p-6">
          <h2 className="mb-4 font-display text-2xl font-bold text-midnight">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {worker.skills.map((skill) => (
              <span
                key={skill}
                className={`rounded-full px-4 py-2 font-mono text-sm ${
                  worker.verifiedSkills.includes(skill)
                    ? 'bg-emerald/10 text-emerald'
                    : 'bg-mist/50 text-midnight/70'
                }`}
              >
                {skill} {worker.verifiedSkills.includes(skill) && '✓'}
              </span>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="rounded-2xl border-2 border-midnight/10 bg-white p-6">
          <h2 className="mb-4 font-display text-2xl font-bold text-midnight">Languages</h2>
          <div className="flex flex-wrap gap-2">
            {worker.languages.map((lang) => (
              <span key={lang} className="rounded-full bg-mist/50 px-4 py-2 font-mono text-sm text-midnight/70">
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
