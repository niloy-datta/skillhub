const WORKER = {
  id: 'w1', name: 'Rahim Uddin', avatar: '👷', title: 'Warehouse Specialist',
  city: 'Gazipur', country: 'Bangladesh',
  skills: ['Warehouse', 'Forklift', 'Packing'],
  verified: true, rating: 4.9, reviews: 87, rate: 280, currency: '৳', available: true
};

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 mb-8">
          <div className="flex items-start gap-6 mb-6">
            <span className="text-6xl">{WORKER.avatar}</span>
            <div className="flex-1">
              <h1 className="text-4xl font-black text-gray-900 mb-2">{WORKER.name}</h1>
              <p className="text-lg text-gray-600 mb-2">{WORKER.title}</p>
              <p className="text-sm text-gray-400">{WORKER.city}, {WORKER.country}</p>
              <div className="flex gap-2 mt-4">
                {WORKER.verified && (
                  <span className="bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full text-xs font-semibold">
                    ✓ Verified
                  </span>
                )}
                {WORKER.available && (
                  <span className="bg-indigo-500/10 text-indigo-600 px-3 py-1 rounded-full text-xs font-semibold">
                    Available Now
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Rating', value: WORKER.rating.toString() },
            { label: 'Jobs Done', value: WORKER.reviews.toString() },
            { label: 'Response', value: '< 2h' },
            { label: 'Hourly Rate', value: `${WORKER.currency}${WORKER.rate}` },
          ].map((stat, i) => (
            <div key={i} className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center">
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
          <p className="text-gray-600 leading-relaxed">10 years warehouse experience. Forklift certified. Strong, reliable, never late. Specialized in logistics and inventory management.</p>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills</h2>
          <div className="flex gap-2 flex-wrap">
            {WORKER.skills.map((skill) => (
              <span key={skill} className="bg-emerald-500/10 text-emerald-600 px-4 py-2 rounded-full text-sm font-semibold">
                {skill} ✓
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Languages</h2>
          <div className="flex gap-2 flex-wrap">
            {['English', 'Bengali'].map((lang) => (
              <span key={lang} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm">
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
