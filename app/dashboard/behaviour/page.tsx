"use client";

import { useState } from "react";
import DemoBadge from "@/components/DemoBadge";
import { Activity, ShieldAlert, MapPin, Clock, Smartphone, CheckCircle, RefreshCw } from "lucide-react";

export default function BehaviourAnalyticsPage() {
  const [selectedId, setSelectedId] = useState("LOG-4091");
  const [anomalies, setAnomalies] = useState([
    {
      id: "LOG-4091",
      user: "student@bput.ac.in",
      location1: "New York (10:00 AM)",
      ip1: "198.51.100.42",
      location2: "Tokyo (10:10 AM)",
      ip2: "203.0.113.88",
      velocity: "40,560 MPH",
      distance: "6,760 Miles in 10 Mins",
      device: "Linux x86_64 Browser",
      status: "Session Revoked",
      severity: "CRITICAL",
    },
    {
      id: "LOG-3982",
      user: "analyst@enterprise.com",
      location1: "Bhubaneswar (03:14 AM)",
      ip1: "103.21.244.12",
      location2: "Off-hours Access",
      ip2: "103.21.244.12",
      velocity: "N/A (Time Anomaly)",
      distance: "0 Miles (Unusual Hours)",
      device: "Unknown Android Agent",
      status: "2FA Challenge Required",
      severity: "MEDIUM",
    },
  ]);

  const activeRecord = anomalies.find((a) => a.id === selectedId) || anomalies[0];

  const handleAction = (id: string, actionName: string) => {
    setAnomalies((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: actionName } : a))
    );
    alert(`Remediation executed for ${id}: Action set to '${actionName}'`);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-orbitron font-extrabold text-2xl md:text-3xl text-white flex items-center gap-2">
            <Activity className="h-7 w-7 text-[#00C2FF]" />
            <span>AI Module 4: Behavioral Anomaly & Geo-Velocity Engine</span>
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Impossible travel speed calculations, unregistered device agent biometrics, and off-hours access monitoring.
          </p>
        </div>

        <DemoBadge label="UEBA TELEMETRY ACTIVE" />
      </div>

      {/* Map Telemetry Card */}
      <div className="glass-card p-6 rounded-2xl border border-[#FF4D4D]/40 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-orbitron font-bold text-base text-[#FF4D4D] flex items-center gap-2">
            <ShieldAlert className="h-5 w-5" />
            <span>SELECTED ANOMALY TELEMETRY — {activeRecord.id} ({activeRecord.user})</span>
          </h3>
          <span className="px-2.5 py-1 rounded bg-[#FF4D4D]/20 text-[#FF4D4D] text-xs font-mono font-bold border border-[#FF4D4D]/40">
            {activeRecord.severity}
          </span>
        </div>

        <div className="w-full h-44 rounded-xl bg-black/60 border border-gray-800 flex items-center justify-around px-8 relative overflow-hidden">
          <div className="text-center z-10">
            <div className="text-[#00E676] font-bold text-xs font-mono">📍 {activeRecord.location1}</div>
            <div className="text-[10px] text-gray-400 font-mono">IP: {activeRecord.ip1}</div>
          </div>

          <div className="absolute inset-x-20 top-1/2 border-t-2 border-dashed border-[#FF4D4D] animate-pulse" />

          <div className="text-center z-10">
            <div className="text-[#FF4D4D] font-bold text-xs font-mono">📍 {activeRecord.location2}</div>
            <div className="text-[10px] text-gray-400 font-mono">IP: {activeRecord.ip2}</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#040D1A] border border-gray-800 text-xs font-mono text-gray-300 flex flex-wrap justify-between gap-2">
          <span>Physical Telemetry: {activeRecord.distance}</span>
          <span className="text-[#FF4D4D] font-bold">Velocity Index: {activeRecord.velocity}</span>
          <span className="text-[#00C2FF]">Agent: {activeRecord.device}</span>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => handleAction(activeRecord.id, "Session Revoked")}
            className="flex-1 py-2 rounded-xl bg-[#FF4D4D] text-white font-orbitron font-bold text-xs hover:opacity-90 transition"
          >
            Revoke Session
          </button>
          <button
            onClick={() => handleAction(activeRecord.id, "2FA Required")}
            className="flex-1 py-2 rounded-xl bg-[#7B61FF] text-white font-orbitron font-bold text-xs hover:opacity-90 transition"
          >
            Challenge 2FA
          </button>
          <button
            onClick={() => handleAction(activeRecord.id, "Verified Safe")}
            className="flex-1 py-2 rounded-xl bg-[#00E676] text-black font-orbitron font-bold text-xs hover:opacity-90 transition"
          >
            Mark Verified Safe
          </button>
        </div>
      </div>

      {/* Anomaly Log Table */}
      <div className="glass-card p-6 rounded-2xl border border-[#00C2FF]/30 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-orbitron font-bold text-base text-white">Behavioral Anomaly Records (Click row to inspect)</h3>
          <span className="text-xs font-mono text-gray-400">Showing {anomalies.length} Records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 font-orbitron">
                <th className="py-2.5 px-3">LOG ID</th>
                <th className="py-2.5 px-3">USER ACCOUNT</th>
                <th className="py-2.5 px-3">LOCATION 1</th>
                <th className="py-2.5 px-3">LOCATION 2</th>
                <th className="py-2.5 px-3">VELOCITY</th>
                <th className="py-2.5 px-3">ACTION TAKEN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {anomalies.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => setSelectedId(row.id)}
                  className={`cursor-pointer transition ${
                    selectedId === row.id ? "bg-[#00C2FF]/15 border-l-4 border-l-[#00C2FF]" : "hover:bg-[#040D1A]/50"
                  }`}
                >
                  <td className="py-3 px-3 text-[#00C2FF] font-bold">{row.id}</td>
                  <td className="py-3 px-3 text-white">{row.user}</td>
                  <td className="py-3 px-3 text-gray-300">{row.location1}</td>
                  <td className="py-3 px-3 text-gray-300">{row.location2}</td>
                  <td className="py-3 px-3 text-[#FF4D4D] font-bold">{row.velocity}</td>
                  <td className="py-3 px-3 text-[#00E676] font-bold">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

