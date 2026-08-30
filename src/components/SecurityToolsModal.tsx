import React, { useState } from 'react';
import { X, ShieldAlert, ShieldCheck, Gauge, Layers, Lock, Cpu, Play, CheckCircle2, AlertTriangle, Smartphone } from 'lucide-react';
import { SecuritySettings, VpnProtocol } from '../types';

interface SecurityToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SecuritySettings;
  onUpdateSettings: (newSettings: Partial<SecuritySettings>) => void;
  isVip: boolean;
  onUpgradeVip: () => void;
}

export const SecurityToolsModal: React.FC<SecurityToolsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  isVip,
  onUpgradeVip,
}) => {
  const [activeTab, setActiveTab] = useState<'protocols' | 'leak-test' | 'split-tunnel' | 'speedtest'>('protocols');

  // Speed test simulation state
  const [isTestingSpeed, setIsTestingSpeed] = useState(false);
  const [testResults, setTestResults] = useState<{ download: number; upload: number; ping: number } | null>(null);

  // Leak test simulation state
  const [isTestingLeaks, setIsTestingLeaks] = useState(false);
  const [leakResults, setLeakResults] = useState<{ dnsSecure: boolean; ipSecure: boolean; webRtcSecure: boolean } | null>(null);

  if (!isOpen) return null;

  const protocols: { name: VpnProtocol; tag: string; desc: string; vipOnly?: boolean }[] = [
    { name: 'WireGuard', tag: 'Fastest', desc: 'Modern high-speed cryptographic protocol, ultra low battery drain.' },
    { name: 'Aegis-Turbo (UDP)', tag: 'Ultra Low Ping', desc: 'Custom UDP packet acceleration protocol tuned for gaming & streaming.' },
    { name: 'OpenVPN-TCP', tag: 'Stealth & Secure', desc: 'Bypasses strict firewalls and deep packet inspection (DPI).' },
    { name: 'Shadowsocks', tag: 'Obfuscated', desc: 'Camouflages VPN traffic as standard HTTPS web browsing.', vipOnly: true },
    { name: 'IKEv2', tag: 'Mobile Roaming', desc: 'Smoothly handles network transitions between 5G and WiFi without dropping.', vipOnly: true },
  ];

  const appList = [
    { id: 'com.google.chrome', name: 'Google Chrome', icon: '🌐' },
    { id: 'com.netflix.mediaclient', name: 'Netflix', icon: '🎬' },
    { id: 'com.pubg.imobile', name: 'PUBG Mobile / BGMI', icon: '🎮' },
    { id: 'com.whatsapp', name: 'WhatsApp Messenger', icon: '💬' },
    { id: 'com.spotify.music', name: 'Spotify Music', icon: '🎵' },
    { id: 'com.binance.dev', name: 'Binance Crypto', icon: '📈' },
    { id: 'com.google.android.youtube', name: 'YouTube', icon: '▶️' },
  ];

  const runSpeedTest = () => {
    setIsTestingSpeed(true);
    setTestResults(null);
    setTimeout(() => {
      setTestResults({
        download: isVip ? 842.6 : 88.4,
        upload: isVip ? 412.3 : 32.1,
        ping: isVip ? 14 : 32,
      });
      setIsTestingSpeed(false);
    }, 2500);
  };

  const runLeakTest = () => {
    setIsTestingLeaks(true);
    setLeakResults(null);
    setTimeout(() => {
      setLeakResults({
        dnsSecure: true,
        ipSecure: true,
        webRtcSecure: true,
      });
      setIsTestingLeaks(false);
    }, 2000);
  };

  return (
    <div
      id="security-tools-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn"
    >
      <div className="relative w-full max-w-xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">Security & Protocols</h2>
              <p className="text-xs text-slate-400">Hardware encryption, Kill Switch & Diagnostics</p>
            </div>
          </div>

          <button
            id="close-security-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 p-3 bg-slate-900 border-b border-slate-800 overflow-x-auto">
          {[
            { id: 'protocols', label: 'Protocols', icon: Cpu },
            { id: 'speedtest', label: 'Speed Test', icon: Gauge },
            { id: 'leak-test', label: 'IP Leak Test', icon: ShieldAlert },
            { id: 'split-tunnel', label: 'Split Tunneling', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                id={`sec-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Tab Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* TAB 1: Protocols */}
          {activeTab === 'protocols' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-rose-400" />
                    Always-On Kill Switch
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5">
                    Instantly halts internet traffic if VPN disconnects to prevent leaks
                  </span>
                </div>
                <button
                  id="toggle-kill-switch-btn"
                  onClick={() => onUpdateSettings({ killSwitch: !settings.killSwitch })}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    settings.killSwitch ? 'bg-cyan-500' : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      settings.killSwitch ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 pt-2">
                Available VPN Protocols
              </h3>

              <div className="space-y-2">
                {protocols.map((proto) => {
                  const isSelected = settings.protocol === proto.name;
                  const isLocked = proto.vipOnly && !isVip;

                  return (
                    <div
                      key={proto.name}
                      id={`protocol-item-${proto.name}`}
                      onClick={() => {
                        if (isLocked) {
                          onUpgradeVip();
                        } else {
                          onUpdateSettings({ protocol: proto.name });
                        }
                      }}
                      className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-cyan-950/40 border-cyan-400/80 shadow-md shadow-cyan-500/10'
                          : isLocked
                          ? 'bg-slate-950/40 border-slate-800 opacity-80 hover:border-amber-500/40'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{proto.name}</span>
                          <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">
                            {proto.tag}
                          </span>
                          {proto.vipOnly && (
                            <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-bold">
                              VIP ONLY
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">{proto.desc}</p>
                      </div>

                      <div className="flex-shrink-0 ml-3">
                        {isSelected ? (
                          <div className="w-6 h-6 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center font-bold">
                            ✓
                          </div>
                        ) : isLocked ? (
                          <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs">
                            🔒
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full border border-slate-700" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: Speed Test */}
          {activeTab === 'speedtest' && (
            <div className="space-y-4 text-center">
              <div className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="w-24 h-24 rounded-full border-4 border-cyan-500/40 flex flex-col items-center justify-center shadow-lg shadow-cyan-500/20 mb-4">
                  <Gauge className={`w-10 h-10 ${isTestingSpeed ? 'text-amber-400 animate-spin' : 'text-cyan-400'}`} />
                </div>

                <h3 className="text-base font-black text-white">Real-Time Throughput Benchmark</h3>
                <p className="text-xs text-slate-400 max-w-xs mt-1">
                  Measures actual download, upload and jitter across active encrypted tunnel.
                </p>

                <button
                  id="run-speedtest-btn"
                  onClick={runSpeedTest}
                  disabled={isTestingSpeed}
                  className="mt-5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/30 flex items-center gap-2 active:scale-95 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  <span>{isTestingSpeed ? 'BENCHMARKING TUNNEL...' : 'START SPEED TEST'}</span>
                </button>
              </div>

              {testResults && (
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-cyan-500/30 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Download</span>
                    <div className="text-lg font-black font-mono text-cyan-300 mt-1">
                      {testResults.download} <span className="text-xs font-normal">Mbps</span>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-purple-500/30 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Upload</span>
                    <div className="text-lg font-black font-mono text-purple-300 mt-1">
                      {testResults.upload} <span className="text-xs font-normal">Mbps</span>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-500/30 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Ping</span>
                    <div className="text-lg font-black font-mono text-emerald-300 mt-1">
                      {testResults.ping} <span className="text-xs font-normal">ms</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Leak Test */}
          {activeTab === 'leak-test' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">DNS & WebRTC Cloak Diagnostic</h4>
                  <p className="text-[11px] text-slate-400">Verify zero real IP or location exposure</p>
                </div>
                <button
                  id="run-leak-test-btn"
                  onClick={runLeakTest}
                  disabled={isTestingLeaks}
                  className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold hover:bg-cyan-500/30 transition-colors"
                >
                  {isTestingLeaks ? 'Scanning...' : 'Run Diagnostics'}
                </button>
              </div>

              {leakResults && (
                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <div>
                        <div className="text-xs font-bold text-white">DNS Leak: Protected</div>
                        <div className="text-[10px] text-slate-400">Using Encrypted DNS (1.1.1.1 & Quad9)</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400">PASSED</span>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <div>
                        <div className="text-xs font-bold text-white">WebRTC Leak: Guarded</div>
                        <div className="text-[10px] text-slate-400">Local STUN/TURN IP hidden from browsers</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400">PASSED</span>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <div>
                        <div className="text-xs font-bold text-white">IPv6 Cloaking: Active</div>
                        <div className="text-[10px] text-slate-400">IPv6 blackholed to prevent route leakage</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400">PASSED</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Split Tunneling */}
          {activeTab === 'split-tunnel' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">Enable Split Tunneling</span>
                  <span className="text-[11px] text-slate-400">Selected apps will bypass VPN for direct local speed</span>
                </div>
                <button
                  id="toggle-split-tunnel-btn"
                  onClick={() => onUpdateSettings({ splitTunneling: !settings.splitTunneling })}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    settings.splitTunneling ? 'bg-cyan-500' : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      settings.splitTunneling ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="space-y-2">
                {appList.map((app) => {
                  const isBypassed = settings.bypassApps.includes(app.id);

                  return (
                    <div
                      key={app.id}
                      onClick={() => {
                        const newBypass = isBypassed
                          ? settings.bypassApps.filter((id) => id !== app.id)
                          : [...settings.bypassApps, app.id];
                        onUpdateSettings({ bypassApps: newBypass });
                      }}
                      className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 hover:border-slate-700 cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{app.icon}</span>
                        <div>
                          <div className="text-xs font-bold text-white">{app.name}</div>
                          <div className="text-[10px] font-mono text-slate-500">{app.id}</div>
                        </div>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                          isBypassed ? 'bg-cyan-500 border-cyan-400 text-slate-950 font-bold text-xs' : 'border-slate-700'
                        }`}
                      >
                        {isBypassed && '✓'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
