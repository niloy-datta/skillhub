import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <span className="text-2xl">🎯</span>
            <span className="text-xl font-bold text-gray-900">Skillhub</span>
          </Link>
          
          <nav className="flex gap-2">
            <Link href="/find-work" className="no-underline px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">
              Find Work
            </Link>
            <Link href="/hire-talent" className="no-underline px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">
              Hire Talent
            </Link>
            <Link href="/post-work" className="no-underline px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">
              Post Work
            </Link>
            <Link href="/dashboard" className="no-underline px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">
              Dashboard
            </Link>
          </nav>

          <div className="flex gap-3">
            <Link href="/profile" className="no-underline px-4 py-2 rounded-full border-2 border-gray-200 text-sm font-semibold text-gray-900 hover:bg-gray-50">
              Profile
            </Link>
            <Link href="/post-work" className="no-underline px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-sm font-semibold text-white hover:shadow-lg transition-all">
              Post Work
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm text-emerald-400">600+ verified workers available</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black leading-tight mb-6">
            <div>Find Work.</div>
            <div className="bg-gradient-to-r from-indigo-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">
              Hire Talent.
            </div>
          </h1>

          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-12">
            The trusted marketplace for skilled workers and businesses.
            <br />
            Post tasks, find workers, get work done.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/find-work" className="no-underline px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all">
              Find Work →
            </Link>
            <Link href="/hire-talent" className="no-underline px-8 py-4 rounded-full border-2 border-white/20 bg-white/5 text-lg font-semibold text-white hover:bg-white/10 transition-all">
              Hire Talent
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { value: '600+', label: 'Verified Workers', gradient: 'from-indigo-500 to-purple-600' },
            { value: '150+', label: 'Trusted Companies', gradient: 'from-purple-600 to-amber-500' },
            { value: '94%', label: 'Success Rate', gradient: 'from-emerald-500 to-indigo-500' },
            { value: '24h', label: 'Avg. Response', gradient: 'from-amber-500 to-purple-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className={`text-4xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-sm text-white/60 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '1', title: 'Post Your Task', desc: 'Describe what you need done', icon: '📝' },
            { step: '2', title: 'Get Matched', desc: 'Verified workers apply', icon: '👥' },
            { step: '3', title: 'Work Completed', desc: 'Pay securely when done', icon: '✅' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-white/60">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
