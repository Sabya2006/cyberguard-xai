"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import { Download, FileText, CheckCircle } from "lucide-react";

export default function PDFReportModal() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const generatePDF = () => {
    setIsGenerating(true);
    setDownloadSuccess(false);

    try {
      const doc = new jsPDF();

      // Header Banner
      doc.setFillColor(7, 26, 47);
      doc.rect(0, 0, 210, 40, "F");

      doc.setTextColor(0, 194, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text("CYBERGUARD XAI", 14, 22);

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text("EXECUTIVE SECURITY AUDIT REPORT", 14, 30);
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 150, 30);

      // Section 1: Executive Summary
      doc.setTextColor(7, 26, 47);
      doc.setFontSize(14);
      doc.text("1. Executive Summary & Telemetry Overview", 14, 52);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(60, 60, 60);
      doc.text("This report summarizes multi-vector threat intelligence telemetries captured across inbound emails,", 14, 62);
      doc.text("web domain URIs, computer vision deepfake streams, and user behavioral login logs.", 14, 68);

      // Section 2: Metrics Table
      doc.setFillColor(13, 37, 63);
      doc.rect(14, 78, 182, 45, "F");

      doc.setTextColor(0, 194, 255);
      doc.setFont("helvetica", "bold");
      doc.text("METRIC CATEGORY", 20, 88);
      doc.text("VALUE / RESULT", 120, 88);

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "normal");
      doc.text("Total Scanned Telemetries (24h):", 20, 98);
      doc.text("18,420 Scan Requests", 120, 98);

      doc.text("Detected & Mitigated Threats:", 20, 106);
      doc.text("142 Incidents (100% Quarantined)", 120, 106);

      doc.text("Average System Risk Score:", 20, 114);
      doc.text("18.4 / 100 (Safe Operational Baseline)", 120, 114);

      // Section 3: High Priority Incidents
      doc.setTextColor(7, 26, 47);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("2. Critical High-Priority Incident Audit Log", 14, 138);

      const incidents = [
        ["INC-9042", "Phishing NLP", "Urgent Bank Notice", "98.4%", "Quarantined"],
        ["INC-8911", "URL Audit", "http://secure-bput-login.xyz", "94.2%", "Blocked IP"],
        ["INC-8830", "Deepfake CV", "Synthetic Video Frame", "88.7%", "Quarantined"],
        ["INC-8712", "Behavioral", "Impossible Travel (NY->Tokyo)", "91.0%", "Session Revoked"],
      ];

      let y = 150;
      doc.setFontSize(9);
      doc.setFillColor(240, 240, 240);
      doc.rect(14, y - 6, 182, 8, "F");
      doc.setTextColor(0, 0, 0);
      doc.text("ID", 18, y);
      doc.text("TYPE", 45, y);
      doc.text("TARGET / SUMMARY", 75, y);
      doc.text("RISK", 145, y);
      doc.text("ACTION", 170, y);

      incidents.forEach((row) => {
        y += 10;
        doc.setTextColor(50, 50, 50);
        doc.text(row[0], 18, y);
        doc.text(row[1], 45, y);
        doc.text(row[2], 75, y);
        doc.text(row[3], 145, y);
        doc.text(row[4], 170, y);
      });

      // Footer Sign-off
      doc.setFontSize(9);
      doc.setTextColor(120, 120, 120);
      doc.text("Confidential Security Document — CYBERGUARD XAI Operations Engine", 14, 280);

      doc.save(`CYBERGUARD_XAI_Executive_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
      setDownloadSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="rounded-2xl bg-[#0D253F] p-6 border border-[#00C2FF]/30 flex flex-col md:flex-row items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <FileText className="h-5 w-5 text-[#00C2FF]" />
          <h3 className="font-orbitron font-bold text-white text-base">Export Executive PDF Audit Report</h3>
        </div>
        <p className="text-xs text-gray-400">
          Generate an official CISO-ready PDF compliance summary containing incident logs, XAI risk scores, and mitigation history.
        </p>
      </div>

      <button
        onClick={generatePDF}
        disabled={isGenerating}
        className="flex items-center gap-2 rounded-xl bg-[#00C2FF] px-5 py-2.5 text-xs font-bold text-black font-orbitron shadow-lg shadow-[#00C2FF]/30 hover:opacity-90 transition shrink-0 disabled:opacity-50"
      >
        {downloadSuccess ? (
          <>
            <CheckCircle className="h-4 w-4 text-black" />
            <span>Downloaded PDF</span>
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            <span>{isGenerating ? "Generating PDF..." : "Generate PDF Report"}</span>
          </>
        )}
      </button>
    </div>
  );
}
