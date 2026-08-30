import React from 'react';
import { VpnServer, ConnectionState } from '../types';
import { SERVERS_LIST } from '../data/servers';

interface WorldMapVisualizerProps {
  selectedServer: VpnServer;
  connectionState: ConnectionState;
  onSelectServer: (server: VpnServer) => void;
}

export const WorldMapVisualizer: React.FC<WorldMapVisualizerProps> = ({
  selectedServer,
  connectionState,
  onSelectServer,
}) => {
  const isConnected = connectionState === 'connected';
  const isConnecting = connectionState === 'connecting';

  // Device home location (simulated client base e.g., India or US)
  const homeNode = { x: 68, y: 46 };

  return (
    <div
      id="world-map-visualizer"
      className="relative w-full h-44 sm:h-52 bg-slate-950/80 rounded-2xl border border-slate-800/90 overflow-hidden flex items-center justify-center select-none"
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />

      {/* World Map Outline SVG */}
      <svg
        viewBox="0 0 1000 500"
        className="w-full h-full object-cover opacity-25"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Simplified Continents Contours */}
        {/* North America */}
        <path
          d="M 150,100 Q 220,90 280,120 Q 320,180 250,220 Q 180,260 140,180 Z"
          fill="#334155"
        />
        {/* South America */}
        <path
          d="M 280,260 Q 350,280 340,380 Q 300,450 260,390 Q 250,310 280,260 Z"
          fill="#334155"
        />
        {/* Europe */}
        <path
          d="M 450,100 Q 550,90 540,180 Q 480,210 440,160 Z"
          fill="#334155"
        />
        {/* Africa */}
        <path
          d="M 460,200 Q 560,210 550,330 Q 500,400 460,320 Q 430,240 460,200 Z"
          fill="#334155"
        />
        {/* Asia */}
        <path
          d="M 560,80 Q 820,70 850,200 Q 750,270 650,220 Q 570,180 560,80 Z"
          fill="#334155"
        />
        {/* Australia */}
        <path
          d="M 780,330 Q 880,340 870,410 Q 800,440 760,390 Z"
          fill="#334155"
        />
      </svg>

      {/* Dynamic Laser Connection Beam (SVG) */}
      {(isConnected || isConnecting) && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Curved connection path */}
          <path
            d={`M ${homeNode.x}% ${homeNode.y}% Q ${(homeNode.x + selectedServer.coordinates.x) / 2}% ${
              Math.min(homeNode.y, selectedServer.coordinates.y) - 15
            }% ${selectedServer.coordinates.x}% ${selectedServer.coordinates.y}%`}
            fill="none"
            stroke="url(#beamGradient)"
            strokeWidth="2.5"
            strokeDasharray={isConnected ? 'none' : '4,4'}
            className={isConnected ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'animate-pulse'}
          />
        </svg>
      )}

      {/* Client Home Node */}
      <div
        style={{ left: `${homeNode.x}%`, top: `${homeNode.y}%` }}
        className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center"
      >
        <div className="relative">
          <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-slate-950 shadow-md shadow-amber-500/50" />
          <div className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-60" />
        </div>
        <span className="text-[9px] font-bold text-amber-300 font-mono mt-0.5 bg-slate-950/80 px-1 rounded">
          YOU
        </span>
      </div>

      {/* Target Server Node */}
      <div
        style={{ left: `${selectedServer.coordinates.x}%`, top: `${selectedServer.coordinates.y}%` }}
        className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center"
      >
        <div className="relative">
          <div
            className={`w-4 h-4 rounded-full border-2 border-slate-950 shadow-lg ${
              isConnected
                ? 'bg-cyan-400 shadow-cyan-400/80'
                : isConnecting
                ? 'bg-amber-400 shadow-amber-400/80 animate-bounce'
                : 'bg-slate-400'
            }`}
          />
          {isConnected && (
            <div className="absolute -inset-2 rounded-full border border-cyan-400/60 animate-ping opacity-80" />
          )}
        </div>
        <span className="text-[9px] font-black text-cyan-300 font-mono mt-0.5 bg-slate-950/90 px-1.5 py-0.2 rounded border border-cyan-500/40 truncate max-w-[80px]">
          {selectedServer.city}
        </span>
      </div>

      {/* Other selectable dots on map */}
      {SERVERS_LIST.filter((s) => s.id !== selectedServer.id).map((server) => (
        <button
          key={server.id}
          onClick={() => onSelectServer(server)}
          style={{ left: `${server.coordinates.x}%`, top: `${server.coordinates.y}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2 z-10 w-2 h-2 rounded-full bg-slate-600/70 hover:bg-cyan-400 hover:scale-150 transition-all cursor-pointer"
          title={`${server.country} - ${server.city} (${server.pingMs}ms)`}
        />
      ))}

      {/* Map Legend Overlay */}
      <div className="absolute bottom-2 left-2 flex items-center gap-3 px-2 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-[10px] text-slate-400 z-20">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>Local Node</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>VPN Tunnel</span>
        </div>
      </div>
    </div>
  );
};
