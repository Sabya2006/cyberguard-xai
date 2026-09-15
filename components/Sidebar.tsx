"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CyberLogo from "@/components/CyberLogo";
import {
  LayoutDashboard,
  Mail,
  Globe,
  Camera,
  Activity,
  AlertTriangle,
  FileText,
  Building2,
  ShieldCheck,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "SOC Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Phishing Inspector", href: "/dashboard/phishing", icon: Mail },
    { name: "URL Auditor", href: "/dashboard/url-scanner", icon: Globe },
    { name: "Deepfake CV", href: "/dashboard/deepfake", icon: Camera },
    { name: "Behaviour Analytics", href: "/dashboard/behaviour", icon: Activity },
    { name: "Incident Center", href: "/dashboard/incidents", icon: AlertTriangle, badge: "3 New" },
    { name: "Executive Reports", href: "/dashboard/reports", icon: FileText },
    { name: "Admin Business Suite", href: "/dashboard/admin", icon: Building2, badge: "Admin" },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-[#00C2FF]/20 bg-[#071A2F]/90 p-4 flex flex-col justify-between hidden md:flex">
      <div>
        <div className="px-2 mb-6">
          <CyberLogo size="sm" href="/" />
        </div>

        <div className="text-[10px] font-orbitron font-bold text-gray-500 uppercase tracking-wider px-3 mb-2">
          MODULE NAVIGATION
        </div>


        <nav className="space-y-1">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold font-orbitron transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-[#00C2FF]/20 to-[#7B61FF]/20 border border-[#00C2FF] text-[#00C2FF]"
                    : "text-gray-300 hover:text-white hover:bg-[#0D253F]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`h-4 w-4 ${isActive ? "text-[#00C2FF]" : "text-gray-400"}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    item.badge === 'Admin' ? 'bg-[#7B61FF]/20 text-[#7B61FF] border border-[#7B61FF]/40' : 'bg-[#FF4D4D]/20 text-[#FF4D4D] border border-[#FF4D4D]/40'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile Box */}
      <div className="rounded-xl bg-[#0D253F] p-3 border border-[#00C2FF]/30">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#00E676]" />
            <span className="text-xs font-bold text-white">Active License</span>
          </div>
          <span className="text-[10px] font-mono text-[#00C2FF]">BUSINESS</span>
        </div>
        <div className="text-[11px] text-gray-400 font-mono mb-3">API Quota: 18,420 / 25,000</div>
        <Link
          href="/auth"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#040D1A] border border-gray-700 py-1.5 text-xs text-gray-300 hover:text-white hover:border-[#FF4D4D]"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Sign Out</span>
        </Link>
      </div>
    </aside>
  );
}
