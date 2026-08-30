import React from 'react';
import { Shield, Zap } from 'lucide-react';

interface AegisLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  isVip?: boolean;
  className?: string;
}

export const AegisLogo: React.FC<AegisLogoProps> = ({
  size = 'md',
  showText = true,
  isVip = false,
  className = '',
}) => {
  const iconSizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  }[size];

  const textSizeClasses = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  }[size];

  return (
    <div id="aegis-logo-container" className={`flex items-center gap-3 ${className}`}>
      {/* Glowing Shield Icon */}
      <div className={`relative ${iconSizeClasses} flex items-center justify-center`}>
        {/* Background Glow */}
        <div
          className={`absolute inset-0 rounded-2xl blur-md transition-all duration-500 ${
            isVip
              ? 'bg-amber-500/40 animate-pulse'
              : 'bg-cyan-500/30'
          }`}
        />

        {/* Shield Vector Frame */}
        <div
          className={`relative w-full h-full rounded-2xl flex items-center justify-center border shadow-lg transition-all duration-300 ${
            isVip
              ? 'bg-gradient-to-br from-amber-950/80 via-slate-900 to-amber-900/60 border-amber-400/50 shadow-amber-500/20'
              : 'bg-gradient-to-br from-cyan-950/80 via-slate-900 to-slate-950 border-cyan-500/40 shadow-cyan-500/20'
          }`}
        >
          <svg
            className="w-3/4 h-3/4 absolute text-slate-800/40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>

          {/* Foreground Shield & Lightning */}
          <div className="relative flex items-center justify-center">
            <Shield
              className={`w-3/5 h-3/5 transition-colors duration-300 ${
                isVip ? 'text-amber-400 fill-amber-400/20' : 'text-cyan-400 fill-cyan-400/20'
              }`}
            />
            <Zap
              className={`absolute w-2/5 h-2/5 transition-transform duration-300 ${
                isVip ? 'text-amber-300 animate-bounce' : 'text-cyan-300'
              }`}
            />
          </div>
        </div>

        {/* VIP Tiny Star Pin */}
        {isVip && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-400 text-[9px] font-black text-slate-950 shadow">
            ★
          </span>
        )}
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1">
            <span
              className={`font-black tracking-wider uppercase ${textSizeClasses} ${
                isVip
                  ? 'bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent'
              }`}
            >
              Aegis<span className={isVip ? 'text-amber-400' : 'text-cyan-400'}>VPN</span>
            </span>
            <span
              className={`px-1 py-0.2 rounded text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest ${
                isVip
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                  : 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
              }`}
            >
              {isVip ? 'VIP' : 'PRO'}
            </span>
          </div>
          <span className="text-[9px] sm:text-[10px] font-medium tracking-wide text-slate-400 truncate hidden xs:block">
            Military Quantum Shield
          </span>
        </div>
      )}
    </div>
  );
};
