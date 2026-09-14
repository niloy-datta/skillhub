import { useParams, Link } from 'react-router-dom';
import { JOBS, COMPANIES } from '../../data';

export function JobDetailPage() {
  const { jobId } = useParams();
  const job = JOBS.find(j => j.id === jobId);
  const company = job ? COMPANIES.find(c => c.id === job.companyId) : null;

  if (!job || !company) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl mb-4 block">❌</span>
          <p className="text-xl text-gray-600">Job not found</p>
          <Link to="/hire-talent" className="mt-4 inline-block text-indigo-600 hover:text-indigo-700">
            ← Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link to="/hire-talent" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6">
          ← Back to Jobs
        </Link>

        {/* Job Header */}
        <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              <span className="text-5xl">{company.logo}</span>
              <div>
                <h1 className="text-3xl font-black text-gray-900 mb-2">{job.role}</h1>
                <p className="text-lg text-gray-600 mb-2">{company.name}</p>
                <p className="text-sm text-gray-500">{job.location}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-gray-900">{job.pay}</p>
              <p className="text-sm text-gray-600">{job.employment}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-600 mb-1">Schedule</p>
              <p className="font-semibold text-gray-900">{job.schedule}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Positions</p>
              <p className="font-semibold text-gray-900">{job.positions}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Experience</p>
              <p className="font-semibold text-gray-900">{job.experience}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Posted</p>
              <p className="font-semibold text-gray-900">{job.postedHours}h ago</p>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            We are looking for a skilled {job.role} to join our team at {company.name}. 
            This is a {job.employment.toLowerCase()} position with competitive pay and great benefits.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-3">Requirements</h3>
          <ul className="space-y-2 mb-6">
            {job.requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-indigo-500 mt-1">•</span>
                <span className="text-gray-600">{req}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mb-3">What We Offer</h3>
          <ul className="space-y-2">
            {company.perks.map((perk, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-500 mt-1">✓</span>
                <span className="text-gray-600">{perk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Info */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About {company.name}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">{company.description}</p>
          <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-1">
              <span className="text-amber-500">★</span>
              <span className="font-semibold">{company.workerRating}</span>
              <span className="text-sm text-gray-500">worker rating</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-emerald-500">✓</span>
              <span className="font-semibold">{company.paymentReliability}</span>
              <span className="text-sm text-gray-500">payment reliability</span>
            </div>
          </div>
        </div>

        {/* Apply Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Interested in this position?</h2>
          <p className="mb-6 opacity-90">
            {job.applicants} people have already applied. Don't miss this opportunity!
          </p>
          <div className="flex gap-4">
            <button className="flex-1 py-4 rounded-full bg-white text-indigo-600 font-semibold hover:shadow-lg transition-all">
              Apply Now
            </button>
            <button className="flex-1 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-all">
              Save Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
