"use client";

import { useState } from "react";
import DemoBadge from "@/components/DemoBadge";
import { BookOpen, Sparkles, ShieldCheck, AlertTriangle, ArrowRight, Play, CheckCircle2, FileText, Download } from "lucide-react";

export default function XAIThreatStorytellingPage() {
  const [threatType, setThreatType] = useState("Phishing Credential Harvest");
  const [incidentId, setIncidentId] = useState("INC-9042");
  const [isLoading, setIsLoading] = useState(false);

  const [storyData, setStoryData] = useState<any>({
    headline: "Urgent Social Engineering Infiltration via Spoofed Credential Gateway",
    nlp_story_narrative:
      "At 10:14 AM, an adversary initiated a targeted credential harvesting campaign targeting executive email nodes. The attack utilized urgency-manipulation syntax ('ACCOUNT SUSPENDED IN 2 HOURS') paired with a high-entropy shortened link (bit.ly/secure-login-v2). The XAI NLP Engine analyzed the message semantic vector and calculated a 98% threat probability based on suspicious domain age (2 days) and missing SPF/DKIM verification headers. Autonomous containment was triggered within 120 milliseconds, isolating the incoming vector and alerting SOC analysts.",
    timeline_phases: [
      { phase: "Phase 1: Initial Reconnaissance", timestamp: "10:12:00 AM", details: "Attacker probed MX mail servers using spoofed headers." },
      { phase: "Phase 2: Infiltration Payload", timestamp: "10:14:15 AM", details: "Phishing message delivered with urgent call-to-action payload." },
      { phase: "Phase 3: XAI Anomaly Trigger", timestamp: "10:14:16 AM", details: "Semantic NLP Engine flagged urgency manipulation & unverified TLD." },
      { phase: "Phase 4: Autonomous Containment", timestamp: "10:14:17 AM", details: "Domain reverse-proxy blocked & analyst ticket INC-9042 created." },
    ],
    confidence_score: 98.4,
    xai_key_rationale: [
      "Urgency manipulation score: 0.94",
      "Domain registration age < 72 hours",
      "Missing DMARC & SSL certificate alignment",
      "High character entropy in destination URL",
    ],
    suggested_mitigations: [
      "Block sender domain across email gateway",
      "Revoke active OAuth tokens for targeted user",
      "Enforce mandatory hardware 2FA challenge",
    ],
  });

  const handleGenerateStory = async (selectedType: string) => {
    setThreatType(selectedType);
    setIsLoading(true);

    try {
      const res = await fetch("/api/xai/storytelling", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ incident_id: incidentId, threat_type: selectedType }),
      });
      const data = await res.json();
      if (data.headline) {
        setStoryData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-orbitron font-extrabold text-2xl md:text-3xl text-white flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-[#00C2FF]" />
            <span>Explainable AI (XAI) Threat Storytelling</span>
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-1">
            NLP-powered plain-language narrative synthesis converting raw multi-vector telemetry into CISO-ready incident stories.
          </p>
        </div>

        <DemoBadge label="NLP NARRATIVE ENGINE ACTIVE" />
      </div>

      {/* Threat Type Preset Selector */}
      <div className="glass-card p-4 rounded-2xl border border-[#00C2FF]/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#00C2FF]" />
          <span className="text-xs font-orbitron font-bold text-gray-300">Select Threat Telemetry Vector:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { label: "Phishing Infiltration", type: "Phishing Credential Harvest" },
            { label: "Deepfake CV Media", type: "Deepfake CV Infiltration" },
            { label: "Behavioral Anomaly", type: "Behavioral Velocity Anomaly" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => handleGenerateStory(item.type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-orbitron font-bold transition ${
                threatType === item.type
                  ? "bg-gradient-to-r from-[#00C2FF] to-[#7B61FF] text-black shadow-lg shadow-[#00C2FF]/30"
                  : "bg-[#040D1A] text-gray-400 border border-gray-700 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Narrative Card */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-[#7B61FF]/40 space-y-6 relative overflow-hidden">
        <div className="flex flex-wrap justify-between items-center gap-4 border-b border-gray-800 pb-4">
          <div>
            <span className="text-xs font-orbitron font-bold text-[#00C2FF] uppercase tracking-wider">
              INCIDENT NARRATIVE — {incidentId}
            </span>
            <h2 className="font-orbitron font-extrabold text-xl md:text-2xl text-white mt-1">
              {storyData.headline}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[10px] font-mono text-gray-400">XAI Confidence Score</div>
              <div className="font-orbitron font-extrabold text-lg text-[#00E676]">{storyData.confidence_score}%</div>
            </div>
          </div>
        </div>

        {/* NLP Plain Language Story */}
        <div className="p-5 rounded-2xl bg-[#040D1A] border border-[#00C2FF]/30 text-sm font-mono text-gray-200 leading-relaxed relative">
          <div className="text-xs font-orbitron font-bold text-[#00C2FF] mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>AI PLAIN-LANGUAGE THREAT STORY NARRATIVE:</span>
          </div>
          {isLoading ? (
            <div className="py-6 text-center text-gray-400 animate-pulse">
              Synthesizing multi-vector telemetry into plain-language narrative...
            </div>
          ) : (
            <p className="leading-relaxed">{storyData.nlp_story_narrative}</p>
          )}
        </div>

        {/* Interactive Attack Timeline Playback */}
        <div className="space-y-4 pt-2">
          <h3 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
            <Play className="h-5 w-5 text-[#00C2FF]" />
            <span>Chronological Attack Vector Timeline</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {storyData.timeline_phases?.map((step: any, idx: number) => (
              <div key={idx} className="p-4 rounded-2xl bg-black/60 border border-gray-800 space-y-2 relative group hover:border-[#00C2FF] transition">
                <div className="text-[10px] font-mono font-bold text-[#00C2FF]">{step.timestamp}</div>
                <div className="font-orbitron font-bold text-xs text-white">{step.phase}</div>
                <p className="text-[11px] font-mono text-gray-400 leading-normal">{step.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* XAI Key Rationale & Mitigations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-800">
          <div className="space-y-2">
            <h4 className="font-orbitron font-bold text-xs text-[#FF4D4D] flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Key XAI Decision Rationale</span>
            </h4>
            <div className="space-y-2">
              {storyData.xai_key_rationale?.map((r: string, i: number) => (
                <div key={i} className="p-2.5 rounded-xl bg-black/40 border border-gray-800 text-xs font-mono text-gray-300 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D4D]" />
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-orbitron font-bold text-xs text-[#00E676] flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Recommended Mitigations</span>
            </h4>
            <div className="space-y-2">
              {storyData.suggested_mitigations?.map((m: string, i: number) => (
                <div key={i} className="p-2.5 rounded-xl bg-black/40 border border-gray-800 text-xs font-mono text-gray-300 flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#00E676] shrink-0" />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
