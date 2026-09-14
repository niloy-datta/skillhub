import { useParams, Link } from 'react-router-dom';
import { WORKERS } from '../../data';

export default function WorkerDetailsPage() {
  const { workerId } = useParams();
  const worker = WORKERS.find(w => w.id === workerId) || WORKERS[0];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link to="/find-work" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6">
          ← Back to Find Work
        </Link>

        <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 mb-8">
          <div className="flex items-start gap-6 mb-6">
            <span className="text-6xl">{worker.avatar}</span>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-4xl font-black text-gray-900">{worker.name}</h1>
                {worker.humanVerified && (
                  <span className="bg-emerald-500/10 text-emerald-600 px-4 py-2 rounded-full text-sm font-semibold">
                    ✓ Human Verified
                  </span>
                )}
              </div>
              <p className="text-lg text-gray-600 mb-2">{worker.title}</p>
              <p className="text-sm text-gray-400">{worker.city}, {worker.country}</p>
              <div className="flex gap-2 mt-4">
                {worker.availableNow && (
                  <span className="bg-indigo-500/10 text-indigo-600 px-3 py-1 rounded-full text-xs font-semibold">
                    Available Now
                  </span>
                )}
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
                  Response: {worker.responseTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Rating', value: worker.rating.toString(), icon: '⭐' },
            { label: 'Reviews', value: worker.reviews.toString(), icon: '💬' },
            { label: 'Jobs Done', value: worker.completedWork.toString(), icon: '✅' },
            { label: 'Hourly Rate', value: `${worker.currency}${worker.expectedRate}`, icon: '💰' },
          ].map((stat, i) => (
            <div key={i} className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center">
              <span className="text-3xl mb-2 block">{stat.icon}</span>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
          <p className="text-gray-600 leading-relaxed">{worker.bio}</p>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills</h2>
          <div className="flex gap-2 flex-wrap mb-4">
            {worker.skills.map((skill) => (
              <span 
                key={skill} 
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  worker.verifiedSkills.includes(skill)
                    ? 'bg-emerald-500/10 text-emerald-600'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {skill} {worker.verifiedSkills.includes(skill) && '✓'}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            ✓ = Verified skills with proven track record
          </p>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Languages</h2>
          <div className="flex gap-2 flex-wrap">
            {worker.languages.map((lang) => (
              <span key={lang} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm">
                {lang}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Member Since</h2>
          <p className="text-gray-600">{worker.joinedYear}</p>
        </div>

        <div className="flex gap-4">
          <Link 
            to="/messages" 
            className="flex-1 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-center hover:shadow-lg transition-all"
          >
            Contact {worker.name.split(' ')[0]}
          </Link>
          <button className="flex-1 py-4 rounded-full border-2 border-gray-200 text-gray-900 font-semibold hover:bg-gray-50 transition-all">
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}
