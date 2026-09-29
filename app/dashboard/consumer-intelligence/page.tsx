"use client";

import { useState } from "react";
import DemoBadge from "@/components/DemoBadge";
import { Users, Search, Plus, ThumbsUp, ShieldAlert, CheckCircle2, MessageSquare, Star, X } from "lucide-react";

export default function ConsumerIntelligencePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const [newTarget, setNewTarget] = useState("");
  const [newType, setNewType] = useState("domain");
  const [newRating, setNewRating] = useState("1");
  const [newComment, setNewComment] = useState("");

  const [intelligenceItems, setIntelligenceItems] = useState([
    {
      id: "INTEL-101",
      target: "secure-bput-portal.xyz",
      target_type: "domain",
      risk_score: 96,
      community_rating: 1.2,
      review_count: 48,
      trust_label: "CRITICAL MALICIOUS PHISHING DOMAIN",
      recent_reviews: [
        { user: "Ananya P.", comment: "Sent fake exam fee payment link. Money deducted immediately.", upvotes: 24, date: "1 day ago" },
        { user: "Rahul M.", comment: "Domain registered 2 days ago. Fake SSL badge.", upvotes: 19, date: "2 days ago" },
      ],
    },
    {
      id: "INTEL-102",
      target: "+91 98765 43210",
      target_type: "phone",
      risk_score: 88,
      community_rating: 1.5,
      review_count: 32,
      trust_label: "SUSPECTED TELECOM IMPERSONATION",
      recent_reviews: [
        { user: "Vikram S.", comment: "Claimed to be Electricity Department threatening disconnection.", upvotes: 31, date: "3 hours ago" },
      ],
    },
    {
      id: "INTEL-103",
      target: "refund-support@bput.ac.in",
      target_type: "email",
      risk_score: 12,
      community_rating: 4.8,
      review_count: 110,
      trust_label: "VERIFIED OFFICIAL ENTITY",
      recent_reviews: [
        { user: "Priya R.", comment: "Official university refund portal desk. Verified safe.", upvotes: 88, date: "1 week ago" },
      ],
    },
  ]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/consumer-intelligence?query=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data.success && data.data) {
        setIntelligenceItems(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/consumer-intelligence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target: newTarget,
          target_type: newType,
          rating: Number(newRating),
          comment: newComment,
          author: "Analyst Contributor",
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setIntelligenceItems(data.data);
      }
      setShowAddModal(false);
      setNewTarget("");
      setNewComment("");
      alert(`Success: Consumer review for ${newTarget} submitted successfully.`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-orbitron font-extrabold text-2xl md:text-3xl text-white flex items-center gap-2">
            <Users className="h-7 w-7 text-[#7B61FF]" />
            <span>Consumer Intelligence & Review Ecosystem</span>
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Community-driven fraud reports, domain reputation scores, verified analyst reviews, and threat feedback management.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <DemoBadge label="COMMUNITY INTELLIGENCE LIVE" />
        </div>
      </div>

      {/* Search Bar & Add Review Trigger */}
      <div className="glass-card p-4 rounded-2xl border border-[#7B61FF]/30 flex flex-wrap justify-between items-center gap-4">
        <form onSubmit={handleSearch} className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search domain, phone (+91...), UPI ID, or email..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#040D1A] border border-gray-700 text-xs text-white focus:border-[#7B61FF] font-mono outline-none"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-[#7B61FF] text-white font-orbitron font-bold text-xs hover:opacity-90 transition"
          >
            Search Intelligence
          </button>
        </form>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-[#00C2FF] text-black font-orbitron font-bold text-xs hover:opacity-90 transition flex items-center gap-1.5"
        >
          <Plus className="h-4 w-4" />
          <span>Submit Fraud Review</span>
        </button>
      </div>

      {/* Intelligence Cards List */}
      <div className="space-y-4">
        {intelligenceItems.map((item) => (
          <div key={item.id} className="glass-card p-6 rounded-2xl border border-gray-800 space-y-4 hover:border-[#7B61FF]/50 transition">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-orbitron font-bold text-[#7B61FF]">{item.id}</span>
                  <h3 className="font-bold text-white text-lg font-mono">{item.target}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                    item.risk_score > 60 ? "bg-[#FF4D4D]/20 text-[#FF4D4D] border-[#FF4D4D]/40" : "bg-[#00E676]/20 text-[#00E676] border-[#00E676]/40"
                  }`}>
                    {item.trust_label}
                  </span>
                </div>
                <div className="text-xs font-mono text-gray-400 mt-1">
                  Type: <span className="text-white capitalize">{item.target_type}</span> • Community Rating: <span className="text-[#FF9100] font-bold">{item.community_rating} / 5.0</span> • ({item.review_count} Reports)
                </div>
              </div>

              <div className="text-right">
                <div className="font-orbitron font-extrabold text-xl text-[#FF4D4D]">{item.risk_score} / 100</div>
                <div className="text-[10px] font-mono text-gray-400">Risk Score</div>
              </div>
            </div>

            {/* Community Reviews List */}
            <div className="space-y-2 border-t border-gray-800 pt-3">
              <span className="text-xs font-orbitron font-bold text-gray-300 flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5 text-[#00C2FF]" />
                <span>Recent Consumer & Analyst Reviews:</span>
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {item.recent_reviews?.map((rev: any, idx: number) => (
                  <div key={idx} className="p-3 rounded-xl bg-black/60 border border-gray-800 space-y-1">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-[#00C2FF] font-bold">{rev.user}</span>
                      <span className="text-gray-400 text-[10px]">{rev.date}</span>
                    </div>
                    <p className="text-xs font-mono text-gray-300">{rev.comment}</p>
                    <div className="flex items-center gap-1 text-[10px] font-mono text-[#00E676] pt-1">
                      <ThumbsUp className="h-3 w-3" />
                      <span>{rev.upvotes} Upvotes</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Submit Fraud Review */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card p-6 md:p-8 rounded-3xl max-w-md w-full border border-[#7B61FF] space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-orbitron font-bold text-lg text-white">Submit Fraud Review Report</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-gray-300 mb-1">Target Entity (Domain / Phone / UPI / Email)</label>
                <input
                  type="text"
                  required
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  placeholder="scam-site.xyz or +91 99999 88888"
                  className="w-full p-2.5 rounded-xl bg-[#040D1A] border border-gray-700 text-white font-mono focus:border-[#7B61FF] outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Entity Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#040D1A] border border-gray-700 text-white font-mono focus:border-[#7B61FF] outline-none"
                >
                  <option value="domain">Domain Name / URL</option>
                  <option value="phone">Phone Number</option>
                  <option value="upi">UPI Handle / Bank Account</option>
                  <option value="email">Email Address</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Safety Rating (1 = Highly Malicious, 5 = Verified Safe)</label>
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#040D1A] border border-gray-700 text-white font-mono focus:border-[#7B61FF] outline-none"
                >
                  <option value="1">1 Star (Critical Fraud Scam)</option>
                  <option value="2">2 Stars (High Suspicious Risk)</option>
                  <option value="3">3 Stars (Neutral / Unverified)</option>
                  <option value="4">4 Stars (Likely Legitimate)</option>
                  <option value="5">5 Stars (Verified Safe Entity)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Review Commentary & Evidence</label>
                <textarea
                  rows={3}
                  required
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Describe your interaction or fraud evidence..."
                  className="w-full p-2.5 rounded-xl bg-[#040D1A] border border-gray-700 text-white font-mono focus:border-[#7B61FF] outline-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-600 bg-transparent text-gray-300 font-orbitron font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#7B61FF] text-white font-orbitron font-bold hover:opacity-90"
                >
                  Publish Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
