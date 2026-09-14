'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
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

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-white/60 hover:text-white underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
