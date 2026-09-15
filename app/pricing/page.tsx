"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, ShieldCheck, Zap, Building2, CreditCard, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: "starter",
      name: "Starter Plan",
      priceMonthly: 999,
      priceAnnual: 799,
      badge: "Popular for Devs",
      icon: Zap,
      accent: "#00C2FF",
      features: [
        "Up to 1,000 monthly scan requests",
        "Phishing Email NLP Inspection",
        "Malicious URL Audit Engine",
        "Basic 0-100 XAI Risk Score",
        "In-App & Email Notifications",
        "Standard Email Support",
      ],
    },
    {
      id: "business",
      name: "Business Plan",
      priceMonthly: 4999,
      priceAnnual: 3999,
      badge: "Most Popular for SOCs",
      icon: ShieldCheck,
      accent: "#7B61FF",
      highlight: true,
      features: [
        "Up to 25,000 monthly scan requests",
        "All Starter Features included",
        "Deepfake Computer Vision Scanner",
        "Behavioral Anomaly & Location Map",
        "Export Executive PDF Audit Reports",
        "Real-Time Supabase Webhooks & Slack",
        "Priority 24/7 Phone & Ticket Support",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise Custom",
      priceMonthly: 24999,
      priceAnnual: 19999,
      badge: "National Defense & Banks",
      icon: Building2,
      accent: "#00E676",
      features: [
        "Unlimited Monthly Scan Requests",
        "Dedicated GPU Backend Worker Nodes",
        "On-Premise / Hybrid Cloud Deployment",
        "CERT-In National Cyber Grid API Sync",
        "Custom SLA & 99.99% Uptime Guarantee",
        "Dedicated Cyber Security Account Manager",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#040D1A] text-white flex flex-col justify-between cyber-grid">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 flex-1 w-full space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="font-orbitron font-bold text-xs text-[#00C2FF] tracking-wider uppercase">FLEXIBLE MONETIZATION</span>
          <h1 className="font-orbitron font-extrabold text-4xl md:text-5xl text-white">
            Transparent Pricing for <span className="text-[#00C2FF]">Every Cyber Scale</span>
          </h1>
          <p className="text-sm text-gray-300 font-light">
            Choose the subscription plan that fits your security operations. Cancel or upgrade anytime.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <span className={`text-xs font-orbitron font-semibold ${!isAnnual ? "text-[#00C2FF]" : "text-gray-400"}`}>Monthly Billing</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-12 h-6 rounded-full bg-[#0D253F] p-1 border border-[#00C2FF]/40 relative transition"
            >
              <div className={`w-4 h-4 rounded-full bg-[#00C2FF] transition-transform ${isAnnual ? "translate-x-6 bg-[#7B61FF]" : ""}`} />
            </button>
            <span className={`text-xs font-orbitron font-semibold ${isAnnual ? "text-[#7B61FF]" : "text-gray-400"}`}>
              Annual Billing <span className="text-[10px] text-[#00E676] bg-[#00E676]/10 px-2 py-0.5 rounded border border-[#00E676]/30">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((p) => {
            const price = isAnnual ? p.priceAnnual : p.priceMonthly;
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                className={`glass-card p-8 rounded-3xl flex flex-col justify-between relative transition-all ${
                  p.highlight ? "border-2 border-[#7B61FF] shadow-2xl shadow-[#7B61FF]/20 scale-105 bg-[#0D253F]/90" : ""
                }`}
              >
                {p.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#7B61FF] text-white font-orbitron font-bold text-[10px] uppercase shadow-md">
                    {p.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-black/40 border border-gray-700" style={{ color: p.accent }}>
                      <Icon className="h-6 w-6" />
                    </div>
                    {!p.highlight && <span className="text-[10px] text-gray-400 font-mono">{p.badge}</span>}
                  </div>

                  <h3 className="font-orbitron font-bold text-xl text-white mb-2">{p.name}</h3>

                  <div className="my-4">
                    <span className="font-orbitron text-4xl font-extrabold text-white">
                      {formatCurrency(price)}
                    </span>
                    <span className="text-xs text-gray-400 font-mono"> / month</span>
                  </div>

                  <div className="border-t border-gray-800 pt-4 space-y-3 mb-6">
                    {p.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-300">
                        <Check className="h-4 w-4 text-[#00E676] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPlan(p.name)}
                  className={`w-full py-3 rounded-xl font-orbitron font-bold text-xs transition flex items-center justify-center gap-2 ${
                    p.highlight
                      ? "bg-[#7B61FF] text-white shadow-lg shadow-[#7B61FF]/30 hover:opacity-90"
                      : "bg-[#00C2FF] text-black hover:opacity-90"
                  }`}
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Subscribe to {p.name}</span>
                </button>
              </div>
            );
          })}
        </div>

      </main>

      {/* Stripe Modal Checkout Placeholder */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card p-6 md:p-8 rounded-3xl max-w-md w-full border border-[#00C2FF] space-y-4">
            <h3 className="font-orbitron font-bold text-xl text-white">Stripe Checkout Simulation</h3>
            <p className="text-xs text-gray-300">
              You selected <span className="text-[#00C2FF] font-bold">{selectedPlan}</span>. This ready-to-wire module connects seamlessly to Stripe Webhooks via Supabase payments table.
            </p>
            <div className="rounded-xl bg-black/50 p-4 border border-gray-700 space-y-2 text-xs font-mono text-gray-300">
              <div>Plan Target: {selectedPlan}</div>
              <div>Billing Frequency: {isAnnual ? "Annual" : "Monthly"}</div>
              <div>Gateway: Stripe INR / International</div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setSelectedPlan(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-600 bg-transparent text-xs font-bold font-orbitron text-gray-300 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Success! Subscription activated for ${selectedPlan}. Redirecting to dashboard...`);
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
