import { useState } from 'react';
import { Link } from 'react-router-dom';
import { WORKERS, TASKS } from '../../data';

export default function SavedItemsPage() {
  const [activeTab, setActiveTab] = useState<'workers' | 'tasks'>('workers');
  
  // Mock saved items - in real app, this would come from localStorage or backend
  const [savedWorkers] = useState([WORKERS[0], WORKERS[1]]);
  const [savedTasks] = useState([TASKS[0], TASKS[1]]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Saved Items</h1>
          <p className="text-gray-600">Your bookmarked workers and tasks</p>
        </div>

        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('workers')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              activeTab === 'workers'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                : 'bg-white text-gray-600 border-2 border-gray-200'
            }`}
          >
            Saved Workers ({savedWorkers.length})
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              activeTab === 'tasks'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                : 'bg-white text-gray-600 border-2 border-gray-200'
            }`}
          >
            Saved Tasks ({savedTasks.length})
          </button>
        </div>

        {activeTab === 'workers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedWorkers.map((worker) => (
              <Link key={worker.id} to={`/profile/${worker.id}`} className="no-underline">
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{worker.avatar}</span>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{worker.name}</h3>
                        <p className="text-sm text-gray-600">{worker.title}</p>
                      </div>
                    </div>
                    {worker.humanVerified && (
                      <span className="bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full text-xs font-semibold">
                        ✓ Verified
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{worker.city}, {worker.country}</p>

                  <div className="flex gap-2 mb-4 flex-wrap">
                    {worker.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="bg-gray-100 px-3 py-1.5 rounded-full text-xs text-gray-600">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-1">
                      <span className="text-amber-500">★</span>
                      <span className="font-semibold">{worker.rating}</span>
                      <span className="text-sm text-gray-400">({worker.reviews})</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">
                        {worker.currency}{worker.expectedRate}
                        <span className="text-xs font-medium text-gray-400">/hr</span>
                      </div>
                      {worker.availableNow && <div className="text-xs text-emerald-600">Available now</div>}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedTasks.map((task) => (
              <div key={task.id} className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-lg transition-all">
                <div className="mb-4 flex items-start justify-between">
                  <span className="bg-indigo-500/10 px-3 py-1 rounded-full text-xs font-semibold text-indigo-600">
                    {task.category}
                  </span>
                  <span className="font-mono text-xs text-gray-500">{task.postedHours}h ago</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{task.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{task.description}</p>

                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-gray-600">{task.city}</span>
                  <span className="text-xl font-bold">
                    {task.currency}{task.budget.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {(activeTab === 'workers' && savedWorkers.length === 0) || 
         (activeTab === 'tasks' && savedTasks.length === 0) ? (
          <div className="text-center py-16">
            <span className="text-6xl mb-4 block">📭</span>
            <p className="text-xl text-gray-600">No saved items yet</p>
            <p className="text-gray-500 mt-2">Start saving workers and tasks to see them here</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
