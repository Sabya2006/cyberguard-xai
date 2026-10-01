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
  Printer,
  X,
  Target,
  Info,
  ShieldAlert,
  Zap,
} from "lucide-react";
import { evaluateMultiLayerIdentity, IdentityVerificationResult, DetailedEvidenceItem } from "@/lib/identityVerificationEngine";

export default function IdentityVerificationPage() {
  const [senderName, setSenderName] = useState("Amazon Account Support");
  const [senderEmail, setSenderEmail] = useState("support-alert-security@gmail.com");
  const [claimedOrg, setClaimedOrg] = useState("Amazon Inc.");
  const [displayedLink, setDisplayedLink] = useState("https://amazon.com/verify-login");
  const [actualUrl, setActualUrl] = useState("https://amaz0n-security-verify-example.com/login?redirect=auth");
  const [messageBody, setMessageBody] = useState("Urgent Notice: Your Amazon account will be blocked within 24 hours due to suspicious activity. Enter your password and OTP immediately to verify your identity.");
  const [claimedPurpose, setClaimedPurpose] = useState("Account Verification");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<DetailedEvidenceItem | null>(null);

  const [analysis, setAnalysis] = useState<IdentityVerificationResult>(() =>
    evaluateMultiLayerIdentity({
      senderDisplayName: "Amazon Account Support",
      senderEmail: "support-alert-security@gmail.com",
      claimedOrganization: "Amazon Inc.",
      displayedLinkText: "https://amazon.com/verify-login",
      actualUrl: "https://amaz0n-security-verify-example.com/login?redirect=auth",
      messageBody: "Urgent Notice: Your Amazon account will be blocked within 24 hours due to suspicious activity. Enter your password and OTP immediately to verify your identity.",
      claimedPurpose: "Account Verification",
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
          claimedPurpose,
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
            claimedPurpose,
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
          claimedPurpose,
        })
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePresetSelect = (presetType: "amazon_phishing" | "authentic_google" | "image_mismatch" | "shortener_redirect") => {
    if (presetType === "amazon_phishing") {
      setSenderName("Amazon Account Support");
      setSenderEmail("support-alert-security@gmail.com");
      setClaimedOrg("Amazon Inc.");
      setDisplayedLink("https://amazon.com/verify-login");
      setActualUrl("https://amaz0n-security-verify-example.com/login?redirect=auth");
      setMessageBody("Urgent Notice: Your Amazon account will be blocked within 24 hours due to suspicious activity. Enter your password and OTP immediately to verify your identity.");
      setClaimedPurpose("Account Verification");
    } else if (presetType === "authentic_google") {
      setSenderName("Google Account Security");
      setSenderEmail("no-reply@accounts.google.com");
      setClaimedOrg("Google LLC");
      setDisplayedLink("https://myaccount.google.com/security");
      setActualUrl("https://myaccount.google.com/security");
      setMessageBody("Security Alert: A new sign-in was detected on your Chrome browser. Review account activity to confirm.");
      setClaimedPurpose("Security Alert");
    } else if (presetType === "image_mismatch") {
      setSenderName("PDF & Image Converter Tool");
      setSenderEmail("free-converter-service@yahoo.com");
      setClaimedOrg("FastConvert Online");
      setDisplayedLink("https://fastconvert-tool.com/convert");
      setActualUrl("http://fastconvert-tool.xyz/verify-banking");
      setMessageBody("To download your converted document, please enter your net banking credentials and OTP fee verification.");
      setClaimedPurpose("Document Conversion");
    } else {
      setSenderName("Global Parcel Express Desk");
      setSenderEmail("tracking-update@parcel-express.com");
      setClaimedOrg("Express Logistics");
      setDisplayedLink("https://express-parcel.com/track");
      setActualUrl("https://bit.ly/3xP9KqL");
      setMessageBody("Your package delivery requires redelivery confirmation.");
      setClaimedPurpose("Parcel Tracking");
    }

    setTimeout(() => {
      handleRunAnalysis();
    }, 100);
  };

  const handlePrintReport = () => {
    window.print();
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

        <div className="flex gap-2">
          <button
            onClick={handlePrintReport}
            className="px-4 py-2 rounded-xl bg-[#040D1A] text-[#00C2FF] border border-[#00C2FF]/40 text-xs font-orbitron font-bold hover:bg-[#00C2FF] hover:text-black transition flex items-center gap-2"
          >
            <Printer className="h-4 w-4" />
            <span>Export Security Report</span>
          </button>

          <DemoBadge label="7-LAYER XAI ENGINE ACTIVE" />
        </div>
      </div>

      {/* Test Preset Gallery */}
      <div className="glass-card p-4 rounded-2xl border border-[#00C2FF]/30 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#00C2FF]" />
          <span className="text-xs font-orbitron font-bold text-gray-300">Quick Test Scenarios:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handlePresetSelect("amazon_phishing")}
            className="px-3 py-1.5 rounded-xl bg-[#FF4D4D]/20 text-[#FF4D4D] border border-[#FF4D4D]/40 text-xs font-orbitron font-bold hover:bg-[#FF4D4D] hover:text-white transition"
          >
            Amazon Brand Impersonation (High Risk)
          </button>
          <button
            onClick={() => handlePresetSelect("authentic_google")}
            className="px-3 py-1.5 rounded-xl bg-[#00E676]/20 text-[#00E676] border border-[#00E676]/40 text-xs font-orbitron font-bold hover:bg-[#00E676] hover:text-black transition"
          >
            Authentic Google Alert (Clean Match)
          </button>
          <button
            onClick={() => handlePresetSelect("image_mismatch")}
            className="px-3 py-1.5 rounded-xl bg-[#FF9100]/20 text-[#FF9100] border border-[#FF9100]/40 text-xs font-orbitron font-bold hover:bg-[#FF9100] hover:text-black transition"
          >
            Purpose ↔ Request Mismatch
          </button>
          <button
            onClick={() => handlePresetSelect("shortener_redirect")}
            className="px-3 py-1.5 rounded-xl bg-[#7B61FF]/20 text-[#7B61FF] border border-[#7B61FF]/40 text-xs font-orbitron font-bold hover:bg-[#7B61FF] hover:text-white transition"
          >
            Bitly Masked Redirect Chain
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
              <label className="block text-gray-300 mb-1">Claimed Service Purpose</label>
              <input
                type="text"
                value={claimedPurpose}
                onChange={(e) => setClaimedPurpose(e.target.value)}
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
          
          {/* VISUAL 8-NODE IDENTITY CHAIN PANEL */}
          <div className="glass-card p-6 rounded-2xl border border-[#00C2FF]/40 space-y-4">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <span className="text-[10px] font-orbitron font-bold text-[#00C2FF]">8-NODE IDENTITY RELATIONSHIP GRAPH</span>
                <h3 className="font-orbitron font-bold text-sm md:text-base text-white">
                  SENDER $\rightarrow$ EMAIL $\rightarrow$ ORGANIZATION $\rightarrow$ DOMAIN $\rightarrow$ WEBSITE $\rightarrow$ URL $\rightarrow$ LINK DEST $\rightarrow$ FINAL DEST
                </h3>
              </div>

              <div className="flex gap-3">
                {analysis.brandSimilarityDetected && (
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-gray-400">Brand Distance</div>
                    <span className="px-2 py-0.5 rounded text-xs font-orbitron font-bold bg-[#FF9100]/20 text-[#FF9100] border border-[#FF9100]">
                      {analysis.brandSimilarityScore}% Match
                    </span>
                  </div>
                )}

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
              <div className="grid grid-cols-2 md:grid-cols-7 gap-2 text-center">
                {analysis.identityChain?.map((node, i) => {
                  const isMatch = node.status === "MATCH";
                  const isPartial = node.status === "PARTIAL_MATCH";
                  const isMismatch = node.status === "MISMATCH";

                  return (
                    <div
                      key={i}
                      className={`p-2.5 rounded-xl border text-xs font-mono space-y-1 transition ${
                        isMatch ? "bg-[#00E676]/10 border-[#00E676] text-[#00E676]" :
                        isPartial ? "bg-[#FF9100]/10 border-[#FF9100] text-[#FF9100]" :
                        isMismatch ? "bg-[#FF4D4D]/10 border-[#FF4D4D] text-[#FF4D4D]" :
                        "bg-gray-800/40 border-gray-700 text-gray-400"
                      }`}
                    >
                      <div className="font-orbitron font-bold text-[9px] uppercase tracking-wider">{node.label}</div>
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

          {/* MULTI-SIGNAL SPECIAL DETECTORS (Purpose Mismatch & Urgency Signals) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Purpose/Request Mismatch Box */}
            <div className={`p-4 rounded-2xl border font-mono text-xs space-y-1.5 ${
              analysis.purposeRequestMismatch?.detected
                ? "bg-[#FF9100]/10 border-[#FF9100] text-[#FF9100]"
                : "bg-black/60 border-gray-800 text-gray-400"
            }`}>
              <div className="font-orbitron font-bold flex items-center gap-2 text-xs">
                <Target className="h-4 w-4" />
                <span>PURPOSE ↔ REQUEST MISMATCH RULE</span>
              </div>
              <p className="text-[11px] text-gray-300">
                {analysis.purposeRequestMismatch?.details}
              </p>
            </div>

            {/* Urgency + Identity Signal Box */}
            <div className={`p-4 rounded-2xl border font-mono text-xs space-y-1.5 ${
              analysis.urgencyIdentitySignal?.detected
                ? "bg-[#FF4D4D]/10 border-[#FF4D4D] text-[#FF4D4D]"
                : "bg-black/60 border-gray-800 text-gray-400"
            }`}>
              <div className="font-orbitron font-bold flex items-center gap-2 text-xs">
                <Zap className="h-4 w-4" />
                <span>URGENCY + IDENTITY MULTI-SIGNAL RULE</span>
              </div>
              <p className="text-[11px] text-gray-300">
                {analysis.urgencyIdentitySignal?.details}
              </p>
            </div>
          </div>

          {/* Explainable AI Output & Security Evidence Panel */}
          <div className="glass-card p-6 rounded-2xl border border-[#7B61FF]/40 space-y-4">
            <h3 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-[#FF4D4D]" />
              <span>XAI Evidence Rationale & Security Evidence Panel</span>
            </h3>

            <div className="space-y-2 font-mono text-xs">
              {analysis.whySuspicious?.map((reason, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#040D1A] border border-gray-800 text-gray-200 flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D4D] mt-1.5 shrink-0" />
                  <span>{reason}</span>
                </div>
              ))}
            </div>

            {/* Clickable Security Evidence Table */}
            {analysis.evidenceBreakdown?.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-orbitron font-bold text-gray-300">Interactive Security Evidence Panel (Click row for full telemetry):</span>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-gray-800 text-gray-400 font-orbitron">
                        <th className="py-2 px-3">FIELD</th>
                        <th className="py-2 px-3">OBSERVED FINDING</th>
                        <th className="py-2 px-3">CONFIDENCE</th>
                        <th className="py-2 px-3">STATE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {analysis.evidenceBreakdown.map((item) => (
                        <tr
                          key={item.id}
                          onClick={() => setSelectedEvidence(item)}
                          className="hover:bg-[#00C2FF]/10 cursor-pointer transition"
                        >
                          <td className="py-2.5 px-3 font-bold text-[#00C2FF] flex items-center gap-1.5">
                            <Info className="h-3.5 w-3.5 text-gray-400" />
                            <span>{item.field}</span>
                          </td>
                          <td className="py-2.5 px-3 text-white truncate max-w-xs">{item.found}</td>
                          <td className="py-2.5 px-3 font-bold text-gray-300">{item.confidence}</td>
                          <td className={`py-2.5 px-3 font-bold ${
                            item.state === "FAIL" ? "text-[#FF4D4D]" :
                            item.state === "WARNING" ? "text-[#FF9100]" :
                            item.state === "PASS" ? "text-[#00E676]" : "text-gray-400"
                          }`}>
                            {item.state}
                          </td>
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

          {/* PARSED URL DETAILS & SAFE REDIRECT CHAIN */}
          <div className="glass-card p-6 rounded-2xl border border-gray-800 space-y-4">
            <h3 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-[#00C2FF]" />
              <span>URL Parser & Safe Redirect Chain Inspection</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              {/* URL Breakdown */}
              <div className="p-3.5 rounded-xl bg-[#040D1A] border border-gray-800 space-y-1.5">
                <div className="font-orbitron font-bold text-[#00C2FF]">Parsed URL Structure</div>
                <div><span className="text-gray-400">Protocol:</span> <span className="text-white font-bold">{analysis.parsedUrlDetails?.protocol}</span></div>
                <div><span className="text-gray-400">Domain Host:</span> <span className="text-white font-bold">{analysis.parsedUrlDetails?.host || "None"}</span></div>
                <div><span className="text-gray-400">Subdomain:</span> <span className="text-white font-bold">{analysis.parsedUrlDetails?.subdomain || "None"}</span></div>
                <div><span className="text-gray-400">Path:</span> <span className="text-white font-bold">{analysis.parsedUrlDetails?.path || "/"}</span></div>
                <div><span className="text-gray-400">Embedded URL:</span> <span className="text-white font-bold">{analysis.parsedUrlDetails?.hasEmbeddedUrl ? analysis.parsedUrlDetails?.embeddedUrlTarget : "None"}</span></div>
              </div>

              {/* Redirect Chain */}
              <div className="p-3.5 rounded-xl bg-[#040D1A] border border-gray-800 space-y-1.5">
                <div className="font-orbitron font-bold text-[#00C2FF]">Redirect Chain Flow</div>
                {analysis.redirectChain?.map((step) => (
                  <div key={step.step} className="p-2 rounded bg-black/50 border border-gray-800 text-[11px]">
                    <span className="text-[#00C2FF] font-bold">Step {step.step}:</span> <span className="text-gray-300">{step.domain}</span>
                    <div className="text-[10px] text-gray-500">{step.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FALSE POSITIVE PROTECTION BANNER */}
          <div className="p-4 rounded-2xl bg-[#071A2F]/80 border border-[#00C2FF]/30 space-y-2 text-xs font-mono">
            <div className="font-orbitron font-bold text-[#00C2FF] flex items-center gap-2">
              <ShieldAlert className="h-4 w-4" />
              <span>False Positive Protection Protocols</span>
            </div>
            <ul className="list-disc list-inside text-gray-300 space-y-1 text-[11px]">
              {analysis.falsePositiveProtectionsApplied?.map((protect, i) => (
                <li key={i}>{protect}</li>
              ))}
            </ul>
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

      {/* Detailed Evidence Modal */}
      {selectedEvidence && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-lg w-full p-6 rounded-2xl border border-[#00C2FF]/40 space-y-4 text-xs font-mono relative">
            <button
              onClick={() => setSelectedEvidence(null)}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="font-orbitron font-bold text-base text-[#00C2FF] flex items-center gap-2">
              <Info className="h-5 w-5" />
              <span>Evidence Detail: {selectedEvidence.field}</span>
            </div>

            <div className="space-y-2 text-gray-200">
              <div><strong className="text-gray-400">Checked:</strong> {selectedEvidence.checked}</div>
              <div><strong className="text-gray-400">Observed Value:</strong> <span className="text-white font-bold">{selectedEvidence.found}</span></div>
              <div><strong className="text-gray-400">Why It Matters:</strong> {selectedEvidence.whyItMatters}</div>
              <div><strong className="text-gray-400">Confidence Level:</strong> <span className="text-[#00C2FF] font-bold">{selectedEvidence.confidence}</span></div>
              <div><strong className="text-gray-400">Status:</strong> <span className="text-[#FF4D4D] font-bold">{selectedEvidence.status}</span></div>
            </div>

            <button
              onClick={() => setSelectedEvidence(null)}
              className="w-full py-2.5 rounded-xl bg-[#00C2FF] text-black font-orbitron font-bold hover:bg-[#00C2FF]/80 transition"
            >
              Close Telemetry Details
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
