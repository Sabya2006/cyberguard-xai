"use client";

import { useState } from "react";
import { analyzePhishingNLP, ThreatResult } from "@/lib/aiEngine";
import DemoBadge from "@/components/DemoBadge";
import { Mail, Search, AlertTriangle, CheckCircle2, ShieldAlert, ChevronDown, ChevronUp, Upload } from "lucide-react";

export default function PhishingScannerPage() {
  const [emailText, setEmailText] = useState(
    "From: security-alert@bput-update-portal.net\nSubject: URGENT: Account Suspension Notice\n\nDear User,\nYour portal credentials will be TERMINATED within 2 hours. Click http://bit.ly/bput-auth-login-verify immediately to verify your password."
  );

  const [result, setResult] = useState<ThreatResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showXaiDetails, setShowXaiDetails] = useState(true);

  const presets = {
    phish1: "From: security-alert@bput-update-portal.net\nSubject: URGENT: Account Suspension Notice\n\nDear User,\nYour portal credentials will be TERMINATED within 2 hours. Click http://bit.ly/bput-auth-login-verify immediately to verify your password.",
    phish2: "From: ceo-office@corporate-bput.org\nSubject: URGENT WIRE TRANSFER REQUEST\n\nPlease execute an immediate offshore wire transfer of $45,000 to vendor account #89042 within 30 minutes.",
    safe1: "From: registrar@bput.ac.in\nSubject: Semester Examination Timetable Published\n\nDear Students,\nThe autumn semester examination timetable has been officially published on the university portal.",
  };

  const handleScan = async () => {
    setIsScanning(true);
    setResult(null);

    try {
      const response = await fetch("/api/scan/phishing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailText }),
      });

      if (response.ok) {
        const json = await response.json();
        setResult(json.data);
      } else {
        // Fallback to client-side engine if API route fails
        const res = analyzePhishingNLP(emailText);
        setResult(res);
      }
    } catch {
      const res = analyzePhishingNLP(emailText);
      setResult(res);
    } finally {
      setIsScanning(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setEmailText(event.target.result as string);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-orbitron font-extrabold text-2xl md:text-3xl text-white flex items-center gap-2">
            <Mail className="h-7 w-7 text-[#00C2FF]" />
            <span>AI Module 1: Email Phishing NLP Inspector</span>
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Transformer neural network dissecting semantic intent, urgency flags, header spoofing, and disguised links.
          </p>
        </div>

        <DemoBadge label="TRANSFORMER NLP SIMULATION" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Side: Input & Drag-and-Drop */}
        <div className="glass-card p-6 rounded-2xl border border-[#00C2FF]/30 space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs font-orbitron font-bold text-gray-300">Target Email Content / Drop Zone</label>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-400 font-mono">Preset:</span>
              <select
                onChange={(e) => setEmailText(presets[e.target.value as keyof typeof presets])}
                className="bg-[#040D1A] border border-[#00C2FF]/40 text-xs p-1.5 rounded text-white focus:outline-none font-mono"
              >
                <option value="phish1">Urgent Account Suspension</option>
                <option value="phish2">CEO Wire Transfer Request</option>
                <option value="safe1">Legitimate Portal Update</option>
              </select>
            </div>
          </div>

          <textarea
            rows={8}
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="w-full p-4 rounded-xl bg-[#040D1A] border border-gray-700 text-xs font-mono text-gray-200 focus:outline-none focus:border-[#00C2FF] transition"
            placeholder="Paste raw email header and body, or drag and drop a .eml/.txt file..."
          />

          <div className="text-[10px] text-gray-400 font-mono flex items-center gap-1.5">
            <Upload className="h-3 w-3 text-[#00C2FF]" />
            <span>Drag and drop raw text files into the box above to load telemetry</span>
          </div>

          <button
            onClick={handleScan}
            disabled={isScanning}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#7B61FF] text-black font-orbitron font-bold text-xs shadow-lg shadow-[#00C2FF]/30 hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Search className="h-4 w-4" />
            <span>{isScanning ? "Scanning Intent with Transformer NLP..." : "Analyze Email with NLP Transformer"}</span>
          </button>
        </div>

        {/* Right Side: Scan Results & Expandable Breakdown */}
        <div className="glass-card p-6 rounded-2xl border border-[#7B61FF]/30 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-orbitron font-bold text-base text-white">NLP Diagnostic Analysis Result</h3>
              {result && <DemoBadge label="XAI VERIFIED" />}
            </div>

            {isScanning ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-12 h-12 rounded-full border-2 border-[#00C2FF] border-t-transparent animate-spin mx-auto" />
                <div className="text-xs font-mono text-[#00C2FF]">Dissecting Transformer Attention Layers...</div>
              </div>
            ) : result ? (
              <div className="space-y-4">
                {/* Score Banner */}
                <div className={`p-4 rounded-xl border flex items-center justify-between ${
                  result.riskScore > 60 ? "bg-[#FF4D4D]/15 border-[#FF4D4D] text-[#FF4D4D]" : "bg-[#00E676]/15 border-[#00E676] text-[#00E676]"
                }`}>
                  <div>
                    <div className="font-orbitron font-bold text-lg">{result.verdict}</div>
                    <div className="text-xs font-mono mt-1">Severity: {result.severity.toUpperCase()}</div>
                  </div>
                  <div className="font-orbitron text-3xl font-extrabold">{result.riskScore}%</div>
                </div>

                {/* Metrics */}
                <div className="space-y-2 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-black/40 border border-gray-800 flex justify-between">
                    <span>Intent Classification:</span>
                    <span className="text-white font-bold">{result.metrics.intentCategory}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-gray-800">
                    <div className="mb-1 text-gray-400">Isolated Threat Keyword Triggers:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {result.metrics.keywordsIsolated.map((kw: string, idx: number) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-[#FF4D4D]/20 text-[#FF4D4D] border border-[#FF4D4D]/40 text-[10px]">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Expandable Accordion: Why did the AI flag this? */}
                <div className="rounded-xl border border-[#00C2FF]/30 overflow-hidden bg-[#040D1A]">
                  <button
                    onClick={() => setShowXaiDetails(!showXaiDetails)}
                    className="w-full p-3 flex items-center justify-between text-xs font-orbitron font-bold text-[#00C2FF] hover:bg-[#0D253F]/60 transition"
                  >
                    <span>Why did the AI flag this? (XAI Breakdown)</span>
                    {showXaiDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>

                  {showXaiDetails && (
                    <div className="p-3 border-t border-gray-800 text-xs text-gray-300 font-mono space-y-2">
                      <p>{result.explanation}</p>
                      <div className="pt-2 text-[10px] text-gray-400 border-t border-gray-800">
                        * Note: This NLP inspection reflects weighted semantic heuristic metrics and keyword vector matching.
                      </div>
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div className="text-center my-auto py-16 text-gray-500 font-mono text-xs">
                Click "Analyze Email" to run Transformer NLP classification.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}

