"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, ShieldCheck, Zap, Building2, CreditCard, Sparkles } from "lucide-react";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: "free",
      name: "Free Trial",
      monthlyPriceDisplay: "FREE",
      annualPriceDisplay: "FREE",
      subtext: "for 1 Month",
      badge: "1 Month Free",
      isFree: true,
      icon: Zap,
      accent: "#00E676",
      buttonText: "Start 1-Month Free Trial",
      buttonStyle: "bg-[#00E676] text-black hover:opacity-90 font-bold",
      features: [
        "100% Free for first 30 days",
        "Phishing Email NLP Inspection",
        "Malicious URL Audit Engine",
        "Basic 0-100 XAI Risk Score",
        "In-App Threat Notifications",
        "Community & Standard Email Support",
      ],
    },
    {
      id: "premium",
      name: "Premium Plan",
      monthlyPrice: 99,
      annualPrice: 79,
      subtext: "/ month",
      topBadge: "MOST POPULAR (₹99)",
      icon: ShieldCheck,
      accent: "#7B61FF",
      highlight: true,
      buttonTextMonthly: "Subscribe for ₹99/mo",
      buttonTextAnnual: "Subscribe for ₹79/mo",
      buttonStyle: "bg-gradient-to-r from-[#7B61FF] to-[#00C2FF] text-white hover:opacity-90 font-bold shadow-lg shadow-[#7B61FF]/30",
      features: [
        "Up to 10,000 monthly scan requests",
        "All Free Trial features included",
        "Deepfake Computer Vision Scanner",
        "Behavioral Anomaly & Geo-Velocity Map",
        "Gemini Threat Intelligence Radar",
        "Export Executive PDF Audit Reports",
        "Priority 24/7 Security Ticket Support",
      ],
    },
    {
      id: "enterprise",
      name: "Company / Enterprise",
      monthlyPrice: 999,
      annualPrice: 799,
      subtext: "/ month",
      badge: "For Companies (₹999)",
      icon: Building2,
      accent: "#00C2FF",
      buttonTextMonthly: "Get Company License (₹999)",
      buttonTextAnnual: "Get Company License (₹799)",
      buttonStyle: "bg-[#00C2FF] text-black hover:opacity-90 font-bold",
      features: [
        "Unlimited Monthly Threat Inspections",
        "Dedicated Multi-Node Protection",
        "Gemini Live Voice Dispatcher System",
        "3D Datacenter Maps & Geolocation Audit",
        "Audio Transcriber & Forensics Engine",
        "Custom SLA & 99.99% Uptime Guarantee",
        "Dedicated Cyber Security Account Lead",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#040D1A] text-white flex flex-col justify-between cyber-grid">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 flex-1 w-full space-y-10">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-orbitron font-bold text-xs text-[#00C2FF] tracking-wider uppercase flex items-center justify-center gap-1.5">
            <Sparkles className="h-4 w-4 text-[#00C2FF]" />
            <span>FLEXIBLE CYBERGUARD MONETIZATION</span>
          </span>
          <h1 className="font-orbitron font-extrabold text-4xl md:text-5xl text-white">
            CyberGuard <span className="text-[#00C2FF]">Pricing Plans</span>
          </h1>
          <p className="text-xs md:text-sm text-gray-300 font-light font-mono">
            Select monthly or annual billing. Save 20% on annual subscriptions.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <span className={`text-xs font-orbitron font-bold ${!isAnnual ? "text-[#00C2FF]" : "text-gray-400"}`}>
              Monthly Billing
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-12 h-6 rounded-full bg-[#0D253F] p-1 border border-[#00C2FF]/40 relative transition"
            >
              <div
                className={`w-4 h-4 rounded-full bg-[#00C2FF] transition-transform ${
                  isAnnual ? "translate-x-6 bg-[#7B61FF]" : ""
                }`}
              />
            </button>
            <span className={`text-xs font-orbitron font-bold flex items-center gap-1.5 ${isAnnual ? "text-[#7B61FF]" : "text-gray-400"}`}>
              <span>Annual Billing</span>
              <span className="text-[10px] text-[#00E676] bg-[#00E676]/10 px-2 py-0.5 rounded border border-[#00E676]/30 font-bold">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 items-stretch">
          {plans.map((p) => {
            const Icon = p.icon;
            const currentPrice = p.isFree ? "FREE" : `₹${isAnnual ? p.annualPrice : p.monthlyPrice}`;
            const buttonLabel = p.isFree
              ? p.buttonText
              : isAnnual
              ? p.buttonTextAnnual
              : p.buttonTextMonthly;

            return (
              <div
                key={p.id}
                className={`glass-card p-8 rounded-3xl flex flex-col justify-between relative transition-all duration-300 ${
                  p.highlight
                    ? "border-2 border-[#7B61FF] shadow-2xl shadow-[#7B61FF]/30 bg-[#071A2F]/95 scale-105"
                    : "border border-gray-800 bg-[#071A2F]/80"
                }`}
              >
                {/* Most Popular Top Badge */}
                {p.topBadge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#7B61FF] text-white font-orbitron font-bold text-[10px] tracking-wider uppercase shadow-md border border-[#7B61FF]/50">
                    {p.topBadge}
                  </div>
                )}

                <div>
                  {/* Top Bar inside Card */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-black/60 border border-gray-800" style={{ color: p.accent }}>
                      <Icon className="h-6 w-6" />
                    </div>

                    {p.badge && (
                      <span className="text-[10px] font-mono font-bold text-[#00C2FF] bg-[#00C2FF]/10 px-2.5 py-1 rounded-full border border-[#00C2FF]/30">
                        {p.badge}
                      </span>
                    )}
                  </div>

                  {/* Plan Name */}
                  <h3 className="font-orbitron font-extrabold text-2xl text-white mb-2">{p.name}</h3>

                  {/* Price Header */}
                  <div className="my-5 flex items-baseline gap-2">
                    <span className={`font-orbitron text-4xl md:text-5xl font-extrabold ${p.isFree ? "text-[#00E676]" : "text-white"}`}>
                      {currentPrice}
                    </span>
                    <span className="text-xs text-gray-400 font-mono font-semibold">{p.subtext}</span>
                  </div>

                  {/* Feature List */}
                  <div className="border-t border-gray-800/80 pt-5 space-y-3 mb-8">
                    {p.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-xs text-gray-200 font-mono">
                        <Check className="h-4 w-4 text-[#00E676] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subscribe Button */}
                <button
                  onClick={() => setSelectedPlan(`${p.name} (${currentPrice})`)}
                  className={`w-full py-3.5 rounded-xl font-orbitron text-xs transition-all flex items-center justify-center gap-2 ${p.buttonStyle}`}
                >
                  <CreditCard className="h-4 w-4" />
                  <span>{buttonLabel}</span>
                </button>
              </div>
            );
          })}
        </div>

      </main>

      {/* Stripe Modal Checkout Simulation */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card p-6 md:p-8 rounded-3xl max-w-md w-full border border-[#00C2FF] space-y-4">
            <h3 className="font-orbitron font-bold text-xl text-white">Stripe Checkout Simulation</h3>
            <p className="text-xs text-gray-300 font-mono">
              You selected <span className="text-[#00C2FF] font-bold">{selectedPlan}</span>.
            </p>
            <div className="rounded-xl bg-black/50 p-4 border border-gray-700 space-y-2 text-xs font-mono text-gray-300">
              <div>Plan Target: {selectedPlan}</div>
              <div>Billing Cycle: {isAnnual ? "Annual (Save 20%)" : "Monthly"}</div>
              <div>Currency: INR (₹)</div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setSelectedPlan(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-600 bg-transparent text-xs font-bold font-orbitron text-gray-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Success! Subscription activated for ${selectedPlan}.`);
                  setSelectedPlan(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#00E676] text-black font-bold font-orbitron text-xs hover:opacity-90"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
