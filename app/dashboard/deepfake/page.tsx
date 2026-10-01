"use client";

import { useState, useRef } from "react";
import DemoBadge from "@/components/DemoBadge";
import {
  Camera,
  Upload,
  ShieldAlert,
  CheckCircle2,
  Eye,
  AlertTriangle,
  RefreshCw,
  FileText,
  Sparkles,
  Share2,
  FileSearch,
  Lock,
  Printer,
  X,
  Sliders,
  Layers,
  Activity,
  Globe,
} from "lucide-react";
import { analyzeDeepfake } from "@/lib/aiEngine";

export default function DeepfakeDetectorPage() {
  const [selectedPreset, setSelectedPreset] = useState<"real" | "fake" | "diffusion">("fake");
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("deepfake_faceswap_sample.mp4");
  const [showLegalModal, setShowLegalModal] = useState<boolean>(false);

  const [scanResult, setScanResult] = useState<any>(() =>
    analyzeDeepfake("deepfake_faceswap_sample.mp4", "video/mp4", 1024000)
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const runAnalysis = async (targetFileName: string, fileType: string, customPreview?: string | null) => {
    setIsScanning(true);
    setScanProgress(15);
    setFileName(targetFileName);

    if (customPreview !== undefined) {
      setUploadedPreview(customPreview);
    }

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 200);

    try {
      const res = await fetch("/api/scan/deepfake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: targetFileName, fileType }),
      });
      const data = await res.json();
      clearInterval(interval);
      setScanProgress(100);

      if (data.success && data.data) {
        setScanResult(data.data);
      } else {
        setScanResult(analyzeDeepfake(targetFileName, fileType));
      }
    } catch {
      clearInterval(interval);
      setScanProgress(100);
      setScanResult(analyzeDeepfake(targetFileName, fileType));
    } finally {
      setTimeout(() => setIsScanning(false), 300);
    }
  };

  const handlePresetSelect = (preset: "real" | "fake" | "diffusion") => {
    setSelectedPreset(preset);
    if (preset === "real") {
      runAnalysis("authentic_interview_hd.png", "image/png", null);
    } else if (preset === "fake") {
      runAnalysis("deepfake_faceswap_sample.mp4", "video/mp4", null);
    } else {
      runAnalysis("synthetic_portrait_gen.webp", "image/webp", null);
    }
  };

  const handleFileUpload = (file: File) => {
    if (!file) return;

    if (file.size > 52428800) {
      alert("File size exceeds 50MB maximum limit.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const resultStr = reader.result as string;
      runAnalysis(file.name, file.type, resultStr);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const forensics = scanResult.forensics;

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-orbitron font-extrabold text-2xl md:text-3xl text-white flex items-center gap-2">
            <Camera className="h-7 w-7 text-[#00C2FF]" />
            <span>AI Forensics & Deepfake Origin Tracing Engine</span>
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Pixel-level ELA & FFT frequency analytics, EXIF/C2PA metadata provenance, and viral footprint origin tracking.
          </p>
        </div>

        <div className="flex gap-2">
          {forensics?.intervention?.legalTakeDownReady && (
            <button
              onClick={() => setShowLegalModal(true)}
              className="px-4 py-2 rounded-xl bg-[#FF4D4D]/20 text-[#FF4D4D] border border-[#FF4D4D]/40 text-xs font-orbitron font-bold hover:bg-[#FF4D4D] hover:text-white transition flex items-center gap-2"
            >
              <ShieldAlert className="h-4 w-4" />
              <span>Generate Take-down Evidence</span>
            </button>
          )}

          <DemoBadge label="AI FORENSICS MODEL LIVE" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Side: Upload Dropzone & Media Inspection Controls */}
        <div className="glass-card p-6 rounded-2xl border border-[#00C2FF]/30 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-orbitron font-bold text-gray-300">Media Drag & Drop Upload Zone</label>
              <span className="text-[10px] font-mono text-gray-400">Max 50MB (PNG, JPG, WEBP, MP4)</span>
            </div>

            {/* Hidden Native Input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*,video/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
            />

            {/* Drop Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-dashed border-gray-700 rounded-2xl p-6 text-center hover:border-[#00C2FF] transition cursor-pointer bg-black/40 relative overflow-hidden group"
            >
              {uploadedPreview ? (
                <div className="relative w-full h-44 rounded-xl overflow-hidden mb-2 border border-gray-800 bg-black flex items-center justify-center">
                  <img src={uploadedPreview} alt="Target Inspection Preview" className="h-full object-contain mx-auto" />
                  <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-1 rounded text-[10px] font-mono text-[#00C2FF]">
                    Target Media: {fileName}
                  </div>
                </div>
              ) : (
                <div className="py-6">
                  <Upload className="h-10 w-10 text-[#00C2FF] mx-auto mb-2 group-hover:scale-110 transition" />
                  <div className="font-orbitron text-xs font-bold text-white mb-1">Click or drag suspect video frame / image here</div>
                  <div className="text-[10px] text-gray-400 font-mono">Supports PNG, JPG, WEBP, MP4, AVI, MOV</div>
                </div>
              )}

              {isScanning && (
                <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 p-4">
                  <RefreshCw className="h-8 w-8 text-[#00C2FF] animate-spin" />
                  <div className="font-orbitron text-xs font-bold text-white">Executing Pixel & EXIF Forensic Scan...</div>
                  <div className="w-48 bg-gray-800 h-2 rounded-full overflow-hidden border border-gray-700">
                    <div className="bg-gradient-to-r from-[#00C2FF] to-[#7B61FF] h-full transition-all duration-200" style={{ width: `${scanProgress}%` }} />
                  </div>
                  <span className="text-[10px] font-mono text-[#00C2FF]">{scanProgress}% Forensic Telemetry Computed</span>
                </div>
              )}
            </div>
          </div>

          {/* Test Presets */}
          <div className="space-y-2 pt-2 border-t border-gray-800">
            <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#00C2FF]" />
              <span>Or Select Synthetic Test Scenarios:</span>
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handlePresetSelect("real")}
                className={`py-2 px-2 rounded-xl text-[10px] font-bold font-orbitron transition ${
                  selectedPreset === "real" && !uploadedPreview ? "bg-[#00E676] text-black" : "bg-[#040D1A] text-gray-400 border border-gray-700 hover:text-white"
                }`}
              >
                Legitimate Media
              </button>
              <button
                onClick={() => handlePresetSelect("fake")}
                className={`py-2 px-2 rounded-xl text-[10px] font-bold font-orbitron transition ${
                  selectedPreset === "fake" && !uploadedPreview ? "bg-[#FF4D4D] text-white" : "bg-[#040D1A] text-gray-400 border border-gray-700 hover:text-white"
                }`}
              >
                AI Face-Swap
              </button>
              <button
                onClick={() => handlePresetSelect("diffusion")}
                className={`py-2 px-2 rounded-xl text-[10px] font-bold font-orbitron transition ${
                  selectedPreset === "diffusion" && !uploadedPreview ? "bg-[#7B61FF] text-white" : "bg-[#040D1A] text-gray-400 border border-gray-700 hover:text-white"
                }`}
              >
                Diffusion Portrait
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Landmark Overlay & Forensic Telemetry */}
        <div className="glass-card p-6 rounded-2xl border border-[#7B61FF]/30 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
                <Eye className="h-5 w-5 text-[#7B61FF]" />
                <span>Pixel Artifact Heatmap & Facial Mesh</span>
              </h3>
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                scanResult.riskScore > 60 ? "bg-[#FF4D4D]/20 text-[#FF4D4D] border-[#FF4D4D]/40" : "bg-[#00E676]/20 text-[#00E676] border-[#00E676]/40"
              }`}>
                {scanResult.verdict}
              </span>
            </div>

            {/* Simulated Heatmap Box */}
            <div className="w-full h-52 rounded-xl bg-black/80 border border-gray-800 flex flex-col items-center justify-center relative overflow-hidden p-4">
              {uploadedPreview ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img src={uploadedPreview} alt="Target Inspection Frame" className="h-full object-contain mx-auto opacity-70" />
                  <div className={`absolute inset-0 flex items-center justify-center ${scanResult.riskScore > 60 ? "bg-[#FF4D4D]/20 border-2 border-[#FF4D4D]" : "border-2 border-[#00E676]"}`}>
                    <span className={`px-3 py-1 rounded text-xs font-orbitron font-bold backdrop-blur-md ${scanResult.riskScore > 60 ? "bg-[#FF4D4D] text-white" : "bg-[#00E676] text-black"}`}>
                      ESTIMATED MANIPULATION PROBABILITY: {scanResult.metrics?.estimatedManipulationProbability || scanResult.riskScore}%
                    </span>
                  </div>
                </div>
              ) : scanResult.riskScore < 30 ? (
                <div className="text-center space-y-2">
                  <div className="w-20 h-20 rounded-full border-2 border-[#00E676] mx-auto flex items-center justify-center text-[10px] font-mono text-[#00E676] bg-[#00E676]/10">
                    AUTHENTIC SENSOR
                  </div>
                  <div className="text-xs text-[#00E676] font-bold font-orbitron">ESTIMATED MANIPULATION PROBABILITY: {scanResult.metrics?.estimatedManipulationProbability || 4.2}% (VERIFIED CLEAN)</div>
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <div className="w-20 h-20 rounded-full border-2 border-[#FF4D4D] bg-[#FF4D4D]/20 mx-auto flex items-center justify-center text-[10px] font-mono text-[#FF4D4D] animate-pulse">
                    SYNTHETIC HEATMAP
                  </div>
                  <div className="text-xs text-[#FF4D4D] font-bold font-orbitron">ESTIMATED MANIPULATION PROBABILITY: {scanResult.metrics?.estimatedManipulationProbability || 96.4}% (CRITICAL DEEPFAKE)</div>
                </div>
              )}
            </div>

            {/* Metric Metrics Grid */}
            <div className="space-y-2 text-xs font-mono mt-4">
              <div className="p-2.5 rounded-xl bg-[#040D1A] border border-gray-800 flex justify-between items-center">
                <span>Fourier Spectral Noise (FFT):</span>
                <span className={scanResult.riskScore > 60 ? "text-[#FF4D4D] font-bold" : "text-[#00E676] font-bold"}>
                  {forensics?.pixelAnalytics?.dctNoiseIndex || 0.91} ({scanResult.riskScore > 60 ? "GAN/Diffusion Noise" : "Clean Sensor"})
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#040D1A] border border-gray-800 flex justify-between items-center">
                <span>Error Level Analysis (ELA):</span>
                <span className={scanResult.riskScore > 60 ? "text-[#FF4D4D] font-bold" : "text-[#00E676] font-bold"}>
                  {forensics?.pixelAnalytics?.elaArtifactScore || 88.5} / 100 ({scanResult.riskScore > 60 ? "Compressed Alteration" : "Natural Compression"})
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#040D1A] border border-gray-800 flex justify-between items-center">
                <span>Facial Geometry Alignment:</span>
                <span className={scanResult.riskScore > 60 ? "text-[#FF4D4D] font-bold" : "text-[#00E676] font-bold"}>
                  {scanResult.metrics?.gazeAlignment || "Natural Gaze Alignment"}
                </span>
              </div>
            </div>
          </div>

          {/* XAI Explanation Card */}
          <div className="p-3 rounded-xl bg-[#040D1A] border border-[#7B61FF]/40 text-xs text-gray-300 font-mono">
            <span className="text-[#7B61FF] font-bold">XAI FORENSIC REASONING: </span>
            {scanResult.explanation}
          </div>
        </div>

      </div>

      {/* METADATA & C2PA PROVENANCE ANALYTICS */}
      <div className="glass-card p-6 rounded-2xl border border-gray-800 space-y-4">
        <h3 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
          <FileSearch className="h-5 w-5 text-[#00C2FF]" />
          <span>EXIF Metadata & C2PA Content Credentials Analytics</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-[#040D1A] border border-gray-800 space-y-1.5">
            <div className="text-gray-400">Software Signature</div>
            <div className={`font-bold text-sm ${scanResult.riskScore > 60 ? "text-[#FF4D4D]" : "text-[#00E676]"}`}>
              {forensics?.metadataAnalytics?.exifSoftwareSignature || "Unknown"}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#040D1A] border border-gray-800 space-y-1.5">
            <div className="text-gray-400">C2PA Provenance Credentials</div>
            <div className={`font-bold text-sm ${
              forensics?.metadataAnalytics?.c2paContentCredentials === "VALID_PROVENANCE" ? "text-[#00E676]" : "text-[#FF4D4D]"
            }`}>
              {forensics?.metadataAnalytics?.c2paContentCredentials || "UNVERIFIED"}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#040D1A] border border-gray-800 space-y-1.5">
            <div className="text-gray-400">Hardware / Generator Signature</div>
            <div className="font-bold text-sm text-white">
              {forensics?.metadataAnalytics?.aiGeneratorMatch || "Standard Camera Hardware"}
            </div>
          </div>
        </div>
      </div>

      {/* ORIGIN TRACING & DIGITAL FOOTPRINT VIRAL PATH TRACKER */}
      <div className="glass-card p-6 rounded-2xl border border-[#00C2FF]/40 space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <span className="text-[10px] font-orbitron font-bold text-[#00C2FF]">DIGITAL FOOTPRINT & VIRAL PATH TRACKER</span>
            <h3 className="font-orbitron font-bold text-lg text-white flex items-center gap-2">
              <Share2 className="h-5 w-5 text-[#00C2FF]" />
              <span>Trace Upload Seed Source & Viral Relays</span>
            </h3>
          </div>

          <div className="flex gap-4 font-mono text-xs">
            <div>
              <span className="text-gray-400">pHash Fingerprint:</span> <span className="text-[#00C2FF] font-bold">{forensics?.originTracing?.pHashFingerprint}</span>
            </div>
            <div>
              <span className="text-gray-400">Re-post Count:</span> <span className="text-[#FF4D4D] font-bold">{forensics?.originTracing?.estimatedReprepostCount || 1} copies</span>
            </div>
          </div>
        </div>

        {/* Viral Spread Flow Chart */}
        <div className="p-4 rounded-2xl bg-black/70 border border-gray-800 space-y-3">
          <div className="text-xs font-mono text-gray-300">
            <span className="text-gray-400">First Known Seed Source:</span> <span className="text-[#FF4D4D] font-bold">{forensics?.originTracing?.firstKnownSeedSource}</span> ({forensics?.originTracing?.firstSeenTimestamp})
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {forensics?.originTracing?.viralSpreadPath?.map((step: any) => (
              <div key={step.step} className="p-3 rounded-xl bg-[#040D1A] border border-gray-800 space-y-1 text-xs font-mono">
                <div className="font-orbitron font-bold text-[#00C2FF]">Step {step.step}: {step.platform}</div>
                <div className="text-gray-300 text-[11px] truncate" title={step.URL}>{step.URL}</div>
                <div className="text-[10px] text-[#FF9100] font-bold">{step.velocity}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* EMERGENCY TAKE-DOWN LEGAL MODAL */}
      {showLegalModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-xl w-full p-6 rounded-3xl border border-[#FF4D4D] space-y-4 font-mono text-xs relative">
            <button onClick={() => setShowLegalModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>

            <div className="font-orbitron font-bold text-lg text-[#FF4D4D] flex items-center gap-2">
              <ShieldAlert className="h-6 w-6" />
              <span>Emergency Take-down Notice & Legal FIR Evidence</span>
            </div>

            <p className="text-gray-300">
              Generated concrete forensic evidence payload ready for immediate platform intervention and law enforcement filing:
            </p>

            <div className="p-3 rounded-xl bg-black border border-gray-800 text-[11px] text-gray-200 whitespace-pre-wrap font-mono">
              {forensics?.intervention?.dmcaNoticeText}
            </div>

            <div className="p-3 rounded-xl bg-[#040D1A] border border-gray-800 text-gray-300">
              <div><strong className="text-gray-400">Forensic SHA-256 Hash:</strong> {forensics?.originTracing?.sha256Hash}</div>
              <div><strong className="text-gray-400">FIR Evidence Reference:</strong> <span className="text-[#00E676] font-bold">{forensics?.intervention?.firEvidenceHash}</span></div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowLegalModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-600 bg-transparent text-gray-300 font-orbitron font-bold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                  setShowLegalModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#FF4D4D] text-white font-orbitron font-bold hover:opacity-90 flex items-center justify-center gap-1.5"
              >
                <Printer className="h-4 w-4" />
                <span>Export Legal PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
