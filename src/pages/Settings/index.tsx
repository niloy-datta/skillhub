import { useState } from 'react';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-screen bg-cream pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <div className="mb-8">
          <h1 className="mb-2 font-display text-4xl font-black text-midnight">Settings</h1>
          <p className="text-midnight/60">Manage your account settings</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
          {/* Sidebar */}
          <div className="rounded-2xl border-2 border-midnight/10 bg-white p-4">
            <nav className="space-y-2">
              {[
                { id: 'profile', label: 'Profile', icon: '👤' },
                { id: 'notifications', label: 'Notifications', icon: '🔔' },
                { id: 'security', label: 'Security', icon: '🔐' },
                { id: 'billing', label: 'Billing', icon: '💳' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ${
                    activeTab === tab.id ? 'bg-indigo text-white' : 'text-midnight/70 hover:bg-mist'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="rounded-2xl border-2 border-midnight/10 bg-white p-8">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-bold text-midnight">Profile Settings</h2>
                <div>
                  <label className="mb-2 block font-semibold text-midnight">Name</label>
                  <input type="text" defaultValue="John Doe" className="w-full rounded-xl border-2 border-midnight/20 bg-cream px-5 py-3 outline-none focus:border-indigo" />
                </div>
                <div>
                  <label className="mb-2 block font-semibold text-midnight">Email</label>
                  <input type="email" defaultValue="john@example.com" className="w-full rounded-xl border-2 border-midnight/20 bg-cream px-5 py-3 outline-none focus:border-indigo" />
                </div>
                <button className="rounded-full bg-gradient-to-r from-indigo to-violet px-6 py-3 font-semibold text-white">
                  Save Changes
                </button>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-bold text-midnight">Notification Settings</h2>
                <div className="space-y-4">
                  {['Email notifications', 'Task updates', 'Payment notifications'].map((item) => (
                    <div key={item} className="flex items-center justify-between rounded-xl border border-midnight/10 bg-cream p-4">
                      <span className="text-midnight">{item}</span>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" defaultChecked className="peer sr-only" />
                        <div className="peer h-6 w-11 rounded-full bg-midnight/20 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full peer-checked:bg-indigo"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-bold text-midnight">Security Settings</h2>
                <div>
                  <label className="mb-2 block font-semibold text-midnight">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full rounded-xl border-2 border-midnight/20 bg-cream px-5 py-3 outline-none focus:border-indigo" />
                </div>
                <div>
                  <label className="mb-2 block font-semibold text-midnight">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full rounded-xl border-2 border-midnight/20 bg-cream px-5 py-3 outline-none focus:border-indigo" />
                </div>
                <button className="rounded-full bg-gradient-to-r from-indigo to-violet px-6 py-3 font-semibold text-white">
                  Update Password
                </button>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-bold text-midnight">Billing Settings</h2>
                <div className="rounded-2xl border-2 border-emerald/30 bg-emerald/5 p-6">
                  <p className="text-sm text-emerald">Current Plan</p>
                  <p className="font-display text-2xl font-bold text-midnight">Pro Plan</p>
                  <p className="text-sm text-midnight/60">$29/month</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
