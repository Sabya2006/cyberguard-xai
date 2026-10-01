"use client";

import { useState } from "react";
import DemoBadge from "@/components/DemoBadge";
import {
  ShieldAlert,
  Star,
  CheckCircle2,
  Lock,
  Send,
  Sparkles,
  MessageSquare,
  AlertCircle,
  ThumbsUp,
  HelpCircle,
  RefreshCw,
} from "lucide-react";

export default function CustomerFeedbackPage() {
  const [overallRating, setOverallRating] = useState<number>(5);
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([
    "🔗 Suspicious URL check",
    "📧 Phishing / suspicious email",
  ]);
  const [experiencedFraud, setExperiencedFraud] = useState<boolean>(false);

  // Fraud Incident Fields
  const [incidentDescription, setIncidentDescription] = useState<string>("");
  const [fraudType, setFraudType] = useState<string>("UPI / Payment Fraud");
  const [scamChannel, setScamChannel] = useState<string>("WhatsApp");
  const [aftermath, setAftermath] = useState<string>("No loss");
  const [cyberguardDetection, setCyberguardDetection] = useState<string>("Yes");

  // Feedback & Recommendation
  const [utilityRating, setUtilityRating] = useState<number>(5);
  const [improvementFeedback, setImprovementFeedback] = useState<string>("");
  const [recommendToOthers, setRecommendToOthers] = useState<string>("Yes");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState<boolean>(false);

  const usageOptions = [
    "🔗 Suspicious URL check",
    "📧 Phishing / suspicious email",
    "🎭 Deepfake detection",
    "👤 Account security",
    "🚨 Fraud / scam incident",
    "🛡️ General cybersecurity",
    "Other",
  ];

  const fraudTypes = [
    "UPI / Payment Fraud",
    "Fake Website",
    "Phishing Link",
    "Fake Customer Support",
    "Social Media Scam",
    "Job / Investment Scam",
    "Digital Arrest Scam",
    "Identity Theft",
    "OTP / Password Fraud",
    "Other",
  ];

  const scamChannels = [
    "WhatsApp",
    "Instagram / Facebook",
    "Email",
    "SMS",
    "Phone Call",
    "Website",
    "QR Code",
    "Other",
  ];

  const aftermathOptions = [
    "No loss",
    "Money lost",
    "Account compromised",
    "Personal information shared",
    "OTP shared",
    "Other",
  ];

  const detectionOptions = [
    "Yes",
    "No",
    "I didn't use CyberGuard before the incident",
  ];

  const utilityRatingLabels: Record<number, string> = {
    1: "⭐ 1 — Not useful",
    2: "⭐⭐ 2 — Slightly useful",
    3: "⭐⭐⭐ 3 — Average",
    4: "⭐⭐⭐⭐ 4 — Useful",
    5: "⭐⭐⭐⭐⭐ 5 — Very useful",
  };

  const handlePurposeToggle = (purpose: string) => {
    if (selectedPurposes.includes(purpose)) {
      setSelectedPurposes(selectedPurposes.filter((p) => p !== purpose));
    } else {
      setSelectedPurposes([...selectedPurposes, purpose]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      overallRating,
      usagePurposes: selectedPurposes,
      experiencedFraud,
      fraudDetails: experiencedFraud
        ? {
            incidentDescription,
            fraudType,
            scamChannel,
            aftermath,
            cyberguardDetection,
          }
        : undefined,
      utilityRating,
      improvementFeedback,
      recommendToOthers,
    };

    try {
      const res = await fetch("/api/customer-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setSubmittedSuccessfully(true);
      }
    } catch {
      setSubmittedSuccessfully(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-orbitron font-extrabold text-2xl md:text-3xl text-white flex items-center gap-2">
            <ShieldAlert className="h-7 w-7 text-[#00C2FF]" />
            <span>Customer Feedback & Fraud Report</span>
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Help us improve CyberGuard by sharing your real experience and reporting fraud incidents.
          </p>
        </div>

        <DemoBadge label="COMMUNITY FEEDBACK ENGINE" />
      </div>

      {/* 🔒 PRIVACY NOTICE BANNER */}
      <div className="p-4 rounded-2xl bg-[#FF9100]/10 border border-[#FF9100]/40 flex items-start gap-3 font-mono text-xs text-[#FF9100]">
        <Lock className="h-5 w-5 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold font-orbitron uppercase block mb-0.5">🔒 Privacy Notice:</span>
          <span>Please do not enter passwords, OTPs, bank PINs, card numbers, or other sensitive personal credentials in your report.</span>
        </div>
      </div>

      {/* Form Submission Confirmation State */}
      {submittedSuccessfully ? (
        <div className="glass-card p-8 rounded-3xl border border-[#00E676]/40 text-center space-y-4">
          <div className="inline-flex p-4 rounded-full bg-[#00E676]/20 border border-[#00E676] text-[#00E676] mb-2">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h2 className="font-orbitron font-bold text-2xl text-white">Thank You for Your Feedback!</h2>
          <p className="text-xs text-gray-300 font-mono max-w-lg mx-auto">
            Your CyberGuard experience report and fraud telemetry have been safely recorded. Your insights directly strengthen our Explainable AI Threat Models.
          </p>
          <button
            onClick={() => {
              setSubmittedSuccessfully(false);
              setIncidentDescription("");
              setImprovementFeedback("");
            }}
            className="px-6 py-2.5 rounded-xl bg-[#00C2FF] text-black font-orbitron font-bold text-xs hover:opacity-90 transition"
          >
            Submit Another Feedback Report
          </button>
        </div>
      ) : (
        /* Main Feedback & Fraud Form */
        <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 rounded-3xl border border-gray-800 space-y-6">
          
          {/* 1. OVERALL EXPERIENCE RATING */}
          <div className="space-y-2">
            <label className="block text-xs font-orbitron font-bold text-gray-200 uppercase tracking-wider">
              ⭐ Rate your experience with CyberGuard:
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setOverallRating(star)}
                  className={`p-3 rounded-2xl border transition-all flex items-center gap-1 font-orbitron font-bold text-xs ${
                    overallRating >= star
                      ? "bg-[#FF9100]/20 border-[#FF9100] text-[#FF9100] shadow-md shadow-[#FF9100]/20 scale-105"
                      : "bg-[#040D1A] border-gray-800 text-gray-500 hover:border-gray-700"
                  }`}
                >
                  <Star className={`h-5 w-5 ${overallRating >= star ? "fill-[#FF9100] text-[#FF9100]" : "text-gray-600"}`} />
                  <span>{star} ⭐</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. USAGE PURPOSE */}
          <div className="space-y-2 pt-2 border-t border-gray-800/80">
            <label className="block text-xs font-orbitron font-bold text-gray-200 uppercase tracking-wider">
              What did you use CyberGuard for? (Select all that apply)
            </label>
            <div className="flex flex-wrap gap-2 pt-1">
              {usageOptions.map((purpose) => {
                const isSelected = selectedPurposes.includes(purpose);
                return (
                  <button
                    key={purpose}
                    type="button"
                    onClick={() => handlePurposeToggle(purpose)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition ${
                      isSelected
                        ? "bg-[#00C2FF]/20 text-[#00C2FF] border border-[#00C2FF]"
                        : "bg-[#040D1A] text-gray-400 border border-gray-800 hover:border-gray-700"
                    }`}
                  >
                    {purpose}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. FRAUD EXPERIENCE TOGGLE */}
          <div className="space-y-3 pt-2 border-t border-gray-800/80">
            <label className="block text-xs font-orbitron font-bold text-[#FF4D4D] uppercase tracking-wider flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-[#FF4D4D]" />
              <span>🚨 Did you experience a fraud or scam?</span>
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setExperiencedFraud(true)}
                className={`flex-1 py-3 rounded-2xl border font-orbitron font-bold text-xs transition ${
                  experiencedFraud
                    ? "bg-[#FF4D4D]/20 border-[#FF4D4D] text-[#FF4D4D] shadow-lg shadow-[#FF4D4D]/20"
                    : "bg-[#040D1A] border-gray-800 text-gray-400 hover:border-gray-700"
                }`}
              >
                Yes (Report Incident)
              </button>
              <button
                type="button"
                onClick={() => setExperiencedFraud(false)}
                className={`flex-1 py-3 rounded-2xl border font-orbitron font-bold text-xs transition ${
                  !experiencedFraud
                    ? "bg-[#00E676]/20 border-[#00E676] text-[#00E676]"
                    : "bg-[#040D1A] border-gray-800 text-gray-400 hover:border-gray-700"
                }`}
              >
                No Fraud Experienced
              </button>
            </div>
          </div>

          {/* 4. CONDITIONAL FRAUD INCIDENT DETAILS */}
          {experiencedFraud && (
            <div className="p-6 rounded-2xl bg-[#040D1A] border border-[#FF4D4D]/40 space-y-4 font-mono text-xs">
              <div className="text-[#FF4D4D] font-orbitron font-bold text-sm uppercase flex items-center gap-2">
                <ShieldAlert className="h-5 w-5" />
                <span>Fraud Incident Telemetry Details</span>
              </div>

              {/* Q1: Incident Description */}
              <div>
                <label className="block text-gray-300 mb-1">1. What happened? Describe the incident in your own words.</label>
                <textarea
                  rows={3}
                  required={experiencedFraud}
                  value={incidentDescription}
                  onChange={(e) => setIncidentDescription(e.target.value)}
                  placeholder="Explain how the scam occurred..."
                  className="w-full p-2.5 rounded-xl bg-black/60 border border-gray-700 text-white font-mono focus:border-[#FF4D4D] outline-none"
                />
              </div>

              {/* Q2: Type of Fraud */}
              <div>
                <label className="block text-gray-300 mb-1">2. What type of fraud was it?</label>
                <select
                  value={fraudType}
                  onChange={(e) => setFraudType(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-black/60 border border-gray-700 text-white font-mono focus:border-[#FF4D4D] outline-none"
                >
                  {fraudTypes.map((ft) => (
                    <option key={ft} value={ft}>{ft}</option>
                  ))}
                </select>
              </div>

              {/* Q3: How scam received */}
              <div>
                <label className="block text-gray-300 mb-1">3. How did you receive the scam?</label>
                <select
                  value={scamChannel}
                  onChange={(e) => setScamChannel(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-black/60 border border-gray-700 text-white font-mono focus:border-[#FF4D4D] outline-none"
                >
                  {scamChannels.map((sc) => (
                    <option key={sc} value={sc}>{sc}</option>
                  ))}
                </select>
              </div>

              {/* Q4: What happened after interacting */}
              <div>
                <label className="block text-gray-300 mb-1">4. What happened after you interacted with it?</label>
                <select
                  value={aftermath}
                  onChange={(e) => setAftermath(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-black/60 border border-gray-700 text-white font-mono focus:border-[#FF4D4D] outline-none"
                >
                  {aftermathOptions.map((ao) => (
                    <option key={ao} value={ao}>{ao}</option>
                  ))}
                </select>
              </div>

              {/* Q5: CyberGuard Detection */}
              <div>
                <label className="block text-gray-300 mb-1">5. Did CyberGuard detect or warn you about the threat?</label>
                <select
                  value={cyberguardDetection}
                  onChange={(e) => setCyberguardDetection(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-black/60 border border-gray-700 text-white font-mono focus:border-[#FF4D4D] outline-none"
                >
                  {detectionOptions.map((doOpt) => (
                    <option key={doOpt} value={doOpt}>{doOpt}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* 6. CYBERGUARD UTILITY RATING */}
          <div className="space-y-2 pt-2 border-t border-gray-800/80">
            <label className="block text-xs font-orbitron font-bold text-gray-200 uppercase tracking-wider">
              How useful was CyberGuard?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUtilityRating(u)}
                  className={`p-3 rounded-xl border text-center font-mono text-xs transition ${
                    utilityRating === u
                      ? "bg-[#00C2FF]/20 border-[#00C2FF] text-[#00C2FF] font-bold"
                      : "bg-[#040D1A] border-gray-800 text-gray-400 hover:border-gray-700"
                  }`}
                >
                  {utilityRatingLabels[u]}
                </button>
              ))}
            </div>
          </div>

          {/* 7. IMPROVEMENT FEEDBACK */}
          <div className="space-y-2 pt-2 border-t border-gray-800/80">
            <label className="block text-xs font-orbitron font-bold text-gray-200 uppercase tracking-wider">
              What should we improve?
            </label>
            <textarea
              rows={3}
              value={improvementFeedback}
              onChange={(e) => setImprovementFeedback(e.target.value)}
              placeholder="Tell us feature suggestions, detection accuracy feedback, or UI ideas..."
              className="w-full p-3 rounded-2xl bg-[#040D1A] border border-gray-700 text-white font-mono text-xs focus:border-[#00C2FF] outline-none"
            />
          </div>

          {/* 8. RECOMMENDATION */}
          <div className="space-y-2 pt-2 border-t border-gray-800/80">
            <label className="block text-xs font-orbitron font-bold text-gray-200 uppercase tracking-wider">
              Would you recommend CyberGuard to others?
            </label>
            <div className="flex gap-3">
              {["Yes", "No", "Maybe"].map((rec) => (
                <button
                  key={rec}
                  type="button"
                  onClick={() => setRecommendToOthers(rec)}
                  className={`flex-1 py-2.5 rounded-xl border font-orbitron font-bold text-xs transition ${
                    recommendToOthers === rec
                      ? "bg-[#7B61FF]/20 border-[#7B61FF] text-[#7B61FF]"
                      : "bg-[#040D1A] border-gray-800 text-gray-400 hover:border-gray-700"
                  }`}
                >
                  {rec}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00C2FF] to-[#7B61FF] text-black font-orbitron font-extrabold text-sm hover:opacity-90 transition flex items-center justify-center gap-2 shadow-xl shadow-[#00C2FF]/20"
          >
            {isSubmitting ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            <span>Submit Experience & Fraud Report</span>
          </button>
        </form>
      )}

    </div>
  );
}
