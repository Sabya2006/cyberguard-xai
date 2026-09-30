"use client";

import { useState } from "react";
import DemoBadge from "@/components/DemoBadge";
import {
  ShieldCheck,
  Globe,
  Mail,
  Building2,
  Lock,
  Link as LinkIcon,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  RefreshCw,
  Search,
  Sparkles,
  FileText,
  Sliders,
} from "lucide-react";
import { evaluateMultiLayerIdentity, IdentityVerificationResult } from "@/lib/identityVerificationEngine";

export default function IdentityVerificationPage() {
  const [senderName, setSenderName] = useState("BPUT Examination Cell Support");
  const [senderEmail, setSenderEmail] = useState("bput-alerts-notice@gmail.com");
  const [claimedOrg, setClaimedOrg] = useState("BPUT Odisha University");
  const [displayedLink, setDisplayedLink] = useState("https://bput.ac.in/verify-fees");
  const [actualUrl, setActualUrl] = useState("http://secure-bput-login.xyz/pay-portal");
  const [messageBody, setMessageBody] = useState("Urgent notice: Your semester fee registration is incomplete. Click the link above to enter your password and UPI PIN within 2 hours or your account will be suspended.");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [analysis, setAnalysis] = useState<IdentityVerificationResult>(() =>
    evaluateMultiLayerIdentity({
      senderDisplayName: "BPUT Examination Cell Support",
      senderEmail: "bput-alerts-notice@gmail.com",
      claimedOrganization: "BPUT Odisha University",
      displayedLinkText: "https://bput.ac.in/verify-fees",
      actualUrl: "http://secure-bput-login.xyz/pay-portal",
      messageBody: "Urgent notice: Your semester fee registration is incomplete. Click the link above to enter your password and UPI PIN within 2 hours or your account will be suspended.",
      spfResult: "FAIL",
      dkimResult: "NONE",
      dmarcResult: "FAIL",
    })
  );

  const handleRunAnalysis = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsAnalyzing(true);

    try {
      const res = await fetch("/api/scan/identity-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderDisplayName: senderName,
          senderEmail,
          claimedOrganization: claimedOrg,
          displayedLinkText: displayedLink,
          actualUrl,
          messageBody,
          spfResult: senderEmail.includes("gmail") ? "FAIL" : "PASS",
          dkimResult: senderEmail.includes("gmail") ? "NONE" : "PASS",
          dmarcResult: senderEmail.includes("gmail") ? "FAIL" : "PASS",
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setAnalysis(data.data);
      } else {
        setAnalysis(
          evaluateMultiLayerIdentity({
            senderDisplayName: senderName,
            senderEmail,
            claimedOrganization: claimedOrg,
            displayedLinkText: displayedLink,
            actualUrl,
            messageBody,
          })
        );
      }
    } catch {
      setAnalysis(
        evaluateMultiLayerIdentity({
          senderDisplayName: senderName,
          senderEmail,
          claimedOrganization: claimedOrg,
          displayedLinkText: displayedLink,
          actualUrl,
          messageBody,
        })
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePresetSelect = (presetType: "phishing" | "authentic" | "freemail") => {
    if (presetType === "phishing") {
      setSenderName("BPUT Examination Cell Support");
      setSenderEmail("bput-alerts-notice@gmail.com");
      setClaimedOrg("BPUT Odisha University");
      setDisplayedLink("https://bput.ac.in/verify-fees");
      setActualUrl("http://secure-bput-login.xyz/pay-portal");
      setMessageBody("Urgent notice: Your semester fee registration is incomplete. Click the link above to enter your password and UPI PIN within 2 hours or your account will be suspended.");
    } else if (presetType === "authentic") {
      setSenderName("BPUT Official Portal");
      setSenderEmail("notifications@bput.ac.in");
      setClaimedOrg("BPUT Odisha University");
      setDisplayedLink("https://bput.ac.in/student-portal");
      setActualUrl("https://bput.ac.in/student-portal");
      setMessageBody("Dear Student, your semester results have been uploaded to the student portal. Log in via your official dashboard to view your marksheet.");
    } else {
      setSenderName("Apex Financial Desk");
      setSenderEmail("apex-support-desk@yahoo.com");
      setClaimedOrg("Apex Financial Corp");
      setDisplayedLink("http://apex-verify-billing.xyz");
      setActualUrl("http://apex-verify-billing.xyz");
      setMessageBody("Please review your pending corporate invoice for Q3 billing.");
    }

    setTimeout(() => {
      handleRunAnalysis();
    }, 100);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-orbitron font-extrabold text-2xl md:text-3xl text-white flex items-center gap-2">
            <Sliders className="h-7 w-7 text-[#00C2FF]" />
            <span>Multi-Layer Identity & Link Verification Engine</span>
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-1">
            7-Layer relationship graph analysis evaluating Sender $\leftrightarrow$ Email $\leftrightarrow$ Organization $\leftrightarrow$ Domain $\leftrightarrow$ Website $\leftrightarrow$ URL $\leftrightarrow$ Destination consistency.
          </p>
        </div>

        <DemoBadge label="7-LAYER IDENTITY ENGINE ACTIVE" />
      </div>

      {/* Test Preset Gallery */}
      <div className="glass-card p-4 rounded-2xl border border-[#00C2FF]/30 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#00C2FF]" />
          <span className="text-xs font-orbitron font-bold text-gray-300">Quick Test Scenarios:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handlePresetSelect("phishing")}
            className="px-3 py-1.5 rounded-xl bg-[#FF4D4D]/20 text-[#FF4D4D] border border-[#FF4D4D]/40 text-xs font-orbitron font-bold hover:bg-[#FF4D4D] hover:text-white transition"
          >
            Spoofed Brand Credential Harvest (High Mismatch Risk)
          </button>
          <button
            onClick={() => handlePresetSelect("authentic")}
            className="px-3 py-1.5 rounded-xl bg-[#00E676]/20 text-[#00E676] border border-[#00E676]/40 text-xs font-orbitron font-bold hover:bg-[#00E676] hover:text-black transition"
          >
            Authentic Corporate Email (High Match)
          </button>
          <button
            onClick={() => handlePresetSelect("freemail")}
            className="px-3 py-1.5 rounded-xl bg-[#FF9100]/20 text-[#FF9100] border border-[#FF9100]/40 text-xs font-orbitron font-bold hover:bg-[#FF9100] hover:text-black transition"
          >
            Free-Mail Impersonation (Medium Risk)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Col: Input Payload Inspector */}
        <div className="glass-card p-6 rounded-2xl border border-gray-800 space-y-4">
          <h3 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
            <Search className="h-5 w-5 text-[#00C2FF]" />
            <span>Identity Payload Inputs</span>
          </h3>

          <form onSubmit={handleRunAnalysis} className="space-y-3 text-xs font-mono">
            <div>
              <label className="block text-gray-300 mb-1">Sender Display Name</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#040D1A] border border-gray-700 text-white font-mono focus:border-[#00C2FF] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Sender Email Address</label>
              <input
                type="email"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#040D1A] border border-gray-700 text-white font-mono focus:border-[#00C2FF] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Claimed Organization Name</label>
              <input
                type="text"
                value={claimedOrg}
                onChange={(e) => setClaimedOrg(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#040D1A] border border-gray-700 text-white font-mono focus:border-[#00C2FF] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Displayed Link Text (Visible in Email)</label>
              <input
                type="text"
                value={displayedLink}
                onChange={(e) => setDisplayedLink(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#040D1A] border border-gray-700 text-white font-mono focus:border-[#00C2FF] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Actual Destination Target URL (`href`)</label>
              <input
                type="text"
                value={actualUrl}
                onChange={(e) => setActualUrl(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#040D1A] border border-gray-700 text-white font-mono focus:border-[#00C2FF] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Message Content / Body</label>
              <textarea
                rows={3}
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#040D1A] border border-gray-700 text-white font-mono focus:border-[#00C2FF] outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isAnalyzing}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#7B61FF] text-black font-orbitron font-extrabold text-xs hover:opacity-90 transition flex items-center justify-center gap-2 shadow-lg shadow-[#00C2FF]/20"
            >
              {isAnalyzing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
              <span>Execute 7-Layer Identity Verification</span>
            </button>
          </form>
        </div>

        {/* Right 2 Cols: Visual Identity Chain & Multi-Layer Analysis */}
        <div className="md:col-span-2 space-y-6">
          
          {/* VISUAL IDENTITY CHAIN PANEL */}
          <div className="glass-card p-6 rounded-2xl border border-[#00C2FF]/40 space-y-4">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <span className="text-[10px] font-orbitron font-bold text-[#00C2FF]">8-LINK IDENTITY CHAIN GRAPH</span>
                <h3 className="font-orbitron font-bold text-lg text-white">
                  SENDER $\longrightarrow$ EMAIL $\longrightarrow$ ORGANIZATION $\longrightarrow$ DOMAIN $\longrightarrow$ WEBSITE $\longrightarrow$ URL $\longrightarrow$ DESTINATION
                </h3>
              </div>

              <div className="flex gap-3">
                <div className="text-right">
                  <div className="text-[10px] font-mono text-gray-400">Risk Assessment</div>
                  <span className={`px-2.5 py-0.5 rounded text-xs font-orbitron font-bold border ${
                    analysis.riskLevel === "CRITICAL RISK" ? "bg-[#FF4D4D] text-white border-[#FF4D4D]" :
                    analysis.riskLevel === "HIGH RISK" ? "bg-[#FF9100] text-black border-[#FF9100]" :
                    "bg-[#00E676] text-black border-[#00E676]"
                  }`}>
                    {analysis.riskLevel} ({analysis.riskScore}/100)
                  </span>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-mono text-gray-400">Identity Consistency</div>
                  <div className="font-orbitron font-extrabold text-lg text-[#00C2FF]">
                    {analysis.identityConsistencyScore} / 100
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Node Flow */}
            <div className="p-4 rounded-2xl bg-black/70 border border-gray-800 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-center">
                {analysis.identityChain?.map((node, i) => {
                  const isMatch = node.status === "MATCH";
                  const isPartial = node.status === "PARTIAL_MATCH";
                  const isMismatch = node.status === "MISMATCH";

                  return (
                    <div
                      key={i}
                      className={`p-3 rounded-xl border text-xs font-mono space-y-1 transition ${
                        isMatch ? "bg-[#00E676]/10 border-[#00E676] text-[#00E676]" :
                        isPartial ? "bg-[#FF9100]/10 border-[#FF9100] text-[#FF9100]" :
                        isMismatch ? "bg-[#FF4D4D]/10 border-[#FF4D4D] text-[#FF4D4D]" :
                        "bg-gray-800/40 border-gray-700 text-gray-400"
                      }`}
                    >
                      <div className="font-orbitron font-bold text-[11px] uppercase tracking-wider">{node.label}</div>
                      <div className="font-extrabold text-[10px]">
                        {isMatch ? "🟢 MATCH" : isPartial ? "🟡 PARTIAL" : isMismatch ? "🔴 MISMATCH" : "⚪ UNKNOWN"}
                      </div>
                      <div className="text-[9px] text-gray-300 leading-tight truncate" title={node.details}>
                        {node.details}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Explainable AI Output & Evidence Card */}
          <div className="glass-card p-6 rounded-2xl border border-[#7B61FF]/40 space-y-4">
            <h3 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-[#FF4D4D]" />
              <span>XAI Evidence Rationale & Suspicious Signal Breakdown</span>
            </h3>

            <div className="space-y-2 font-mono text-xs">
              {analysis.whySuspicious?.map((reason, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#040D1A] border border-gray-800 text-gray-200 flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D4D] mt-1.5 shrink-0" />
                  <span>{reason}</span>
                </div>
              ))}
            </div>

            {/* Field Evidence Table */}
            {analysis.evidenceBreakdown?.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-orbitron font-bold text-gray-300">Exact Field Findings:</span>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-gray-800 text-gray-400 font-orbitron">
                        <th className="py-2 px-3">FIELD</th>
                        <th className="py-2 px-3">FINDING / EVIDENCE</th>
                        <th className="py-2 px-3">STATE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {analysis.evidenceBreakdown.map((item, i) => (
                        <tr key={i} className="hover:bg-[#040D1A]">
                          <td className="py-2.5 px-3 font-bold text-[#00C2FF]">{item.field}</td>
                          <td className="py-2.5 px-3 text-white">{item.finding}</td>
                          <td className="py-2.5 px-3 font-bold text-[#FF4D4D]">{item.state}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Recommended Safe Actions */}
            <div className="p-4 rounded-xl bg-black/60 border border-[#00E676]/40 space-y-2 text-xs font-mono">
              <div className="text-[#00E676] font-bold font-orbitron flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>Recommended Safe Actions:</span>
              </div>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-[11px]">
                {analysis.recommendedSafeAction?.map((act, i) => (
                  <li key={i}>{act}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 7-Layer Detailed Inspection Accordions */}
          <div className="glass-card p-6 rounded-2xl border border-gray-800 space-y-3">
            <h3 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#00C2FF]" />
              <span>7-Layer Detailed Verification Inspection</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(analysis.layers || {}).map(([key, layer]) => {
                const isPass = layer.state === "PASS";
                const isFail = layer.state === "FAIL";
                const isWarn = layer.state === "WARNING";

                return (
                  <div key={key} className="p-3.5 rounded-xl bg-[#040D1A] border border-gray-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-orbitron font-bold text-xs text-white">{layer.title}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        isPass ? "bg-[#00E676]/20 text-[#00E676] border border-[#00E676]/40" :
                        isFail ? "bg-[#FF4D4D]/20 text-[#FF4D4D] border border-[#FF4D4D]/40" :
                        isWarn ? "bg-[#FF9100]/20 text-[#FF9100] border border-[#FF9100]/40" :
                        "bg-gray-800 text-gray-400"
                      }`}>
                        {layer.state}
                      </span>
                    </div>

                    <ul className="text-[11px] font-mono text-gray-300 space-y-1 list-disc list-inside">
                      {layer.findings?.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
