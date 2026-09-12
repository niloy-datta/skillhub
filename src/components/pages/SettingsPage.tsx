import { useState } from 'react';
import { Button, Input, Card } from '../ui';

interface SettingsPageProps {
  onNavigate: (view: any) => void;
}

export function SettingsPage({ onNavigate }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'security', label: 'Security', icon: '🔐' },
    { id: 'billing', label: 'Billing', icon: '💳' },
    { id: 'privacy', label: 'Privacy', icon: '🛡️' },
  ];

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Settings saved!');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight via-charcoal to-midnight pt-32 pb-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-8">
          <h1 className="mb-2 font-display text-4xl font-bold text-white">Settings</h1>
          <p className="text-white/60">Manage your account settings and preferences</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
          {/* Sidebar */}
          <Card className="p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo to-violet text-white'
                      : 'text-white/70 hover:bg-white/10'
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </Card>

          {/* Content */}
          <Card className="p-8">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-bold text-white">Profile Settings</h2>
                
                <div className="flex items-center gap-6">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-indigo to-violet text-4xl">
                    👤
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Change Avatar</Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Input label="First Name" defaultValue="John" />
                  <Input label="Last Name" defaultValue="Doe" />
                </div>

                <Input label="Email" type="email" defaultValue="john@example.com" />
                <Input label="Phone" type="tel" defaultValue="+1 (555) 000-0000" />
                <Input label="Bio" defaultValue="Full-stack developer passionate about outcomes" />
                <Input label="Location" defaultValue="San Francisco, CA" />

                <Button onClick={handleSave} loading={loading}>
                  Save Changes
                </Button>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-bold text-white">Notification Settings</h2>
                
                <div className="space-y-4">
                  {[
                    { label: 'Email notifications', desc: 'Receive email updates about your missions' },
                    { label: 'Push notifications', desc: 'Receive push notifications on your device' },
                    { label: 'Mission updates', desc: 'Get updates about mission status' },
                    { label: 'New crew members', desc: 'Notify when crew members are assigned' },
                    { label: 'Payment updates', desc: 'Get notified about payment status' },
                    { label: 'Marketing emails', desc: 'Receive promotional emails' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div>
                        <p className="font-semibold text-white">{item.label}</p>
                        <p className="text-sm text-white/60">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" defaultChecked className="peer sr-only" />
                        <div className="peer h-6 w-11 rounded-full bg-white/10 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo peer-checked:after:translate-x-full"></div>
                      </label>
                    </div>
                  ))}
                </div>

                <Button onClick={handleSave} loading={loading}>
                  Save Preferences
                </Button>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-bold text-white">Security Settings</h2>
                
                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <h3 className="mb-2 font-semibold text-white">Change Password</h3>
                    <div className="space-y-4">
                      <Input label="Current Password" type="password" placeholder="••••••••" />
                      <Input label="New Password" type="password" placeholder="••••••••" />
                      <Input label="Confirm New Password" type="password" placeholder="••••••••" />
                      <Button>Update Password</Button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <h3 className="mb-2 font-semibold text-white">Two-Factor Authentication</h3>
                    <p className="mb-4 text-sm text-white/60">
                      Add an extra layer of security to your account
                    </p>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <h3 className="mb-2 font-semibold text-white">Active Sessions</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                        <div>
                          <p className="font-semibold text-white">Chrome on MacOS</p>
                          <p className="text-xs text-white/60">San Francisco, CA · Active now</p>
                        </div>
                        <span className="rounded-full bg-emerald/10 px-3 py-1 text-xs font-semibold text-emerald">
                          Current
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                        <div>
                          <p className="font-semibold text-white">Safari on iOS</p>
                          <p className="text-xs text-white/60">San Francisco, CA · 2 hours ago</p>
                        </div>
                        <Button variant="ghost" size="sm">Revoke</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-bold text-white">Billing Settings</h2>
                
                <div className="rounded-2xl border border-emerald/30 bg-emerald/5 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="font-mono text-sm text-emerald">Current Plan</p>
                      <p className="font-display text-2xl font-bold text-white">Pro Plan</p>
                    </div>
                    <Button variant="outline">Change Plan</Button>
                  </div>
                  <p className="text-sm text-white/60">$29/month · Renews on Jan 15, 2025</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="mb-4 font-semibold text-white">Payment Method</h3>
                  <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">💳</div>
                      <div>
                        <p className="font-semibold text-white">•••• •••• •••• 4242</p>
                        <p className="text-xs text-white/60">Expires 12/26</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                  <Button variant="outline" className="mt-4">Add Payment Method</Button>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="mb-4 font-semibold text-white">Billing History</h3>
                  <div className="space-y-3">
                    {[
                      { date: 'Dec 15, 2024', amount: '$29.00', status: 'Paid' },
                      { date: 'Nov 15, 2024', amount: '$29.00', status: 'Paid' },
                      { date: 'Oct 15, 2024', amount: '$29.00', status: 'Paid' },
                    ].map((invoice, i) => (
                      <div key={i} className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                        <div>
                          <p className="font-semibold text-white">{invoice.date}</p>
                          <p className="text-xs text-white/60">{invoice.status}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-white">{invoice.amount}</p>
                          <button className="text-xs text-indigo hover:underline">Download</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-bold text-white">Privacy Settings</h2>
                
                <div className="space-y-4">
                  {[
                    { label: 'Profile visibility', desc: 'Make your profile visible to other users', checked: true },
                    { label: 'Show email', desc: 'Display your email on your profile', checked: false },
                    { label: 'Show phone', desc: 'Display your phone number on your profile', checked: false },
                    { label: 'Activity status', desc: 'Show when you are online', checked: true },
                    { label: 'Data collection', desc: 'Allow us to collect usage data', checked: true },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div>
                        <p className="font-semibold text-white">{item.label}</p>
                        <p className="text-sm text-white/60">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" defaultChecked={item.checked} className="peer sr-only" />
                        <div className="peer h-6 w-11 rounded-full bg-white/10 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo peer-checked:after:translate-x-full"></div>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-rose/30 bg-rose/5 p-6">
                  <h3 className="mb-2 font-semibold text-rose">Danger Zone</h3>
                  <p className="mb-4 text-sm text-white/60">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button variant="danger">Delete Account</Button>
                </div>

                <Button onClick={handleSave} loading={loading}>
                  Save Changes
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
