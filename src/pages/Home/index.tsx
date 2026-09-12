import { Link } from 'react-router-dom';
import { WORKERS, COMPANIES, TASKS } from '../../data';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight via-charcoal to-midnight text-white">
      {/* Hero */}
      <div className="relative mx-auto max-w-7xl px-5 pt-32 pb-20 md:px-8">
        <div className="text-center">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-emerald/30 bg-emerald/10 px-5 py-2 backdrop-blur-sm">
            <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-emerald" />
            <span className="font-mono text-sm text-emerald">
              {WORKERS.length * 100}+ verified workers available
            </span>
          </div>

          <h1 className="mb-6 font-display text-[clamp(3rem,10vw,6rem)] font-black leading-[0.85] tracking-tight">
            <span className="block">Find Work.</span>
            <span className="block gradient-text">Hire Talent.</span>
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-xl text-white/70">
            The trusted marketplace for skilled workers and businesses.
            <br />
            Post tasks, find workers, get work done.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/find-work"
              className="rounded-full bg-gradient-to-r from-indigo to-violet px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105"
            >
              Find Work →
            </Link>
            <Link
              to="/hire-talent"
              className="rounded-full border-2 border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              Hire Talent
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid gap-6 md:grid-cols-4">
          {[
            { value: `${WORKERS.length * 100}+`, label: 'Verified Workers', gradient: 'from-indigo to-violet' },
            { value: `${COMPANIES.length * 50}+`, label: 'Trusted Companies', gradient: 'from-violet to-amber' },
            { value: '94%', label: 'Success Rate', gradient: 'from-emerald to-indigo' },
            { value: '24h', label: 'Avg. Response', gradient: 'from-amber to-violet' },
          ].map((stat, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <p className={`font-display text-4xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                {stat.value}
              </p>
              <p className="mt-2 font-mono text-sm text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="mt-24">
          <h2 className="mb-12 text-center font-display text-4xl font-bold">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: '1', title: 'Post Your Task', desc: 'Describe what you need done', icon: '📝' },
              { step: '2', title: 'Get Matched', desc: 'Verified workers apply', icon: '👥' },
              { step: '3', title: 'Work Completed', desc: 'Pay securely when done', icon: '✅' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo to-violet text-3xl">
                  {item.icon}
                </div>
                <h3 className="mb-2 font-display text-xl font-bold">{item.title}</h3>
                <p className="text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="mt-24">
          <h2 className="mb-8 font-display text-3xl font-bold">Recent Tasks</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {TASKS.slice(0, 3).map((task) => (
              <Link
                key={task.id}
                to="/post-work"
                className="group rounded-2xl border-2 border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-indigo/50 hover:bg-white/10"
              >
                <div className="mb-4 flex items-start justify-between">
                  <span className="rounded-full bg-indigo/10 px-3 py-1 font-mono text-xs font-semibold text-indigo">
                    {task.category}
                  </span>
                  <span className="font-mono text-xs text-white/50">{task.postedHours}h ago</span>
                </div>
                <h3 className="mb-2 font-display text-xl font-bold group-hover:text-indigo">{task.title}</h3>
                <p className="mb-4 text-sm text-white/60 line-clamp-2">{task.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-white/60">{task.city}</span>
                  <span className="font-display text-xl font-bold">
                    {task.currency}{task.budget.toLocaleString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
