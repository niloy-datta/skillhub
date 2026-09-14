import { useState } from 'react';
import { Link } from 'react-router-dom';
import { WORKERS } from '../../data';

export function WorkerComparison() {
  const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);

  const toggleWorker = (workerId: string) => {
    setSelectedWorkers(prev => 
      prev.includes(workerId)
        ? prev.filter(id => id !== workerId)
        : prev.length < 3
          ? [...prev, workerId]
          : prev
    );
  };

  const workersToCompare = WORKERS.filter(w => selectedWorkers.includes(w.id));

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-black text-gray-900 mb-2">
            Compare <span className="gradient-text">Workers</span>
          </h1>
          <p className="text-xl text-gray-600">Select up to 3 workers to compare side by side</p>
        </div>

        {/* Worker Selection */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Select Workers to Compare</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {WORKERS.map(worker => (
              <button
                key={worker.id}
                onClick={() => toggleWorker(worker.id)}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  selectedWorkers.includes(worker.id)
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-4xl mb-2">{worker.avatar}</div>
                <p className="font-semibold text-gray-900 text-sm">{worker.name}</p>
                <p className="text-xs text-gray-600">{worker.title}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        {workersToCompare.length > 0 && (
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Comparison</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-bold text-gray-900">Feature</th>
                    {workersToCompare.map(worker => (
                      <th key={worker.id} className="text-center py-4 px-4">
                        <div className="text-4xl mb-2">{worker.avatar}</div>
                        <div className="font-bold text-gray-900">{worker.name}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-semibold text-gray-700">Title</td>
                    {workersToCompare.map(worker => (
                      <td key={worker.id} className="text-center py-4 px-4 text-gray-600">
                        {worker.title}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-semibold text-gray-700">Location</td>
                    {workersToCompare.map(worker => (
                      <td key={worker.id} className="text-center py-4 px-4 text-gray-600">
                        {worker.city}, {worker.country}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-semibold text-gray-700">Hourly Rate</td>
                    {workersToCompare.map(worker => (
                      <td key={worker.id} className="text-center py-4 px-4">
                        <span className="text-2xl font-black text-gray-900">
                          {worker.currency}{worker.expectedRate}
                        </span>
                        <span className="text-sm text-gray-500">/hr</span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-semibold text-gray-700">Rating</td>
                    {workersToCompare.map(worker => (
                      <td key={worker.id} className="text-center py-4 px-4">
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-yellow-500 text-xl">★</span>
                          <span className="text-xl font-bold text-gray-900">{worker.rating}</span>
                        </div>
                        <p className="text-sm text-gray-500">({worker.reviews} reviews)</p>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-semibold text-gray-700">Completed Work</td>
                    {workersToCompare.map(worker => (
                      <td key={worker.id} className="text-center py-4 px-4">
                        <span className="text-2xl font-black text-gray-900">{worker.completedWork}</span>
                        <p className="text-sm text-gray-500">jobs</p>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-semibold text-gray-700">Skills</td>
                    {workersToCompare.map(worker => (
                      <td key={worker.id} className="text-center py-4 px-4">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {worker.skills.slice(0, 3).map(skill => (
                            <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-semibold text-gray-700">Languages</td>
                    {workersToCompare.map(worker => (
                      <td key={worker.id} className="text-center py-4 px-4">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {worker.languages.map(lang => (
                            <span key={lang} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-semibold text-gray-700">Availability</td>
                    {workersToCompare.map(worker => (
                      <td key={worker.id} className="text-center py-4 px-4">
                        {worker.availableNow ? (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                            ✓ Available
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-bold">
                            Unavailable
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-semibold text-gray-700">Action</td>
                    {workersToCompare.map(worker => (
                      <td key={worker.id} className="text-center py-4 px-4">
                        <Link
                          to={`/worker/${worker.id}`}
                          className="btn-shine inline-block px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                          View Profile
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {workersToCompare.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl shadow-xl border border-gray-100">
            <span className="text-6xl mb-4 block">👥</span>
            <p className="text-xl text-gray-600 mb-2">Select workers to compare</p>
            <p className="text-gray-500">Choose up to 3 workers from above</p>
          </div>
        )}
      </div>
    </div>
  );
}
