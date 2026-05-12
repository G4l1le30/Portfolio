import React from 'react';

interface StatusChipProps {
  label: string;
  variant?: 'success' | 'error' | 'info' | 'warning';
}

const StatusChip: React.FC<StatusChipProps> = ({ label, variant = 'info' }) => {
  const styles = {
    success: "border-secondary text-secondary bg-secondary/5",
    error: "border-tertiary text-tertiary bg-tertiary/5",
    info: "border-primary text-primary bg-primary/5",
    warning: "border-yellow-500 text-yellow-500 bg-yellow-500/5",
  };

  return (
    <div className={`inline-flex items-center px-2 py-0.5 border text-[10px] font-mono font-bold tracking-widest uppercase ${styles[variant]}`}>
      <span className="w-1 h-1 rounded-full bg-current mr-1.5 animate-pulse" />
      {label}
    </div>
  );
};

export default StatusChip;
