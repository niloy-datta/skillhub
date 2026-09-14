import { ModernHero } from '../../components/ModernHero';
import { Link } from 'react-router-dom';
import { WORKERS, COMPANIES } from '../../data';

export function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Modern Hero Section */}
      <ModernHero />

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-xl text-gray-600">Simple, fast, and secure</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                step: '01', 
                title: 'Post Your Task', 
                desc: 'Describe what you need done with details and budget', 
                icon: '📝',
                color: 'from-blue-500 to-cyan-500'
              },
              { 
                step: '02', 
                title: 'Get Matched', 
                desc: 'Verified workers apply with their proposals', 
                icon: '👥',
                color: 'from-purple-500 to-pink-500'
              },
              { 
                step: '03', 
                title: 'Work Completed', 
                desc: 'Pay securely when the work is done', 
                icon: '✅',
                color: 'from-green-500 to-emerald-500'
              },
            ].map((item, i) => (
              <div 
                key={i} 
                className="card-hover bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-lg`}>
                  {item.icon}
                </div>
                <div className="text-6xl font-black text-gray-100 mb-2">{item.step}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Workers Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              Top <span className="gradient-text">Workers</span>
            </h2>
            <p className="text-xl text-gray-600">Verified professionals ready to work</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WORKERS.slice(0, 6).map((worker) => (
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
                  {worker.skills.slice(0, 3).map((skill) => (
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

          <div className="text-center mt-12">
            <Link
              to="/find-work"
              className="btn-shine inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              View All Workers →
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Companies Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              Trusted <span className="gradient-text">Companies</span>
            </h2>
            <p className="text-xl text-gray-600">Top employers hiring now</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COMPANIES.map((company) => (
              <Link 
                key={company.id} 
                to={`/company/${company.id}`}
                className="card-hover bg-white rounded-3xl p-6 shadow-xl border border-gray-100 block"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                    {company.logo}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{company.name}</h3>
                    <p className="text-gray-600">{company.industry}</p>
                  </div>
                  {company.verified && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                      ✓ Verified
                    </span>
                  )}
                </div>

                <p className="text-gray-600 mb-4">{company.tagline}</p>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-yellow-500 text-xl">★</span>
                  <span className="font-bold text-gray-900">{company.workerRating}</span>
                  <span className="text-gray-500">rating</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-2xl font-black text-gray-900">{company.activeJobs}</p>
                    <p className="text-sm text-gray-600">Active jobs</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-gray-900">{company.activeShifts}</p>
                    <p className="text-sm text-gray-600">Shifts</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/hire-talent"
              className="btn-shine inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              View All Companies →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-black text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Join thousands of workers and businesses already using Skillhub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/post-work"
              className="btn-shine px-8 py-4 rounded-2xl bg-white text-indigo-600 font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all"
            >
              Post a Task
            </Link>
            <Link
              to="/find-work"
              className="btn-shine px-8 py-4 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white font-bold text-lg hover:bg-white/30 transform hover:scale-105 transition-all"
            >
              Find Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
