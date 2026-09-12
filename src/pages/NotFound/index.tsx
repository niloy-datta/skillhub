import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-midnight via-charcoal to-midnight p-4">
      <div className="max-w-md text-center">
        <div className="mb-6 font-display text-9xl font-black text-white/10">404</div>
        <h1 className="mb-4 font-display text-4xl font-bold text-white">Page Not Found</h1>
        <p className="mb-8 text-lg text-white/60">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="rounded-full bg-gradient-to-r from-indigo to-violet px-6 py-3 font-semibold text-white transition-all hover:scale-105"
          >
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="rounded-full border-2 border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
