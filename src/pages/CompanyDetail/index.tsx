import { useParams, Link } from 'react-router-dom';
import { COMPANIES, JOBS } from '../../data';

export function CompanyDetailPage() {
  const { companyId } = useParams();
  const company = COMPANIES.find(c => c.id === companyId);
  const companyJobs = JOBS.filter(j => j.companyId === companyId);

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl mb-4 block">❌</span>
          <p className="text-xl text-gray-600">Company not found</p>
          <Link to="/hire-talent" className="mt-4 inline-block text-indigo-600 hover:text-indigo-700">
            ← Back to Companies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Link to="/hire-talent" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6">
          ← Back to Companies
        </Link>

        {/* Company Header */}
        <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 mb-8">
          <div className="flex items-start gap-6 mb-6">
            <span className="text-6xl">{company.logo}</span>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-4xl font-black text-gray-900">{company.name}</h1>
                {company.verified && (
                  <span className="bg-emerald-500/10 text-emerald-600 px-4 py-2 rounded-full text-sm font-semibold">
                    ✓ Verified
                  </span>
                )}
              </div>
              <p className="text-lg text-gray-600 mb-2">{company.tagline}</p>
              <p className="text-sm text-gray-500">{company.city}, {company.country}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-600 mb-1">Industry</p>
              <p className="font-semibold text-gray-900">{company.industry}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Locations</p>
              <p className="font-semibold text-gray-900">{company.locations}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Jobs</p>
              <p className="font-semibold text-gray-900">{company.activeJobs}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Response Rate</p>
              <p className="font-semibold text-gray-900">{company.responseRate}%</p>
            </div>
          </div>
        </div>

        {/* Company Description */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
          <p className="text-gray-600 leading-relaxed">{company.description}</p>
        </div>

        {/* Ratings */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Company Ratings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <span className="text-amber-500 text-2xl">★</span>
                <span className="text-3xl font-black text-gray-900">{company.workerRating}</span>
              </div>
              <p className="text-sm text-gray-600">Worker Rating</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <span className="text-emerald-500 text-2xl">✓</span>
                <span className="text-3xl font-black text-gray-900">{company.paymentReliability}</span>
              </div>
              <p className="text-sm text-gray-600">Payment Reliability</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <span className="text-indigo-500 text-2xl">⚡</span>
                <span className="text-3xl font-black text-gray-900">{company.responseRate}%</span>
              </div>
              <p className="text-sm text-gray-600">Response Rate</p>
            </div>
          </div>
        </div>

        {/* Perks */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {company.perks.map((perk, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-emerald-500 mt-1">✓</span>
                <span className="text-gray-600">{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Jobs */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Active Jobs ({companyJobs.length})
          </h2>
          {companyJobs.length > 0 ? (
            <div className="space-y-4">
              {companyJobs.map((job) => (
                <Link
                  key={job.id}
                  to={`/job/${job.id}`}
                  className="block border-2 border-gray-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{job.role}</h3>
                    <span className="text-xl font-black text-gray-900">{job.pay}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{job.location}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{job.employment}</span>
                    <span>•</span>
                    <span>{job.positions} position{job.positions !== 1 ? 's' : ''}</span>
                    <span>•</span>
                    <span>{job.applicants} applicants</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <span className="text-4xl mb-2 block">📭</span>
              <p className="text-gray-600">No active jobs at the moment</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
