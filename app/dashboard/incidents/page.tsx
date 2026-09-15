"use client";

import { useState } from "react";
import DemoBadge from "@/components/DemoBadge";
import { AlertTriangle, Filter, Search, ShieldCheck, X, UserCheck, Clock } from "lucide-react";

export default function IncidentCenterPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [activeModal, setActiveModal] = useState<any | null>(null);

  const [incidents, setIncidents] = useState([
    {
      id: "INC-9042",
      type: "phishing",
      title: "Urgent Bank Credential Harvest",
      score: 98,
      severity: "CRITICAL",
      status: "CONTAINED",
      target: "security-alert@bput-portal.net",
      analyst: "Dr. Vikram Sethi",
      explanation: "Urgent call-to-action language ('TERMINATED in 2 hours') paired with bit.ly shortened domain link.",
      time: "10 mins ago",
    },
    {
      id: "INC-8911",
      type: "url",
      title: "Spoofed Portal Domain",
      score: 94,
      severity: "HIGH",
      status: "RESOLVED",
      target: "http://secure-bput-login.xyz",
      analyst: "Ananya Patnaik",
      explanation: "Domain registered 2 days ago via privacy registrar with missing valid SSL HTTPS encryption certificate.",
      time: "24 mins ago",
    },
    {
      id: "INC-8830",
      type: "deepfake",
      title: "Synthetic Video Frame Match",
      score: 88,
      severity: "HIGH",
      status: "INVESTIGATING",
      target: "executive_statement_raw.mp4",
      analyst: "Rohan Mukherjee",
      explanation: "Spatial lip-sync boundary anomaly detected along with Fourier spectral noise score of 0.89.",
      time: "1 hour ago",
    },
    {
      id: "INC-8712",
      type: "behaviour",
      title: "Impossible Velocity Travel",
      score: 91,
      severity: "CRITICAL",
      status: "OPEN",
      target: "New York -> Tokyo Login",
      analyst: "Unassigned",
      explanation: "Logins registered 10 minutes apart across NY and Tokyo nodes exceeding 6,000 MPH physical limit.",
      time: "2 hours ago",
    },
  ]);

  const updateIncidentStatus = (id: string, newStatus: string) => {
    setIncidents((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    if (activeModal && activeModal.id === id) {
      setActiveModal({ ...activeModal, status: newStatus });
    }
  };

  const filtered = incidents.filter((item) => {
    if (filter !== "all" && item.type !== filter) return false;
    if (search && !item.title.toLowerCase().includes(search.toLowerCase()) && !item.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-orbitron font-extrabold text-2xl md:text-3xl text-white flex items-center gap-2">
            <AlertTriangle className="h-7 w-7 text-[#FF4D4D]" />
            <span>Incident Operations & Remediation Center</span>
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Review captured multi-vector threat incidents, inspect XAI reasoning, assign analysts, and execute automated mitigations.
          </p>
        </div>

        <DemoBadge label="REALTIME INCIDENT QUEUE" />
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-card p-4 rounded-2xl border border-[#00C2FF]/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[#00C2FF]" />
          <span className="text-xs font-orbitron font-bold text-gray-300">Filter Module:</span>
          {["all", "phishing", "url", "deepfake", "behaviour"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1 rounded-lg text-xs font-orbitron capitalize transition ${
                filter === t ? "bg-[#00C2FF] text-black font-bold" : "bg-[#040D1A] text-gray-400 border border-gray-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search incident ID or title..."
            className="pl-9 pr-3 py-1.5 rounded-xl bg-[#040D1A] border border-gray-700 text-xs text-white focus:outline-none focus:border-[#00C2FF] font-mono"
          />
        </div>
      </div>

      {/* Incident List */}
      <div className="space-y-3">
        {filtered.map((inc) => (
          <div key={inc.id} className="glass-card p-5 rounded-2xl border border-gray-800 flex flex-wrap items-center justify-between gap-4 hover:border-[#00C2FF]/60 transition">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="font-orbitron font-bold text-xs text-[#00C2FF]">{inc.id}</span>
                <h3 className="font-bold text-white text-sm">{inc.title}</h3>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                  inc.severity === "CRITICAL" ? "bg-[#FF4D4D]/20 text-[#FF4D4D] border-[#FF4D4D]/40" :
                  inc.severity === "HIGH" ? "bg-[#FF9100]/20 text-[#FF9100] border-[#FF9100]/40" :
                  "bg-[#00E676]/20 text-[#00E676] border-[#00E676]/40"
                }`}>
                  {inc.severity}
                </span>
              </div>
              <p className="text-xs text-gray-400 font-mono">Target: {inc.target} • Analyst: {inc.analyst} • {inc.time}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="font-orbitron font-extrabold text-lg text-[#FF4D4D]">{inc.score} / 100</div>
                <div className={`text-[10px] font-mono font-bold uppercase ${
                  inc.status === "RESOLVED" ? "text-[#00E676]" :
                  inc.status === "CONTAINED" ? "text-[#00C2FF]" :
                  inc.status === "INVESTIGATING" ? "text-[#FFB800]" : "text-[#FF4D4D]"
                }`}>
                  {inc.status}
                </div>
              </div>

              <button
                onClick={() => setActiveModal(inc)}
                className="px-4 py-2 rounded-xl bg-[#0D253F] border border-[#00C2FF]/40 text-xs font-orbitron font-bold text-[#00C2FF] hover:bg-[#00C2FF] hover:text-black transition"
              >
                Inspect & Triage
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for XAI Explanation & Workflow Actions */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card p-6 md:p-8 rounded-3xl max-w-lg w-full border border-[#00C2FF] space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-orbitron font-bold text-sm text-[#00C2FF]">INCIDENT TRIAGE — {activeModal.id}</span>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <h2 className="font-orbitron font-bold text-xl text-white">{activeModal.title}</h2>
            
            <div className="rounded-xl bg-black/50 p-4 border border-gray-700 space-y-2 text-xs font-mono text-gray-300">
              <div>Risk Score: <span className="text-[#FF4D4D] font-bold">{activeModal.score} / 100</span></div>
              <div>Telemetry Target: {activeModal.target}</div>
              <div>Assigned Analyst: <span className="text-[#00C2FF]">{activeModal.analyst}</span></div>
              <div>Current Status: <span className="text-[#00E676] font-bold">{activeModal.status}</span></div>
            </div>

            <div className="p-3 rounded-xl bg-[#040D1A] border border-[#7B61FF]/40 text-xs text-gray-300 font-mono">
              <span className="text-[#7B61FF] font-bold">XAI REASONING: </span>
              {activeModal.explanation}
            </div>

            {/* Workflow Action Buttons */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-orbitron font-bold text-gray-300">Update Incident Workflow Status:</span>
              <div className="grid grid-cols-4 gap-2 text-[10px] font-orbitron font-bold">
                {["OPEN", "INVESTIGATING", "CONTAINED", "RESOLVED"].map((st) => (
                  <button
                    key={st}
                    onClick={() => updateIncidentStatus(activeModal.id, st)}
                    className={`py-2 rounded-lg border transition ${
                      activeModal.status === st
                        ? "bg-[#00C2FF] text-black border-[#00C2FF]"
                        : "bg-[#040D1A] text-gray-400 border-gray-700 hover:text-white"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-600 bg-transparent text-xs font-bold font-orbitron text-gray-300 hover:text-white"
              >
                Close Window
              </button>
              <button
                onClick={() => {
                  updateIncidentStatus(activeModal.id, "RESOLVED");
                  alert(`Automated resolution executed for ${activeModal.id}. IP blacklisted & status set to RESOLVED.`);
                  setActiveModal(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#00E676] text-black font-bold font-orbitron text-xs hover:opacity-90"
              >
                Execute Full Isolation
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

