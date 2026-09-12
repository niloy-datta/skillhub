import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function PostWorkPage() {
  const navigate = useNavigate();
  const [postType, setPostType] = useState<'task' | 'job'>('task');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    budget: '',
    deadline: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate posting
    alert('Posted successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-cream pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <div className="mb-8">
          <h1 className="mb-2 font-display text-4xl font-black text-midnight">Post Work</h1>
          <p className="text-midnight/60">Create a task or job posting</p>
        </div>

        <div className="mb-8 flex gap-2 rounded-2xl border-2 border-midnight/10 bg-white p-2">
          <button
            onClick={() => setPostType('task')}
            className={`flex-1 rounded-full py-3 font-semibold transition-all ${
              postType === 'task' ? 'bg-indigo text-white' : 'text-midnight/60'
            }`}
          >
            Task
          </button>
          <button
            onClick={() => setPostType('job')}
            className={`flex-1 rounded-full py-3 font-semibold transition-all ${
              postType === 'job' ? 'bg-indigo text-white' : 'text-midnight/60'
            }`}
          >
            Job
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border-2 border-midnight/10 bg-white p-8">
          <div>
            <label className="mb-2 block font-semibold text-midnight">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Deep clean 2-bedroom apartment"
              className="w-full rounded-xl border-2 border-midnight/20 bg-cream px-5 py-3 outline-none focus:border-indigo"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-midnight">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what you need..."
              rows={4}
              className="w-full rounded-xl border-2 border-midnight/20 bg-cream px-5 py-3 outline-none focus:border-indigo"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-midnight">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full rounded-xl border-2 border-midnight/20 bg-cream px-5 py-3 outline-none focus:border-indigo"
              required
            >
              <option value="">Select category</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Moving">Moving</option>
              <option value="Electrical">Electrical</option>
              <option value="Cooking">Cooking</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-semibold text-midnight">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g., Tokyo, Japan"
              className="w-full rounded-xl border-2 border-midnight/20 bg-cream px-5 py-3 outline-none focus:border-indigo"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-midnight">Budget</label>
            <input
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              placeholder="e.g., 1000"
              className="w-full rounded-xl border-2 border-midnight/20 bg-cream px-5 py-3 outline-none focus:border-indigo"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-indigo to-violet py-4 font-semibold text-white transition-all hover:scale-105"
          >
            Post {postType === 'task' ? 'Task' : 'Job'}
          </button>
        </form>
      </div>
    </div>
  );
}
