import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 text-sm font-medium text-white/80">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full rounded-2xl border-2 bg-white/5 px-5 py-3 text-white placeholder:text-white/40 outline-none transition-all focus:border-indigo focus:bg-white/10 ${
              icon ? 'pl-12' : ''
            } ${
              error
                ? 'border-rose focus:border-rose'
                : 'border-white/20'
            } ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-2 text-sm text-rose">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
