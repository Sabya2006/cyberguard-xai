"use client";

import Link from "next/link";
import StatCard from "@/components/StatCard";
import RiskGauge from "@/components/RiskGauge";
import DemoBadge from "@/components/DemoBadge";
import { ShieldAlert, Mail, Globe, Camera, Activity, AlertTriangle, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

export default function DashboardHome() {
  const incidents = [
    { id: "INC-9042", type: "Phishing Email", target: "security-alert@bput-portal.net", score: 98, status: "Quarantined", time: "10 mins ago" },
    { id: "INC-8911", type: "Malicious URL", target: "http://secure-bput-login.xyz", score: 94, status: "IP Blocked", time: "24 mins ago" },
    { id: "INC-8830", type: "Deepfake Video", target: "executive_statement_raw.mp4", score: 88, status: "Quarantined", time: "1 hour ago" },
    { id: "INC-8712", type: "Behaviour Anomaly", target: "Impossible Travel (NY -> Tokyo)", score: 91, status: "Session Revoked", time: "2 hours ago" },
  ];

  return (
    <div className="space-y-8">
      
      {/* Security Status Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#00C2FF]/15 via-[#0D253F] to-[#7B61FF]/15 border border-[#00C2FF]/40 p-4 md:p-6 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#00E676]/20 border border-[#00E676]/50 text-[#00E676]">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-orbitron font-extrabold text-white text-base md:text-lg">Security Status</span>
              <span className="px-2 py-0.5 rounded bg-[#00E676]/20 text-[#00E676] text-[10px] font-mono font-bold border border-[#00E676]/40 uppercase">
                HEALTHY
              </span>
            </div>
            <p className="text-xs text-gray-300 font-mono mt-0.5">
              Your environment is protected. All autonomous defense proxies operational.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <DemoBadge label="REALTIME SOC MONITOR" />
          <Link
            href="/dashboard/phishing"
            className="flex items-center gap-2 rounded-xl bg-[#00C2FF] px-4 py-2 text-xs font-bold text-black font-orbitron hover:opacity-90 transition"
          >
            <span>+ Run Security Scan</span>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Scans (24h)"
          value="18,420"
          subtext="+14% increase from yesterday"
          icon={Activity}
          color="#00C2FF"
        />
        <StatCard
          title="Active Threats Mitigated"
          value="142"
          subtext="100% automated resolution"
          icon={ShieldAlert}
          color="#FF4D4D"
        />
        <StatCard
          title="Average XAI Risk Score"
          value="18.4 / 100"
          subtext="Safe operational baseline"
          icon={CheckCircle2}
          color="#00E676"
        />
        <StatCard
          title="API Quota Consumed"
          value="73.6%"
          subtext="18,420 of 25,000 requests"
          icon={Globe}
          color="#7B61FF"
        />
      </div>

      {/* Main Grid: Gauge + Threat Map */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* XAI Gauge Card */}
        <div className="glass-card p-6 rounded-2xl border border-[#00C2FF]/30 flex flex-col items-center justify-between">
          <div className="w-full flex justify-between items-center mb-2">
            <span className="font-orbitron font-bold text-xs text-[#00C2FF]">SYSTEM RISK SCORE</span>
            <span className="text-[10px] font-mono text-gray-400">REALTIME</span>
          </div>

          <RiskGauge score={78} />

          <div className="w-full text-center mt-4 p-3 rounded-xl bg-black/40 border border-gray-700 text-xs text-gray-300 font-mono">
            Weighted Score: 30% URL + 30% Email + 20% Behavior + 20% Deepfake
          </div>
        </div>

        {/* Global Threat Map Graphic */}
        <div className="md:col-span-2 glass-card p-6 rounded-2xl border border-[#7B61FF]/30 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-orbitron font-bold text-base text-white">Live Global Threat Map Telemetry</h3>
                <DemoBadge label="DEMO DATA" />
              </div>
              <p className="text-xs text-gray-400 font-mono">Real-time IP attack vectors targeting organizational portals</p>
            </div>
            <span className="px-2.5 py-1 rounded bg-[#00E676]/20 text-[#00E676] text-[10px] font-mono border border-[#00E676]/40">STREAM ACTIVE</span>
          </div>

          <div className="w-full h-56 rounded-xl bg-black/60 border border-gray-800 flex items-center justify-around relative p-4 overflow-hidden">
            <div className="text-center z-10">
              <div className="text-[#00E676] font-bold text-xs font-mono">📍 New York Node</div>
              <div className="text-[10px] text-gray-400 font-mono">IP: 198.51.100.42</div>
            </div>

            <div className="absolute inset-x-16 top-1/2 border-t-2 border-dashed border-[#FF4D4D] animate-pulse" />

            <div className="text-center z-10">
              <div className="text-[#FF4D4D] font-bold text-xs font-mono">📍 Tokyo Node (Anomaly)</div>
              <div className="text-[10px] text-gray-400 font-mono">IP: 203.0.113.88</div>
            </div>
          </div>

          <div className="flex justify-between text-xs text-gray-400 mt-3 font-mono">
            <span>Vector Speed: &gt;6,000 MPH</span>
            <span className="text-[#FF4D4D] font-bold">Impossible Travel Triggered</span>
          </div>
        </div>

      </div>


      {/* Incident Log Table */}
      <div className="glass-card p-6 rounded-2xl border border-[#00C2FF]/30">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-orbitron font-bold text-base text-white">Recent Security Incidents</h3>
          <Link href="/dashboard/incidents" className="text-xs text-[#00C2FF] font-orbitron font-bold flex items-center gap-1 hover:underline">
            <span>View All Incidents</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 font-orbitron">
                <th className="py-2.5 px-3">INCIDENT ID</th>
                <th className="py-2.5 px-3">TYPE</th>
                <th className="py-2.5 px-3">TARGET TELEMETRY</th>
                <th className="py-2.5 px-3">RISK SCORE</th>
                <th className="py-2.5 px-3">STATUS</th>
                <th className="py-2.5 px-3">TIMESTAMP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {incidents.map((row) => (
                <tr key={row.id} className="hover:bg-[#040D1A]/50">
                  <td className="py-3 px-3 text-[#00C2FF] font-bold">{row.id}</td>
                  <td className="py-3 px-3 text-white">{row.type}</td>
                  <td className="py-3 px-3 text-gray-300">{row.target}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-[#FF4D4D]/20 text-[#FF4D4D] border border-[#FF4D4D]/40 font-bold">
                      {row.score} / 100
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#00E676] font-bold">{row.status}</td>
                  <td className="py-3 px-3 text-gray-400">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
