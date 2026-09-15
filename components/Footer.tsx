import Link from "next/link";
import CyberLogo from "@/components/CyberLogo";
import { ShieldCheck, Terminal, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#00C2FF]/20 bg-[#040D1A] py-12 text-gray-400">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 mb-8">
          
          {/* Brand Col */}
          <div>
            <div className="mb-3">
              <CyberLogo size="md" href="/" />
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              AI-Powered Cyber Threat, Phishing & Digital Impersonation Detection & Autonomous Response System.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00E676]/40 bg-[#00E676]/10 px-3 py-1 text-[11px] text-[#00E676] font-mono">
              <span className="h-2 w-2 rounded-full bg-[#00E676] animate-pulse" />
              All Systems Operational
            </div>
          </div>


          {/* Quick Links */}
          <div>
            <h4 className="font-orbitron text-xs font-bold text-white uppercase tracking-wider mb-3">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/dashboard" className="hover:text-[#00C2FF]">AI SOC Dashboard</Link></li>
              <li><Link href="/dashboard/phishing" className="hover:text-[#00C2FF]">Phishing NLP Inspector</Link></li>
              <li><Link href="/dashboard/url-scanner" className="hover:text-[#00C2FF]">Malicious URL Auditor</Link></li>
              <li><Link href="/dashboard/deepfake" className="hover:text-[#00C2FF]">Deepfake CV Detector</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-orbitron text-xs font-bold text-white uppercase tracking-wider mb-3">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about" className="hover:text-[#00C2FF]">About & Architecture</Link></li>
              <li><Link href="/pricing" className="hover:text-[#00C2FF]">SaaS Subscription Plans</Link></li>
              <li><Link href="/dashboard/admin" className="hover:text-[#00C2FF]">Admin Business Suite</Link></li>
              <li><Link href="/auth" className="hover:text-[#00C2FF]">Client Portal Auth</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-orbitron text-xs font-bold text-white uppercase tracking-wider mb-3">Threat Bulletin</h4>
            <p className="text-xs text-gray-400 mb-3">Get real-time zero-day vulnerability alerts in your inbox.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="security@company.com"
                className="w-full rounded-lg bg-[#0D253F] border border-gray-700 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#00C2FF]"
              />
              <button className="rounded-lg bg-[#00C2FF] px-3 py-1.5 text-xs font-bold text-black font-orbitron hover:opacity-90">
                Join
              </button>
            </div>
          </div>

        </div>

        <div className="flex flex-wrap items-center justify-between border-t border-gray-800 pt-6 text-xs text-gray-500">
          <div>© 2026 CYBERGUARD XAI Inc. All rights reserved. BPUT Hackathon Edition.</div>
          <div className="flex items-center gap-4">
            <span className="hover:text-gray-300">Privacy Policy</span>
            <span className="hover:text-gray-300">SOC-2 Compliance</span>
            <span className="hover:text-gray-300">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
