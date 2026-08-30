import React, { useState } from 'react';
import { X, Play, Copy, Check, Shield, DollarSign, Smartphone, FileCode2, Info, Sparkles } from 'lucide-react';
import { AegisLogo } from './AegisLogo';

interface PlayStorePublishModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlayStorePublishModal: React.FC<PlayStorePublishModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'manifest' | 'admob' | 'malayalam'>('details');

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const manifestCode = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.aegisvpn.ultra.fast">

    <!-- Essential VPN & Network Permissions -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE_SPECIAL_USE" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />

    <!-- Google AdMob & Billing Permissions -->
    <uses-permission android:name="com.android.vending.BILLING" />
    <uses-permission android:name="com.google.android.gms.permission.AD_ID"/>

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.AegisVPN">

        <!-- Google AdMob App ID -->
        <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="ca-app-pub-3940256099942544~3347511713"/>

        <!-- Main VPN Activity -->
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:configChanges="orientation|screenSize">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <!-- Android VpnService Declaration -->
        <service
            android:name=".service.AegisVpnService"
            android:permission="android.permission.BIND_VPN_SERVICE"
            android:exported="false">
            <intent-filter>
                <action android:name="android.net.VpnService"/>
            </intent-filter>
        </service>
    </application>
</manifest>`;

  return (
    <div
      id="play-store-publish-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn"
    >
      <div className="relative w-full max-w-2xl max-h-[92vh] bg-slate-900 border border-emerald-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20">
              <Play className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">Google Play Store Ready Kit</h2>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-extrabold">
                  SDK 34 READY
                </span>
              </div>
              <p className="text-xs text-slate-400">Play Store listing, AdMob IDs, VpnService & monetization setup</p>
            </div>
          </div>

          <button
            id="close-playstore-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 p-3 bg-slate-900 border-b border-slate-800 overflow-x-auto">
          {[
            { id: 'details', label: 'App Info & Metadata', icon: Info },
            { id: 'apkbuild', label: 'Real Android APK Guide (മലയാളത്തിൽ)', icon: Smartphone },
            { id: 'admob', label: 'AdMob & In-App Ads', icon: DollarSign },
            { id: 'manifest', label: 'AndroidManifest.xml', icon: FileCode2 },
            { id: 'malayalam', label: 'Malayalam Store Listing', icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                id={`play-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                  activeTab === tab.id
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* TAB: Details */}
          {activeTab === 'details' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Super App Name</span>
                  <div className="text-sm font-black text-white mt-1">AegisVPN Ultra: Fast & Secure</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Package Name</span>
                  <div className="text-sm font-mono font-bold text-cyan-300 mt-1">com.aegisvpn.ultra.fast</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Category</span>
                  <div className="text-sm font-bold text-slate-200 mt-1">Tools / Productivity & Security</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Content Rating</span>
                  <div className="text-sm font-bold text-emerald-400 mt-1">Everyone (PEGI 3 / USK 0)</div>
                </div>
              </div>

              {/* Short & Long English Description */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">Play Store Short Description (80 chars max):</span>
                  <button
                    onClick={() => copyToClipboard('Ultra-fast secure VPN with 10Gbps servers, no logs, and military encryption.', 'short-desc')}
                    className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    {copiedKey === 'short-desc' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>Copy</span>
                  </button>
                </div>
                <p className="text-xs font-mono text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  Ultra-fast secure VPN with 10Gbps servers, no logs, and military encryption.
                </p>
              </div>

              {/* Checklist */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                  Google Play Console Upload Steps
                </h4>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>Create Google Play Console account ($25 one-time registration fee).</li>
                  <li>Declare <code className="text-cyan-300 bg-slate-900 px-1 rounded">BIND_VPN_SERVICE</code> permission in Core App Features form.</li>
                  <li>Link Google AdMob account to monetize Free users with Interstitial Ads.</li>
                  <li>Enable Google Play Billing 6.0 for VIP Ultra Subscriptions.</li>
                  <li>Generate Signed Android App Bundle (<code className="text-cyan-300 bg-slate-900 px-1 rounded">.aab</code>) and publish to Production!</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB: APK Build Guide */}
          {activeTab === 'apkbuild' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-950 to-cyan-950/40 border border-emerald-500/30 space-y-2">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xs sm:text-sm font-bold text-white">
                    ഈ ആപ്പ് എങ്ങനെ യഥാർത്ഥ ഫോൺ VPN ആപ്പായി (APK) മാറ്റാം?
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  ഫോണിലെ യഥാർത്ഥ ഇന്റർനെറ്റ് ട്രാഫിക് എൻക്രിപ്റ്റ് ചെയ്യാനും ബ്ലോക്ക് ചെയ്ത സൈറ്റുകൾ അൺബ്ലോക്ക് ചെയ്യാനും ആൻഡ്രോയിഡിന്റെ <strong className="text-cyan-300">VpnService</strong> ഫയലുകൾ ഉൾപ്പെടുത്തി APK ബിൽഡ് ചെയ്യേണ്ടതുണ്ട്.
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-black flex items-center justify-center border border-emerald-500/30">1</span>
                    <h4 className="text-xs font-bold text-slate-200">Export & Capacitor Android സജ്ജീകരിക്കുക</h4>
                  </div>
                  <p className="text-xs text-slate-400 pl-7">
                    നിങ്ങളുടെ സിസ്റ്റത്തിൽ പ്രോജക്റ്റ് ഡൗൺലോഡ് ചെയ്ത് താഴെ പറയുന്ന കമാൻഡ് റൺ ചെയ്യുക:
                  </p>
                  <pre className="p-2.5 rounded-xl bg-slate-900 text-cyan-300 font-mono text-[11px] overflow-x-auto ml-7">
                    npm install @capacitor/core @capacitor/cli @capacitor/android{'\n'}
                    npx cap init "AegisVPN" "com.aegisvpn.ultra.fast"{'\n'}
                    npm run build{'\n'}
                    npx cap add android
                  </pre>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-black flex items-center justify-center border border-cyan-500/30">2</span>
                    <h4 className="text-xs font-bold text-slate-200">Android Studio-യിൽ ഓപ്പൺ ചെയ്യുക</h4>
                  </div>
                  <p className="text-xs text-slate-400 pl-7">
                    Android Studio തുറക്കാൻ താഴെ പറയുന്ന കമാൻഡ് കൊടുക്കുക:
                  </p>
                  <pre className="p-2.5 rounded-xl bg-slate-900 text-cyan-300 font-mono text-[11px] overflow-x-auto ml-7">
                    npx cap open android
                  </pre>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-black flex items-center justify-center border border-amber-500/30">3</span>
                    <h4 className="text-xs font-bold text-slate-200">ആൻഡ്രോയിഡ് VpnService Kotlin ഫയൽ ചേർക്കുക</h4>
                  </div>
                  <p className="text-xs text-slate-400 pl-7">
                    Android Studio-യിലെ <code className="text-amber-300">android/app/src/main/java/.../service/AegisVpnService.kt</code> ഫയലിലേക്ക് OpenVPN അല്ലെങ്കിൽ WireGuard തുരങ്കം (Tunnel) കോഡ് ലിങ്ക് ചെയ്യുക.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 text-xs font-black flex items-center justify-center border border-purple-500/30">4</span>
                    <h4 className="text-xs font-bold text-slate-200">APK ബിൽഡ് ചെയ്ത് ഫോണിൽ ഇടുക (Test on Phone)</h4>
                  </div>
                  <p className="text-xs text-slate-400 pl-7">
                    Android Studio-യിൽ <strong>Build &gt; Build Bundle(s) / APK(s) &gt; Build APK(s)</strong> അമർത്തിയാൽ നിങ്ങളുടെ സ്വന്തം APK ഫയൽ റെഡിയാകും! അത് ഫോണിൽ ഇൻസ്റ്റാൾ ചെയ്താൽ ഫോണിന്റെ മുകളിൽ 🔑 (VPN Key Icon) വരികയും യഥാർത്ഥത്തിൽ ബ്ലോക്കായ സൈറ്റുകൾ ഓപ്പൺ ആവുകയും ചെയ്യും!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: AdMob */}
          {activeTab === 'admob' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200">
                💡 <strong>How Ads Work in AegisVPN:</strong> When a user on the Free tier taps "Connect", an Interstitial Video Ad triggers. Once the ad finishes (or is skipped after 5s), the VPN handshake automatically activates. Premium VIP users get instant ad-free connection.
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    type: 'AdMob App ID',
                    id: 'ca-app-pub-3940256099942544~3347511713',
                    desc: 'Inserted into AndroidManifest.xml',
                  },
                  {
                    type: 'Interstitial Ad Unit ID (On-Connect Ad)',
                    id: 'ca-app-pub-3940256099942544/1033173712',
                    desc: 'Triggers on Free connect button press with 5s countdown',
                  },
                  {
                    type: 'Banner Ad Unit ID (Bottom Strip)',
                    id: 'ca-app-pub-3940256099942544/6300978111',
                    desc: 'Sticky 320x50 AdMob banner with VIP remove button',
                  },
                  {
                    type: 'Rewarded Video Ad Unit ID (Turbo Boost)',
                    id: 'ca-app-pub-3940256099942544/5224354917',
                    desc: 'Unlocks 2 hours of VIP 10Gbps servers for free',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div className="min-w-0 pr-3">
                      <div className="text-xs font-bold text-white">{item.type}</div>
                      <div className="text-[11px] font-mono text-cyan-300 mt-0.5 truncate">{item.id}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{item.desc}</div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(item.id, `admob-${idx}`)}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white flex-shrink-0"
                    >
                      {copiedKey === `admob-${idx}` ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Manifest */}
          {activeTab === 'manifest' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">Production AndroidManifest.xml snippet:</span>
                <button
                  onClick={() => copyToClipboard(manifestCode, 'manifest')}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  {copiedKey === 'manifest' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'manifest' ? 'Copied!' : 'Copy XML'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-80">
                {manifestCode}
              </pre>
            </div>
          )}

          {/* TAB: Malayalam */}
          {activeTab === 'malayalam' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-amber-300">Play Store Malayalam Description (മലയാളം വിവരണം):</h4>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `🛡️ AegisVPN Ultra - അതിവേഗ സുരക്ഷിത VPN പ്രോക്സി

AegisVPN ഉപയോഗിച്ച് നിങ്ങളുടെ ഇന്റർനെറ്റ് അനുഭവം അതിവേഗത്തിലും പൂർണ്ണമായും സുരക്ഷിതവുമാക്കൂ!

പ്രധാന സവിശേഷതകൾ:
⚡ 10Gbps വേഗതയുള്ള ഗ്ലോബൽ സെർവറുകൾ
🎮 ഗെയിമിംഗ് & സ്ട്രീമിംഗ് ഒപ്റ്റിമൈസ്ഡ് (കുറഞ്ഞ പിംഗ്)
🔒 മിലിട്ടറി-ഗ്രേഡ് ChaCha20 / AES-256 എൻക്രിപ്ഷൻ
🚫 സീറോ ലോഗ് പോളിസി (നിങ്ങളുടെ സ്വകാര്യത പൂർണ്ണമായി സംരക്ഷിക്കപ്പെടുന്നു)
🎁 സൌജന്യ കണക്ഷൻ അല്ലെങ്കിൽ VIP അൾട്രാ ആക്സസ്
📱 ഒരു ടാപ്പിൽ ഈസി കണക്റ്റ്

ഇപ്പോൾ തന്നെ ഇൻസ്റ്റാൾ ചെയ്യൂ, സുരക്ഷിതമായി ബ്രൗസ് ചെയ്യൂ!`,
                        'malayalam-desc'
                      )
                    }
                    className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    {copiedKey === 'malayalam-desc' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>Copy Malayalam Text</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                  {`🛡️ AegisVPN Ultra - അതിവേഗ സുരക്ഷിത VPN പ്രോക്സി

AegisVPN ഉപയോഗിച്ച് നിങ്ങളുടെ ഇന്റർനെറ്റ് അനുഭവം അതിവേഗത്തിലും പൂർണ്ണമായും സുരക്ഷിതവുമാക്കൂ!

പ്രധാന സവിശേഷതകൾ:
⚡ 10Gbps വേഗതയുള്ള ഗ്ലോബൽ സെർവറുകൾ
🎮 ഗെയിമിംഗ് & സ്ട്രീമിംഗ് ഒപ്റ്റിമൈസ്ഡ് (കുറഞ്ഞ പിംഗ്)
🔒 മിലിട്ടറി-ഗ്രേഡ് ChaCha20 / AES-256 എൻക്രിപ്ഷൻ
🚫 സീറോ ലോഗ് പോളിസി (നിങ്ങളുടെ സ്വകാര്യത പൂർണ്ണമായി സംരക്ഷിക്കപ്പെടുന്നു)
🎁 സൌജന്യ കണക്ഷൻ അല്ലെങ്കിൽ VIP അൾട്രാ ആക്സസ്
📱 ഒരു ടാപ്പിൽ ഈസി കണക്റ്റ്

ഇപ്പോൾ തന്നെ ഇൻസ്റ്റാൾ ചെയ്യൂ, സുരക്ഷിതമായി ബ്രൗസ് ചെയ്യൂ!`}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
