import { useState } from 'react';

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  const earningsData = [
    { day: 'Mon', amount: 450 },
    { day: 'Tue', amount: 680 },
    { day: 'Wed', amount: 520 },
    { day: 'Thu', amount: 890 },
    { day: 'Fri', amount: 750 },
    { day: 'Sat', amount: 1200 },
    { day: 'Sun', amount: 980 },
  ];

  const maxEarning = Math.max(...earningsData.map(d => d.amount));

  const performanceMetrics = [
    { label: 'Total Earnings', value: '$5,470', change: '+23%', icon: '💰', color: 'from-green-500 to-emerald-600' },
    { label: 'Tasks Completed', value: '47', change: '+12', icon: '✅', color: 'from-blue-500 to-cyan-600' },
    { label: 'Client Rating', value: '4.9', change: '+0.2', icon: '⭐', color: 'from-yellow-500 to-orange-600' },
    { label: 'Response Time', value: '2.3h', change: '-0.5h', icon: '⚡', color: 'from-purple-500 to-pink-600' },
  ];

  const topClients = [
    { name: 'TechCorp Inc.', tasks: 12, earnings: 2400, rating: 5.0 },
    { name: 'StartupXYZ', tasks: 8, earnings: 1600, rating: 4.9 },
    { name: 'DesignStudio', tasks: 6, earnings: 1200, rating: 4.8 },
    { name: 'WebAgency', tasks: 5, earnings: 950, rating: 4.9 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-black text-gray-900 mb-2">
              Analytics <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-xl text-gray-600">Track your performance and earnings</p>
          </div>
          <div className="flex gap-2">
            {['7d', '30d', '90d', '1y'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                  timeRange === range
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {performanceMetrics.map((metric, i) => (
            <div key={i} className="card-hover bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${metric.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
                  {metric.icon}
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                  {metric.change}
                </span>
              </div>
              <div className="text-4xl font-black text-gray-900 mb-1">{metric.value}</div>
              <div className="text-gray-600 font-medium">{metric.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Earnings Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Earnings Overview</h2>
              <div className="h-64 flex items-end justify-between gap-2">
                {earningsData.map((data, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex flex-col justify-end h-48">
                      <div 
                        className="w-full bg-gradient-to-t from-indigo-500 to-purple-600 rounded-t-xl transition-all hover:from-indigo-600 hover:to-purple-700"
                        style={{ height: `${(data.amount / maxEarning) * 100}%` }}
                      />
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-gray-900">${data.amount}</div>
                      <div className="text-xs text-gray-500">{data.day}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Clients */}
          <div>
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Clients</h2>
              <div className="space-y-4">
                {topClients.map((client, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{client.name}</h3>
                      <p className="text-sm text-gray-600">{client.tasks} tasks</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">${client.earnings}</div>
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-yellow-500">★</span>
                        <span>{client.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="mt-8 bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Activity Timeline</h2>
          <div className="space-y-4">
            {[
              { type: 'payment', title: 'Payment received', desc: '$450 from TechCorp Inc.', time: '2h ago', icon: '💰' },
              { type: 'task', title: 'Task completed', desc: 'Website redesign project', time: '5h ago', icon: '✅' },
              { type: 'review', title: 'New review', desc: '5-star rating from StartupXYZ', time: '1d ago', icon: '⭐' },
              { type: 'message', title: 'New message', desc: 'From DesignStudio', time: '2d ago', icon: '💬' },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all">
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
    </div>
  );
}
