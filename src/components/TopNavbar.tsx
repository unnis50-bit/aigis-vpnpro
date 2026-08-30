import React from 'react';
import { Crown, Sparkles, Smartphone, Monitor, Play, Settings, Gift } from 'lucide-react';
import { AegisLogo } from './AegisLogo';

interface TopNavbarProps {
  isVip: boolean;
  onOpenVipModal: () => void;
  onOpenServerModal: () => void;
  onOpenSecurityModal: () => void;
  onOpenPlayStoreModal: () => void;
  onOpenRewardedAdModal: () => void;
  isPhoneFrame: boolean;
  onTogglePhoneFrame: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  isVip,
  onOpenVipModal,
  onOpenServerModal,
  onOpenSecurityModal,
  onOpenPlayStoreModal,
  onOpenRewardedAdModal,
  isPhoneFrame,
  onTogglePhoneFrame,
}) => {
  return (
    <header
      id="top-navbar-header"
      className="w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-3 py-2 sm:px-4 sm:py-2.5 flex items-center justify-between z-30 flex-shrink-0"
    >
      {/* Brand Logo */}
      <div className="flex items-center gap-2 cursor-pointer min-w-0" onClick={onOpenVipModal}>
        <AegisLogo size="sm" showText={true} isVip={isVip} />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
        {/* Play Store Dev Kit Button (Desktop/Tablet) */}
        <button
          id="playstore-kit-nav-btn"
          onClick={onOpenPlayStoreModal}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition-colors"
          title="Google Play Store Developer & Upload Kit"
        >
          <Play className="w-3.5 h-3.5 fill-emerald-300" />
          <span>Play Store Kit</span>
        </button>

        {/* Rewarded Ad Free Boost Button */}
        {!isVip && (
          <button
            id="rewarded-ad-nav-btn"
            onClick={onOpenRewardedAdModal}
            className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 text-xs font-bold transition-all"
            title="Watch 1 Ad for +2 Hours VIP"
          >
            <Gift className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">Boost</span>
          </button>
        )}

        {/* Security Settings Trigger */}
        <button
          id="security-settings-nav-btn"
          onClick={onOpenSecurityModal}
          className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          title="Security Protocols & Tools"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* VIP Upgrade Pill */}
        <button
          id="vip-badge-nav-btn"
          onClick={onOpenVipModal}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl font-bold text-xs transition-all shadow-md active:scale-95 ${
            isVip
              ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-amber-500/20'
              : 'bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 shadow-amber-500/10'
          }`}
        >
          <Crown className={`w-3.5 h-3.5 ${isVip ? 'fill-slate-950' : 'fill-amber-400/30'}`} />
          <span>{isVip ? 'VIP' : 'GET VIP'}</span>
        </button>
      </div>
    </header>
  );
};
