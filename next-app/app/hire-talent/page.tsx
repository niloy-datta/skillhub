import Link from 'next/link';

const COMPANIES = [
  { id: 'c1', name: 'Shinjuku Grand Hotel', logo: '🏨', industry: 'Hospitality', city: 'Tokyo', country: 'Japan', verified: true, rating: 4.8, jobs: 8, shifts: 24 },
  { id: 'c2', name: 'Al Fardan Warehouse', logo: '📦', industry: 'Logistics', city: 'Dubai', country: 'UAE', verified: true, rating: 4.6, jobs: 15, shifts: 42 },
  { id: 'c3', name: 'Café Central', logo: '☕', industry: 'Restaurant', city: 'Lisbon', country: 'Portugal', verified: true, rating: 4.9, jobs: 4, shifts: 12 },
];

export default function HireTalentPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Hire Talent</h1>
        <p className="text-gray-600 mb-8">Find trusted companies and post jobs</p>

        <Link href="/post-work" className="no-underline block mb-8">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-all">
            <h3 className="text-2xl font-bold mb-2">Post a Job</h3>
            <p className="opacity-90">Find skilled workers for your business</p>
          </div>
        </Link>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Verified Companies</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPANIES.map((company) => (
            <div key={company.id} className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{company.logo}</span>
                {company.verified && (
                  <span className="bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full text-xs font-semibold">
                    ✓ Verified
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">{company.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{company.industry}</p>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-amber-500">★</span>
                <span className="font-semibold">{company.rating}</span>
                <span className="text-sm text-gray-400">rating</span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <div className="text-xl font-bold">{company.jobs}</div>
                  <div className="text-xs text-gray-600">Active jobs</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">{company.shifts}</div>
                  <div className="text-xs text-gray-600">Shifts</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
