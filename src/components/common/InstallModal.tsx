import React, { useState } from 'react';
import {
  Download,
  Smartphone,
  CheckCircle2,
  X,
  Share,
  PlusSquare,
  Sparkles,
  Laptop,
  Layers,
  ArrowRight,
  ShieldCheck,
  Copy,
  Check
} from 'lucide-react';
import { usePwaInstall } from '../../hooks/usePwaInstall';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstalled, triggerInstall, isIOS, isAndroid, hasNativePrompt } = usePwaInstall();
  const [activeTab, setActiveTab] = useState<'pwa' | 'android'>('pwa');
  const [installStatus, setInstallStatus] = useState<string | null>(null);
  const [copiedCmd, setCopiedCmd] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (hasNativePrompt) {
      const outcome = await triggerInstall();
      if (outcome === 'accepted') {
        setInstallStatus('Installed successfully!');
        setTimeout(() => onClose(), 1800);
      } else if (outcome === 'dismissed') {
        setInstallStatus('Installation was dismissed.');
      }
    } else {
      // Fallback instructions are visible
      setInstallStatus('Follow the steps below to complete installation on your browser.');
    }
  };

  const copyAndroidCommand = () => {
    navigator.clipboard.writeText('cd android && ./gradlew assembleDebug');
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Government Gradient */}
        <div className="relative bg-linear-to-r from-emerald-800 via-green-800 to-blue-950 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white p-2 shadow-md flex items-center justify-center">
              <img src="/icon-192.svg" alt="AyurSetu Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 text-[10px] font-bold tracking-wider uppercase">
                <ShieldCheck className="w-3 h-3" /> SIH 2026 Official Platform
              </div>
              <h3 className="text-xl font-extrabold text-white mt-0.5">Install AyurSetu App</h3>
              <p className="text-xs text-slate-200">Instant offline access, job alerts &amp; skill tracking</p>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex gap-2 mt-5 bg-white/10 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('pwa')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'pwa'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile / Web App (PWA)</span>
            </button>
            <button
              onClick={() => setActiveTab('android')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'android'
                  ? 'bg-white text-blue-950 shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Native Android (Java)</span>
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          {activeTab === 'pwa' ? (
            <div className="space-y-4">
              {isInstalled ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <div className="text-sm font-bold">AyurSetu is already installed!</div>
                    <div className="text-xs text-emerald-700">
                      You can launch it anytime directly from your device home screen or applications menu.
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Primary 1-Click Action */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-amber-600" />
                          One-Tap Instant Installation
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          No app store download needed. Works seamlessly across Android, iOS, Windows, and Mac.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleInstallClick}
                      className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>{hasNativePrompt ? 'Install AyurSetu Now' : 'Add to Home Screen'}</span>
                    </button>

                    {installStatus && (
                      <p className="text-xs text-center font-medium text-blue-700 animate-pulse">
                        {installStatus}
                      </p>
                    )}
                  </div>

                  {/* Platform-Specific Step-by-Step Instructions */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Or Install Manually Via Browser:
                    </h5>

                    {/* iOS Safari */}
                    {isIOS ? (
                      <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-100 text-xs space-y-1.5 text-slate-700">
                        <div className="font-bold text-blue-900 flex items-center gap-1.5">
                          <Share className="w-3.5 h-3.5" /> For iPhone &amp; iPad (Safari):
                        </div>
                        <ol className="list-decimal list-inside space-y-1 text-slate-600">
                          <li>Tap the <span className="font-semibold text-slate-900">Share</span> button at the bottom of Safari.</li>
                          <li>Scroll down and tap <span className="font-semibold text-slate-900">Add to Home Screen</span> (<PlusSquare className="inline w-3 h-3 text-slate-700" />).</li>
                          <li>Confirm by tapping <span className="font-semibold text-slate-900">Add</span>.</li>
                        </ol>
                      </div>
                    ) : isAndroid ? (
                      /* Android Chrome */
                      <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-100 text-xs space-y-1.5 text-slate-700">
                        <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                          <Smartphone className="w-3.5 h-3.5" /> For Android (Chrome):
                        </div>
                        <ol className="list-decimal list-inside space-y-1 text-slate-600">
                          <li>Tap the <span className="font-semibold text-slate-900">three dots (⋮)</span> in the top right.</li>
                          <li>Select <span className="font-semibold text-slate-900">Install app</span> or <span className="font-semibold text-slate-900">Add to Home screen</span>.</li>
                          <li>Confirm installation.</li>
                        </ol>
                      </div>
                    ) : (
                      /* Desktop Chrome/Edge/Safari */
                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1.5 text-slate-700">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <Laptop className="w-3.5 h-3.5" /> For Chrome, Edge, or Brave on Desktop:
                        </div>
                        <p className="text-slate-600">
                          Look for the <span className="font-semibold text-slate-900">Install icon (⊕)</span> in the right side of the browser URL address bar, or open the browser menu and click <span className="font-semibold text-slate-900">"Install AyurSetu..."</span>.
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ) : (
            /* Native Android Tab */
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-blue-900 text-white">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-blue-950">Native Android Studio Codebase</h4>
                    <p className="text-xs text-blue-800">Complete Java 17 + Material 3 + Retrofit2 app in this repo</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 pt-1 leading-relaxed">
                  The native Java Android project is fully structured in the <code className="px-1.5 py-0.5 bg-blue-100 text-blue-900 rounded font-mono text-[11px]">android/</code> folder. You can open it directly in Android Studio or compile it with Gradle.
                </p>
              </div>

              {/* Build Command Box */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Compile Debug APK via Terminal:</label>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 text-emerald-400 font-mono text-xs">
                  <span>cd android &amp;&amp; ./gradlew assembleDebug</span>
                  <button
                    onClick={copyAndroidCommand}
                    className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                    title="Copy command"
                  >
                    {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Connection note */}
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" /> Auto-Connected to Node.js Backend:
                </div>
                <p className="text-amber-800">
                  When launched in Android Emulator, the app connects automatically to the Node.js API server at <code className="font-mono text-[11px]">http://10.0.2.2:5001/api/</code>.
                </p>
              </div>
            </div>
          )}

          {/* Key Advantages */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Zero Storage Overhead
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Offline Readiness
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Real-time Sync
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
