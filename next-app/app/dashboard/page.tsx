import Link from 'next/link';

const TASKS = [
  { id: 't1', title: 'Deep clean 2-bedroom apartment', category: 'Cleaning', city: 'Tokyo', date: 'Tomorrow' },
  { id: 't2', title: 'Fix leaking kitchen tap', category: 'Plumbing', city: 'Lisbon', date: 'Today' },
  { id: 't3', title: 'Help moving to new flat', category: 'Moving', city: 'São Paulo', date: 'Saturday' },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-8">Your activity overview</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Tasks', value: '3' },
            { label: 'Messages', value: '5' },
            { label: 'Notifications', value: '2' },
            { label: 'Saved', value: '12' },
          ].map((stat, i) => (
            <div key={i} className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Tasks</h2>
          {TASKS.map((task) => (
            <div key={task.id} className="border-b border-gray-200 py-4 flex items-start justify-between last:border-b-0">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.city} · {task.date}</p>
              </div>
              <span className="bg-indigo-500/10 text-indigo-600 px-3 py-1 rounded-full text-xs font-semibold">
                {task.category}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/post-work" className="no-underline">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Post New Task</h3>
              <p className="opacity-90 text-sm">Create a new task posting</p>
            </div>
          </Link>
          <Link href="/find-work" className="no-underline">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Find Workers</h3>
              <p className="text-gray-600 text-sm">Browse verified workers</p>
            </div>
          </Link>
          <Link href="/messages" className="no-underline">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Messages</h3>
              <p className="text-gray-600 text-sm">View your conversations</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
