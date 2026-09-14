import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="text-9xl font-black text-white/10 mb-6">404</div>
        <h1 className="text-4xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-lg text-white/60 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/" className="no-underline px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold">
            Go Home
          </Link>
          <button onClick={() => window.history.back()} className="px-6 py-3 rounded-full border-2 border-white/20 bg-white/5 text-white font-semibold">
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
}
