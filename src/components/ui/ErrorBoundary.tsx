import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-screen items-center justify-center bg-midnight p-4">
          <div className="max-w-md rounded-3xl border-2 border-rose/30 bg-rose/5 p-8 text-center">
            <div className="mb-4 text-6xl">⚠️</div>
            <h2 className="mb-2 font-display text-2xl font-bold text-white">
              Something went wrong
            </h2>
            <p className="mb-6 text-white/70">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="rounded-full bg-gradient-to-r from-indigo to-violet px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
