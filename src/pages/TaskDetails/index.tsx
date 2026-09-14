import { useParams, Link } from 'react-router-dom';
import { TASKS } from '../../data';

export default function TaskDetailsPage() {
  const { taskId } = useParams();
  const task = TASKS.find(t => t.id === taskId) || TASKS[0];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link to="/find-work" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6">
          ← Back to Tasks
        </Link>

        <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className="bg-indigo-500/10 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
                {task.category}
              </span>
              <h1 className="text-4xl font-black text-gray-900 mb-2">{task.title}</h1>
              <p className="text-gray-600">Posted {task.postedHours}h ago</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-black text-gray-900">
                {task.currency}{task.budget.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Budget</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-600 mb-1">Location</p>
              <p className="font-semibold text-gray-900">{task.city}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Date</p>
              <p className="font-semibold text-gray-900">{task.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Time</p>
              <p className="font-semibold text-gray-900">{task.time}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Duration</p>
              <p className="font-semibold text-gray-900">{task.duration}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
          <p className="text-gray-600 leading-relaxed">{task.description}</p>
        </div>

        {task.specialRequirements.length > 0 && (
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Special Requirements</h2>
            <ul className="space-y-2">
              {task.specialRequirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-1">•</span>
                  <span className="text-gray-600">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Workers Needed</h2>
          <p className="text-3xl font-black text-gray-900">{task.workersNeeded}</p>
          <p className="text-gray-600 mt-1">
            {task.workersNeeded === 1 ? 'worker' : 'workers'} required for this task
          </p>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Offers</h2>
          <div className="text-center py-8">
            <span className="text-5xl mb-4 block">📨</span>
            <p className="text-2xl font-bold text-gray-900 mb-2">{task.offersCount} offers received</p>
            <p className="text-gray-600">Workers are interested in this task</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button className="flex-1 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:shadow-lg transition-all">
            Apply for this Task
          </button>
          <button className="flex-1 py-4 rounded-full border-2 border-gray-200 text-gray-900 font-semibold hover:bg-gray-50 transition-all">
            Save Task
          </button>
        </div>
      </div>
    </div>
  );
}
