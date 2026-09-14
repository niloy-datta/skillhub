import { ReactNode } from 'react';

interface ModernCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

export function ModernCard({ children, className = '', hover = true, gradient = false }: ModernCardProps) {
  return (
    <div
      className={`
        relative rounded-2xl overflow-hidden
        ${gradient ? 'bg-gradient-to-br from-indigo-500 to-purple-600' : 'bg-white'}
        ${hover ? 'card-hover' : ''}
        ${className}
      `}
    >
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-90" />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

interface LoadingSkeletonProps {
  count?: number;
  type?: 'card' | 'list' | 'profile';
}

export function LoadingSkeleton({ count = 3, type = 'card' }: LoadingSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          {type === 'card' && (
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-xl" />
                <div className="flex-1">
                  <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded-lg w-1/2" />
                </div>
              </div>
              <div className="h-4 bg-gray-200 rounded-lg w-full mb-2" />
              <div className="h-4 bg-gray-200 rounded-lg w-2/3" />
              <div className="flex gap-2 mt-4">
                <div className="h-8 bg-gray-200 rounded-lg w-20" />
                <div className="h-8 bg-gray-200 rounded-lg w-20" />
                <div className="h-8 bg-gray-200 rounded-lg w-20" />
              </div>
            </div>
          )}
          {type === 'list' && (
            <div className="bg-white rounded-xl p-4 border border-gray-200 flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full" />
              <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded-lg w-1/2 mb-2" />
                <div className="h-4 bg-gray-200 rounded-lg w-1/3" />
              </div>
              <div className="h-8 bg-gray-200 rounded-lg w-20" />
            </div>
          )}
          {type === 'profile' && (
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full" />
                <div className="flex-1">
                  <div className="h-8 bg-gray-200 rounded-lg w-1/2 mb-2" />
                  <div className="h-5 bg-gray-200 rounded-lg w-1/3 mb-2" />
                  <div className="h-4 bg-gray-200 rounded-lg w-1/4" />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-20 bg-gray-200 rounded-xl" />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  onClose?: () => void;
}

export function Toast({ message, type = 'info', onClose }: ToastProps) {
  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
  };

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 animate-slideIn`}>
      <div className={`${colors[type]} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[300px]`}>
        <span className="text-2xl font-bold">{icons[type]}</span>
        <span className="flex-1 font-semibold">{message}</span>
        {onClose && (
          <button onClick={onClose} className="text-white/80 hover:text-white text-xl">
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center text-2xl transition-all"
          >
            ✕
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
