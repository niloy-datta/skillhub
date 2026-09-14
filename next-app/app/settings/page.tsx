'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [tab, setTab] = useState('profile');

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
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
                      <input type="checkbox" defaultChecked className="opacity-0 w-0 h-0 peer" />
                      <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-indigo-500 rounded-full transition-all peer-checked:bg-indigo-600"></span>
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
    </main>
  );
}
