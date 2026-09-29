"use client";

import { useState } from "react";
import DemoBadge from "@/components/DemoBadge";
import { Flame, ShieldAlert, Cpu, Terminal, RefreshCw, Zap, Lock, Eye, AlertOctagon } from "lucide-react";

export default function DynamicHoneypotsPage() {
  const [trafficRpm, setTrafficRpm] = useState(1450);
  const [threatSeverity, setThreatSeverity] = useState("HIGH");
  const [attackerIp, setAttackerIp] = useState("185.220.101.5");
  const [isAdapting, setIsAdapting] = useState(false);

  const [honeypotState, setHoneypotState] = useState<any>({
    active_profile: "Aggressive Tarpit Isolation",
    decoy_ports: [2222, 3306, 5432, 8080, 27017],
    fake_credentials_bait: [
      { type: "Decoy AWS Key", key: "AKIAIOSFODNN7EXAMPLE_BAIT", status: "Active Bait" },
      { type: "Decoy SSH Credential", user: "admin_root_decoy", pass: "P@ssw0rd2026!", status: "Trap Set" },
      { type: "Mock Postgres Table", table: "customer_credit_cards_mock", status: "Monitoring Select Queries" },
    ],
    adaptive_delay_ms: 2400,
    tarpit_enabled: true,
    captured_payloads_count: 142,
    logs: [
      { timestamp: "10:14:02 AM", ip: "185.220.101.5", action: "Port 2222 SSH Password Spray", payload: "admin/123456", status: "Trapped in Tarpit" },
      { timestamp: "10:12:45 AM", ip: "203.0.113.88", action: "SELECT query on mock table", payload: "SELECT * FROM customer_credit_cards_mock", status: "Payload Isolated" },
      { timestamp: "10:08:12 AM", ip: "45.142.120.4", action: "AWS Key Credential Probe", payload: "AKIAIOSFODNN7EXAMPLE_BAIT", status: "Canary Alert Fired" },
    ],
  });

  const handleAdaptParameters = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdapting(true);

    try {
      const res = await fetch("/api/honeypots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          traffic_volume_rpm: Number(trafficRpm),
          threat_severity: threatSeverity,
          attacker_ip: attackerIp,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setHoneypotState(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAdapting(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-orbitron font-extrabold text-2xl md:text-3xl text-white flex items-center gap-2">
            <Flame className="h-7 w-7 text-[#FF9100]" />
            <span>Context-Aware Dynamic Honeypots</span>
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Real-time adaptive parameter lures, decoy API tokens, mock database tables, and connection-slowing tarpit traps.
          </p>
        </div>

        <DemoBadge label="ADAPTIVE HONEYPOT CLUSTER ACTIVE" />
      </div>

      {/* Top Telemetry Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-5 rounded-2xl border border-[#FF9100]/40 space-y-2">
          <span className="text-[10px] font-orbitron font-bold text-gray-400">ACTIVE PROFILE</span>
          <div className="font-orbitron font-extrabold text-base text-[#FF9100]">{honeypotState.active_profile}</div>
          <span className="text-[10px] font-mono text-gray-400">Auto-adjusting lures</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-[#00C2FF]/40 space-y-2">
          <span className="text-[10px] font-orbitron font-bold text-gray-400">TARPIT LATENCY DELAY</span>
          <div className="font-orbitron font-extrabold text-xl text-[#00C2FF]">{honeypotState.adaptive_delay_ms} ms</div>
          <span className="text-[10px] font-mono text-gray-400">Slowing attacker probes</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-[#7B61FF]/40 space-y-2">
          <span className="text-[10px] font-orbitron font-bold text-gray-400">OPEN DECOY PORTS</span>
          <div className="font-orbitron font-extrabold text-base text-[#7B61FF]">{honeypotState.decoy_ports.join(", ")}</div>
          <span className="text-[10px] font-mono text-gray-400">Active trap listeners</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-[#00E676]/40 space-y-2">
          <span className="text-[10px] font-orbitron font-bold text-gray-400">CAPTURED PAYLOADS</span>
          <div className="font-orbitron font-extrabold text-xl text-[#00E676]">{honeypotState.captured_payloads_count} Logs</div>
          <span className="text-[10px] font-mono text-gray-400">Isolated in vault</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Side: Real-time Parameter Adaptor Form */}
        <div className="glass-card p-6 rounded-2xl border border-[#FF9100]/40 space-y-4">
          <h3 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
            <Cpu className="h-5 w-5 text-[#FF9100]" />
            <span>Dynamic Parameter Engine</span>
          </h3>

          <form onSubmit={handleAdaptParameters} className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-gray-300 mb-1">Incoming Traffic Volume (RPM)</label>
              <input
                type="number"
                value={trafficRpm}
                onChange={(e) => setTrafficRpm(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-[#040D1A] border border-gray-700 text-white font-mono focus:border-[#FF9100] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Threat Severity Trigger</label>
              <select
                value={threatSeverity}
                onChange={(e) => setThreatSeverity(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#040D1A] border border-gray-700 text-white font-mono focus:border-[#FF9100] outline-none"
              >
                <option value="LOW">LOW — Standard Monitoring</option>
                <option value="MEDIUM">MEDIUM — Moderate Lure Expansion</option>
                <option value="HIGH">HIGH — Aggressive Tarpit Trap</option>
                <option value="CRITICAL">CRITICAL — Full Isolation Decoy Cluster</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Target Attacker IP Node</label>
              <input
                type="text"
                value={attackerIp}
                onChange={(e) => setAttackerIp(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#040D1A] border border-gray-700 text-white font-mono focus:border-[#FF9100] outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isAdapting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF9100] to-[#FF4D4D] text-black font-orbitron font-extrabold text-xs hover:opacity-90 transition flex items-center justify-center gap-2 shadow-lg shadow-[#FF9100]/20"
            >
              {isAdapting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
              <span>Adapt Honeypot Parameters Now</span>
            </button>
          </form>
        </div>

        {/* Right Side: Active Bait Assets & Realtime Trapping Log Table */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Active Bait Canary Table */}
          <div className="glass-card p-6 rounded-2xl border border-gray-800 space-y-3">
            <h3 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
              <Lock className="h-5 w-5 text-[#00C2FF]" />
              <span>Deployed Bait Credential & Canary Assets</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {honeypotState.fake_credentials_bait?.map((b: any, idx: number) => (
                <div key={idx} className="p-3 rounded-xl bg-black/60 border border-gray-800 space-y-1">
                  <div className="text-[10px] font-orbitron font-bold text-[#00C2FF]">{b.type}</div>
                  <div className="text-xs font-mono text-white font-bold truncate">{b.key || b.user || b.table}</div>
                  <span className="inline-block px-2 py-0.5 rounded bg-[#00E676]/20 text-[#00E676] text-[9px] font-mono font-bold">
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Attacker Interactions Feed */}
          <div className="glass-card p-6 rounded-2xl border border-gray-800 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
                <Terminal className="h-5 w-5 text-[#FF4D4D]" />
                <span>Live Attacker Trap Logs & Payload Isolation</span>
              </h3>
              <span className="text-xs font-mono text-gray-400">{honeypotState.logs?.length} Traps Triggered</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400 font-orbitron">
                    <th className="py-2.5 px-3">TIMESTAMP</th>
                    <th className="py-2.5 px-3">ATTACKER IP</th>
                    <th className="py-2.5 px-3">TRAP ACTION</th>
                    <th className="py-2.5 px-3">PAYLOAD CAPTURED</th>
                    <th className="py-2.5 px-3">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {honeypotState.logs?.map((l: any, i: number) => (
                    <tr key={i} className="hover:bg-[#040D1A]/50">
                      <td className="py-3 px-3 text-gray-400">{l.timestamp}</td>
                      <td className="py-3 px-3 text-[#FF4D4D] font-bold">{l.ip}</td>
                      <td className="py-3 px-3 text-white">{l.action}</td>
                      <td className="py-3 px-3 text-[#00C2FF] font-mono truncate max-w-xs">{l.payload}</td>
                      <td className="py-3 px-3 text-[#00E676] font-bold">{l.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
