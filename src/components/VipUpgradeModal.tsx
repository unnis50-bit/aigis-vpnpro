import React, { useState } from 'react';
import { X, Crown, Check, ShieldCheck, Zap, Flame, Sparkles, Star, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface VipUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  isVip: boolean;
  onActivateVip: () => void;
  onDowngradeFree: () => void;
}

export const VipUpgradeModal: React.FC<VipUpgradeModalProps> = ({
  isOpen,
  onClose,
  isVip,
  onActivateVip,
  onDowngradeFree,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'1month' | '1year' | 'lifetime'>('1year');

  if (!isOpen) return null;

  const handlePurchase = () => {
    onActivateVip();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#06b6d4', '#3b82f6', '#10b981'],
    });
    onClose();
  };

  const perks = [
    { title: 'Zero Ads Forever', desc: 'No interstitial video ads or banners ever' },
    { title: '100+ Dedicated 10Gbps Servers', desc: 'Ultra-fast NVMe servers worldwide with zero throttling' },
    { title: '4K Ultra HD Streaming Mode', desc: 'Unblock Netflix US, Hulu, BBC iPlayer, Disney+ & Prime' },
    { title: 'Ultra Low-Ping Gaming Nodes', desc: 'Optimized routing for Valorant, PUBG, APEX & CS2' },
    { title: 'Double VPN & Onion-over-VPN', desc: 'Multi-hop cascading encryption across Swiss bunkers' },
    { title: 'Kill Switch & Split Tunneling', desc: 'Prevent IP leaks if WiFi disconnects unexpectedly' },
    { title: '10 Simultaneous Devices', desc: 'Protect your Android, iPhone, Windows, Mac & TV' },
  ];

  return (
    <div
      id="vip-upgrade-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn"
    >
      <div className="relative w-full max-w-lg max-h-[92vh] bg-slate-900 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-amber-500/20 flex flex-col">
        {/* Header Graphic */}
        <div className="relative p-6 bg-gradient-to-b from-amber-950/80 via-slate-900 to-slate-900 border-b border-amber-500/30 flex flex-col items-center text-center">
          <button
            id="close-vip-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/30 mb-3 transform hover:scale-105 transition-transform">
            <Crown className="w-9 h-9 text-slate-950 fill-slate-950" />
          </div>

          <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black tracking-widest uppercase mb-1">
            <Sparkles className="w-3 h-3" />
            <span>AEGIS VIP ULTRA PASS</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white">
            Unlock Full High-Speed Cyber Shield
          </h2>
          <p className="text-xs text-slate-300 max-w-sm mt-1">
            Unlimited speed, ad-free instant connection, 10Gbps dedicated nodes and military protection.
          </p>
        </div>

        {/* Content & Plans */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Plan Selector Grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {/* 1 Month */}
            <div
              id="plan-1month"
              onClick={() => setSelectedPlan('1month')}
              className={`p-3 rounded-2xl border cursor-pointer flex flex-col items-center text-center transition-all ${
                selectedPlan === '1month'
                  ? 'bg-amber-950/40 border-amber-400 shadow-md shadow-amber-500/20'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <span className="text-xs font-bold text-slate-300">1 Month</span>
              <div className="mt-2 text-base font-black text-white">₹199</div>
              <span className="text-[10px] text-slate-500">/ month</span>
            </div>

            {/* 12 Months (Best Deal) */}
            <div
              id="plan-1year"
              onClick={() => setSelectedPlan('1year')}
              className={`relative p-3 rounded-2xl border cursor-pointer flex flex-col items-center text-center transition-all ${
                selectedPlan === '1year'
                  ? 'bg-gradient-to-b from-amber-950/60 to-slate-900 border-amber-400 shadow-lg shadow-amber-500/30'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="absolute -top-2.5 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-[9px] uppercase tracking-wider shadow">
                70% OFF
              </div>
              <span className="text-xs font-bold text-amber-300 mt-1">12 Months</span>
              <div className="mt-1 text-base font-black text-white">₹79</div>
              <span className="text-[10px] text-amber-400/80 font-semibold">₹948 / yr</span>
            </div>

            {/* Lifetime VIP */}
            <div
              id="plan-lifetime"
              onClick={() => setSelectedPlan('lifetime')}
              className={`p-3 rounded-2xl border cursor-pointer flex flex-col items-center text-center transition-all ${
                selectedPlan === 'lifetime'
                  ? 'bg-amber-950/40 border-amber-400 shadow-md shadow-amber-500/20'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <span className="text-xs font-bold text-slate-300">Lifetime</span>
              <div className="mt-2 text-base font-black text-white">₹1,499</div>
              <span className="text-[10px] text-emerald-400 font-semibold">Pay Once</span>
            </div>
          </div>

          {/* Perks list */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>What You Get With Aegis VIP Ultra</span>
            </h4>
            <div className="space-y-2.5">
              {perks.map((perk, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-100">{perk.title}</div>
                    <div className="text-[11px] text-slate-400 leading-tight">{perk.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button (Google Play In-App Billing style) */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col gap-2">
          {isVip ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <Check className="w-4 h-4" />
                <span>VIP Ultra Plan is Active on this Device</span>
              </div>
              <button
                onClick={() => {
                  onDowngradeFree();
                  onClose();
                }}
                className="text-xs text-slate-400 hover:text-slate-200 underline"
              >
                Switch to Free Tier
              </button>
            </div>
          ) : (
            <>
              <button
                id="google-play-subscribe-btn"
                onClick={handlePurchase}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transform active:scale-98 transition-transform cursor-pointer"
              >
                <Crown className="w-4 h-4 text-slate-950 fill-slate-950" />
                <span>START VIP ULTRA ({selectedPlan === '1month' ? '₹199/mo' : selectedPlan === '1year' ? '₹79/mo' : '₹1,499 Lifetime'})</span>
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500 mt-1">
                <span>Google Play In-App Billing Protected</span>
                <span>•</span>
                <span>Cancel Anytime</span>
                <span>•</span>
                <button
                  onClick={() => {
                    onActivateVip();
                    onClose();
                  }}
                  className="text-amber-400 hover:underline"
                >
                  Restore Purchases
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
