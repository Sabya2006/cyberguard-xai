"use client";

import { useState, useEffect } from "react";
import DemoBadge from "@/components/DemoBadge";
import {
  ShieldAlert,
  Mail,
  Key,
  CreditCard,
  PhoneCall,
  Camera,
  Bot,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Radio,
  FileText,
  Send,
  RefreshCw,
  BarChart3,
  Search,
} from "lucide-react";

export default function FraudReportingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("phishing_link");
  const [evidenceTarget, setEvidenceTarget] = useState<string>("http://secure-bput-login.xyz");
  const [financialLoss, setFinancialLoss] = useState<string>("25000");
  const [statement, setStatement] = useState<string>("Received an urgent SMS claiming account termination in 2 hours unless I clicked the link and entered my UPI PIN.");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const [analyticsData, setAnalyticsData] = useState<any>({
    total_reports_submitted: 1482,
    categories_breakdown: [
      { category: "Phishing Links & Spoofed Websites", count: 624, percent: 42, color: "#00C2FF" },
      { category: "OTP & Credential Theft Scams", count: 415, percent: 28, color: "#FF4D4D" },
      { category: "UPI / Banking Transaction Fraud", count: 267, percent: 18, color: "#FF9100" },
      { category: "Telecom / Impersonation Calls", count: 118, percent: 8, color: "#7B61FF" },
      { category: "Deepfake & Media Extortion", count: 58, percent: 4, color: "#00E676" },
    ],
    recurring_hotspots: [
      { pattern: "Fake Electricity Bill Disconnection SMS", vector: "OTP / SMS", reports: 248, risk: "CRITICAL" },
      { pattern: "Bit.ly Shortened Link Targeting Bank Credentials", vector: "Phishing URL", reports: 192, risk: "CRITICAL" },
      { pattern: "WhatsApp Part-Time Job Income Fraud", vector: "UPI Transfer", reports: 114, risk: "HIGH" },
      { pattern: "AI Voice Mimicry Emergency Ransom Call", vector: "Deepfake Voice", reports: 42, risk: "HIGH" },
    ],
    recent_threat_alerts: [
      { alert_id: "ALT-9041", title: "Emerging Phishing Campaign: Spoofed Bank KYC Portal", status: "ACTIVE ALERT", time: "10 mins ago" },
      { alert_id: "ALT-8912", title: "Automated OTP Interception Bot via Malicious APK", status: "CONTAINED", time: "1 hour ago" },
    ],
  });

  const categories = [
    { id: "phishing_link", label: "Phishing Links & Spoofed Sites", icon: Mail, desc: "Fake login URLs, spoofed portals, SMS links" },
    { id: "otp_scam", label: "OTP & Credential Theft", icon: Key, desc: "Interception of 2FA codes, password harvesting" },
    { id: "bank_fraud", label: "UPI & Banking Transaction", icon: CreditCard, desc: "Unauthorized debit, fake QR codes, refund fraud" },
    { id: "telecom_call", label: "Telecom / Impersonation Call", icon: PhoneCall, desc: "Fake police, electricity department, KYC calls" },
    { id: "deepfake_extortion", label: "Deepfake & Media Extortion", icon: Camera, desc: "AI video calls, cloned voice ransom demands" },
    { id: "ai_bot", label: "AI Investment & Trading Bot", icon: Bot, desc: "Fake crypto trading bots, guaranteed ROI scams" },
  ];

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/fraud-reporting/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: selectedCategory,
          evidence_target: evidenceTarget,
          impact_loss_inr: Number(financialLoss),
          victim_statement: statement,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setAnalysisResult(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-orbitron font-extrabold text-2xl md:text-3xl text-white flex items-center gap-2">
            <ShieldAlert className="h-7 w-7 text-[#FF4D4D]" />
            <span>Victim Fraud Portal & AI Threat Vector Analyzer</span>
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Intuitive victim reporting interface, automated scam categorization, recurring pattern identification, and real-time threat alert triggering.
          </p>
        </div>

        <DemoBadge label="AI THREAT CATEGORIZER ACTIVE" />
      </div>

      {/* Top Stat Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-5 rounded-2xl border border-[#00C2FF]/40 space-y-1">
          <span className="text-[10px] font-orbitron font-bold text-gray-400">TOTAL REPORTS ANALYZED</span>
          <div className="font-orbitron font-extrabold text-2xl text-[#00C2FF]">{analyticsData.total_reports_submitted}</div>
          <span className="text-[10px] font-mono text-gray-400">Cross-verified in cluster</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-[#FF4D4D]/40 space-y-1">
          <span className="text-[10px] font-orbitron font-bold text-gray-400">TOP VECTOR CATEGORY</span>
          <div className="font-orbitron font-extrabold text-lg text-[#FF4D4D]">Phishing URLs (42%)</div>
          <span className="text-[10px] font-mono text-gray-400">High recurrence frequency</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-[#FF9100]/40 space-y-1">
          <span className="text-[10px] font-orbitron font-bold text-gray-400">RECURRING SCAM HOTSPOTS</span>
          <div className="font-orbitron font-extrabold text-2xl text-[#FF9100]">4 Identified</div>
          <span className="text-[10px] font-mono text-gray-400">Pattern signature matched</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-[#00E676]/40 space-y-1">
          <span className="text-[10px] font-orbitron font-bold text-gray-400">THREAT ALERTS FIRED</span>
          <div className="font-orbitron font-extrabold text-2xl text-[#00E676]">2 Active</div>
          <span className="text-[10px] font-mono text-gray-400">Broadcast to SOC network</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Fraud Intake & Category Selector */}
        <div className="md:col-span-2 space-y-6">
          
          <div className="glass-card p-6 rounded-2xl border border-[#FF4D4D]/40 space-y-6">
            <h3 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#FF4D4D]" />
              <span>Step 1: Select Fraud Category & Vector</span>
            </h3>

            {/* Category Cards Selector Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <div
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                      isSelected
                        ? "bg-gradient-to-br from-[#FF4D4D]/20 to-[#040D1A] border-[#FF4D4D] shadow-lg shadow-[#FF4D4D]/20 scale-[1.02]"
                        : "bg-[#040D1A]/70 border-gray-800 hover:border-gray-700 hover:bg-[#040D1A]"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className={`h-4 w-4 ${isSelected ? "text-[#FF4D4D]" : "text-gray-400"}`} />
                      <span className={`font-orbitron font-bold text-xs ${isSelected ? "text-white" : "text-gray-300"}`}>
                        {cat.label}
                      </span>
                    </div>
                    <p className="text-[10px] font-mono text-gray-400 leading-normal">{cat.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Step 2: Experience & Evidence Intake Form */}
            <form onSubmit={handleSubmitReport} className="space-y-4 pt-4 border-t border-gray-800 text-xs font-mono">
              <h3 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#00C2FF]" />
                <span>Step 2: Fraud Evidence & Impact Details</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-1">Evidence Target (URL / Phone / UPI / Email)</label>
                  <input
                    type="text"
                    required
                    value={evidenceTarget}
                    onChange={(e) => setEvidenceTarget(e.target.value)}
                    placeholder="http://scam-site.xyz or +91 99999 00000"
                    className="w-full p-2.5 rounded-xl bg-[#040D1A] border border-gray-700 text-white font-mono focus:border-[#00C2FF] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-1">Financial Loss Amount (INR ₹)</label>
                  <input
                    type="number"
                    value={financialLoss}
                    onChange={(e) => setFinancialLoss(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#040D1A] border border-gray-700 text-white font-mono focus:border-[#00C2FF] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Victim Statement & Modus Operandi Narrative</label>
                <textarea
                  rows={3}
                  required
                  value={statement}
                  onChange={(e) => setStatement(e.target.value)}
                  placeholder="Describe how the scammer contacted you, what link/OTP was requested, and what happened..."
                  className="w-full p-2.5 rounded-xl bg-[#040D1A] border border-gray-700 text-white font-mono focus:border-[#00C2FF] outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF4D4D] to-[#FF9100] text-white font-orbitron font-extrabold text-xs hover:opacity-90 transition flex items-center justify-center gap-2 shadow-lg shadow-[#FF4D4D]/20"
              >
                {isSubmitting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                <span>Submit Report for Automated AI Categorization & Vector Analysis</span>
              </button>
            </form>
          </div>

          {/* AI Analysis Result Card (If Submitted) */}
          {analysisResult && (
            <div className="glass-card p-6 rounded-2xl border border-[#00C2FF] space-y-4 relative overflow-hidden animate-in fade-in duration-300">
              
              {/* Emergency Alert Banner if New Threat Vector Triggered */}
              {analysisResult.new_threat_vector_alert_triggered && (
                <div className="p-3.5 rounded-xl bg-[#FF4D4D]/20 border border-[#FF4D4D] text-xs font-mono text-[#FF4D4D] flex items-center gap-3 animate-pulse">
                  <Radio className="h-5 w-5 shrink-0" />
                  <div>
                    <strong className="font-orbitron font-bold">EMERGENCY THREAT VECTOR ALERT TRIGGERED: </strong>
                    {analysisResult.alert_details?.vector_signature}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap justify-between items-center gap-4 border-b border-gray-800 pb-3">
                <div>
                  <span className="text-[10px] font-orbitron font-bold text-[#00C2FF]">CLASSIFICATION RESULT</span>
                  <h3 className="font-orbitron font-bold text-lg text-white">
                    TICKET {analysisResult.report_ticket_id} — {analysisResult.classified_category}
                  </h3>
                </div>

                <span className={`px-3 py-1 rounded text-xs font-orbitron font-bold uppercase border ${
                  analysisResult.threat_severity === "CRITICAL" ? "bg-[#FF4D4D] text-white border-[#FF4D4D]" : "bg-[#FF9100] text-black border-[#FF9100]"
                }`}>
                  SEVERITY: {analysisResult.threat_severity} ({analysisResult.risk_score}/100)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 rounded-xl bg-black/60 border border-gray-800 space-y-1">
                  <span className="text-gray-400 text-[10px]">Identified Recurring Scam Method:</span>
                  <div className="text-[#00C2FF] font-bold">{analysisResult.recurring_scam_pattern_identified}</div>
                </div>

                <div className="p-3 rounded-xl bg-black/60 border border-gray-800 space-y-1">
                  <span className="text-gray-400 text-[10px]">Recurrence Frequency Index:</span>
                  <div className="text-[#FF9100] font-bold">{analysisResult.recurrence_frequency} Matches Logged across SOC Network</div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Right Col: Threat Vector Distribution & Recurring Scam Hotspots */}
        <div className="space-y-6">
          
          {/* Threat Vector Distribution Chart */}
          <div className="glass-card p-6 rounded-2xl border border-gray-800 space-y-4">
            <h3 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#00C2FF]" />
              <span>Threat Vector Distribution</span>
            </h3>

            <div className="space-y-3">
              {analyticsData.categories_breakdown?.map((cat: any, idx: number) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-300 truncate max-w-[180px]">{cat.category}</span>
                    <span className="font-bold text-white">{cat.percent}% ({cat.count})</span>
                  </div>
                  <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden border border-gray-800">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${cat.percent}%`, backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recurring Scam Hotspots */}
          <div className="glass-card p-6 rounded-2xl border border-gray-800 space-y-4">
            <h3 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#FF9100]" />
              <span>Recurring Scam Hotspots</span>
            </h3>

            <div className="space-y-2.5">
              {analyticsData.recurring_hotspots?.map((hot: any, i: number) => (
                <div key={i} className="p-3 rounded-xl bg-black/60 border border-gray-800 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-orbitron font-bold text-xs text-white truncate max-w-[180px]">{hot.pattern}</span>
                    <span className="px-1.5 py-0.5 rounded bg-[#FF4D4D]/20 text-[#FF4D4D] text-[9px] font-mono font-bold border border-[#FF4D4D]/40">
                      {hot.risk}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-gray-400">
                    Vector: <span className="text-[#00C2FF]">{hot.vector}</span> • {hot.reports} Frequency Reports
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
