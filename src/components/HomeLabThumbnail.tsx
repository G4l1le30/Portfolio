import React from 'react';

const HomeLabThumbnail: React.FC = () => (
  <div className="absolute inset-0 w-full h-full bg-background overflow-hidden flex flex-col items-center justify-center select-none font-mono">
    {/* Decorative Cyber Crosshairs (Muted) */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/5" />
      <div className="absolute top-0 left-1/2 w-[1px] h-full bg-primary/5" />
    </div>

    {/* Content */}
    <div className="relative z-10 flex flex-col items-center justify-center space-y-6 text-center">
      {/* Status Indicator */}
      <div className="flex items-center gap-2 bg-surface-container px-4 py-1.5 rounded border border-primary/20">
        <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
        <span className="text-xs font-bold text-primary tracking-widest uppercase">system_online</span>
      </div>

      {/* Headline */}
      <div className="relative">
        <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tighter leading-none italic uppercase relative">
          HOME LAB
        </h1>
      </div>
    </div>

    {/* Corner Accents */}
    <div className="absolute top-4 left-4 w-10 h-10 border-t border-l border-primary/20" />
    <div className="absolute top-4 right-4 w-10 h-10 border-t border-r border-primary/20" />
    <div className="absolute bottom-4 left-4 w-10 h-10 border-b border-l border-primary/20" />
    <div className="absolute bottom-4 right-4 w-10 h-10 border-b border-r border-primary/20" />
  </div>
);

export default HomeLabThumbnail;
