'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PostWorkPage() {
  const router = useRouter();
  const [type, setType] = useState('task');
  const [form, setForm] = useState({ title: '', description: '', category: '', location: '', budget: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Posted successfully!');
    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Post Work</h1>
        <p className="text-gray-600 mb-8">Create a task or job posting</p>

        <div className="flex gap-2 mb-8 bg-white p-2 rounded-2xl border-2 border-gray-200">
          <button
            onClick={() => setType('task')}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              type === 'task' ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' : 'text-gray-600'
            }`}
          >
            Task
          </button>
          <button
            onClick={() => setType('job')}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              type === 'job' ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' : 'text-gray-600'
            }`}
          >
            Job
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border-2 border-gray-200 rounded-2xl p-8">
          <div className="mb-6">
            <label className="block font-semibold text-gray-900 mb-2">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g., Deep clean 2-bedroom apartment"
              required
              className="w-full px-5 py-3 rounded-xl border-2 border-gray-200 outline-none focus:border-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold text-gray-900 mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe what you need..."
              required
              rows={4}
              className="w-full px-5 py-3 rounded-xl border-2 border-gray-200 outline-none focus:border-indigo-500 resize-vertical"
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold text-gray-900 mb-2">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
              className="w-full px-5 py-3 rounded-xl border-2 border-gray-200 outline-none focus:border-indigo-500"
            >
              <option value="">Select category</option>
              <option>Cleaning</option>
              <option>Plumbing</option>
              <option>Moving</option>
              <option>Electrical</option>
              <option>Cooking</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block font-semibold text-gray-900 mb-2">Location</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="e.g., Tokyo, Japan"
              required
              className="w-full px-5 py-3 rounded-xl border-2 border-gray-200 outline-none focus:border-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold text-gray-900 mb-2">Budget</label>
            <input
              type="number"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
              placeholder="e.g., 1000"
              required
              className="w-full px-5 py-3 rounded-xl border-2 border-gray-200 outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:shadow-lg transition-all"
          >
            Post {type === 'task' ? 'Task' : 'Job'}
          </button>
        </form>
      </div>
    </main>
  );
}
