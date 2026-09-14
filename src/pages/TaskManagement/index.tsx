import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TASKS } from '../../data';

export function TaskManagement() {
  const [filter, setFilter] = useState('all');
  const [tasks, setTasks] = useState(TASKS);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const stats = {
    total: tasks.length,
    open: tasks.filter(t => t.status === 'open').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-black text-gray-900 mb-2">
              Task <span className="gradient-text">Management</span>
            </h1>
            <p className="text-xl text-gray-600">Manage all your tasks in one place</p>
          </div>
          <Link
            to="/post-work"
            className="btn-shine px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold shadow-xl hover:shadow-2xl transition-all"
          >
            + New Task
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
            <div className="text-4xl font-black text-gray-900 mb-1">{stats.total}</div>
            <div className="text-gray-600 font-medium">Total Tasks</div>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
            <div className="text-4xl font-black text-blue-600 mb-1">{stats.open}</div>
            <div className="text-gray-600 font-medium">Open</div>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
            <div className="text-4xl font-black text-yellow-600 mb-1">{stats.inProgress}</div>
            <div className="text-gray-600 font-medium">In Progress</div>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
            <div className="text-4xl font-black text-green-600 mb-1">{stats.completed}</div>
            <div className="text-gray-600 font-medium">Completed</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 mb-8">
          <div className="flex gap-2">
            {['all', 'open', 'in-progress', 'completed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  filter === f
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f === 'all' ? 'All Tasks' : f.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.map(task => (
            <div 
              key={task.id} 
              className="card-hover bg-white rounded-3xl p-6 shadow-xl border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${
                    task.status === 'completed' ? 'from-green-500 to-emerald-600' :
                    task.status === 'in-progress' ? 'from-yellow-500 to-orange-600' :
                    'from-blue-500 to-cyan-600'
                  } rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
                    {task.status === 'completed' ? '✅' : task.status === 'in-progress' ? '⏳' : '📋'}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{task.title}</h3>
                    <p className="text-gray-600 mb-2">{task.category}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>📍 {task.city}, {task.country}</span>
                      <span>📅 {task.date}</span>
                      <span>⏰ {task.time}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-gray-900 mb-1">
                    {task.currency}{task.budget.toLocaleString()}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    task.status === 'completed' ? 'bg-green-100 text-green-700' :
                    task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {task.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">
                    <span className="font-bold text-gray-900">{task.offersCount}</span> offers
                  </span>
                  <span className="text-gray-600">
                    <span className="font-bold text-gray-900">{task.workersNeeded}</span> workers needed
                  </span>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/task/${task.id}`}
                    className="px-4 py-2 rounded-xl border-2 border-gray-200 font-semibold text-gray-700 hover:border-indigo-500 hover:text-indigo-600 transition-all"
                  >
                    View Details
                  </Link>
                  {task.status !== 'completed' && (
                    <button className="btn-shine px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
                      Manage
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl shadow-xl border border-gray-100">
            <span className="text-6xl mb-4 block">📭</span>
            <p className="text-xl text-gray-600 mb-2">No tasks found</p>
            <p className="text-gray-500">Try changing the filter or create a new task</p>
          </div>
        )}
      </div>
    </div>
  );
}
