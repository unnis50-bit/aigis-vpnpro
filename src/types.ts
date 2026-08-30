export type ConnectionState = 'disconnected' | 'connecting' | 'connected' | 'disconnecting';

export type UserTier = 'free' | 'vip_trial' | 'vip_premium';

export type VpnProtocol = 'WireGuard' | 'Aegis-Turbo (UDP)' | 'OpenVPN-TCP' | 'Shadowsocks' | 'IKEv2';

export type ServerCategory = 'all' | 'free' | 'gaming' | 'streaming' | 'privacy';

export interface VpnServer {
  id: string;
  country: string;
  city: string;
  countryCode: string;
  flagEmoji: string;
  pingMs: number;
  loadPercent: number;
  isVip: boolean;
  category: 'free' | 'gaming' | 'streaming' | 'privacy';
  speedTier: '10 Gbps' | '5 Gbps' | '1 Gbps' | '500 Mbps';
  ipAddress: string;
  bestFor: string;
  coordinates: { x: number; y: number }; // percentage on map
}

export interface SecuritySettings {
  killSwitch: boolean;
  threatShield: boolean;
  splitTunneling: boolean;
  dnsLeakProtection: boolean;
  autoConnectWifi: boolean;
  protocol: VpnProtocol;
  bypassApps: string[];
}

export interface AdSimulation {
  id: string;
  title: string;
  company: string;
  tagline: string;
  category: string;
  rating: number;
  downloads: string;
  ctaText: string;
  accentColor: string;
  bannerImage: string;
  videoDuration: number;
}

export interface TelemetryData {
  downloadSpeedKbps: number;
  uploadSpeedKbps: number;
  dataDownloadedMb: number;
  dataUploadedMb: number;
  ping: number;
  jitter: number;
  originalIp: string;
  virtualIp: string;
  encryption: string;
  connectedSince: number | null;
}
