import { useState } from 'react';
import { Button, Input, Card } from '../ui';

interface RegisterPageProps {
  onNavigate: (view: any) => void;
}

export function RegisterPage({ onNavigate }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'individual',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setLoading(false);
      onNavigate('home');
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-midnight via-charcoal to-midnight p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo to-violet text-3xl">
            🚀
          </div>
          <h1 className="mb-2 font-display text-4xl font-bold text-white">Create account</h1>
          <p className="text-white/60">Start your outcome journey with Skillhub</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-2xl border-2 border-rose/30 bg-rose/5 p-4 text-center text-rose">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, accountType: 'individual' })}
                className={`rounded-2xl border-2 p-4 text-left transition-all ${
                  formData.accountType === 'individual'
                    ? 'border-indigo bg-indigo/5'
                    : 'border-white/20 bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="mb-2 text-2xl">👤</div>
                <p className="font-semibold text-white">Individual</p>
                <p className="text-xs text-white/60">Hire for personal projects</p>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, accountType: 'business' })}
                className={`rounded-2xl border-2 p-4 text-left transition-all ${
                  formData.accountType === 'business'
                    ? 'border-indigo bg-indigo/5'
                    : 'border-white/20 bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="mb-2 text-2xl">🏢</div>
                <p className="font-semibold text-white">Business</p>
                <p className="text-xs text-white/60">Hire for your company</p>
              </button>
            </div>

            <Input
              type="text"
              label="Full Name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <Input
              type="email"
              label="Email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              type="password"
              label="Password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <Input
              type="password"
              label="Confirm Password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />

            <label className="flex items-start gap-2 text-sm text-white/60">
              <input type="checkbox" className="mt-1 rounded" required />
              <span>
                I agree to the{' '}
                <button type="button" className="text-indigo hover:underline">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button type="button" className="text-indigo hover:underline">
                  Privacy Policy
                </button>
              </span>
            </label>

            <Button type="submit" loading={loading} className="w-full">
              Create Account
            </Button>

            <p className="text-center text-sm text-white/60">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => onNavigate('login')}
                className="font-semibold text-indigo hover:underline"
              >
                Sign in
              </button>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}
