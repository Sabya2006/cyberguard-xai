"use client";

import { useState, useRef } from "react";
import DemoBadge from "@/components/DemoBadge";
import { Camera, Upload, ShieldAlert, CheckCircle2, Eye, AlertTriangle, RefreshCw, FileText, Image as ImageIcon, Sparkles } from "lucide-react";

export default function DeepfakeDetectorPage() {
  const [selectedPreset, setSelectedPreset] = useState<"real" | "fake" | "diffusion">("fake");
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("deepfake_faceswap_sample.mp4");
  const [scanResult, setScanResult] = useState<any>({
    riskScore: 95,
    severity: "critical",
    verdict: "HIGH SYNTHETIC MANIPULATION PROBABILITY",
    explanation: "Spatial landmark misalignment detected across 68 facial mesh nodes. High Fourier spectral noise index (0.89) indicating GAN/Diffusion neural generation artifacts.",
    metrics: {
      facialLandmarksDetected: 68,
      spectralNoiseIndex: 0.89,
      gazeAlignment: "Lip-Sync Boundary Distortion",
      estimatedManipulationProbability: 94.8,
      bvhMeshBoundaryError: "High (4.82mm offset)",
      confidenceScore: "98.4% Synthetic",
    },
  });

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
      }
    } catch (err) {
      clearInterval(interval);
      setScanProgress(100);
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

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-orbitron font-extrabold text-2xl md:text-3xl text-white flex items-center gap-2">
            <Camera className="h-7 w-7 text-[#00C2FF]" />
            <span>AI Module 3: Deepfake Media & CV Inspection</span>
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-1">
            OpenCV CNN facial landmark mesh alignment, spatial artifact heatmap isolation, and Fourier frequency noise detection.
          </p>
        </div>

        <DemoBadge label="COMPUTER VISION MODEL ACTIVE" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Side: Upload Dropzone & Preset Controls */}
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
                <div className="relative w-full h-40 rounded-xl overflow-hidden mb-2 border border-gray-800 bg-black flex items-center justify-center">
                  <img src={uploadedPreview} alt="User Media Preview" className="h-full object-contain mx-auto" />
                  <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-1 rounded text-[10px] font-mono text-[#00C2FF]">
                    Uploaded: {fileName}
                  </div>
                </div>
              ) : (
                <div className="py-4">
                  <Upload className="h-10 w-10 text-[#00C2FF] mx-auto mb-2 group-hover:scale-110 transition" />
                  <div className="font-orbitron text-xs font-bold text-white mb-1">Click or drag video frame / image here</div>
                  <div className="text-[10px] text-gray-400 font-mono">Supports PNG, JPG, WEBP, MP4, AVI</div>
                </div>
              )}

              {isScanning && (
                <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 p-4">
                  <RefreshCw className="h-8 w-8 text-[#00C2FF] animate-spin" />
                  <div className="font-orbitron text-xs font-bold text-white">Running 68-Landmark CV Mesh Scan...</div>
                  <div className="w-48 bg-gray-800 h-2 rounded-full overflow-hidden border border-gray-700">
                    <div className="bg-gradient-to-r from-[#00C2FF] to-[#7B61FF] h-full transition-all duration-200" style={{ width: `${scanProgress}%` }} />
                  </div>
                  <span className="text-[10px] font-mono text-[#00C2FF]">{scanProgress}% Completed</span>
                </div>
              )}
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="space-y-2 pt-2 border-t border-gray-800">
            <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#00C2FF]" />
              <span>Or Select Synthetic Test Presets:</span>
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handlePresetSelect("real")}
                className={`py-2 px-2 rounded-xl text-[10px] font-bold font-orbitron transition ${
                  selectedPreset === "real" && !uploadedPreview ? "bg-[#00E676] text-black" : "bg-[#040D1A] text-gray-400 border border-gray-700 hover:text-white"
                }`}
              >
                Legitimate Frame
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

        {/* Right Side: Computer Vision Heatmap & Telemetry */}
        <div className="glass-card p-6 rounded-2xl border border-[#7B61FF]/30 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
                <Eye className="h-5 w-5 text-[#7B61FF]" />
                <span>Landmark Mesh & Heatmap Overlay</span>
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
                    68 NODES OK
                  </div>
                  <div className="text-xs text-[#00E676] font-bold font-orbitron">ESTIMATED MANIPULATION PROBABILITY: {scanResult.metrics?.estimatedManipulationProbability || 4.2}% (AUTHENTIC)</div>
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <div className="w-20 h-20 rounded-full border-2 border-[#FF4D4D] bg-[#FF4D4D]/20 mx-auto flex items-center justify-center text-[10px] font-mono text-[#FF4D4D] animate-pulse">
                    HEATMAP
                  </div>
                  <div className="text-xs text-[#FF4D4D] font-bold font-orbitron">ESTIMATED MANIPULATION PROBABILITY: {scanResult.metrics?.estimatedManipulationProbability || 94.8}% (HIGH SYNTHETIC RISK)</div>
                </div>
              )}
            </div>

            {/* Metric Metrics Grid */}
            <div className="space-y-2 text-xs font-mono mt-4">
              <div className="p-2.5 rounded-xl bg-[#040D1A] border border-gray-800 flex justify-between items-center">
                <span>Facial Geometry Alignment:</span>
                <span className={scanResult.riskScore > 60 ? "text-[#FF4D4D] font-bold" : "text-[#00E676] font-bold"}>
                  {scanResult.metrics?.gazeAlignment || "Natural Gaze Alignment"}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#040D1A] border border-gray-800 flex justify-between items-center">
                <span>Fourier Spectral Noise Index:</span>
                <span className={scanResult.riskScore > 60 ? "text-[#FF4D4D] font-bold" : "text-[#00E676] font-bold"}>
                  {scanResult.metrics?.spectralNoiseIndex || 0.08} ({scanResult.riskScore > 60 ? "GAN/Diffusion Noise" : "Clean Sensor"})
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#040D1A] border border-gray-800 flex justify-between items-center">
                <span>3D BVH Mesh Boundary Error:</span>
                <span className={scanResult.riskScore > 60 ? "text-[#FF4D4D] font-bold" : "text-[#00E676] font-bold"}>
                  {scanResult.metrics?.bvhMeshBoundaryError || "< 0.12mm"}
                </span>
              </div>
            </div>
          </div>

          {/* XAI Explanation Card */}
          <div className="p-3 rounded-xl bg-[#040D1A] border border-[#7B61FF]/40 text-xs text-gray-300 font-mono">
            <span className="text-[#7B61FF] font-bold">XAI REASONING: </span>
            {scanResult.explanation}
          </div>
        </div>

      </div>

    </div>
  );
}
