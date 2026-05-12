import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'alert';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-mono font-bold transition-all duration-200 overflow-hidden group";
  
  const variants = {
    primary: "bg-primary text-background hover:bg-primary/90",
    secondary: "bg-transparent border border-primary text-primary hover:bg-primary/10",
    ghost: "bg-transparent text-outline hover:text-primary hover:bg-primary/5",
    alert: "bg-tertiary text-background hover:bg-tertiary/90",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-[10px]",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  // Scanning animation bar
  const ScanEffect = () => (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-white/20 skew-x-[-25deg] group-hover:animate-scan" />
    </div>
  );

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <ScanEffect />
      {icon && <span className="material-symbols-outlined mr-2 text-[1.2em]">{icon}</span>}
      <span className="relative z-10 uppercase tracking-wider">{children}</span>
    </button>
  );
};

export default Button;
