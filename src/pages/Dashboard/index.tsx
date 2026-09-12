import { Link } from 'react-router-dom';
import { TASKS, NOTIFICATIONS } from '../../data';

export function DashboardPage() {
  return (
    <div className="min-h-screen bg-cream pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-8">
          <h1 className="mb-2 font-display text-4xl font-black text-midnight">Dashboard</h1>
          <p className="text-midnight/60">Your activity overview</p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border-2 border-midnight/10 bg-white p-6">
            <p className="text-sm text-midnight/60">Active Tasks</p>
            <p className="mt-2 font-display text-3xl font-bold text-midnight">3</p>
          </div>
          <div className="rounded-2xl border-2 border-midnight/10 bg-white p-6">
            <p className="text-sm text-midnight/60">Messages</p>
            <p className="mt-2 font-display text-3xl font-bold text-midnight">5</p>
          </div>
          <div className="rounded-2xl border-2 border-midnight/10 bg-white p-6">
            <p className="text-sm text-midnight/60">Notifications</p>
            <p className="mt-2 font-display text-3xl font-bold text-midnight">{NOTIFICATIONS.filter(n => !n.read).length}</p>
          </div>
          <div className="rounded-2xl border-2 border-midnight/10 bg-white p-6">
            <p className="text-sm text-midnight/60">Saved</p>
            <p className="mt-2 font-display text-3xl font-bold text-midnight">12</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h2 className="mb-4 font-display text-2xl font-bold text-midnight">Recent Tasks</h2>
          <div className="space-y-3">
            {TASKS.slice(0, 3).map((task) => (
              <div key={task.id} className="rounded-2xl border-2 border-midnight/10 bg-white p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-midnight">{task.title}</h3>
                    <p className="text-sm text-midnight/60">{task.city} · {task.date}</p>
                  </div>
                  <span className="rounded-full bg-indigo/10 px-3 py-1 font-mono text-xs font-semibold text-indigo">
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Link to="/post-work" className="rounded-2xl bg-gradient-to-r from-indigo to-violet p-6 text-white">
            <h3 className="mb-2 font-display text-xl font-bold">Post New Task</h3>
            <p className="text-white/80">Create a new task posting</p>
          </Link>
          <Link to="/find-work" className="rounded-2xl border-2 border-midnight/10 bg-white p-6">
            <h3 className="mb-2 font-display text-xl font-bold text-midnight">Find Workers</h3>
            <p className="text-midnight/60">Browse verified workers</p>
          </Link>
          <Link to="/messages" className="rounded-2xl border-2 border-midnight/10 bg-white p-6">
            <h3 className="mb-2 font-display text-xl font-bold text-midnight">Messages</h3>
            <p className="text-midnight/60">View your conversations</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
