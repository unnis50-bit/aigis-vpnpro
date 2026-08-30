import React, { useState, useEffect } from 'react';
import { X, Gift, Zap, Award, Sparkles, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SIMULATED_ADS } from '../data/servers';

interface RewardedAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRewardGranted: () => void;
}

export const RewardedAdModal: React.FC<RewardedAdModalProps> = ({
  isOpen,
  onClose,
  onRewardGranted,
}) => {
  const [adIndex, setAdIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [completed, setCompleted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const ad = SIMULATED_ADS[adIndex % SIMULATED_ADS.length];

  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(5);
      setCompleted(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClaim = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#06b6d4', '#f59e0b', '#10b981'],
    });
    onRewardGranted();
    onClose();
  };

  return (
    <div
      id="rewarded-ad-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn"
    >
      <div className="relative w-full max-w-md bg-slate-900 border border-purple-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/20 flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-purple-500/20 border border-purple-400/40 text-purple-300 text-[10px] font-black">
              REWARDED VIDEO AD
            </span>
            <span className="text-[11px] text-slate-400">Unlock 2 Hours VIP</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-full bg-slate-800 text-slate-300 hover:text-white"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
            {completed ? (
              <button
                onClick={handleClaim}
                className="p-1 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <span className="text-xs font-mono text-amber-400 font-bold px-2 py-0.5 rounded bg-slate-800">
                {timeLeft}s
              </span>
            )}
          </div>
        </div>

        {/* Video Area */}
        <div className="relative w-full h-52 bg-slate-950 overflow-hidden flex items-center justify-center">
          <img
            src={ad.bannerImage}
            alt={ad.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/40" />

          {/* Reward Status badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-200 text-xs font-bold shadow">
            <Gift className="w-3.5 h-3.5 text-purple-400" />
            <span>Reward: +2 Hours VIP 10Gbps Access</span>
          </div>

          <div className="absolute bottom-3 left-4 right-4">
            <h4 className="text-lg font-black text-white drop-shadow">{ad.title}</h4>
            <p className="text-xs text-slate-300 truncate">{ad.tagline}</p>
          </div>
        </div>

        {/* Action Bottom */}
        <div className="p-5 flex flex-col gap-3 bg-slate-900">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Reward Status:</span>
            <span className={completed ? 'text-emerald-400 font-bold' : 'text-amber-400 font-medium'}>
              {completed ? 'Reward Unlocked!' : `Watch ${timeLeft} more seconds`}
            </span>
          </div>

          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-1000"
              style={{ width: `${((5 - timeLeft) / 5) * 100}%` }}
            />
          </div>

          <button
            id="claim-rewarded-ad-btn"
            onClick={handleClaim}
            disabled={!completed}
            className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              completed
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white shadow-lg shadow-purple-500/30 active:scale-98 cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>{completed ? 'CLAIM 2 HOURS VIP ACCESS' : `WATCHING AD (${timeLeft}s)`}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
