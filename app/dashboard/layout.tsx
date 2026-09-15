"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import CyberLogo from "@/components/CyberLogo";
import { usePathname } from "next/navigation";
import {
  Bell,
  ShieldAlert,
  ArrowLeft,
  Menu,
  X,
  LayoutDashboard,
  Mail,
  Globe,
  Camera,
  Activity,
  AlertTriangle,
  FileText,
  Building2,
  LogOut,
  ShieldCheck,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <div className="min-h-screen bg-[#040D1A] text-white flex flex-col md:flex-row cyber-grid">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar Slide-over Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md md:hidden flex flex-col justify-between p-4">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#00C2FF]/30">
              <CyberLogo size="sm" href="/" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg bg-[#0D253F] text-gray-300 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>


            <nav className="space-y-1.5 mt-4">
              {menu.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold font-orbitron transition-all ${
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
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FF4D4D]/20 text-[#FF4D4D] border border-[#FF4D4D]/40">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="pt-4 border-t border-gray-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-300 font-mono">
              <span className="flex items-center gap-1.5 text-[#00E676] font-bold"><ShieldCheck className="h-4 w-4" /> Active License</span>
              <span className="text-[#00C2FF]">BUSINESS</span>
            </div>
            <Link
              href="/auth"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#040D1A] border border-gray-700 py-2 text-xs text-gray-300 hover:text-white"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </Link>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-between overflow-x-hidden">
        
        {/* Dashboard Header Bar */}
        <header className="sticky top-0 z-40 border-b border-[#00C2FF]/20 bg-[#071A2F]/90 backdrop-blur-md px-4 md:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-1.5 rounded-lg bg-[#0D253F] text-gray-300 hover:text-white border border-[#00C2FF]/30"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link href="/" className="flex items-center gap-1 text-xs text-[#00C2FF] font-orbitron font-semibold">
              <ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">Portal Home</span>
            </Link>
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-gray-800">
              <span className="h-2.5 w-2.5 rounded-full bg-[#00E676] animate-pulse" />
              <span className="text-xs font-orbitron font-bold text-white">SOC LIVE NODE #04-INDIA</span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            {/* Quick Threat Alert Button */}
            <div className="hidden sm:flex items-center gap-2 rounded-lg bg-[#FF4D4D]/15 px-3 py-1 border border-[#FF4D4D]/40 text-xs font-mono text-[#FF4D4D]">
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>3 High Risk Incidents</span>
            </div>

            {/* Notification Icon */}
            <div className="relative cursor-pointer">
              <div className="p-2 rounded-xl bg-[#0D253F] border border-gray-700 text-gray-300 hover:text-white">
                <Bell className="h-4 w-4" />
              </div>
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[#00C2FF] border-2 border-[#040D1A]" />
            </div>

            {/* User Profile avatar */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-gray-800">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#00C2FF] to-[#7B61FF] flex items-center justify-center font-orbitron font-bold text-black text-xs">
                A
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-white font-orbitron">Alex Mercer</div>
                <div className="text-[10px] text-gray-400 font-mono">SOC Administrator</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

