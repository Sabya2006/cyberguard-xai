"use client";

import { useState } from "react";
import { analyzeURL, ThreatResult } from "@/lib/aiEngine";
import DemoBadge from "@/components/DemoBadge";
import Link from "next/link";
import { Globe, Search, ShieldCheck, AlertOctagon, History, FileText, Download } from "lucide-react";

export default function URLScannerPage() {
  const [urlInput, setUrlInput] = useState("http://secure-bput-login-update.xyz");
  const [result, setResult] = useState<ThreatResult | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [history, setHistory] = useState<Array<{ url: string; score: number; verdict: string; time: string }>>([
    { url: "http://secure-bput-login.xyz", score: 94, verdict: "CRITICAL MALICIOUS PHISHING DOMAIN", time: "10 mins ago" },
    { url: "https://bput.ac.in", score: 12, verdict: "SAFE DOMAIN", time: "1 hour ago" },
  ]);

  const handleAudit = async () => {
    setIsAuditing(true);
    try {
      const response = await fetch("/api/scan/url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUrl: urlInput }),
      });

      if (response.ok) {
        const json = await response.json();
        setResult(json.data);
        setHistory((prev) => [
          { url: urlInput, score: json.data.riskScore, verdict: json.data.verdict, time: "Just now" },
          ...prev,
        ]);
      } else {
        const res = analyzeURL(urlInput);
        setResult(res);
        setHistory((prev) => [
          { url: urlInput, score: res.riskScore, verdict: res.verdict, time: "Just now" },
          ...prev,
        ]);
      }
    } catch {
      const res = analyzeURL(urlInput);
      setResult(res);
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-orbitron font-extrabold text-2xl md:text-3xl text-white flex items-center gap-2">
            <Globe className="h-7 w-7 text-[#00C2FF]" />
            <span>AI Module 2: Malicious URL Heuristics & Audit</span>
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Automated SSL validation, WHOIS domain age inspection, structural entropy scoring, and brand keyword spoofing detection.
          </p>
        </div>

        <DemoBadge label="HEURISTIC DOMAIN SIMULATION" />
      </div>

      <div className="glass-card p-6 rounded-2xl border border-[#00C2FF]/30 space-y-4">
        <label className="text-xs font-orbitron font-bold text-gray-300">Enter Target Website URL</label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 p-3 rounded-xl bg-[#040D1A] border border-gray-700 text-xs font-mono text-white focus:outline-none focus:border-[#00C2FF]"
            placeholder="http://example-domain.com"
          />
          <button
            onClick={handleAudit}
            disabled={isAuditing}
            className="px-6 py-3 rounded-xl bg-[#00C2FF] text-black font-orbitron font-bold text-xs hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Search className="h-4 w-4" />
            <span>{isAuditing ? "Auditing Domain..." : "Audit Domain"}</span>
          </button>
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`glass-card p-6 rounded-2xl border ${result.riskScore > 60 ? "border-[#FF4D4D]" : "border-[#00E676]"}`}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-orbitron font-bold text-base text-white">Audit Verdict</h3>
              <DemoBadge label="HEURISTICS COMPLETE" />
            </div>
            <div className="text-3xl font-orbitron font-extrabold mb-2" style={{ color: result.riskScore > 60 ? "#FF4D4D" : "#00E676" }}>
              {result.verdict}
            </div>
            <p className="text-xs text-gray-300 font-mono mb-4">{result.explanation}</p>

            {result.riskScore > 60 && (
              <div className="p-3 rounded-xl bg-[#FF4D4D]/20 border border-[#FF4D4D] text-center font-orbitron font-bold text-xs text-[#FF4D4D]">
                AUTOMATED REVERSE-PROXY BLOCK ENFORCED
              </div>
            )}
          </div>

          <div className="glass-card p-6 rounded-2xl border border-[#7B61FF]/30 space-y-3">
            <h3 className="font-orbitron font-bold text-base text-white mb-2">Detailed Heuristic Breakdown</h3>

            <div className="p-3 rounded-lg bg-black/40 border border-gray-800 flex justify-between text-xs font-mono">
              <span>SSL Encryption Status:</span>
              <span className={result.metrics.sslValid ? "text-[#00E676] font-bold" : "text-[#FF4D4D] font-bold"}>
                {result.metrics.sslValid ? "Valid HTTPS Certificate" : "Untrusted / Invalid SSL"}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-gray-800 flex justify-between text-xs font-mono">
              <span>WHOIS Domain Registration Age:</span>
              <span className={result.metrics.domainAgeDays < 30 ? "text-[#FFB800] font-bold" : "text-white font-bold"}>
                {result.metrics.domainAgeDays} Days Old
              </span>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-gray-800 flex justify-between text-xs font-mono">
              <span>Character Entropy Index:</span>
              <span className="text-[#00C2FF] font-bold">{result.metrics.characterEntropy}</span>
            </div>
          </div>
        </div>
      )}

      {/* Scan History Section */}
      <div className="glass-card p-6 rounded-2xl border border-gray-800 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-[#00C2FF]" />
            <h3 className="font-orbitron font-bold text-sm text-white">Recent Domain Audits History</h3>
          </div>
          <Link href="/dashboard/reports" className="flex items-center gap-1 text-xs text-[#00C2FF] font-orbitron hover:underline">
            <FileText className="h-3.5 w-3.5" />
            <span>Export Report</span>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 font-orbitron">
                <th className="py-2.5 px-3">TARGET URL</th>
                <th className="py-2.5 px-3">VERDICT</th>
                <th className="py-2.5 px-3">RISK SCORE</th>
                <th className="py-2.5 px-3">TIMESTAMP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {history.map((h, idx) => (
                <tr key={idx} className="hover:bg-[#040D1A]/50">
                  <td className="py-3 px-3 text-[#00C2FF] font-bold">{h.url}</td>
                  <td className="py-3 px-3 text-white">{h.verdict}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded font-bold ${h.score > 60 ? "bg-[#FF4D4D]/20 text-[#FF4D4D]" : "bg-[#00E676]/20 text-[#00E676]"}`}>
                      {h.score} / 100
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-400">{h.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

