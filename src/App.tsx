import React, { useState, useEffect, useRef } from 'react';
import {
  Globe,
  Zap,
  Shield,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Lock,
  Flame,
  Award,
  Crown,
  Activity,
  ArrowDown,
  ArrowUp,
  Settings,
  Share2,
  RefreshCw,
  Gift
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { ConnectionState, VpnServer, SecuritySettings, TelemetryData, AdSimulation } from './types';
import { SERVERS_LIST, SIMULATED_ADS } from './data/servers';

import { AegisLogo } from './components/AegisLogo';
import { ConnectButton } from './components/ConnectButton';
import { ServerListModal } from './components/ServerListModal';
import { InterstitialAdModal } from './components/InterstitialAdModal';
import { RewardedAdModal } from './components/RewardedAdModal';
import { VipUpgradeModal } from './components/VipUpgradeModal';
import { SecurityToolsModal } from './components/SecurityToolsModal';
import { PlayStorePublishModal } from './components/PlayStorePublishModal';
import { LiveTelemetryCard } from './components/LiveTelemetryCard';
import { WorldMapVisualizer } from './components/WorldMapVisualizer';
import { BannerAd } from './components/BannerAd';
import { TopNavbar } from './components/TopNavbar';

export default function App() {
  // VPN State
  const [connectionState, setConnectionState] = useState<ConnectionState>('disconnected');
  const [selectedServer, setSelectedServer] = useState<VpnServer>(SERVERS_LIST[0]);
  const [isVip, setIsVip] = useState<boolean>(false);
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(false);

  // Security Settings
  const [settings, setSettings] = useState<SecuritySettings>({
    killSwitch: true,
    threatShield: true,
    splitTunneling: false,
    dnsLeakProtection: true,
    autoConnectWifi: true,
    protocol: 'WireGuard',
    bypassApps: ['com.whatsapp'],
  });

  // Telemetry & Duration
  const [secondsConnected, setSecondsConnected] = useState<number>(0);
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    downloadSpeedKbps: 0,
    uploadSpeedKbps: 0,
    dataDownloadedMb: 0,
    dataUploadedMb: 0,
    ping: 28,
    jitter: 2,
    originalIp: '49.37.12.184 (ISP Unencrypted)',
    virtualIp: SERVERS_LIST[0].ipAddress,
    encryption: 'ChaCha20-Poly1305 / AES-256-GCM',
    connectedSince: null,
  });

  // Modals
  const [isServerModalOpen, setIsServerModalOpen] = useState(false);
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [isPlayStoreModalOpen, setIsPlayStoreModalOpen] = useState(false);
  const [isRewardedAdModalOpen, setIsRewardedAdModalOpen] = useState(false);

  // Interstitial Ad State (Triggered on Connect for Free Tier)
  const [isInterstitialAdOpen, setIsInterstitialAdOpen] = useState(false);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  // Pending connection target after ad completes
  const pendingConnectRef = useRef<boolean>(false);

  // Connection timer effect
  useEffect(() => {
    let timer: any;
    if (connectionState === 'connected') {
      timer = setInterval(() => {
        setSecondsConnected((prev) => prev + 1);

        // Generate dynamic live traffic fluctuation
        setTelemetry((prev) => {
          const speedFactor = isVip ? 4.5 : 1.2;
          const downSpeed = Math.floor((Math.random() * 4500 + 1200) * speedFactor);
          const upSpeed = Math.floor((Math.random() * 1800 + 400) * speedFactor);
          const addedDownMb = downSpeed / (1024 * 8 * 10);
          const addedUpMb = upSpeed / (1024 * 8 * 10);

          return {
            ...prev,
            downloadSpeedKbps: downSpeed,
            uploadSpeedKbps: upSpeed,
            dataDownloadedMb: prev.dataDownloadedMb + addedDownMb,
            dataUploadedMb: prev.dataUploadedMb + addedUpMb,
          };
        });
      }, 1000);
    } else {
      setSecondsConnected(0);
    }
    return () => clearInterval(timer);
  }, [connectionState, isVip]);

  // Format connection duration HH:MM:SS
  const formatDuration = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  // Perform actual VPN Handshake & Tunnel Activation
  const executeConnectTunnel = () => {
    setConnectionState('connecting');

    setTimeout(() => {
      setConnectionState('connected');
      setTelemetry((prev) => ({
        ...prev,
        virtualIp: selectedServer.ipAddress,
        ping: selectedServer.pingMs,
        connectedSince: Date.now(),
      }));

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#3b82f6', '#10b981'],
      });
    }, 1800);
  };

  // Main Connect Trigger Handler:
  // If Free Tier -> Show Interstitial Video Ad First!
  // If VIP -> Instant Connect!
  const handleToggleConnect = () => {
    if (connectionState === 'connected') {
      setConnectionState('disconnecting');
      setTimeout(() => {
        setConnectionState('disconnected');
        setTelemetry((prev) => ({
          ...prev,
          downloadSpeedKbps: 0,
          uploadSpeedKbps: 0,
          dataDownloadedMb: 0,
          dataUploadedMb: 0,
        }));
      }, 800);
      return;
    }

    if (connectionState === 'disconnected') {
      if (isVip) {
        // VIP User -> Direct Fast Connect without Ads
        executeConnectTunnel();
      } else {
        // Free User -> Trigger Ad First as explicitly requested!
        pendingConnectRef.current = true;
        setCurrentAdIndex((prev) => (prev + 1) % SIMULATED_ADS.length);
        setIsInterstitialAdOpen(true);
      }
    }
  };

  // Callback after Interstitial Ad finishes / completes
  const handleAdFinished = () => {
    setIsInterstitialAdOpen(false);
    if (pendingConnectRef.current) {
      pendingConnectRef.current = false;
      executeConnectTunnel();
    }
  };

  // Server selection handler
  const handleSelectServer = (server: VpnServer) => {
    setSelectedServer(server);
    if (connectionState === 'connected') {
      // If currently connected, reconnect to new server
      if (isVip) {
        executeConnectTunnel();
      } else {
        pendingConnectRef.current = true;
        setIsInterstitialAdOpen(true);
      }
    }
  };

  const handleUpdateSettings = (newSettings: Partial<SecuritySettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <div className="h-screen max-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased font-sans select-none overflow-hidden">
      {/* Top Main Navigation Bar */}
      <TopNavbar
        isVip={isVip}
        onOpenVipModal={() => setIsVipModalOpen(true)}
        onOpenServerModal={() => setIsServerModalOpen(true)}
        onOpenSecurityModal={() => setIsSecurityModalOpen(true)}
        onOpenPlayStoreModal={() => setIsPlayStoreModalOpen(true)}
        onOpenRewardedAdModal={() => setIsRewardedAdModalOpen(true)}
        isPhoneFrame={isPhoneFrame}
        onTogglePhoneFrame={() => setIsPhoneFrame(!isPhoneFrame)}
      />

      {/* Main Body Content */}
      <main className="flex-1 flex items-center justify-center p-2 sm:p-3 overflow-hidden min-h-0">
        <div
          className={`w-full h-full flex flex-col justify-between transition-all duration-300 ${
            isPhoneFrame
              ? 'max-w-[400px] bg-slate-900 border-2 sm:border-4 border-slate-700 rounded-[28px] sm:rounded-[36px] shadow-2xl p-3 sm:p-4 relative overflow-hidden ring-1 ring-slate-600/30'
              : 'max-w-2xl'
          }`}
        >
          {/* Phone Frame Notch Mockup */}
          {isPhoneFrame && (
            <div className="w-full flex items-center justify-center pb-1">
              <div className="w-20 h-3 bg-slate-950 rounded-full flex items-center justify-center gap-2 border border-slate-800">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                <div className="w-6 h-1 rounded-full bg-slate-800" />
              </div>
            </div>
          )}

          <div className="flex-1 flex flex-col justify-evenly gap-2 min-h-0">
            {/* Server Selector Bar Card */}
            <div
              id="server-selector-card"
              onClick={() => setIsServerModalOpen(true)}
              className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 cursor-pointer flex items-center justify-between shadow-lg transition-all group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="text-xl sm:text-2xl select-none flex-shrink-0 drop-shadow">
                  {selectedServer.flagEmoji}
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Selected Location
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-xs sm:text-sm font-black text-white truncate">
                      {selectedServer.country} • {selectedServer.city}
                    </span>
                    {selectedServer.isVip && (
                      <span className="px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[8px] font-extrabold flex items-center gap-0.5">
                        <Crown className="w-2 h-2" />
                        VIP
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-emerald-400">
                    {selectedServer.pingMs} ms
                  </div>
                  <div className="text-[9px] text-slate-400 font-mono hidden sm:block">
                    {selectedServer.speedTier}
                  </div>
                </div>

                <div className="p-1.5 rounded-lg bg-slate-800 group-hover:bg-cyan-500 group-hover:text-slate-950 text-slate-400 transition-all">
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Central Power / Shield Connect Control */}
            <ConnectButton
              connectionState={connectionState}
              onToggleConnect={handleToggleConnect}
              isVip={isVip}
              connectedDuration={formatDuration(secondsConnected)}
              serverCity={selectedServer.city}
              serverCountry={selectedServer.country}
            />

            {/* Live Telemetry & Traffic Card */}
            <LiveTelemetryCard
              telemetry={telemetry}
              server={selectedServer}
              connectionState={connectionState}
            />

            {/* Quick Action Pills Strip */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              <button
                id="quick-protocols-btn"
                onClick={() => setIsSecurityModalOpen(true)}
                className="p-2 sm:p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 flex flex-col items-center justify-center text-center transition-all cursor-pointer group"
              >
                <Lock className="w-3.5 h-3.5 text-cyan-400 mb-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-slate-200">Protocol</span>
                <span className="text-[8px] text-slate-400 font-mono">{settings.protocol}</span>
              </button>

              <button
                id="quick-speedboost-btn"
                onClick={() => {
                  if (isVip) {
                    setIsVipModalOpen(true);
                  } else {
                    setIsRewardedAdModalOpen(true);
                  }
                }}
                className="p-2 sm:p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 flex flex-col items-center justify-center text-center transition-all cursor-pointer group"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400 mb-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-slate-200">{isVip ? 'VIP Mode' : 'Turbo Boost'}</span>
                <span className="text-[8px] text-amber-400 font-mono">{isVip ? '10 Gbps' : '+2H Free Ad'}</span>
              </button>

              <button
                id="quick-playstore-btn"
                onClick={() => setIsPlayStoreModalOpen(true)}
                className="p-2 sm:p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 flex flex-col items-center justify-center text-center transition-all cursor-pointer group"
              >
                <Award className="w-3.5 h-3.5 text-emerald-400 mb-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-slate-200">Play Store</span>
                <span className="text-[8px] text-emerald-400 font-mono">Upload Kit</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Bottom AdMob Banner Ad (Displays for Free users) */}
      <BannerAd onUpgradeVip={() => setIsVipModalOpen(true)} isVip={isVip} />

      {/* MODALS */}
      {/* 1. Interstitial Video Ad Modal (Triggered on Connect for Free Users) */}
      <InterstitialAdModal
        isOpen={isInterstitialAdOpen}
        ad={SIMULATED_ADS[currentAdIndex]}
        onAdFinished={handleAdFinished}
        onClose={() => setIsInterstitialAdOpen(false)}
        targetServerName={selectedServer.city}
      />

      {/* 2. Global Server Picker Modal */}
      <ServerListModal
        isOpen={isServerModalOpen}
        onClose={() => setIsServerModalOpen(false)}
        selectedServer={selectedServer}
        onSelectServer={handleSelectServer}
        isVip={isVip}
        onUpgradeVip={() => {
          setIsServerModalOpen(false);
          setIsVipModalOpen(true);
        }}
      />

      {/* 3. VIP Subscription / Google Play In-App Purchase Modal */}
      <VipUpgradeModal
        isOpen={isVipModalOpen}
        onClose={() => setIsVipModalOpen(false)}
        isVip={isVip}
        onActivateVip={() => setIsVip(true)}
        onDowngradeFree={() => setIsVip(false)}
      />

      {/* 4. Security, Protocols, SpeedTest & Leak Test Modal */}
      <SecurityToolsModal
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        isVip={isVip}
        onUpgradeVip={() => {
          setIsSecurityModalOpen(false);
          setIsVipModalOpen(true);
        }}
      />

      {/* 5. Google Play Store Publish Kit Modal */}
      <PlayStorePublishModal
        isOpen={isPlayStoreModalOpen}
        onClose={() => setIsPlayStoreModalOpen(false)}
      />

      {/* 6. Rewarded Ad Modal (+2 Hours Free VIP) */}
      <RewardedAdModal
        isOpen={isRewardedAdModalOpen}
        onClose={() => setIsRewardedAdModalOpen(false)}
        onRewardGranted={() => {
          setIsVip(true);
          alert('🎉 2 Hours VIP 10Gbps High-Speed Access Granted!');
        }}
      />
    </div>
  );
}
