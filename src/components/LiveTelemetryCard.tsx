import React from 'react';
import { ArrowDown, ArrowUp, Activity, Shield, Globe, Lock, Cpu, Wifi } from 'lucide-react';
import { TelemetryData, VpnServer, ConnectionState } from '../types';

interface LiveTelemetryCardProps {
  telemetry: TelemetryData;
  server: VpnServer;
  connectionState: ConnectionState;
}

export const LiveTelemetryCard: React.FC<LiveTelemetryCardProps> = ({
  telemetry,
  server,
  connectionState,
}) => {
  const isConnected = connectionState === 'connected';

  const formatSpeed = (kbps: number) => {
    if (!isConnected) return '0.0 KB/s';
    if (kbps > 1024) {
      return `${(kbps / 1024).toFixed(1)} MB/s`;
    }
    return `${kbps.toFixed(0)} KB/s`;
  };

  return (
    <div id="live-telemetry-card" className="w-full space-y-3">
      {/* Download & Upload Live Meters */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Download Speed */}
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <ArrowDown className="w-3.5 h-3.5 text-cyan-400" />
              <span>Download</span>
            </span>
            <span className="text-[10px] font-mono text-cyan-400/80 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
              {isConnected ? `${telemetry.dataDownloadedMb.toFixed(1)} MB` : '0 MB'}
            </span>
          </div>

          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-black font-mono text-white">
              {formatSpeed(telemetry.downloadSpeedKbps)}
            </span>
          </div>

          {/* Mini Pulse Bar */}
          <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
            <div
              className={`h-full bg-cyan-400 transition-all duration-300 ${
                isConnected ? 'opacity-100' : 'opacity-20'
              }`}
              style={{
                width: isConnected
                  ? `${Math.min(100, (telemetry.downloadSpeedKbps / 8000) * 100)}%`
                  : '0%',
              }}
            />
          </div>
        </div>

        {/* Upload Speed */}
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <ArrowUp className="w-3.5 h-3.5 text-purple-400" />
              <span>Upload</span>
            </span>
            <span className="text-[10px] font-mono text-purple-400/80 bg-purple-950/60 px-1.5 py-0.5 rounded border border-purple-800/40">
              {isConnected ? `${telemetry.dataUploadedMb.toFixed(1)} MB` : '0 MB'}
            </span>
          </div>

          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-black font-mono text-white">
              {formatSpeed(telemetry.uploadSpeedKbps)}
            </span>
          </div>

          {/* Mini Pulse Bar */}
          <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
            <div
              className={`h-full bg-purple-400 transition-all duration-300 ${
                isConnected ? 'opacity-100' : 'opacity-20'
              }`}
              style={{
                width: isConnected
                  ? `${Math.min(100, (telemetry.uploadSpeedKbps / 3000) * 100)}%`
                  : '0%',
              }}
            />
          </div>
        </div>
      </div>

      {/* Security & IP Status Strip */}
      <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col gap-2.5">
        <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-400">Virtual Assigned IP:</span>
          </div>
          <span className="font-mono font-bold text-white bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
            {isConnected ? server.ipAddress : 'ISP Exposed'}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 rounded-xl bg-slate-950/50 border border-slate-800/60 flex flex-col items-center">
            <span className="text-[10px] text-slate-400">Ping Latency</span>
            <span className="font-mono font-bold text-emerald-400 mt-0.5">
              {isConnected ? `${server.pingMs} ms` : '--'}
            </span>
          </div>

          <div className="p-2 rounded-xl bg-slate-950/50 border border-slate-800/60 flex flex-col items-center">
            <span className="text-[10px] text-slate-400">Encryption</span>
            <span className="font-mono font-bold text-cyan-400 mt-0.5">
              {isConnected ? 'ChaCha20' : 'None'}
            </span>
          </div>

          <div className="p-2 rounded-xl bg-slate-950/50 border border-slate-800/60 flex flex-col items-center">
            <span className="text-[10px] text-slate-400">Kill Switch</span>
            <span className="font-mono font-bold text-emerald-400 mt-0.5">
              ARMED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
