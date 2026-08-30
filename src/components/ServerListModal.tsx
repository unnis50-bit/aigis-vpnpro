import React, { useState } from 'react';
import { X, Search, Crown, Signal, Zap, Check, Lock, Sparkles, Filter } from 'lucide-react';
import { VpnServer, ServerCategory } from '../types';
import { SERVERS_LIST } from '../data/servers';

interface ServerListModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedServer: VpnServer;
  onSelectServer: (server: VpnServer) => void;
  isVip: boolean;
  onUpgradeVip: () => void;
}

export const ServerListModal: React.FC<ServerListModalProps> = ({
  isOpen,
  onClose,
  selectedServer,
  onSelectServer,
  isVip,
  onUpgradeVip,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ServerCategory>('all');

  if (!isOpen) return null;

  const filteredServers = SERVERS_LIST.filter((server) => {
    const matchesSearch =
      server.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.bestFor.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'free' && !server.isVip) ||
      (selectedCategory !== 'free' && server.category === selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'gaming':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-400/30">GAMING 10G</span>;
      case 'streaming':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">4K STREAM</span>;
      case 'privacy':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">DOUBLE-VPN</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">FREE FAST</span>;
    }
  };

  const getPingColor = (ping: number) => {
    if (ping < 30) return 'text-emerald-400';
    if (ping < 60) return 'text-amber-400';
    return 'text-rose-400';
  };

  return (
    <div
      id="server-list-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
    >
      <div className="relative w-full max-w-xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">Global VPN Nodes</h2>
              <p className="text-xs text-slate-400">Select fastest high-speed encrypted relay</p>
            </div>
          </div>

          <button
            id="close-server-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Categories Bar */}
        <div className="p-4 space-y-3 bg-slate-900/90 border-b border-slate-800">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="server-search-input"
              type="text"
              placeholder="Search by country, city or purpose (e.g., Tokyo, Netflix, Gaming)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-cyan-400 focus:outline-none text-xs sm:text-sm text-slate-100 placeholder:text-slate-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {(
              [
                { id: 'all', label: 'All Servers', count: SERVERS_LIST.length },
                { id: 'free', label: 'Free Fast', count: SERVERS_LIST.filter((s) => !s.isVip).length },
                { id: 'gaming', label: 'Gaming 10G', count: SERVERS_LIST.filter((s) => s.category === 'gaming').length },
                { id: 'streaming', label: 'Streaming 4K', count: SERVERS_LIST.filter((s) => s.category === 'streaming').length },
                { id: 'privacy', label: 'Double Privacy', count: SERVERS_LIST.filter((s) => s.category === 'privacy').length },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                id={`server-tab-${tab.id}`}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedCategory === tab.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === tab.id ? 'bg-slate-950/30 text-slate-950 font-black' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Server List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2.5 max-h-[480px]">
          {filteredServers.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              <p className="text-sm font-semibold">No servers found matching "{searchQuery}"</p>
              <p className="text-xs text-slate-500 mt-1">Try another location or clear filter.</p>
            </div>
          ) : (
            filteredServers.map((server) => {
              const isSelected = selectedServer.id === server.id;
              const isLocked = server.isVip && !isVip;

              return (
                <div
                  key={server.id}
                  id={`server-item-${server.id}`}
                  onClick={() => {
                    if (isLocked) {
                      onUpgradeVip();
                    } else {
                      onSelectServer(server);
                      onClose();
                    }
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-400/80 shadow-lg shadow-cyan-500/10'
                      : isLocked
                      ? 'bg-slate-950/60 border-slate-800/80 hover:border-amber-500/40'
                      : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  {/* Left info */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="text-2xl select-none flex-shrink-0 drop-shadow">
                      {server.flagEmoji}
                    </div>

                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white truncate">
                          {server.country} • {server.city}
                        </span>
                        {server.isVip && (
                          <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[9px] font-black tracking-wider flex items-center gap-0.5">
                            <Crown className="w-2.5 h-2.5" />
                            VIP
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        {getCategoryBadge(server.category)}
                        <span className="text-[11px] text-slate-400 truncate hidden sm:inline">
                          {server.bestFor}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right specs & status */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {/* Ping & Load */}
                    <div className="text-right flex flex-col items-end">
                      <div className="flex items-center gap-1">
                        <Signal className={`w-3.5 h-3.5 ${getPingColor(server.pingMs)}`} />
                        <span className={`text-xs font-mono font-bold ${getPingColor(server.pingMs)}`}>
                          {server.pingMs} ms
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {server.speedTier} • {server.loadPercent}% load
                      </span>
                    </div>

                    {/* Action Icon */}
                    {isSelected ? (
                      <div className="w-7 h-7 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center font-bold shadow">
                        <Check className="w-4 h-4" />
                      </div>
                    ) : isLocked ? (
                      <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Lock className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/40 flex items-center justify-center transition-colors">
                        <Zap className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer (VIP Banner if free user) */}
        {!isVip && (
          <div className="p-4 bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/60 border-t border-amber-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-400" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-amber-200">Unlock All 20+ Dedicated 10Gbps VIP Nodes</span>
                <span className="text-[10px] text-slate-400">Zero latency gaming & 4K unblocked streaming</span>
              </div>
            </div>

            <button
              id="server-modal-upgrade-btn"
              onClick={() => {
                onClose();
                onUpgradeVip();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all active:scale-95"
            >
              UPGRADE VIP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
