"use client";

import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtext: string;
  icon: LucideIcon;
  color?: string;
}

export default function StatCard({ title, value, subtext, icon: Icon, color = "#00C2FF" }: StatCardProps) {
  return (
    <div className="group relative rounded-2xl bg-[#0D253F]/80 p-5 border border-[#00C2FF]/30 shadow-lg backdrop-blur-md flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00C2FF]/80 hover:shadow-xl hover:shadow-[#00C2FF]/20 overflow-hidden">
      {/* Top Animated Laser Edge */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#00C2FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-orbitron font-semibold text-gray-400 uppercase tracking-wider">{title}</span>
        <div className="p-2 rounded-xl bg-black/40 border border-gray-700 group-hover:scale-110 transition-transform" style={{ color }}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div>
        <div className="font-orbitron text-3xl font-extrabold text-white mb-1 tracking-tight flex items-center justify-between">
          <span>{value}</span>
          <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
        </div>
        <div className="text-xs text-gray-400 font-mono">{subtext}</div>
      </div>
    </div>
  );
}

