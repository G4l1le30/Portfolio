import React from 'react';

interface StatusChipProps {
  label: string;
  variant?: 'success' | 'error' | 'info' | 'warning';
}

const StatusChip: React.FC<StatusChipProps> = ({ label, variant = 'info' }) => {
  const styles = {
    success: "border-primary/40 text-primary bg-primary/5",
    error: "border-outline/40 text-outline bg-outline/5",
    info: "border-on-surface-variant/40 text-on-surface-variant bg-on-surface-variant/5",
    warning: "border-secondary/40 text-secondary bg-secondary/5",
  };

  return (
    <div className={`inline-flex items-center px-2 py-0.5 border text-[10px] font-mono font-bold tracking-widest uppercase ${styles[variant]}`}>
      <span className="w-1 h-1 rounded-full bg-current mr-1.5 animate-pulse" />
      {label}
    </div>
  );
};

export default StatusChip;
