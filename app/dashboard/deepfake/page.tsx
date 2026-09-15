"use client";

import { useState } from "react";
import DemoBadge from "@/components/DemoBadge";
import { Camera, Upload, ShieldAlert, CheckCircle2, Eye, AlertTriangle } from "lucide-react";

export default function DeepfakeDetectorPage() {
  const [mode, setMode] = useState<"real" | "fake">("fake");

  return (
    <div className="space-y-6">
      
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

        <DemoBadge label="COMPUTER VISION MODEL SIMULATION" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Side: Upload Dropzone & Frame Preview */}
        <div className="glass-card p-6 rounded-2xl border border-[#00C2FF]/30 space-y-4">
          <label className="text-xs font-orbitron font-bold text-gray-300">Media Drag & Drop Upload Zone</label>
          
          <div className="border-2 border-dashed border-gray-700 rounded-2xl p-8 text-center hover:border-[#00C2FF] transition cursor-pointer bg-black/40">
            <Upload className="h-10 w-10 text-[#00C2FF] mx-auto mb-2" />
            <div className="font-orbitron text-xs font-bold text-white mb-1">Drag video frame or photo here</div>
            <div className="text-[10px] text-gray-400 font-mono">Supports MP4, AVI, PNG, JPG (Max 50MB)</div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-xs font-mono text-gray-400">Simulate Frame Inspection:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setMode("real")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-orbitron ${
                  mode === "real" ? "bg-[#00E676] text-black" : "bg-[#040D1A] text-gray-400 border border-gray-700"
                }`}
              >
                Legitimate Frame
              </button>
              <button
                onClick={() => setMode("fake")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-orbitron ${
                  mode === "fake" ? "bg-[#FF4D4D] text-white" : "bg-[#040D1A] text-gray-400 border border-gray-700"
                }`}
              >
                Synthetic Frame
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Computer Vision Heatmap */}
        <div className="glass-card p-6 rounded-2xl border border-[#7B61FF]/30 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-orbitron font-bold text-base text-white">Computer Vision Landmark Overlay</h3>
              <DemoBadge label="MODEL PROBABILITY" />
            </div>

            <div className="w-full h-52 rounded-xl bg-black/70 border border-gray-800 flex flex-col items-center justify-center relative overflow-hidden p-4">
              {mode === "real" ? (
                <div className="text-center space-y-2">
                  <div className="w-20 h-20 rounded-full border-2 border-[#00E676] mx-auto flex items-center justify-center text-xs font-mono text-[#00E676]">
                    68 LANDMARKS
                  </div>
                  <div className="text-xs text-[#00E676] font-bold font-orbitron">ESTIMATED MANIPULATION PROBABILITY: 4.2% (AUTHENTIC)</div>
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <div className="w-20 h-20 rounded-full border-2 border-[#FF4D4D] bg-[#FF4D4D]/20 mx-auto flex items-center justify-center text-xs font-mono text-[#FF4D4D] animate-pulse">
                    HEATMAP
                  </div>
                  <div className="text-xs text-[#FF4D4D] font-bold font-orbitron">ESTIMATED MANIPULATION PROBABILITY: 94.8% (HIGH SYNTHETIC RISK)</div>
                </div>
              )}
            </div>

            <div className="space-y-2 text-xs font-mono mt-4">
              <div className="p-2.5 rounded bg-black/40 border border-gray-800 flex justify-between">
                <span>Facial Geometry Alignment:</span>
                <span className={mode === "real" ? "text-[#00E676] font-bold" : "text-[#FF4D4D] font-bold"}>
                  {mode === "real" ? "Natural Gaze Alignment" : "Lip-Sync Boundary Distortion"}
                </span>
              </div>
              <div className="p-2.5 rounded bg-black/40 border border-gray-800 flex justify-between">
                <span>Fourier Spectral Noise Index:</span>
                <span className={mode === "real" ? "text-[#00E676] font-bold" : "text-[#FF4D4D] font-bold"}>
                  {mode === "real" ? "0.08 (Clean Sensor)" : "0.89 (GAN/Diffusion Noise)"}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

