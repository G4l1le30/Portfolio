import React from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, subtitle, children, className = '', headerAction }) => {
  return (
    <div className={`bg-surface-container border border-outline-variant relative ${className}`}>
      {(title || headerAction) && (
        <div className="flex items-center justify-between border-b border-outline-variant bg-surface-bright/30 px-4 py-2">
          <div className="flex flex-col">
            {title && (
              <h3 className="font-mono text-xs font-bold text-primary flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary animate-pulse" />
                {title.toUpperCase()}
              </h3>
            )}
            {subtitle && <span className="text-[10px] text-outline font-mono mt-0.5">{subtitle}</span>}
          </div>
          {headerAction && <div className="flex items-center">{headerAction}</div>}
        </div>
      )}
      <div className="p-4 md:p-6">
        {children}
      </div>
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-primary/40" />
      <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-primary/40" />
      <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-primary/40" />
      <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-primary/40" />
    </div>
  );
};

export default Card;
