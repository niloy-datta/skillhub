'use client';

import { useState } from 'react';
import Link from 'next/link';

const WORKERS = [
  { id: 'w1', name: 'Rahim Uddin', avatar: '👷', title: 'Warehouse Specialist', city: 'Gazipur', country: 'Bangladesh', skills: ['Warehouse', 'Forklift', 'Packing'], verified: true, rating: 4.9, reviews: 87, rate: 280, currency: '৳', available: true },
  { id: 'w2', name: 'Yuki Tanaka', avatar: '👩', title: 'Housekeeping Expert', city: 'Tokyo', country: 'Japan', skills: ['Housekeeping', 'Laundry', 'Cooking'], verified: true, rating: 5.0, reviews: 214, rate: 2200, currency: '¥', available: true },
  { id: 'w3', name: 'Ahmed Hassan', avatar: '👨‍🔧', title: 'Construction Specialist', city: 'Dubai', country: 'UAE', skills: ['Construction', 'Masonry', 'Electrical'], verified: true, rating: 4.7, reviews: 156, rate: 45, currency: 'AED', available: false },
  { id: 'w4', name: 'Maria Silva', avatar: '👩‍🍳', title: 'Cook & Housekeeper', city: 'Lisbon', country: 'Portugal', skills: ['Cooking', 'Cleaning', 'Caregiving'], verified: false, rating: 4.8, reviews: 92, rate: 12, currency: '€', available: true },
  { id: 'w5', name: 'Priya Sharma', avatar: '👩‍⚕️', title: 'Certified Caregiver', city: 'Mumbai', country: 'India', skills: ['Caregiving', 'Elderly Care', 'Cooking'], verified: true, rating: 4.9, reviews: 178, rate: 350, currency: '₹', available: true },
  { id: 'w6', name: 'João Santos', avatar: '🚚', title: 'Licensed Driver', city: 'São Paulo', country: 'Brazil', skills: ['Driving', 'Delivery', 'Moving'], verified: false, rating: 4.6, reviews: 64, rate: 35, currency: 'R$', available: true },
];

export default function FindWorkPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredWorkers = WORKERS.filter(w => {
    const matchSearch = w.name.toLowerCase().includes(search.toLowerCase()) || w.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = filter === 'All' || w.skills.includes(filter);
    return matchSearch && matchFilter;
  });

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Find Work</h1>
        <p className="text-gray-600 mb-8">Browse verified workers near you</p>

        <div className="flex gap-3 mb-8 flex-wrap">
          <input
            type="text"
            placeholder="Search by name or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[250px] px-5 py-3 rounded-xl border-2 border-gray-200 outline-none focus:border-indigo-500"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-5 py-3 rounded-xl border-2 border-gray-200 outline-none focus:border-indigo-500 min-w-[200px]"
          >
            <option>All</option>
            <option>Warehouse</option>
            <option>Housekeeping</option>
            <option>Construction</option>
            <option>Cooking</option>
            <option>Caregiving</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers.map((worker) => (
            <Link key={worker.id} href={`/profile/${worker.id}`} className="no-underline">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{worker.avatar}</span>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{worker.name}</h3>
                      <p className="text-sm text-gray-600">{worker.title}</p>
                    </div>
                  </div>
                  {worker.verified && (
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
                      {worker.currency}{worker.rate}
                      <span className="text-xs font-medium text-gray-400">/hr</span>
                    </div>
                    {worker.available && <div className="text-xs text-emerald-600">Available now</div>}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
