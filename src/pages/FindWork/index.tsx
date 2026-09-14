import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { WORKERS } from '../../data';

export function FindWorkPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [sortBy, setSortBy] = useState('rating');

  // Get unique categories and locations
  const categories = useMemo(() => {
    const cats = new Set<string>();
    WORKERS.forEach(worker => {
      worker.skills.forEach(skill => cats.add(skill));
    });
    return ['All', ...Array.from(cats)];
  }, []);

  const locations = useMemo(() => {
    const locs = new Set<string>();
    WORKERS.forEach(worker => locs.add(worker.country));
    return ['All', ...Array.from(locs)];
  }, []);

  // Filter and sort workers
  const filteredWorkers = useMemo(() => {
    let result = WORKERS.filter(worker => {
      const matchesSearch = searchQuery === '' || 
        worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        worker.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        worker.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || 
        worker.skills.includes(selectedCategory);
      
      const matchesLocation = selectedLocation === 'All' || 
        worker.country === selectedLocation;
      
      return matchesSearch && matchesCategory && matchesLocation;
    });

    // Sort
    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'rate-low':
        result.sort((a, b) => a.expectedRate - b.expectedRate);
        break;
      case 'rate-high':
        result.sort((a, b) => b.expectedRate - a.expectedRate);
        break;
      case 'experience':
        result.sort((a, b) => b.completedWork - a.completedWork);
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedLocation, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Find Work</h1>
          <p className="text-gray-600">Browse verified workers near you</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-900 mb-2">Search</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, title, or skill..."
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 outline-none focus:border-indigo-500"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 outline-none focus:border-indigo-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 outline-none focus:border-indigo-500"
              >
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold text-gray-900">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              >
                <option value="rating">Highest Rating</option>
                <option value="reviews">Most Reviews</option>
                <option value="rate-low">Rate: Low to High</option>
                <option value="rate-high">Rate: High to Low</option>
                <option value="experience">Most Experience</option>
              </select>
            </div>
            <p className="text-sm text-gray-600">
              {filteredWorkers.length} worker{filteredWorkers.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>

        {/* Workers Grid */}
        {filteredWorkers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkers.map((worker) => (
              <Link key={worker.id} to={`/worker/${worker.id}`} className="no-underline">
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
        ) : (
          <div className="text-center py-16">
            <span className="text-6xl mb-4 block">🔍</span>
            <p className="text-xl text-gray-600 mb-2">No workers found</p>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
