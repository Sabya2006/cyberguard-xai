"use client";

import { useState } from "react";
import StatCard from "@/components/StatCard";
import DemoBadge from "@/components/DemoBadge";
import { Building2, DollarSign, Users, Activity, CreditCard, ShieldCheck, Zap, Plus, X, Search } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function AdminBusinessPanelPage() {
  const [search, setSearch] = useState("");
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [activeQuotaModal, setActiveQuotaModal] = useState<any | null>(null);

  const [newOrg, setNewOrg] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPlan, setNewPlan] = useState("Business");

  const [customers, setCustomers] = useState([
    { id: "CUST-104", name: "BPUT Odisha University", email: "admin@bput.ac.in", plan: "Business", mrr: 4999, usage: "18,420 / 25,000", status: "Active" },
    { id: "CUST-103", name: "Apex Financial Corp", email: "sec@apexfin.com", plan: "Enterprise", mrr: 24999, usage: "142,800 / Unlimited", status: "Active" },
    { id: "CUST-102", name: "Starlight Cyber Labs", email: "info@starlight.io", plan: "Starter", mrr: 999, usage: "840 / 1,000", status: "Active" },
  ]);

  const handleCreateLicense = (e: React.FormEvent) => {
    e.preventDefault();
    const mrrVal = newPlan === "Starter" ? 999 : newPlan === "Business" ? 4999 : 24999;
    const quotaVal = newPlan === "Starter" ? "0 / 1,000" : newPlan === "Business" ? "0 / 25,000" : "0 / Unlimited";
    const newCustomer = {
      id: `CUST-${105 + customers.length}`,
      name: newOrg,
      email: newEmail,
      plan: newPlan,
      mrr: mrrVal,
      usage: quotaVal,
      status: "Active",
    };
    setCustomers([newCustomer, ...customers]);
    setNewOrg("");
    setNewEmail("");
    setShowLicenseModal(false);
    alert(`Success: Created active license for ${newOrg} under ${newPlan} Tier.`);
  };

  const handleQuotaUpgrade = (id: string, newQuotaLabel: string) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, usage: newQuotaLabel } : c))
    );
    setActiveQuotaModal(null);
    alert(`API Quota updated for ${id} to ${newQuotaLabel}`);
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-orbitron font-extrabold text-2xl md:text-3xl text-white flex items-center gap-2">
            <Building2 className="h-7 w-7 text-[#7B61FF]" />
            <span>Admin SaaS Business & Billing Suite</span>
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Stripe-ready MRR analytics, API quota meters, customer subscription management, and role overrides.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <DemoBadge label="ADMINISTRATOR ACCESS" />
        </div>
      </div>

      {/* Business MRR Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Monthly Recurring Revenue (MRR)"
          value={formatCurrency(customers.reduce((acc, c) => acc + c.mrr, 117503))}
          subtext="+22.4% MoM growth"
          icon={DollarSign}
          color="#00E676"
        />
        <StatCard
          title="Total Active Subscriptions"
          value={`${customers.length + 45} Clients`}
          subtext={`${customers.length} Custom Managed`}
          icon={Users}
          color="#00C2FF"
        />
        <StatCard
          title="Total API Scan Telemetries"
          value="1.42M"
          subtext="Requests processed this month"
          icon={Activity}
          color="#7B61FF"
        />
        <StatCard
          title="Stripe Payout Status"
          value="Succeeded"
          subtext="Next payout scheduled"
          icon={CreditCard}
          color="#00E676"
        />
      </div>

      {/* Customer Management Table */}
      <div className="glass-card p-6 rounded-2xl border border-[#7B61FF]/30 space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h3 className="font-orbitron font-bold text-base text-white">Customer Subscriptions & Quota Meter</h3>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter customer or ID..."
                className="pl-9 pr-3 py-1.5 rounded-xl bg-[#040D1A] border border-gray-700 text-xs text-white focus:outline-none focus:border-[#7B61FF] font-mono"
              />
            </div>

            <button
              onClick={() => setShowLicenseModal(true)}
              className="px-4 py-2 rounded-xl bg-[#7B61FF] text-white font-orbitron font-bold text-xs hover:opacity-90 transition flex items-center gap-1.5 shadow-lg shadow-[#7B61FF]/30"
            >
              <Plus className="h-4 w-4" />
              <span>Create New License</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 font-orbitron">
                <th className="py-2.5 px-3">CUSTOMER ID</th>
                <th className="py-2.5 px-3">ORGANIZATION / EMAIL</th>
                <th className="py-2.5 px-3">PLAN TIER</th>
                <th className="py-2.5 px-3">MONTHLY MRR</th>
                <th className="py-2.5 px-3">API QUOTA CONSUMED</th>
                <th className="py-2.5 px-3">STATUS</th>
                <th className="py-2.5 px-3">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-[#040D1A]/50">
                  <td className="py-3 px-3 text-[#7B61FF] font-bold">{c.id}</td>
                  <td className="py-3 px-3">
                    <div className="text-white font-bold">{c.name}</div>
                    <div className="text-gray-400 text-[10px]">{c.email}</div>
                  </td>
                  <td className="py-3 px-3 font-bold text-[#00C2FF]">{c.plan}</td>
                  <td className="py-3 px-3 text-white font-bold">{formatCurrency(c.mrr)}</td>
                  <td className="py-3 px-3 text-gray-300">{c.usage}</td>
                  <td className="py-3 px-3 text-[#00E676] font-bold">{c.status}</td>
                  <td className="py-3 px-3">
                    <button
                      onClick={() => setActiveQuotaModal(c)}
                      className="px-2.5 py-1 rounded bg-[#0D253F] border border-gray-600 text-[10px] text-gray-300 hover:text-white hover:border-[#00C2FF] transition"
                    >
                      Manage Quota
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create New License */}
      {showLicenseModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card p-6 md:p-8 rounded-3xl max-w-md w-full border border-[#7B61FF] space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-orbitron font-bold text-lg text-white">Create Customer License</h3>
              <button onClick={() => setShowLicenseModal(false)} className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLicense} className="space-y-4 text-xs">
              <div>
                <label className="block font-orbitron text-gray-300 mb-1">Organization Name</label>
                <input
                  type="text"
                  required
                  value={newOrg}
                  onChange={(e) => setNewOrg(e.target.value)}
                  placeholder="Apex Cybertech Inc"
                  className="w-full p-2.5 rounded-xl bg-[#040D1A] border border-gray-700 text-white font-mono focus:outline-none focus:border-[#7B61FF]"
                />
              </div>

              <div>
                <label className="block font-orbitron text-gray-300 mb-1">Contact Email</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="contact@apexcyber.com"
                  className="w-full p-2.5 rounded-xl bg-[#040D1A] border border-gray-700 text-white font-mono focus:outline-none focus:border-[#7B61FF]"
                />
              </div>

              <div>
                <label className="block font-orbitron text-gray-300 mb-1">Subscription Plan Tier</label>
                <select
                  value={newPlan}
                  onChange={(e) => setNewPlan(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#040D1A] border border-gray-700 text-white font-mono focus:outline-none focus:border-[#7B61FF]"
                >
                  <option value="Starter">Starter Plan (₹999 / mo)</option>
                  <option value="Business">Business Plan (₹4,999 / mo)</option>
                  <option value="Enterprise">Enterprise Custom (₹24,999 / mo)</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLicenseModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-600 bg-transparent text-gray-300 font-orbitron font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#7B61FF] text-white font-orbitron font-bold hover:opacity-90"
                >
                  Provision License
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Manage Quota */}
      {activeQuotaModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card p-6 rounded-3xl max-w-md w-full border border-[#00C2FF] space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-orbitron font-bold text-base text-white">Manage Quota — {activeQuotaModal.name}</h3>
              <button onClick={() => setActiveQuotaModal(null)} className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="rounded-xl bg-black/50 p-4 border border-gray-800 space-y-2 text-xs font-mono text-gray-300">
              <div>Customer ID: {activeQuotaModal.id}</div>
              <div>Current Plan: <span className="text-[#00C2FF] font-bold">{activeQuotaModal.plan}</span></div>
              <div>Current Quota: {activeQuotaModal.usage}</div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-orbitron font-bold text-gray-300">Select New Quota Limit:</span>
              <div className="space-y-2 text-xs font-mono">
                <button
                  onClick={() => handleQuotaUpgrade(activeQuotaModal.id, "18,420 / 50,000 (+25k Boost)")}
                  className="w-full p-2.5 rounded-xl bg-[#040D1A] border border-gray-700 hover:border-[#00C2FF] text-left text-gray-300"
                >
                  + Add 25,000 API Requests Boost
                </button>
                <button
                  onClick={() => handleQuotaUpgrade(activeQuotaModal.id, "18,420 / Unlimited (Enterprise Scale)")}
                  className="w-full p-2.5 rounded-xl bg-[#040D1A] border border-gray-700 hover:border-[#00C2FF] text-left text-gray-300"
                >
                  Set Unlimited Enterprise Quota
                </button>
              </div>
            </div>

            <button
              onClick={() => setActiveQuotaModal(null)}
              className="w-full py-2.5 rounded-xl border border-gray-600 bg-transparent text-xs font-orbitron font-bold text-gray-300 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

