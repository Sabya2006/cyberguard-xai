"use client";

import { useState } from "react";
import DemoBadge from "@/components/DemoBadge";
import { Globe as GlobeIcon, MapPin, Search, ShieldAlert, Cpu, Radio, Zap, ArrowUpRight } from "lucide-react";

export default function IPTrackingGeolocationPage() {
  const [ipInput, setIpInput] = useState("185.220.101.5");
  const [isSearching, setIsSearching] = useState(false);

  const [geoData, setGeoData] = useState<any>({
    ip: "185.220.101.5",
    country: "Germany",
    city: "Frankfurt",
    latitude: 50.1109,
    longitude: 8.6821,
    isp: "M247 Ltd Tor Exit Node",
    vpn_proxy_detected: true,
    threat_score: 92,
    attack_vector: "Automated Credential Stuffing Botnet",
    target_soc_coordinates: { lat: 20.2961, lng: 85.8245 },
  });

  const handleTrackIP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    try {
      const res = await fetch("/api/ip-tracking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ip_address: ipInput }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setGeoData(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-orbitron font-extrabold text-2xl md:text-3xl text-white flex items-center gap-2">
            <GlobeIcon className="h-7 w-7 text-[#00C2FF]" />
            <span>Advanced IP Geolocation & 3D Threat Plotter</span>
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Visualizing attacker origin nodes, proxy/VPN node detection, WHOIS ISP lookup, and 3D trajectory mapping.
          </p>
        </div>

        <DemoBadge label="3D GEOLOCATION ENGINE ACTIVE" />
      </div>

      {/* Search Bar */}
      <div className="glass-card p-4 rounded-2xl border border-[#00C2FF]/30 flex flex-wrap justify-between items-center gap-4">
        <form onSubmit={handleTrackIP} className="flex items-center gap-3 flex-1 max-w-xl">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-[#00C2FF]" />
            <input
              type="text"
              value={ipInput}
              onChange={(e) => setIpInput(e.target.value)}
              placeholder="Enter IP address (e.g. 185.220.101.5 or 203.0.113.88)..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#040D1A] border border-gray-700 text-xs text-white focus:border-[#00C2FF] font-mono outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSearching}
            className="px-5 py-2 rounded-xl bg-[#00C2FF] text-black font-orbitron font-bold text-xs hover:opacity-90 transition flex items-center gap-2 shadow-lg shadow-[#00C2FF]/20"
          >
            <Search className="h-4 w-4" />
            <span>{isSearching ? "Resolving IP..." : "Track Threat Node"}</span>
          </button>
        </form>

        <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
          <Radio className="h-4 w-4 text-[#FF4D4D] animate-ping" />
          <span>Active Origin Node: <strong className="text-white">{geoData.city}, {geoData.country}</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 3D Visualizer Card */}
        <div className="md:col-span-2 glass-card p-6 rounded-2xl border border-[#00C2FF]/40 space-y-4 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <h3 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
              <GlobeIcon className="h-5 w-5 text-[#00C2FF]" />
              <span>3D Global Attack Vector Trajectory Map</span>
            </h3>
            <span className="text-xs font-mono text-[#00C2FF]">Coordinates: {geoData.latitude}° N, {geoData.longitude}° E</span>
          </div>

          {/* 3D Map Canvas Simulation Viewport */}
          <div className="w-full h-80 rounded-xl bg-black/90 border border-gray-800 relative overflow-hidden flex flex-col items-center justify-center p-6 text-center space-y-4">
            
            {/* Pulsing Target Attack Radar */}
            <div className="relative w-48 h-48 rounded-full border border-[#00C2FF]/30 flex items-center justify-center bg-radial from-[#00C2FF]/10 to-transparent">
              <div className="absolute inset-0 rounded-full border border-dashed border-[#FF4D4D]/40 animate-spin" style={{ animationDuration: "12s" }} />
              <div className="w-32 h-32 rounded-full border border-[#7B61FF]/40 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#FF4D4D]/20 border border-[#FF4D4D] flex items-center justify-center text-xs font-mono font-bold text-[#FF4D4D] animate-pulse">
                  ATTACKER
                </div>
              </div>
            </div>

            <div className="z-10 space-y-1">
              <div className="font-orbitron font-extrabold text-lg text-white">
                Origin Node: {geoData.city} ({geoData.country}) $\longrightarrow$ SOC Command Bhubaneswar
              </div>
              <div className="text-xs font-mono text-[#00C2FF]">
                Trajectory Arc: [{geoData.latitude}, {geoData.longitude}] to [{geoData.target_soc_coordinates.lat}, {geoData.target_soc_coordinates.lng}]
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#040D1A] border border-gray-800 flex justify-between items-center text-xs font-mono text-gray-300">
            <span>Threat Vector: <strong className="text-[#FF4D4D]">{geoData.attack_vector}</strong></span>
            <span className="text-[#00E676] font-bold">100% Signal Isolation Active</span>
          </div>
        </div>

        {/* IP Telemetry Sidebar Details */}
        <div className="glass-card p-6 rounded-2xl border border-gray-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
              <Cpu className="h-5 w-5 text-[#7B61FF]" />
              <span>IP Intelligence & WHOIS Analysis</span>
            </h3>

            <div className="p-4 rounded-xl bg-black/60 border border-gray-800 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-gray-400">Target IP Address</span>
                <span className="font-orbitron font-bold text-sm text-[#00C2FF]">{geoData.ip}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-gray-400">Country / City</span>
                <span className="font-mono text-xs text-white font-bold">{geoData.city}, {geoData.country}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-gray-400">ISP / Organization</span>
                <span className="font-mono text-xs text-gray-300 truncate max-w-[140px]">{geoData.isp}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-gray-400">VPN / Proxy Detection</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  geoData.vpn_proxy_detected ? "bg-[#FF4D4D]/20 text-[#FF4D4D] border border-[#FF4D4D]/40" : "bg-[#00E676]/20 text-[#00E676] border border-[#00E676]/40"
                }`}>
                  {geoData.vpn_proxy_detected ? "VPN / TOR DETECTED" : "DIRECT CLEAN IP"}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-[#FF4D4D]/40 space-y-2 text-center">
              <span className="text-[10px] font-orbitron font-bold text-gray-400">THREAT SCORE INDEX</span>
              <div className="font-orbitron font-extrabold text-3xl text-[#FF4D4D]">{geoData.threat_score} / 100</div>
              <p className="text-[10px] font-mono text-gray-400">High malicious activity probability</p>
            </div>
          </div>

          <button
            onClick={() => alert(`Active mitigation command executed for ${geoData.ip}. Firewall rule set to REJECT.`)}
            className="w-full py-3 rounded-xl bg-[#FF4D4D] text-white font-orbitron font-bold text-xs hover:opacity-90 transition"
          >
            Block Node & Blacklist IP
          </button>
        </div>

      </div>

    </div>
  );
}
