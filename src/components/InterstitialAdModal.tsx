import React, { useState, useEffect } from 'react';
import { X, Volume2, VolumeX, Star, Download, ExternalLink, ShieldCheck, Zap, Award } from 'lucide-react';
import { AdSimulation } from '../types';

interface InterstitialAdModalProps {
  isOpen: boolean;
  ad: AdSimulation;
  onAdFinished: () => void;
  onClose: () => void;
  targetServerName: string;
}

export const InterstitialAdModal: React.FC<InterstitialAdModalProps> = ({
  isOpen,
  ad,
  onAdFinished,
  onClose,
  targetServerName,
}) => {
  const [timeLeft, setTimeLeft] = useState(5);
  const [canSkip, setCanSkip] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [adFinished, setAdFinished] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(5);
      setCanSkip(false);
      setAdFinished(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanSkip(true);
          setAdFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFinishAndConnect = () => {
    onAdFinished();
  };

  return (
    <div
      id="interstitial-ad-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn"
    >
      <div className="relative w-full max-w-md bg-slate-900 border border-cyan-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/20 flex flex-col">
        {/* AdMob / Unity Top Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-black tracking-wider">
              SPONSORED AD
            </span>
            <span className="text-[11px] text-slate-400">Google AdMob Interstitial</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              id="ad-sound-toggle"
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-full bg-slate-800 text-slate-300 hover:text-white transition-colors"
              title="Toggle Audio"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            {/* Skip / Close Timer Button */}
            {canSkip ? (
              <button
                id="ad-skip-close-button"
                onClick={handleFinishAndConnect}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/30 transition-transform active:scale-95 animate-bounce"
              >
                <span>Connect to VPN</span>
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>Skip in {timeLeft}s</span>
              </div>
            )}
          </div>
        </div>

        {/* Video / Interactive Display Area */}
        <div className="relative w-full h-56 bg-slate-950 overflow-hidden flex items-center justify-center">
          <img
            src={ad.bannerImage}
            alt={ad.title}
            className="w-full h-full object-cover opacity-80"
          />

          {/* Hologram Overlay & Scanline */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/60" />
          <div className="absolute inset-0 bg-cyan-500/5 mix-blend-overlay pointer-events-none" />

          {/* Countdown Ring in center */}
          {!adFinished ? (
            <div className="absolute top-4 right-4 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full border-2 border-amber-400/80 bg-slate-950/80 flex items-center justify-center text-amber-300 font-mono font-bold text-sm shadow-lg">
                {timeLeft}
              </div>
              <span className="text-[9px] text-amber-300/80 mt-1 font-semibold">Reward in {timeLeft}s</span>
            </div>
          ) : (
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/90 text-slate-950 font-bold text-xs shadow-lg animate-pulse">
              <Award className="w-3.5 h-3.5" />
              <span>Ad Watched!</span>
            </div>
          )}

          {/* Ad Title Badge on Video */}
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60">
                {ad.category}
              </span>
              <h3 className="text-lg font-black text-white mt-1 drop-shadow-md">
                {ad.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Ad Details & CTA */}
        <div className="p-5 flex flex-col gap-4 bg-slate-900">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-slate-400">{ad.company}</span>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="flex items-center text-amber-400 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                  <span>{ad.rating}</span>
                </div>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400">{ad.downloads} Downloads</span>
              </div>
            </div>

            <button
              onClick={() => alert(`Installing ${ad.title} from Google Play Store...`)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Install</span>
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            {ad.tagline}
          </p>

          {/* Progress to Connect Bar */}
          <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>VPN Handshake Status:</span>
              </span>
              <span className={adFinished ? 'text-emerald-400 font-bold' : 'text-amber-400 font-medium'}>
                {adFinished ? 'Ready to Establish Tunnel' : `Ad verification (${5 - timeLeft}/5s)`}
              </span>
            </div>

            {/* Progress Track */}
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-cyan-400 transition-all duration-1000"
                style={{ width: `${((5 - timeLeft) / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Connect Action Button */}
          <button
            id="ad-complete-connect-button"
            onClick={handleFinishAndConnect}
            className={`w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-black text-sm tracking-wide transition-all duration-300 shadow-xl ${
              adFinished
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 shadow-cyan-500/25 active:scale-98'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className={`w-5 h-5 ${adFinished ? 'text-slate-950' : 'text-cyan-400'}`} />
            <span>{adFinished ? `CONNECT TO ${targetServerName.toUpperCase()}` : `CONNECT AFTER AD (${timeLeft}s)`}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
