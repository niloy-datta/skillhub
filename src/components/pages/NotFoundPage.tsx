import { Button } from '../ui';

interface NotFoundPageProps {
  onNavigate: (view: any) => void;
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-midnight via-charcoal to-midnight p-4">
      <div className="max-w-md text-center">
        <div className="mb-6 font-display text-9xl font-black text-white/10">
          404
        </div>
        <h1 className="mb-4 font-display text-4xl font-bold text-white">
          Page Not Found
        </h1>
        <p className="mb-8 text-lg text-white/60">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={() => onNavigate('home')}>
            Go Home
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
