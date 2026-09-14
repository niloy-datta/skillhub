import { useState } from 'react';
import { Link } from 'react-router-dom';
import { WORKERS } from '../../data';

export function AdvancedSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [rating, setRating] = useState(0);
  const [availability, setAvailability] = useState('all');

  const allSkills = Array.from(new Set(WORKERS.flatMap(w => w.skills)));

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const filteredWorkers = WORKERS.filter(worker => {
    const matchesSearch = searchQuery === '' || 
      worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSkills = selectedSkills.length === 0 ||
      selectedSkills.some(skill => worker.skills.includes(skill));
    
    const matchesPrice = worker.expectedRate >= priceRange[0] && worker.expectedRate <= priceRange[1];
    const matchesRating = worker.rating >= rating;
    const matchesAvailability = availability === 'all' || 
      (availability === 'available' && worker.availableNow) ||
      (availability === 'unavailable' && !worker.availableNow);

    return matchesSearch && matchesSkills && matchesPrice && matchesRating && matchesAvailability;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-black text-gray-900 mb-2">
            Advanced <span className="gradient-text">Search</span>
          </h1>
          <p className="text-xl text-gray-600">Find the perfect worker with advanced filters</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 sticky top-24">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Filters</h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-2">Search</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or title..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 outline-none transition-all"
                />
              </div>

              {/* Skills */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-2">Skills</label>
                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                  {allSkills.map(skill => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        selectedSkills.includes(skill)
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}/hr
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>

              {/* Rating */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-2">Minimum Rating</label>
                <div className="flex gap-2">
                  {[0, 3, 4, 4.5].map(r => (
                    <button
                      key={r}
                      onClick={() => setRating(r)}
                      className={`flex-1 px-3 py-2 rounded-xl font-semibold transition-all ${
                        rating === r
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {r === 0 ? 'All' : `${r}+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-2">Availability</label>
                <div className="space-y-2">
                  {['all', 'available', 'unavailable'].map(avail => (
                    <button
                      key={avail}
                      onClick={() => setAvailability(avail)}
                      className={`w-full px-4 py-2 rounded-xl font-semibold text-left transition-all ${
                        availability === avail
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {avail === 'all' ? 'All Workers' : avail === 'available' ? 'Available Now' : 'Unavailable'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset */}
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSkills([]);
                  setPriceRange([0, 100]);
                  setRating(0);
                  setAvailability('all');
                }}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 font-semibold text-gray-700 hover:bg-gray-50 transition-all"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-lg text-gray-600">
                <span className="font-bold text-gray-900">{filteredWorkers.length}</span> workers found
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredWorkers.map((worker) => (
                <Link 
                  key={worker.id} 
                  to={`/worker/${worker.id}`}
                  className="card-hover bg-white rounded-3xl p-6 shadow-xl border border-gray-100 block"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                      {worker.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{worker.name}</h3>
                      <p className="text-gray-600">{worker.title}</p>
                    </div>
                    {worker.humanVerified && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                        ✓ Verified
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 mb-4">{worker.city}, {worker.country}</p>

                  <div className="flex gap-2 mb-4 flex-wrap">
                    {worker.skills.slice(0, 4).map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500 text-xl">★</span>
                      <span className="font-bold text-gray-900">{worker.rating}</span>
                      <span className="text-gray-500">({worker.reviews})</span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-gray-900">
                        {worker.currency}{worker.expectedRate}
                        <span className="text-sm font-medium text-gray-500">/hr</span>
                      </div>
                      {worker.availableNow && (
                        <div className="text-green-600 text-sm font-semibold">Available now</div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredWorkers.length === 0 && (
              <div className="text-center py-16">
                <span className="text-6xl mb-4 block">🔍</span>
                <p className="text-xl text-gray-600 mb-2">No workers found</p>
                <p className="text-gray-500">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
