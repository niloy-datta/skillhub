import { useState } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import NotificationsPage from './pages/Notifications/index';
import SavedItemsPage from './pages/SavedItems/index';
import WorkerDetailsPage from './pages/WorkerDetails/index';
import TaskDetailsPage from './pages/TaskDetails/index';
import ErrorBoundary from './components/ErrorBoundary';

// ===== DATA =====
const WORKERS = [
  { id: 'w1', name: 'Rahim Uddin', avatar: '👷', title: 'Warehouse Specialist', city: 'Gazipur', country: 'Bangladesh', skills: ['Warehouse', 'Forklift', 'Packing'], verified: true, rating: 4.9, reviews: 87, rate: 280, currency: '৳', available: true },
  { id: 'w2', name: 'Yuki Tanaka', avatar: '👩', title: 'Housekeeping Expert', city: 'Tokyo', country: 'Japan', skills: ['Housekeeping', 'Laundry', 'Cooking'], verified: true, rating: 5.0, reviews: 214, rate: 2200, currency: '¥', available: true },
  { id: 'w3', name: 'Ahmed Hassan', avatar: '👨‍🔧', title: 'Construction Specialist', city: 'Dubai', country: 'UAE', skills: ['Construction', 'Masonry', 'Electrical'], verified: true, rating: 4.7, reviews: 156, rate: 45, currency: 'AED', available: false },
  { id: 'w4', name: 'Maria Silva', avatar: '👩‍🍳', title: 'Cook & Housekeeper', city: 'Lisbon', country: 'Portugal', skills: ['Cooking', 'Cleaning', 'Caregiving'], verified: false, rating: 4.8, reviews: 92, rate: 12, currency: '€', available: true },
  { id: 'w5', name: 'Priya Sharma', avatar: '👩‍⚕️', title: 'Certified Caregiver', city: 'Mumbai', country: 'India', skills: ['Caregiving', 'Elderly Care', 'Cooking'], verified: true, rating: 4.9, reviews: 178, rate: 350, currency: '₹', available: true },
  { id: 'w6', name: 'João Santos', avatar: '🚚', title: 'Licensed Driver', city: 'São Paulo', country: 'Brazil', skills: ['Driving', 'Delivery', 'Moving'], verified: false, rating: 4.6, reviews: 64, rate: 35, currency: 'R$', available: true },
];

const COMPANIES = [
  { id: 'c1', name: 'Shinjuku Grand Hotel', logo: '🏨', industry: 'Hospitality', city: 'Tokyo', country: 'Japan', verified: true, rating: 4.8, jobs: 8, shifts: 24 },
  { id: 'c2', name: 'Al Fardan Warehouse', logo: '📦', industry: 'Logistics', city: 'Dubai', country: 'UAE', verified: true, rating: 4.6, jobs: 15, shifts: 42 },
  { id: 'c3', name: 'Café Central', logo: '☕', industry: 'Restaurant', city: 'Lisbon', country: 'Portugal', verified: true, rating: 4.9, jobs: 4, shifts: 12 },
];

const TASKS = [
  { id: 't1', title: 'Deep clean 2-bedroom apartment', category: 'Cleaning', city: 'Tokyo', budget: 18000, currency: '¥', date: 'Tomorrow', posted: 2 },
  { id: 't2', title: 'Fix leaking kitchen tap', category: 'Plumbing', city: 'Lisbon', budget: 45, currency: '€', date: 'Today', posted: 1 },
  { id: 't3', title: 'Help moving to new flat', category: 'Moving', city: 'São Paulo', budget: 280, currency: 'R$', date: 'Saturday', posted: 5 },
];

const CHATS = [
  { id: 'chat1', name: 'Ahmed Hassan', avatar: '👨‍🔧', lastMessage: 'I\'ll start tomorrow morning', time: '2h ago', unread: 2 },
  { id: 'chat2', name: 'Yuki Tanaka', avatar: '👩', lastMessage: 'Thank you for the opportunity!', time: '1d ago', unread: 0 },
];

const NOTIFICATIONS = [
  { id: 'n1', title: 'New offer received', message: 'Yuki Tanaka sent you an offer', time: '2h ago', read: false, icon: '🎯' },
  { id: 'n2', title: 'Payment processed', message: 'Payment of ¥18,000 completed', time: '1d ago', read: true, icon: '💰' },
  { id: 'n3', title: 'New message', message: 'Ahmed Hassan sent you a message', time: '2h ago', read: false, icon: '💬' },
];

// ===== COMPONENTS =====

function Header() {
  const location = useLocation();
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/find-work', label: 'Find Work' },
    { path: '/hire-talent', label: 'Hire Talent' },
    { path: '/post-work', label: 'Post Work' },
    { path: '/messages', label: 'Messages' },
    { path: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 py-4">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <span className="text-2xl">🎯</span>
          <span className="text-xl font-bold text-gray-900">Skillhub</span>
        </Link>
        
        <nav className="flex gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`no-underline px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                location.pathname === item.path
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex gap-3">
          <Link to="/notifications" className="no-underline px-4 py-2 rounded-full border-2 border-gray-200 text-sm font-semibold text-gray-900 hover:bg-gray-50 relative">
            🔔
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              2
            </span>
          </Link>
          <Link to="/saved" className="no-underline px-4 py-2 rounded-full border-2 border-gray-200 text-sm font-semibold text-gray-900 hover:bg-gray-50">
            Saved
          </Link>
          <Link to="/profile" className="no-underline px-4 py-2 rounded-full border-2 border-gray-200 text-sm font-semibold text-gray-900 hover:bg-gray-50">
            Profile
          </Link>
          <Link to="/post-work" className="no-underline px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-sm font-semibold text-white hover:shadow-lg transition-all">
            Post Work
          </Link>
        </div>
      </div>
    </header>
  );
}

// ===== PAGES =====

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm text-emerald-500">600+ verified workers available</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black leading-tight mb-6">
            <div>Find Work.</div>
            <div className="bg-gradient-to-r from-indigo-500 via-purple-600 to-amber-500 bg-clip-text text-transparent">
              Hire Talent.
            </div>
          </h1>

          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-12">
            The trusted marketplace for skilled workers and businesses.
            <br />
            Post tasks, find workers, get work done.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/find-work" className="no-underline px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all">
              Find Work →
            </Link>
            <Link to="/hire-talent" className="no-underline px-8 py-4 rounded-full border-2 border-white/20 bg-white/5 text-lg font-semibold text-white hover:bg-white/10 transition-all">
              Hire Talent
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
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

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-12">How It Works</h2>
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
      </div>
    </div>
  );
}

function FindWorkPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredWorkers = WORKERS.filter(w => {
    const matchSearch = w.name.toLowerCase().includes(search.toLowerCase()) || w.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = filter === 'All' || w.skills.includes(filter);
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
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
            <option>Cleaning</option>
            <option>Plumbing</option>
            <option>Moving</option>
            <option>Cooking</option>
            <option>Caregiving</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers.map((worker) => (
            <Link key={worker.id} to={`/profile/${worker.id}`} className="no-underline">
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
    </div>
  );
}

function HireTalentPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Hire Talent</h1>
        <p className="text-gray-600 mb-8">Find trusted companies and post jobs</p>

        <Link to="/post-work" className="no-underline block mb-8">
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
    </div>
  );
}

function PostWorkPage() {
  const [type, setType] = useState('task');
  const [form, setForm] = useState({ title: '', description: '', category: '', location: '', budget: '', deadline: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Posted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
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
    </div>
  );
}

function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-8">Your activity overview</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Tasks', value: '3' },
            { label: 'Messages', value: '5' },
            { label: 'Notifications', value: NOTIFICATIONS.filter(n => !n.read).length.toString() },
            { label: 'Saved', value: '12' },
          ].map((stat, i) => (
            <div key={i} className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Tasks</h2>
          {TASKS.slice(0, 3).map((task) => (
            <div key={task.id} className="border-b border-gray-200 py-4 flex items-start justify-between last:border-b-0">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.city} · {task.date}</p>
              </div>
              <span className="bg-indigo-500/10 text-indigo-600 px-3 py-1 rounded-full text-xs font-semibold">
                {task.category}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/post-work" className="no-underline">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Post New Task</h3>
              <p className="opacity-90 text-sm">Create a new task posting</p>
            </div>
          </Link>
          <Link to="/find-work" className="no-underline">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Find Workers</h3>
              <p className="text-gray-600 text-sm">Browse verified workers</p>
            </div>
          </Link>
          <Link to="/messages" className="no-underline">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Messages</h3>
              <p className="text-gray-600 text-sm">View your conversations</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(CHATS[0]);
  const [message, setMessage] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="flex h-[calc(100vh-5rem)]">
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Messages</h2>
          </div>
          {CHATS.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`w-full p-4 border-b border-gray-200 text-left transition-all ${
                selectedChat.id === chat.id ? 'bg-indigo-500/10' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{chat.avatar}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-gray-900">{chat.name}</p>
                    {chat.unread > 0 && (
                      <span className="bg-indigo-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  <p className="text-xs text-gray-400 mt-1">{chat.time}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{selectedChat.avatar}</span>
              <div>
                <p className="font-semibold text-gray-900">{selectedChat.name}</p>
                <p className="text-sm text-emerald-600">● Online</p>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
            <div className="mb-4 flex justify-start">
              <div className="max-w-[70%] bg-white px-4 py-3 rounded-2xl">
                <p className="text-sm">Hi! I'm available to start tomorrow.</p>
                <p className="text-xs text-gray-400 mt-1">10:30 AM</p>
              </div>
            </div>
            <div className="mb-4 flex justify-end">
              <div className="max-w-[70%] bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-3 rounded-2xl">
                <p className="text-sm">Great! Can you handle electrical work too?</p>
                <p className="text-xs text-white/60 mt-1">10:35 AM</p>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 bg-white">
            <form onSubmit={(e) => { e.preventDefault(); setMessage(''); }} className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 outline-none focus:border-indigo-500"
              />
              <button type="submit" className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfilePage() {
  const worker = WORKERS[0];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 mb-8">
          <div className="flex items-start gap-6 mb-6">
            <span className="text-6xl">{worker.avatar}</span>
            <div className="flex-1">
              <h1 className="text-4xl font-black text-gray-900 mb-2">{worker.name}</h1>
              <p className="text-lg text-gray-600 mb-2">{worker.title}</p>
              <p className="text-sm text-gray-400">{worker.city}, {worker.country}</p>
              <div className="flex gap-2 mt-4">
                {worker.verified && (
                  <span className="bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full text-xs font-semibold">
                    ✓ Verified
                  </span>
                )}
                {worker.available && (
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
            { label: 'Rating', value: worker.rating.toString() },
            { label: 'Jobs Done', value: worker.reviews.toString() },
            { label: 'Response', value: '< 2h' },
            { label: 'Hourly Rate', value: `${worker.currency}${worker.rate}` },
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
            {worker.skills.map((skill) => (
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
    </div>
  );
}

function SettingsPage() {
  const [tab, setTab] = useState('profile');

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600 mb-8">Manage your account settings</p>

        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-4">
            {[
              { id: 'profile', label: 'Profile', icon: '👤' },
              { id: 'notifications', label: 'Notifications', icon: '🔔' },
              { id: 'security', label: 'Security', icon: '🔐' },
              { id: 'billing', label: 'Billing', icon: '💳' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full px-4 py-3 rounded-lg font-medium text-left flex items-center gap-3 mb-2 transition-all ${
                  tab === item.id ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
            {tab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
                <div className="mb-6">
                  <label className="block font-semibold text-gray-900 mb-2">Name</label>
                  <input type="text" defaultValue="John Doe" className="w-full px-5 py-3 rounded-xl border-2 border-gray-200 outline-none focus:border-indigo-500" />
                </div>
                <div className="mb-6">
                  <label className="block font-semibold text-gray-900 mb-2">Email</label>
                  <input type="email" defaultValue="john@example.com" className="w-full px-5 py-3 rounded-xl border-2 border-gray-200 outline-none focus:border-indigo-500" />
                </div>
                <button className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold">
                  Save Changes
                </button>
              </div>
            )}

            {tab === 'notifications' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Settings</h2>
                {['Email notifications', 'Task updates', 'Payment notifications'].map((item) => (
                  <div key={item} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-3">
                    <span className="text-gray-900">{item}</span>
                    <label className="relative inline-block w-12 h-6">
                      <input type="checkbox" defaultChecked className="opacity-0 w-0 h-0" />
                      <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-indigo-500 rounded-full transition-all"></span>
                    </label>
                  </div>
                ))}
              </div>
            )}

            {tab === 'security' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>
                <div className="mb-6">
                  <label className="block font-semibold text-gray-900 mb-2">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-5 py-3 rounded-xl border-2 border-gray-200 outline-none focus:border-indigo-500" />
                </div>
                <div className="mb-6">
                  <label className="block font-semibold text-gray-900 mb-2">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-5 py-3 rounded-xl border-2 border-gray-200 outline-none focus:border-indigo-500" />
                </div>
                <button className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold">
                  Update Password
                </button>
              </div>
            )}

            {tab === 'billing' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing Settings</h2>
                <div className="bg-emerald-500/5 border-2 border-emerald-500/30 rounded-2xl p-6">
                  <p className="text-sm text-emerald-600">Current Plan</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">Pro Plan</p>
                  <p className="text-sm text-gray-600 mt-1">$29/month</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            {isLogin ? 'Welcome back' : 'Create account'}
          </h1>
          <p className="text-white/60">
            {isLogin ? 'Sign in to your Skillhub account' : 'Start your journey with Skillhub'}
          </p>
        </div>

        <div className="bg-white/5 border-2 border-white/10 rounded-3xl p-8 backdrop-blur-sm">
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-white/80 mb-2">Name</label>
                <input type="text" placeholder="John Doe" className="w-full px-5 py-3 rounded-2xl border-2 border-white/20 bg-white/5 text-white outline-none focus:border-indigo-500" />
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
              <input type="email" placeholder="you@example.com" required className="w-full px-5 py-3 rounded-2xl border-2 border-white/20 bg-white/5 text-white outline-none focus:border-indigo-500" />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
              <input type="password" placeholder="••••••••" required className="w-full px-5 py-3 rounded-2xl border-2 border-white/20 bg-white/5 text-white outline-none focus:border-indigo-500" />
            </div>

            <button type="submit" className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold mb-6">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-white/60">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button onClick={() => setIsLogin(!isLogin)} className="ml-2 font-semibold text-indigo-400 underline">
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="text-9xl font-black text-white/10 mb-6">404</div>
        <h1 className="text-4xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-lg text-white/60 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link to="/" className="no-underline px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold">
            Go Home
          </Link>
          <button onClick={() => window.history.back()} className="px-6 py-3 rounded-full border-2 border-white/20 bg-white/5 text-white font-semibold">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

// ===== MAIN APP =====

export default function App() {
  return (
    <ErrorBoundary>
      <HashRouter>
        <div className="min-h-screen">
          <Header />
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/find-work" element={<FindWorkPage />} />
          <Route path="/hire-talent" element={<HireTalentPage />} />
          <Route path="/post-work" element={<PostWorkPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/messages/:chatId" element={<MessagesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/:workerId" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/saved" element={<SavedItemsPage />} />
          <Route path="/worker/:workerId" element={<WorkerDetailsPage />} />
          <Route path="/task/:taskId" element={<TaskDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </HashRouter>
    </ErrorBoundary>
  );
}
