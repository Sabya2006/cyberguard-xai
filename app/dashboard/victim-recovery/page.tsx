"use client";

import { useState } from "react";
import DemoBadge from "@/components/DemoBadge";
import { ShieldCheck, FileText, Download, UserCheck, AlertTriangle, Scale, CheckCircle2, Lock } from "lucide-react";
import jsPDF from "jspdf";

export default function VictimRecoveryPage() {
  const [victimName, setVictimName] = useState("Sabyasachi Patnaik");
  const [victimEmail, setVictimEmail] = useState("victim.support@bput.ac.in");
  const [victimPhone, setVictimPhone] = useState("+91 98765 43210");
  const [victimAddress, setVictimAddress] = useState("Bhubaneswar, Odisha, India");
  const [incidentDate, setIncidentDate] = useState("2026-09-28 14:30 IST");
  const [financialLoss, setFinancialLoss] = useState("45000");
  const [transactionRef, setTransactionRef] = useState("UPI/2026/89401294120");
  const [scammerDetails, setScammerDetails] = useState("Spoofed Portal domain secure-bput-login.xyz & Telegram User @bput_helpdesk_bot");
  const [description, setDescription] = useState("The complainant received a deceptive phishing SMS containing a link to secure-bput-login.xyz urging immediate payment of examination fees. The perpetrator fraudulently induced the victim to enter UPI credentials resulting in unauthorized debit of ₹45,000.");

  const [isGenerating, setIsGenerating] = useState(false);
  const [firData, setFirData] = useState<any>(null);

  const handleGenerateFIR = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const res = await fetch("/api/victim-recovery/fir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          victim_name: victimName,
          victim_email: victimEmail,
          victim_phone: victimPhone,
          victim_address: victimAddress,
          incident_date: incidentDate,
          financial_loss_inr: Number(financialLoss),
          transaction_ref_id: transactionRef,
          scammer_details: scammerDetails,
          complaint_description: description,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setFirData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadFIRPDF = () => {
    if (!firData) return;

    const doc = new jsPDF();
    doc.setFillColor(7, 26, 47);
    doc.rect(0, 0, 210, 297, "F");

    doc.setTextColor(0, 194, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("CYBERGUARD XAI — LEGAL VICTIM RECOVERY CELL", 15, 20);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.text("FORMAL FIRST INFORMATION REPORT (FIR) COMPLAINT LETTER", 15, 28);
    doc.text(`REF COMPLAINT NO: ${firData.fir_reference_no}`, 15, 34);
    doc.text(`DATE & TIME: ${firData.timestamp}`, 15, 40);

    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 194, 255);
    doc.line(15, 45, 195, 45);

    doc.setFontSize(10);
    doc.setTextColor(200, 200, 200);

    const splitText = doc.splitTextToSize(firData.fir_full_document_text, 180);
    doc.text(splitText, 15, 53);

    doc.save(`CYBERGUARD_FIR_COMPLAINT_${firData.fir_reference_no}.pdf`);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-orbitron font-extrabold text-2xl md:text-3xl text-white flex items-center gap-2">
            <Scale className="h-7 w-7 text-[#00E676]" />
            <span>Victim Recovery & Legal FIR Complaint Generator</span>
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Secure fraud ingestion and automated legal First Information Report (FIR) complaint drafting under IT Act 2000 Section 66D & IPC 420.
          </p>
        </div>

        <DemoBadge label="LEGAL COMPLIANCE READY" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Side: Fraud Intake Form */}
        <div className="glass-card p-6 rounded-2xl border border-[#00E676]/30 space-y-4">
          <h3 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-[#00E676]" />
            <span>Fraud Details Ingestion Form</span>
          </h3>

          <form onSubmit={handleGenerateFIR} className="space-y-3 text-xs font-mono">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-300 mb-1">Victim Full Name</label>
                <input
                  type="text"
                  required
                  value={victimName}
                  onChange={(e) => setVictimName(e.target.value)}
                  className="w-full p-2 rounded-xl bg-[#040D1A] border border-gray-700 text-white font-mono focus:border-[#00E676] outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={victimPhone}
                  onChange={(e) => setVictimPhone(e.target.value)}
                  className="w-full p-2 rounded-xl bg-[#040D1A] border border-gray-700 text-white font-mono focus:border-[#00E676] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={victimEmail}
                  onChange={(e) => setVictimEmail(e.target.value)}
                  className="w-full p-2 rounded-xl bg-[#040D1A] border border-gray-700 text-white font-mono focus:border-[#00E676] outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Financial Loss (INR ₹)</label>
                <input
                  type="number"
                  value={financialLoss}
                  onChange={(e) => setFinancialLoss(e.target.value)}
                  className="w-full p-2 rounded-xl bg-[#040D1A] border border-gray-700 text-white font-mono focus:border-[#00E676] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-300 mb-1">Incident Date & Time</label>
                <input
                  type="text"
                  value={incidentDate}
                  onChange={(e) => setIncidentDate(e.target.value)}
                  className="w-full p-2 rounded-xl bg-[#040D1A] border border-gray-700 text-white font-mono focus:border-[#00E676] outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">UPI / Transaction Ref ID</label>
                <input
                  type="text"
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value)}
                  className="w-full p-2 rounded-xl bg-[#040D1A] border border-gray-700 text-white font-mono focus:border-[#00E676] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Suspect / Scammer Details (Domain, Phone, Handle)</label>
              <input
                type="text"
                value={scammerDetails}
                onChange={(e) => setScammerDetails(e.target.value)}
                className="w-full p-2 rounded-xl bg-[#040D1A] border border-gray-700 text-white font-mono focus:border-[#00E676] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Incident Description & Narrative Statement</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 rounded-xl bg-[#040D1A] border border-gray-700 text-white font-mono focus:border-[#00E676] outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-3 rounded-xl bg-[#00E676] text-black font-orbitron font-extrabold text-xs hover:opacity-90 transition flex items-center justify-center gap-2 shadow-lg shadow-[#00E676]/20"
            >
              <FileText className="h-4 w-4" />
              <span>{isGenerating ? "Generating Legal FIR Document..." : "Generate Legal FIR Complaint Letter"}</span>
            </button>
          </form>
        </div>

        {/* Right Side: Legal FIR Preview & Download Document */}
        <div className="glass-card p-6 rounded-2xl border border-[#00C2FF]/30 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
                <Scale className="h-5 w-5 text-[#00C2FF]" />
                <span>Legally Formatted FIR Document Preview</span>
              </h3>

              {firData && (
                <button
                  onClick={downloadFIRPDF}
                  className="px-3 py-1.5 rounded-xl bg-[#00C2FF] text-black font-orbitron font-bold text-xs hover:opacity-90 transition flex items-center gap-1.5"
                >
                  <Download className="h-4 w-4" />
                  <span>Download FIR PDF</span>
                </button>
              )}
            </div>

            {firData ? (
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-[#040D1A] border border-gray-800 space-y-1 font-mono text-xs text-gray-300">
                  <div>Ref No: <span className="text-[#00C2FF] font-bold">{firData.fir_reference_no}</span></div>
                  <div>Jurisdiction: <span className="text-white">{firData.police_station_jurisdiction}</span></div>
                  <div>Timestamp: <span className="text-gray-400">{firData.timestamp}</span></div>
                </div>

                <div className="w-full h-80 rounded-xl bg-black/80 border border-gray-800 p-4 font-mono text-[11px] text-gray-300 overflow-y-auto whitespace-pre-wrap leading-relaxed select-all border-l-4 border-l-[#00E676]">
                  {firData.fir_full_document_text}
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-gray-800 space-y-1 text-xs font-mono">
                  <div className="text-[#00E676] font-bold">Applicable Legal Provisions Included:</div>
                  <ul className="list-disc list-inside text-gray-300 text-[11px] space-y-0.5">
                    {firData.legal_section_clauses?.map((clause: string, idx: number) => (
                      <li key={idx}>{clause}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="w-full h-96 rounded-xl bg-black/50 border border-dashed border-gray-800 flex flex-col items-center justify-center p-6 text-center text-gray-400 font-mono space-y-2">
                <FileText className="h-12 w-12 text-[#00C2FF] opacity-60" />
                <div className="font-orbitron font-bold text-white text-xs">No FIR Complaint Generated Yet</div>
                <p className="text-[11px]">Fill out the fraud details form on the left and click "Generate Legal FIR Complaint Letter" to preview and download.</p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
