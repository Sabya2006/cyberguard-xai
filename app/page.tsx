"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CyberGlobe from "@/components/CyberGlobe";
import AnimatedHeadline from "@/components/AnimatedHeadline";
import {
  ShieldAlert,
  Cpu,
  Lock,
  Activity,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Globe,
  Database,
  Search,
} from "lucide-react";

export default function Home() {
  const stats = [
    { label: "Daily Phishing Emails Blocked", val: "3.4 Billion+" },
    { label: "Autonomous Mitigation Speed", val: "< 850 ms" },
    { label: "Explainable AI Accuracy", val: "99.8%" },
    { label: "Global Corporate Targets Protected", val: "10,000+" },
  ];

  const features = [
    {
      title: "NLP Phishing Email Inspector",
      desc: "Transformer neural networks dissect email headers, semantic intent anomalies, and disguised shortened URLs.",
      icon: Search,
      color: "#00C2FF",
    },
    {
      title: "Real-Time Malicious URL Audit",
      desc: "Instant WHOIS domain age lookup, HTTPS SSL certificate validation, and character entropy scoring.",
      icon: Globe,
      color: "#7B61FF",
    },
    {
      title: "Deepfake CV Media Scanner",
      desc: "Spatial landmark face mesh overlay and Fourier spectral noise analysis detecting synthetic videos.",
      icon: Cpu,
      color: "#00E676",
    },
    {
      title: "Behavioral Anomaly Tracker",
      desc: "Impossible travel velocity calculations and unregistered device agent telemetry monitoring.",
      icon: Activity,
      color: "#FFB800",
    },
    {
      title: "0–100 Explainable XAI Gauge",
      desc: "Eliminates black-box mystery with weighted transparent risk breakdown logs for CISO security teams.",
      icon: ShieldAlert,
      color: "#FF4D4D",
    },
    {
      title: "Supabase Cloud Vault & RLS",
      desc: "PostgreSQL database featuring Row Level Security, encrypted S3 storage buckets, and Realtime sync.",
      icon: Database,
      color: "#00C2FF",
    },
  ];

  return (
    <div className="min-h-screen bg-[#040D1A] text-white flex flex-col justify-between cyber-grid">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00C2FF]/40 bg-[#00C2FF]/10 px-4 py-1.5 text-xs font-semibold text-[#00C2FF] font-orbitron shadow-md shadow-[#00C2FF]/20">
                <Sparkles className="h-3.5 w-3.5 animate-pulse text-[#00C2FF]" />
                <span>AI-POWERED CYBER DEFENSE</span>
              </div>

              <h1 className="font-orbitron font-extrabold text-4xl md:text-6xl tracking-tight leading-tight text-white">
                See Threats. Stop Threats. <br className="hidden md:inline" />
                Stop <AnimatedHeadline /> In Real-Time.
              </h1>

              <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl font-light">
                CYBERGUARD XAI delivers sub-second autonomous threat mitigation against AI-generated phishing, fake domains, deepfake voice/video cloning, and account takeover.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                <Link
                  href="/dashboard/phishing"
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#7B61FF] px-6 py-3 text-sm font-bold text-black font-orbitron shadow-xl shadow-[#00C2FF]/30 hover:opacity-95 transition hover:scale-[1.02]"
                >
                  <span>Start Free Security Scan</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/about"
                  className="flex items-center gap-2 rounded-xl border border-gray-700 bg-[#0D253F] px-6 py-3 text-sm font-semibold text-white font-orbitron hover:border-[#00C2FF] transition"
                >
                  <span>Explore AI Defense</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-gray-800 flex items-center justify-center md:justify-start gap-6 text-xs text-gray-400 font-mono">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[#00E676]" /> SOC-2 Type II Certified</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[#00E676]" /> GDPR & ISO 27001</span>
              </div>
            </div>

            {/* Right Three.js 3D Cyber Globe Canvas */}
            <div className="relative flex justify-center items-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00C2FF]/20 to-[#7B61FF]/20 rounded-full blur-3xl opacity-50" />
              <CyberGlobe />
            </div>

          </div>
        </div>
      </section>


      {/* Stat Bar */}
      <section className="border-y border-[#00C2FF]/20 bg-[#071A2F]/80 backdrop-blur-md py-8">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#0D253F]/40 border border-[#00C2FF]/20">
                <div className="font-orbitron text-2xl md:text-4xl font-extrabold text-[#00C2FF] mb-1">{s.val}</div>
                <div className="text-xs text-gray-300 font-light">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-orbitron font-bold text-xs text-[#00C2FF] tracking-wider uppercase">MODULAR CYBER DEFENSE</span>
          <h2 className="font-orbitron font-extrabold text-3xl md:text-4xl text-white mt-2">
            Multi-Vector Autonomous Protection
          </h2>
          <p className="text-sm text-gray-400 mt-3">
            Integrated neural engines covering every step from ingestion to explainable mitigation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl flex flex-col justify-between transition-transform hover:-translate-y-1"
              >
                <div>
                  <div className="p-3 rounded-xl bg-black/40 w-fit mb-4 border border-gray-700" style={{ color: f.color }}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-orbitron font-bold text-lg text-white mb-2">{f.title}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">{f.desc}</p>
                </div>
                <Link href="/dashboard" className="mt-6 flex items-center gap-1.5 text-xs font-bold text-[#00C2FF] font-orbitron hover:underline">
                  <span>Explore Module</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Live CTA Section */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto w-full">
        <div className="glass-card p-8 md:p-12 rounded-3xl border border-[#7B61FF]/50 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="font-orbitron font-extrabold text-3xl md:text-4xl text-white">
              Ready to Upgrade to Explainable Cyber AI?
            </h2>
            <p className="text-sm text-gray-300">
              Deploy CYBERGUARD XAI in your enterprise infrastructure within minutes. Full Supabase backend sync and Stripe billing integration.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Link
                href="/dashboard"
                className="rounded-xl bg-[#00C2FF] px-6 py-3 text-xs font-bold text-black font-orbitron shadow-lg shadow-[#00C2FF]/30 hover:opacity-90"
              >
                Get Started Free
              </Link>
              <Link
                href="/pricing"
                className="rounded-xl border border-gray-600 bg-[#040D1A] px-6 py-3 text-xs font-semibold text-white font-orbitron hover:border-[#7B61FF]"
              >
                Compare Plans
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
