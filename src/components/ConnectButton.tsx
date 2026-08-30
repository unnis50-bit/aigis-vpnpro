import React from 'react';
import { Power, ShieldCheck, ShieldAlert, Loader2, Sparkles } from 'lucide-react';
import { ConnectionState } from '../types';

interface ConnectButtonProps {
  connectionState: ConnectionState;
  onToggleConnect: () => void;
  isVip: boolean;
  connectedDuration: string;
  serverCity: string;
  serverCountry: string;
}

export const ConnectButton: React.FC<ConnectButtonProps> = ({
  connectionState,
  onToggleConnect,
  isVip,
  connectedDuration,
  serverCity,
  serverCountry,
}) => {
  const isConnected = connectionState === 'connected';
  const isConnecting = connectionState === 'connecting';
  const isDisconnecting = connectionState === 'disconnecting';

  return (
    <div id="connect-button-wrapper" className="flex flex-col items-center justify-center my-2 sm:my-4">
      {/* Outer Pulse Rings */}
      <div className="relative flex items-center justify-center">
        {/* Ring 3 (Outer ambient) */}
        <div
          className={`absolute w-48 h-48 sm:w-60 sm:h-60 rounded-full transition-all duration-1000 ${
            isConnected
              ? 'bg-cyan-500/10 scale-100 animate-pulse'
              : isConnecting
              ? 'bg-amber-500/10 scale-105 animate-pulse'
              : 'bg-slate-800/20 scale-95'
          }`}
        />

        {/* Ring 2 (Middle glowing wave) */}
        <div
          className={`absolute w-40 h-40 sm:w-52 sm:h-52 rounded-full border transition-all duration-700 ${
            isConnected
              ? 'border-cyan-500/30 bg-cyan-950/20 shadow-[0_0_50px_rgba(6,182,212,0.25)]'
              : isConnecting
              ? 'border-amber-500/30 bg-amber-950/20 shadow-[0_0_40px_rgba(245,158,11,0.2)]'
              : 'border-slate-800/80 bg-slate-900/30'
          }`}
        />

        {/* Ring 1 (Radar rotation animation when connecting) */}
        {isConnecting && (
          <div className="absolute w-36 h-36 sm:w-48 sm:h-48 rounded-full border border-dashed border-amber-400/60 animate-spin transition-all" />
        )}

        {/* Button Core */}
        <button
          id="vpn-main-power-button"
          onClick={onToggleConnect}
          disabled={isConnecting || isDisconnecting}
          className={`relative z-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full flex flex-col items-center justify-center transition-all duration-500 transform active:scale-95 cursor-pointer select-none focus:outline-none focus:ring-4 ${
            isConnected
              ? 'bg-gradient-to-b from-cyan-950 via-slate-900 to-slate-950 border-2 border-cyan-400 shadow-[0_0_35px_rgba(6,182,212,0.4)] focus:ring-cyan-500/40'
              : isConnecting
              ? 'bg-gradient-to-b from-amber-950 via-slate-900 to-slate-950 border-2 border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.3)] focus:ring-amber-500/40'
              : isDisconnecting
              ? 'bg-slate-900 border-2 border-slate-700 opacity-80'
              : 'bg-gradient-to-b from-slate-850 via-slate-900 to-slate-950 border-2 border-slate-700/80 hover:border-cyan-500/60 shadow-xl hover:shadow-cyan-500/10 focus:ring-cyan-500/20'
          }`}
        >
          {/* Inner Light Reflection */}
          <div className="absolute inset-2 rounded-full border border-white/5 pointer-events-none" />

          {/* Central Power Icon & Status */}
          <div className="flex flex-col items-center justify-center">
            {isConnecting ? (
              <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-amber-400 animate-spin drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
            ) : isDisconnecting ? (
              <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400 animate-spin" />
            ) : isConnected ? (
              <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.8)] transition-transform duration-300 transform group-hover:scale-110" />
            ) : (
              <Power className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400 hover:text-cyan-300 transition-colors duration-300 drop-shadow" />
            )}

            <span
              className={`mt-1 font-black tracking-widest text-[10px] sm:text-xs uppercase ${
                isConnected
                  ? 'text-cyan-300'
                  : isConnecting
                  ? 'text-amber-300'
                  : isDisconnecting
                  ? 'text-slate-400'
                  : 'text-slate-300'
              }`}
            >
              {isConnected
                ? 'PROTECTED'
                : isConnecting
                ? 'CONNECTING'
                : isDisconnecting
                ? 'CLOSING'
                : 'TAP TO CONNECT'}
            </span>

            {isConnected && (
              <span className="text-[9px] sm:text-[10px] font-mono font-semibold text-cyan-400/90 tracking-wider">
                {connectedDuration}
              </span>
            )}
          </div>
        </button>
      </div>

      {/* Connection State Subtitle & Security Notice */}
      <div className="mt-2.5 sm:mt-4 text-center">
        {isConnected ? (
          <div className="flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>AES-256 Tunnel Active to {serverCity}</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Your real IP & DNS are fully cloaked. Military encryption active.
            </p>
          </div>
        ) : isConnecting ? (
          <div className="flex items-center gap-2 text-amber-400 text-xs font-medium animate-pulse">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Establishing TLS 1.3 Quantum Tunnel to {serverCountry}...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500/80" />
              <span>Unprotected Connection • ISP Can Monitor</span>
            </div>
            {!isVip && (
              <div className="flex items-center gap-1 text-[10px] text-slate-500">
                <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                <span>Free tier: Fast 5-sec sponsor ad before connect</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
