import React, { useState } from 'react';
import { Crown, ExternalLink, X, Shield } from 'lucide-react';

interface BannerAdProps {
  onUpgradeVip: () => void;
  isVip: boolean;
}

export const BannerAd: React.FC<BannerAdProps> = ({ onUpgradeVip, isVip }) => {
  const [closed, setClosed] = useState(false);

  if (isVip || closed) return null;

  return (
    <div
      id="admob-banner-container"
      className="w-full bg-slate-900/95 border-t border-slate-800 p-2.5 flex items-center justify-between shadow-lg relative z-20"
    >
      <div className="flex items-center gap-3 overflow-hidden">
        {/* Ad Tag & Icon */}
        <div className="flex-shrink-0 relative">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 font-black text-sm shadow">
            🔥
          </div>
          <span className="absolute -bottom-1 -right-1 px-1 rounded bg-slate-950 text-[8px] font-bold text-amber-400 border border-slate-700">
            Ad
          </span>
        </div>

        {/* Ad Text */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-200 truncate">
              NordicCloud 10Gbps Hosting
            </span>
            <span className="text-[10px] text-amber-400 font-mono font-semibold">80% OFF</span>
          </div>
          <p className="text-[11px] text-slate-400 truncate">
            Deploy ultra-fast NVMe servers in 30 seconds. Try 30-day free trial.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
        <button
          id="banner-ad-cta-button"
          onClick={() => alert('Opening NordicCloud promotional offer...')}
          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold flex items-center gap-1 transition-colors"
        >
          <span>Claim</span>
          <ExternalLink className="w-3 h-3" />
        </button>

        <button
          id="banner-remove-ads-button"
          onClick={onUpgradeVip}
          className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center gap-1 transition-colors"
          title="Remove Ads with VIP"
        >
          <Crown className="w-3 h-3" />
          <span className="hidden sm:inline">No Ads</span>
        </button>

        <button
          onClick={() => setClosed(true)}
          className="p-1 text-slate-500 hover:text-slate-300"
          title="Close Banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
