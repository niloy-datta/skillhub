import { useState } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';

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
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/find-work', label: 'Find Work', icon: '🔍' },
    { path: '/hire-talent', label: 'Hire Talent', icon: '👥' },
    { path: '/post-work', label: 'Post Work', icon: '📝' },
    { path: '/messages', label: 'Messages', icon: '💬' },
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
  ];

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: 'white',
      borderBottom: '1px solid #e5e7eb',
      zIndex: 1000,
      padding: '1rem 0'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🎯</span>
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#0a0a0b' }}>Skillhub</span>
        </Link>
        
        <nav style={{ display: 'flex', gap: '0.5rem' }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: location.pathname === item.path ? 'white' : '#6b7280',
                background: location.pathname === item.path ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/profile" style={{
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            border: '2px solid #e5e7eb',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#0a0a0b',
          }}>
            Profile
          </Link>
          <Link to="/post-work" style={{
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: 'white',
          }}>
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0b 0%, #1a1a1f 50%, #0a0a0b 100%)', color: 'white', paddingTop: '5rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '9999px', padding: '0.5rem 1.25rem', marginBottom: '2rem' }}>
            <span style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', background: '#10b981', animation: 'pulse 2s infinite' }}></span>
            <span style={{ fontSize: '0.875rem', color: '#10b981' }}>600+ verified workers available</span>
          </div>

          <h1 style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', fontWeight: '900', lineHeight: '0.85', marginBottom: '1.5rem' }}>
            <div>Find Work.</div>
            <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f59e0b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Hire Talent.
            </div>
          </h1>

          <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '600px', margin: '0 auto 3rem' }}>
            The trusted marketplace for skilled workers and businesses.
            <br />
            Post tasks, find workers, get work done.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/find-work" style={{
              textDecoration: 'none',
              padding: '1rem 2rem',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontSize: '1.125rem',
              fontWeight: '600',
              color: 'white',
              boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
            }}>
              Find Work →
            </Link>
            <Link to="/hire-talent" style={{
              textDecoration: 'none',
              padding: '1rem 2rem',
              borderRadius: '9999px',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.05)',
              fontSize: '1.125rem',
              fontWeight: '600',
              color: 'white',
            }}>
              Hire Talent
            </Link>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          {[
            { value: '600+', label: 'Verified Workers', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
            { value: '150+', label: 'Trusted Companies', gradient: 'linear-gradient(135deg, #764ba2 0%, #f59e0b 100%)' },
            { value: '94%', label: 'Success Rate', gradient: 'linear-gradient(135deg, #10b981 0%, #667eea 100%)' },
            { value: '24h', label: 'Avg. Response', gradient: 'linear-gradient(135deg, #f59e0b 0%, #764ba2 100%)' },
          ].map((stat, i) => (
            <div key={i} style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '1rem', padding: '1.5rem', backdropFilter: 'blur(10px)' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '900', background: stat.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '0.5rem' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '3rem' }}>How It Works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
              { step: '1', title: 'Post Your Task', desc: 'Describe what you need done', icon: '📝' },
              { step: '2', title: 'Get Matched', desc: 'Verified workers apply', icon: '👥' },
              { step: '3', title: 'Work Completed', desc: 'Pay securely when done', icon: '✅' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ width: '4rem', height: '4rem', margin: '0 auto 1rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{item.desc}</p>
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
    <div style={{ minHeight: '100vh', background: '#faf9f6', paddingTop: '5rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0a0a0b', marginBottom: '0.5rem' }}>Find Work</h1>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Browse verified workers near you</p>

        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search by name or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: '1', minWidth: '250px', padding: '0.75rem 1.25rem', borderRadius: '0.75rem', border: '2px solid #e5e7eb', outline: 'none' }}
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: '0.75rem 1.25rem', borderRadius: '0.75rem', border: '2px solid #e5e7eb', outline: 'none', minWidth: '200px' }}
          >
            <option>All</option>
            <option>Cleaning</option>
            <option>Plumbing</option>
            <option>Moving</option>
            <option>Cooking</option>
            <option>Caregiving</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {filteredWorkers.map((worker) => (
            <Link key={worker.id} to={`/profile/${worker.id}`} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'white', border: '2px solid #e5e7eb', borderRadius: '1rem', padding: '1.5rem', transition: 'all 0.2s' }}>
                <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '2.5rem' }}>{worker.avatar}</span>
                    <div>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#0a0a0b', marginBottom: '0.25rem' }}>{worker.name}</h3>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{worker.title}</p>
                    </div>
                  </div>
                  {worker.verified && (
                    <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600' }}>
                      ✓ Verified
                    </span>
                  )}
                </div>

                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>{worker.city}, {worker.country}</p>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  {worker.skills.slice(0, 3).map((skill) => (
                    <span key={skill} style={{ background: '#e8e7e3', padding: '0.375rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', color: '#6b7280' }}>
                      {skill}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span style={{ color: '#f59e0b' }}>★</span>
                    <span style={{ fontWeight: '600' }}>{worker.rating}</span>
                    <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>({worker.reviews})</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                      {worker.currency}{worker.rate}
                      <span style={{ fontSize: '0.75rem', fontWeight: '500', color: '#9ca3af' }}>/hr</span>
                    </div>
                    {worker.available && <div style={{ fontSize: '0.75rem', color: '#10b981' }}>Available now</div>}
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
    <div style={{ minHeight: '100vh', background: '#faf9f6', paddingTop: '5rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0a0a0b', marginBottom: '0.5rem' }}>Hire Talent</h1>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Find trusted companies and post jobs</p>

        <Link to="/post-work" style={{ textDecoration: 'none', display: 'block', marginBottom: '2rem' }}>
          <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '1rem', padding: '2rem', color: 'white', boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Post a Job</h3>
            <p style={{ opacity: 0.9 }}>Find skilled workers for your business</p>
          </div>
        </Link>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0a0a0b', marginBottom: '1.5rem' }}>Verified Companies</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {COMPANIES.map((company) => (
            <div key={company.id} style={{ background: 'white', border: '2px solid #e5e7eb', borderRadius: '1rem', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontSize: '2.5rem' }}>{company.logo}</span>
                {company.verified && (
                  <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.375rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600' }}>
                    ✓ Verified
                  </span>
                )}
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#0a0a0b', marginBottom: '0.5rem' }}>{company.name}</h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>{company.industry}</p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ color: '#f59e0b' }}>★</span>
                <span style={{ fontWeight: '600' }}>{company.rating}</span>
                <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>rating</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{company.jobs}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Active jobs</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{company.shifts}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Shifts</div>
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
    <div style={{ minHeight: '100vh', background: '#faf9f6', paddingTop: '5rem' }}>
      <div style={{ maxWidth: '768px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0a0a0b', marginBottom: '0.5rem' }}>Post Work</h1>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Create a task or job posting</p>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', background: 'white', padding: '0.5rem', borderRadius: '1rem', border: '2px solid #e5e7eb' }}>
          <button
            onClick={() => setType('task')}
            style={{ flex: '1', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', fontWeight: '600', cursor: 'pointer', background: type === 'task' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent', color: type === 'task' ? 'white' : '#6b7280' }}
          >
            Task
          </button>
          <button
            onClick={() => setType('job')}
            style={{ flex: '1', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', fontWeight: '600', cursor: 'pointer', background: type === 'job' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent', color: type === 'job' ? 'white' : '#6b7280' }}
          >
            Job
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ background: 'white', border: '2px solid #e5e7eb', borderRadius: '1rem', padding: '2rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: '600', color: '#0a0a0b', marginBottom: '0.5rem' }}>Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g., Deep clean 2-bedroom apartment"
              required
              style={{ width: '100%', padding: '0.75rem 1.25rem', borderRadius: '0.75rem', border: '2px solid #e5e7eb', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: '600', color: '#0a0a0b', marginBottom: '0.5rem' }}>Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe what you need..."
              required
              rows={4}
              style={{ width: '100%', padding: '0.75rem 1.25rem', borderRadius: '0.75rem', border: '2px solid #e5e7eb', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: '600', color: '#0a0a0b', marginBottom: '0.5rem' }}>Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
              style={{ width: '100%', padding: '0.75rem 1.25rem', borderRadius: '0.75rem', border: '2px solid #e5e7eb', outline: 'none', boxSizing: 'border-box' }}
            >
              <option value="">Select category</option>
              <option>Cleaning</option>
              <option>Plumbing</option>
              <option>Moving</option>
              <option>Electrical</option>
              <option>Cooking</option>
            </select>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: '600', color: '#0a0a0b', marginBottom: '0.5rem' }}>Location</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="e.g., Tokyo, Japan"
              required
              style={{ width: '100%', padding: '0.75rem 1.25rem', borderRadius: '0.75rem', border: '2px solid #e5e7eb', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: '600', color: '#0a0a0b', marginBottom: '0.5rem' }}>Budget</label>
            <input
              type="number"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
              placeholder="e.g., 1000"
              required
              style={{ width: '100%', padding: '0.75rem 1.25rem', borderRadius: '0.75rem', border: '2px solid #e5e7eb', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <button
            type="submit"
            style={{ width: '100%', padding: '1rem', borderRadius: '9999px', border: 'none', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' }}
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
    <div style={{ minHeight: '100vh', background: '#faf9f6', paddingTop: '5rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0a0a0b', marginBottom: '0.5rem' }}>Dashboard</h1>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Your activity overview</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Active Tasks', value: '3' },
            { label: 'Messages', value: '5' },
            { label: 'Notifications', value: NOTIFICATIONS.filter(n => !n.read).length.toString() },
            { label: 'Saved', value: '12' },
          ].map((stat, i) => (
            <div key={i} style={{ background: 'white', border: '2px solid #e5e7eb', borderRadius: '1rem', padding: '1.5rem' }}>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{stat.label}</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0a0a0b', marginTop: '0.5rem' }}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', border: '2px solid #e5e7eb', borderRadius: '1rem', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0a0a0b', marginBottom: '1rem' }}>Recent Tasks</h2>
          {TASKS.slice(0, 3).map((task) => (
            <div key={task.id} style={{ borderBottom: '1px solid #e5e7eb', padding: '1rem 0', display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontWeight: '600', color: '#0a0a0b', marginBottom: '0.25rem' }}>{task.title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{task.city} · {task.date}</p>
              </div>
              <span style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#667eea', padding: '0.375rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600' }}>
                {task.category}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <Link to="/post-work" style={{ textDecoration: 'none' }}>
            <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '1rem', padding: '1.5rem', color: 'white' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Post New Task</h3>
              <p style={{ opacity: 0.9, fontSize: '0.875rem' }}>Create a new task posting</p>
            </div>
          </Link>
          <Link to="/find-work" style={{ textDecoration: 'none' }}>
            <div style={{ background: 'white', border: '2px solid #e5e7eb', borderRadius: '1rem', padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#0a0a0b', marginBottom: '0.5rem' }}>Find Workers</h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Browse verified workers</p>
            </div>
          </Link>
          <Link to="/messages" style={{ textDecoration: 'none' }}>
            <div style={{ background: 'white', border: '2px solid #e5e7eb', borderRadius: '1rem', padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#0a0a0b', marginBottom: '0.5rem' }}>Messages</h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>View your conversations</p>
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
    <div style={{ minHeight: '100vh', background: '#faf9f6', paddingTop: '5rem' }}>
      <div style={{ display: 'flex', height: 'calc(100vh - 5rem)' }}>
        <div style={{ width: '320px', background: 'white', borderRight: '1px solid #e5e7eb', overflowY: 'auto' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#0a0a0b' }}>Messages</h2>
          </div>
          {CHATS.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              style={{ width: '100%', padding: '1rem', borderBottom: '1px solid #e5e7eb', background: selectedChat.id === chat.id ? 'rgba(99, 102, 241, 0.1)' : 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{chat.avatar}</span>
                <div style={{ flex: '1', minWidth: '0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <p style={{ fontWeight: '600', color: '#0a0a0b' }}>{chat.name}</p>
                    {chat.unread > 0 && (
                      <span style={{ background: '#667eea', color: 'white', width: '1.25rem', height: '1.25rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>
                        {chat.unread}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{chat.lastMessage}</p>
                  <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>{chat.time}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e5e7eb', background: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{selectedChat.avatar}</span>
              <div>
                <p style={{ fontWeight: '600', color: '#0a0a0b' }}>{selectedChat.name}</p>
                <p style={{ fontSize: '0.875rem', color: '#10b981' }}>● Online</p>
              </div>
            </div>
          </div>

          <div style={{ flex: '1', padding: '1.5rem', overflowY: 'auto', background: '#faf9f6' }}>
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{ maxWidth: '70%', background: 'white', padding: '0.75rem 1rem', borderRadius: '1rem' }}>
                <p style={{ fontSize: '0.875rem' }}>Hi! I'm available to start tomorrow.</p>
                <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>10:30 AM</p>
              </div>
            </div>
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ maxWidth: '70%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '0.75rem 1rem', borderRadius: '1rem' }}>
                <p style={{ fontSize: '0.875rem' }}>Great! Can you handle electrical work too?</p>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '0.25rem' }}>10:35 AM</p>
              </div>
            </div>
          </div>

          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #e5e7eb', background: 'white' }}>
            <form onSubmit={(e) => { e.preventDefault(); setMessage(''); }} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                style={{ flex: '1', padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '2px solid #e5e7eb', outline: 'none' }}
              />
              <button type="submit" style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem', border: 'none', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', fontWeight: '600', cursor: 'pointer' }}>
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
    <div style={{ minHeight: '100vh', background: '#faf9f6', paddingTop: '5rem' }}>
      <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ background: 'white', border: '2px solid #e5e7eb', borderRadius: '1.5rem', padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'start', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '4rem' }}>{worker.avatar}</span>
            <div style={{ flex: '1' }}>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0a0a0b', marginBottom: '0.5rem' }}>{worker.name}</h1>
              <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '0.5rem' }}>{worker.title}</p>
              <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>{worker.city}, {worker.country}</p>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                {worker.verified && (
                  <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.375rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600' }}>
                    ✓ Verified
                  </span>
                )}
                {worker.available && (
                  <span style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#667eea', padding: '0.375rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600' }}>
                    Available Now
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Rating', value: worker.rating.toString() },
            { label: 'Jobs Done', value: worker.reviews.toString() },
            { label: 'Response', value: '< 2h' },
            { label: 'Hourly Rate', value: `${worker.currency}${worker.rate}` },
          ].map((stat, i) => (
            <div key={i} style={{ background: 'white', border: '2px solid #e5e7eb', borderRadius: '1rem', padding: '1.5rem', textAlign: 'center' }}>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0a0a0b' }}>{stat.value}</p>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', border: '2px solid #e5e7eb', borderRadius: '1rem', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0a0a0b', marginBottom: '1rem' }}>About</h2>
          <p style={{ color: '#6b7280', lineHeight: '1.6' }}>10 years warehouse experience. Forklift certified. Strong, reliable, never late. Specialized in logistics and inventory management.</p>
        </div>

        <div style={{ background: 'white', border: '2px solid #e5e7eb', borderRadius: '1rem', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0a0a0b', marginBottom: '1rem' }}>Skills</h2>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {worker.skills.map((skill) => (
              <span key={skill} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.5rem 1rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '600' }}>
                {skill} ✓
              </span>
            ))}
          </div>
        </div>

        <div style={{ background: 'white', border: '2px solid #e5e7eb', borderRadius: '1rem', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0a0a0b', marginBottom: '1rem' }}>Languages</h2>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['English', 'Bengali'].map((lang) => (
              <span key={lang} style={{ background: '#e8e7e3', color: '#6b7280', padding: '0.5rem 1rem', borderRadius: '9999px', fontSize: '0.875rem' }}>
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
    <div style={{ minHeight: '100vh', background: '#faf9f6', paddingTop: '5rem' }}>
      <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0a0a0b', marginBottom: '0.5rem' }}>Settings</h1>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Manage your account settings</p>

        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
          <div style={{ background: 'white', border: '2px solid #e5e7eb', borderRadius: '1rem', padding: '1rem' }}>
            {[
              { id: 'profile', label: 'Profile', icon: '👤' },
              { id: 'notifications', label: 'Notifications', icon: '🔔' },
              { id: 'security', label: 'Security', icon: '🔐' },
              { id: 'billing', label: 'Billing', icon: '💳' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: 'none', background: tab === item.id ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent', color: tab === item.id ? 'white' : '#6b7280', fontWeight: '500', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div style={{ background: 'white', border: '2px solid #e5e7eb', borderRadius: '1rem', padding: '2rem' }}>
            {tab === 'profile' && (
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0a0a0b', marginBottom: '1.5rem' }}>Profile Settings</h2>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontWeight: '600', color: '#0a0a0b', marginBottom: '0.5rem' }}>Name</label>
                  <input type="text" defaultValue="John Doe" style={{ width: '100%', padding: '0.75rem 1.25rem', borderRadius: '0.75rem', border: '2px solid #e5e7eb', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontWeight: '600', color: '#0a0a0b', marginBottom: '0.5rem' }}>Email</label>
                  <input type="email" defaultValue="john@example.com" style={{ width: '100%', padding: '0.75rem 1.25rem', borderRadius: '0.75rem', border: '2px solid #e5e7eb', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <button style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px', border: 'none', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', fontWeight: '600', cursor: 'pointer' }}>
                  Save Changes
                </button>
              </div>
            )}

            {tab === 'notifications' && (
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0a0a0b', marginBottom: '1.5rem' }}>Notification Settings</h2>
                {['Email notifications', 'Task updates', 'Payment notifications'].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#faf9f6', borderRadius: '0.75rem', marginBottom: '0.75rem' }}>
                    <span style={{ color: '#0a0a0b' }}>{item}</span>
                    <label style={{ position: 'relative', display: 'inline-block', width: '3rem', height: '1.5rem' }}>
                      <input type="checkbox" defaultChecked style={{ opacity: '0', width: '0', height: '0' }} />
                      <span style={{ position: 'absolute', cursor: 'pointer', top: '0', left: '0', right: '0', bottom: '0', background: '#667eea', borderRadius: '9999px', transition: '.4s' }}></span>
                    </label>
                  </div>
                ))}
              </div>
            )}

            {tab === 'security' && (
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0a0a0b', marginBottom: '1.5rem' }}>Security Settings</h2>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontWeight: '600', color: '#0a0a0b', marginBottom: '0.5rem' }}>Current Password</label>
                  <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '0.75rem 1.25rem', borderRadius: '0.75rem', border: '2px solid #e5e7eb', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontWeight: '600', color: '#0a0a0b', marginBottom: '0.5rem' }}>New Password</label>
                  <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '0.75rem 1.25rem', borderRadius: '0.75rem', border: '2px solid #e5e7eb', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <button style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px', border: 'none', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', fontWeight: '600', cursor: 'pointer' }}>
                  Update Password
                </button>
              </div>
            )}

            {tab === 'billing' && (
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0a0a0b', marginBottom: '1.5rem' }}>Billing Settings</h2>
                <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '2px solid rgba(16, 185, 129, 0.3)', borderRadius: '1rem', padding: '1.5rem' }}>
                  <p style={{ fontSize: '0.875rem', color: '#10b981' }}>Current Plan</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0a0a0b', marginTop: '0.25rem' }}>Pro Plan</p>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>$29/month</p>
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0b 0%, #1a1a1f 50%, #0a0a0b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>
            {isLogin ? 'Welcome back' : 'Create account'}
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            {isLogin ? 'Sign in to your Skillhub account' : 'Start your journey with Skillhub'}
          </p>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '2px solid rgba(255, 255, 255, 0.1)', borderRadius: '1.5rem', padding: '2rem', backdropFilter: 'blur(10px)' }}>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.5rem' }}>Name</label>
                <input type="text" placeholder="John Doe" style={{ width: '100%', padding: '0.75rem 1.25rem', borderRadius: '1rem', border: '2px solid rgba(255, 255, 255, 0.2)', background: 'rgba(255, 255, 255, 0.05)', color: 'white', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            )}

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.5rem' }}>Email</label>
              <input type="email" placeholder="you@example.com" required style={{ width: '100%', padding: '0.75rem 1.25rem', borderRadius: '1rem', border: '2px solid rgba(255, 255, 255, 0.2)', background: 'rgba(255, 255, 255, 0.05)', color: 'white', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.5rem' }}>Password</label>
              <input type="password" placeholder="••••••••" required style={{ width: '100%', padding: '0.75rem 1.25rem', borderRadius: '1rem', border: '2px solid rgba(255, 255, 255, 0.2)', background: 'rgba(255, 255, 255, 0.05)', color: 'white', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <button type="submit" style={{ width: '100%', padding: '0.75rem', borderRadius: '9999px', border: 'none', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', marginBottom: '1.5rem' }}>
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button onClick={() => setIsLogin(!isLogin)} style={{ marginLeft: '0.5rem', fontWeight: '600', color: '#667eea', border: 'none', background: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0b 0%, #1a1a1f 50%, #0a0a0b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '500px' }}>
        <div style={{ fontSize: '9rem', fontWeight: '900', color: 'rgba(255, 255, 255, 0.1)', marginBottom: '1.5rem' }}>404</div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>Page Not Found</h1>
        <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '2rem' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={{ textDecoration: 'none', padding: '0.75rem 1.5rem', borderRadius: '9999px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', fontWeight: '600' }}>
            Go Home
          </Link>
          <button onClick={() => window.history.back()} style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px', border: '2px solid rgba(255, 255, 255, 0.2)', background: 'rgba(255, 255, 255, 0.05)', color: 'white', fontWeight: '600', cursor: 'pointer' }}>
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
    <HashRouter>
      <div style={{ minHeight: '100vh' }}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/find-work" element={<FindWorkPage />} />
          <Route path="/hire-talent" element={<HireTalentPage />} />
          <Route path="/post-work" element={<PostWorkPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
