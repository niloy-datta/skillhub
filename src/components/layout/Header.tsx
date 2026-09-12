import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../../constants';

export function Header() {
  const location = useLocation();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-midnight/10 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          <span className="font-display text-xl font-bold text-midnight">Skillhub</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? 'bg-indigo text-white'
                  : 'text-midnight/70 hover:bg-mist'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/auth"
            className="rounded-full border-2 border-midnight/20 px-4 py-2 text-sm font-semibold text-midnight transition-all hover:bg-mist"
          >
            Sign In
          </Link>
          <Link
            to="/post-work"
            className="rounded-full bg-gradient-to-r from-indigo to-violet px-4 py-2 text-sm font-semibold text-white transition-all hover:scale-105"
          >
            Post Work
          </Link>
        </div>
      </div>
    </header>
  );
}
