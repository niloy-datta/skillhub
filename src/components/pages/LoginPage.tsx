import { useState } from 'react';
import { Button, Input, Card } from '../ui';

interface LoginPageProps {
  onNavigate: (view: any) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Mock authentication
    setTimeout(() => {
      if (email && password) {
        setLoading(false);
        onNavigate('home');
      } else {
        setLoading(false);
        setError('Please enter valid credentials');
      }
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-midnight via-charcoal to-midnight p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo to-violet text-3xl">
            🎯
          </div>
          <h1 className="mb-2 font-display text-4xl font-bold text-white">Welcome back</h1>
          <p className="text-white/60">Sign in to your Skillhub account</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-2xl border-2 border-rose/30 bg-rose/5 p-4 text-center text-rose">
                {error}
              </div>
            )}

            <Input
              type="email"
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="password"
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-white/60">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>
              <button
                type="button"
                onClick={() => onNavigate('forgot-password')}
                className="text-sm text-indigo hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button type="submit" loading={loading} className="w-full">
              Sign In
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-midnight px-2 text-white/60">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button className="rounded-2xl border-2 border-white/20 bg-white/5 p-3 text-white transition-all hover:bg-white/10">
                Google
              </button>
              <button className="rounded-2xl border-2 border-white/20 bg-white/5 p-3 text-white transition-all hover:bg-white/10">
                GitHub
              </button>
              <button className="rounded-2xl border-2 border-white/20 bg-white/5 p-3 text-white transition-all hover:bg-white/10">
                LinkedIn
              </button>
            </div>

            <p className="text-center text-sm text-white/60">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => onNavigate('register')}
                className="font-semibold text-indigo hover:underline"
              >
                Sign up
              </button>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}
