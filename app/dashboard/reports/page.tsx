"use client";

import PDFReportModal from "@/components/PDFReportModal";
import { FileText, TrendingUp, Download, ShieldCheck, BarChart3 } from "lucide-react";

export default function ReportsPage() {
  const weeklyStats = [
    { day: "Mon", scans: 2400, threats: 18 },
    { day: "Tue", scans: 2800, threats: 24 },
    { day: "Wed", scans: 3100, threats: 32 },
    { day: "Thu", scans: 2900, threats: 19 },
    { day: "Fri", scans: 3400, threats: 28 },
    { day: "Sat", scans: 1900, threats: 9 },
    { day: "Sun", scans: 1920, threats: 12 },
  ];

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="font-orbitron font-extrabold text-2xl md:text-3xl text-white flex items-center gap-2">
          <FileText className="h-7 w-7 text-[#00C2FF]" />
          <span>Executive Security Reports & Analytics</span>
        </h1>
        <p className="text-xs text-gray-400 font-mono mt-1">
          Historical trend analysis, compliance audit records, and downloadable CISO-ready PDF executive reports.
        </p>
      </div>

      {/* PDF Export Component */}
      <PDFReportModal />

      {/* Weekly Trend Visualizer */}
      <div className="glass-card p-6 rounded-2xl border border-[#7B61FF]/30 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-[#7B61FF]" />
            <span>Weekly Telemetry & Threat Volume Trends</span>
          </h3>
          <span className="text-xs text-[#00C2FF] font-mono">Past 7 Days</span>
        </div>

        <div className="h-48 flex items-end justify-between gap-4 pt-6 border-b border-gray-800 pb-2">
          {weeklyStats.map((item, idx) => {
            const heightPercent = (item.scans / 3500) * 100;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-[#040D1A] rounded-t-lg h-36 flex items-end justify-center p-1">
                  <div
                    className="w-full bg-gradient-to-t from-[#7B61FF] to-[#00C2FF] rounded-t-sm transition-all duration-700 hover:opacity-80"
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
                <span className="text-[11px] font-mono text-gray-400">{item.day}</span>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between text-xs text-gray-400 font-mono pt-2">
          <span>Total Weekly Telemetry: 18,420 Scans</span>
          <span className="text-[#00E676] font-bold">142 Threat Incidents Quarantined (100% Success)</span>
        </div>
      </div>

    </div>
  );
}
