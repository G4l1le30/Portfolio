import React from 'react';

export interface Log {
  id: string | number;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DATA' | 'SUCCESS';
  message: string;
}

interface SystemLogsProps {
  logs: Log[];
  maxHeight?: string;
  className?: string;
}

const SystemLogs: React.FC<SystemLogsProps> = ({ logs, maxHeight = "300px", className = "" }) => {
  const getLevelColor = (level: Log['level']) => {
    switch (level) {
      case 'INFO': return 'text-outline';
      case 'SUCCESS': return 'text-secondary';
      case 'DATA': return 'text-primary';
      case 'WARN': return 'text-yellow-500';
      case 'ERROR': return 'text-tertiary';
      default: return 'text-on-surface';
    }
  };

  return (
    <div 
      className={`font-mono text-[11px] overflow-y-auto bg-surface-container-low/50 p-3 border border-outline-variant/30 ${className}`}
      style={{ maxHeight }}
    >
      <div className="space-y-1.5">
        {logs.map((log) => (
          <div key={log.id} className="flex gap-2 group hover:bg-white/5 transition-colors">
            <span className="text-outline/60 whitespace-nowrap">[{log.timestamp}]</span>
            <span className={`font-bold ${getLevelColor(log.level)} whitespace-nowrap w-[60px]`}>
              {log.level}:
            </span>
            <span className="text-on-surface-variant break-all">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemLogs;
