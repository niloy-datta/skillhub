interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-3xl border-2 border-white/10 bg-white/5 p-6 backdrop-blur-sm ${
        hover ? 'cursor-pointer transition-all hover:border-indigo/50 hover:bg-white/10 hover:scale-[1.02]' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
