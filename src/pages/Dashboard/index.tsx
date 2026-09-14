import { Link } from 'react-router-dom';
import { WORKERS, TASKS, COMPANIES } from '../../data';

export function DashboardPage() {
  const stats = [
    { label: 'Active Tasks', value: '12', change: '+3', icon: '📋', color: 'from-blue-500 to-cyan-500' },
    { label: 'Messages', value: '28', change: '+12', icon: '💬', color: 'from-purple-500 to-pink-500' },
    { label: 'Saved Workers', value: '45', change: '+5', icon: '⭐', color: 'from-yellow-500 to-orange-500' },
    { label: 'Earnings', value: '$2,847', change: '+18%', icon: '💰', color: 'from-green-500 to-emerald-500' },
  ];

  const recentActivity = [
    { type: 'task', title: 'New task posted', desc: 'Deep clean apartment', time: '2h ago', icon: '📝' },
    { type: 'message', title: 'New message', desc: 'From Ahmed Hassan', time: '3h ago', icon: '💬' },
    { type: 'application', title: 'Application received', desc: 'Yuki Tanaka applied', time: '5h ago', icon: '👤' },
    { type: 'payment', title: 'Payment processed', desc: '$450 completed', time: '1d ago', icon: '💰' },
    { type: 'review', title: 'New review', desc: '5-star rating received', time: '2d ago', icon: '⭐' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-black text-gray-900 mb-2">
            Welcome <span className="gradient-text">Back</span>
          </h1>
          <p className="text-xl text-gray-600">Here's what's happening with your account</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="card-hover bg-white rounded-3xl p-6 shadow-xl border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
                  {stat.icon}
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                  {stat.change}
                </span>
              </div>
              <div className="text-4xl font-black text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, i) => (
                  <div 
                    key={i} 
                    className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{activity.title}</h3>
                      <p className="text-gray-600">{activity.desc}</p>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  to="/post-work"
                  className="btn-shine flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  <span className="text-2xl">📝</span>
                  <span>Post New Task</span>
                </Link>
                <Link
                  to="/find-work"
                  className="flex items-center gap-3 p-4 rounded-2xl border-2 border-gray-200 font-semibold text-gray-700 hover:border-indigo-500 hover:text-indigo-600 transition-all"
                >
                  <span className="text-2xl">🔍</span>
                  <span>Find Workers</span>
                </Link>
                <Link
                  to="/messages"
                  className="flex items-center gap-3 p-4 rounded-2xl border-2 border-gray-200 font-semibold text-gray-700 hover:border-indigo-500 hover:text-indigo-600 transition-all"
                >
                  <span className="text-2xl">💬</span>
                  <span>View Messages</span>
                </Link>
                <Link
                  to="/advanced-search"
                  className="flex items-center gap-3 p-4 rounded-2xl border-2 border-gray-200 font-semibold text-gray-700 hover:border-indigo-500 hover:text-indigo-600 transition-all"
                >
                  <span className="text-2xl">🎯</span>
                  <span>Advanced Search</span>
                </Link>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Performance</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 font-medium">Tasks Completed</span>
                    <span className="font-bold text-gray-900">85%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 font-medium">Response Rate</span>
                    <span className="font-bold text-gray-900">92%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 font-medium">Satisfaction</span>
                    <span className="font-bold text-gray-900">96%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full" style={{ width: '96%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Workers */}
        <div className="mt-8 bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recommended Workers</h2>
            <Link to="/find-work" className="text-indigo-600 font-semibold hover:text-indigo-700">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORKERS.slice(0, 4).map(worker => (
              <Link 
                key={worker.id} 
                to={`/worker/${worker.id}`}
                className="card-hover bg-white rounded-2xl p-4 border border-gray-100 block"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
                    {worker.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{worker.name}</h3>
                    <p className="text-sm text-gray-600">{worker.title}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="font-bold">{worker.rating}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-gray-900">{worker.currency}{worker.expectedRate}</span>
                    <span className="text-sm text-gray-500">/hr</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
