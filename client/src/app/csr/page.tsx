"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  Download, 
  X
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";

export default function CsrPage() {
  const { 
    sponsors, 
    releaseMilestoneEscrow 
  } = useDemo();

  const activeSponsor = sponsors.find((s) => s.id === "tata-steel") || sponsors[0] || {
    id: "tata-steel",
    name: "Tata Steel Foundation",
    shortName: "Tata Steel",
    committedFunds: 4850000,
    escrowLocked: 2900000,
    disbursedFunds: 1950000,
    auditedPercentage: 100,
    activeProjectsCount: 14
  };

  // Escrow release state
  const [releasedPhases, setReleasedPhases] = useState<Record<string, boolean>>({
    "proj-khunti-01-2": false
  });
  const [showTaxModal, setShowTaxModal] = useState(false);

  const handleRelease = (projectId: string, phaseNum: number) => {
    releaseMilestoneEscrow(projectId, phaseNum);
    setReleasedPhases((prev) => ({ ...prev, [`${projectId}-${phaseNum}`]: true }));
  };

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-6">
      {/* Sub Header / Context Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white/75 backdrop-blur-xs p-3.5 rounded-2xl border border-teal-100 shadow-xs">
        <div className="flex items-center gap-2.5">
          <Link href="/" className="p-1.5 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition shadow-xs flex items-center justify-center text-slate-700">
            <ArrowLeft className="w-4 h-4 text-slate-700" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-900 uppercase tracking-wide">
                Tata Steel Foundation CSR Hub
              </span>
              <span className="text-[10px] font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded-md border border-teal-200">
                Pre-Authenticated
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-semibold">Section 135 Companies Act Compliance • Milestone-Gated Escrow Trust</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTaxModal(true)}
            className="bg-white hover:bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Form 80G Receipt
          </button>
        </div>
      </div>

      {/* Corporate Entity Pill */}
      <div className="flex justify-center">
        <div className="bg-white/90 border border-teal-200 px-6 py-2 rounded-full text-xs font-bold text-teal-900 shadow-xs flex items-center gap-2">
          ACTIVE CORPORATE ESCROW TRUST: <span className="text-teal-700 font-extrabold">Tata Steel Foundation (Reg: CSR-1/JH/2026)</span>
        </div>
      </div>

      {/* Top 4 Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/90 backdrop-blur-xs p-5 rounded-3xl border border-teal-100 shadow-xs space-y-1">
          <p className="text-xs font-bold text-slate-500">Total CSR Funds Committed</p>
          <h4 className="text-2xl font-black text-teal-700">₹ {activeSponsor.committedFunds.toLocaleString("en-IN")}</h4>
          <p className="text-[11px] text-slate-400 font-medium">{activeSponsor.activeProjectsCount} Academic Capstones Supported</p>
        </div>
        <div className="bg-white/90 backdrop-blur-xs p-5 rounded-3xl border border-teal-100 shadow-xs space-y-1">
          <p className="text-xs font-bold text-slate-500">Held in Smart Escrow</p>
          <h4 className="text-2xl font-black text-teal-700">₹ {activeSponsor.escrowLocked.toLocaleString("en-IN")}</h4>
          <p className="text-[11px] text-slate-400 font-medium">Milestone-gated release</p>
        </div>
        <div className="bg-white/90 backdrop-blur-xs p-5 rounded-3xl border border-teal-100 shadow-xs space-y-1">
          <p className="text-xs font-bold text-slate-500">Disbursed to Incubation Cells</p>
          <h4 className="text-2xl font-black text-emerald-600">₹ {activeSponsor.disbursedFunds.toLocaleString("en-IN")}</h4>
          <p className="text-[11px] text-slate-400 font-medium">Upon verified lab milestones</p>
        </div>
        <div className="bg-white/90 backdrop-blur-xs p-5 rounded-3xl border border-teal-100 shadow-xs space-y-1">
          <p className="text-xs font-bold text-slate-500">Tax Exemption Receipts</p>
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-black text-teal-700">{activeSponsor.auditedPercentage}% Audited</h4>
            <button
              onClick={() => setShowTaxModal(true)}
              className="text-[10px] font-bold text-teal-700 hover:text-teal-900 bg-teal-50 border border-teal-200 px-2 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Form 80G
            </button>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Form CSR-1 & Sec 80G synchronized</p>
        </div>
      </div>

      {/* Main Content Grid: Dedicated Project Grant Escrow Agreement */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Dedicated Grant Agreement & 4-Phase Escrow Breakdown */}
        <div className="lg:col-span-7 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-teal-100 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-teal-100 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-teal-100 text-teal-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Active Grant Escrow Contract
                </span>
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Sec 135 Compliant
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900">
                Decentralized Solar-Biomass Hybrid Cold Storage Crate
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Target: Khunti District (Torpa Mandi) • Ticket: <span className="font-mono font-bold text-teal-700">JH-2026-AG-09</span>
              </p>
            </div>
            <div className="bg-teal-50 border border-teal-200 px-3.5 py-2 rounded-2xl text-right shrink-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Committed</span>
              <span className="text-base font-black text-teal-800">₹ 1,50,000</span>
            </div>
          </div>

          {/* Academic Partner & Student Team Summary */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Contracted Academic Partner</span>
              <div className="font-black text-slate-900 text-sm">BIT Mesra, Ranchi</div>
              <div className="text-slate-500 text-[11px]">Dept. of Mechanical & Agricultural Engineering • Dr. A. K. Roy</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-white border px-2.5 py-1 rounded-xl text-[10px] font-bold text-slate-600">
                Lead: Rahul Kumar
              </span>
              <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2.5 py-1 rounded-xl">
                NEP 2020: 4 Credits
              </span>
            </div>
          </div>

          {/* 4-Phase Milestone Escrow Ledger */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-teal-600" /> Milestone-Gated Escrow Disbursement Ledger
            </h4>

            {/* Milestone 1 */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">✓</span>
                  <span>Phase 1: CAD Design & Heat Flux Simulation</span>
                </div>
                <p className="text-[10px] text-slate-500 ml-7">Verified by Faculty • Deliverable: CAD_Thermal_Report_v1.pdf</p>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className="font-mono font-bold text-slate-800">₹50,000</span>
                <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Disbursed
                </span>
              </div>
            </div>

            {/* Milestone 2 */}
            <div className={`p-4 rounded-2xl border text-xs transition space-y-2.5 ${
              releasedPhases["proj-khunti-01-2"] 
                ? "bg-emerald-50/70 border-emerald-200" 
                : "bg-teal-50/80 border-teal-300 shadow-xs"
            }`}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <div className="flex items-center gap-2 font-black text-slate-900">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      releasedPhases["proj-khunti-01-2"] ? "bg-emerald-600 text-white" : "bg-teal-600 text-white"
                    }`}>
                      {releasedPhases["proj-khunti-01-2"] ? "✓" : "2"}
                    </span>
                    <span>Phase 2: Chamber Simulation & Lab PCM Synthesis</span>
                  </div>
                  <p className="text-[10px] text-slate-600 ml-7">
                    Dr. A. K. Roy signed off 12-hr cold retention chamber test.
                  </p>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span className="font-mono font-bold text-slate-900 text-xs">₹50,000</span>
                  <span className="bg-amber-100 text-amber-900 font-extrabold text-[10px] px-2 py-0.5 rounded-md">
                    Faculty Verified
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-teal-200/60 flex flex-col sm:flex-row justify-between items-center gap-2">
                <span className="text-[10px] text-slate-500 font-medium">
                  {releasedPhases["proj-khunti-01-2"]
                    ? "✓ SBI Escrow Trust UTR: SBIN-2026-CSR-7821 Disbursed"
                    : "Ready for Corporate Escrow Authorization"}
                </span>
                <button
                  type="button"
                  onClick={() => handleRelease("proj-khunti-01", 2)}
                  disabled={releasedPhases["proj-khunti-01-2"]}
                  className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    releasedPhases["proj-khunti-01-2"]
                      ? "bg-emerald-600 text-white cursor-default"
                      : "bg-teal-700 hover:bg-teal-600 text-white shadow-xs"
                  }`}
                >
                  {releasedPhases["proj-khunti-01-2"] ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Escrow Disbursed to College Cell
                    </>
                  ) : (
                    <>
                      <Unlock className="w-3.5 h-3.5" /> Authorize ₹50,000 Payout
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Milestone 3 */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 opacity-75">
              <div>
                <div className="flex items-center gap-2 font-bold text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px]">3</span>
                  <span>Phase 3: MVP Working Prototype Fabrication & SHG Trials</span>
                </div>
                <p className="text-[10px] text-slate-400 ml-7">Assembly of 5 bamboo hybrid crates for weekly haats</p>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className="font-mono font-bold text-slate-500">₹30,000</span>
                <span className="bg-slate-100 text-slate-600 font-bold text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Locked
                </span>
              </div>
            </div>

            {/* Milestone 4 */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 opacity-75">
              <div>
                <div className="flex items-center gap-2 font-bold text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px]">4</span>
                  <span>Phase 4: Khunti Torpa Field Pilot & Handover</span>
                </div>
                <p className="text-[10px] text-slate-400 ml-7">Distribution to 50 SHG farmers with telemetry monitoring</p>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className="font-mono font-bold text-slate-500">₹20,000</span>
                <span className="bg-slate-100 text-slate-600 font-bold text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Locked
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: ESG Outcomes */}
        <div className="lg:col-span-5 space-y-6">

          {/* Audited ESG Outcomes */}
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-teal-100 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider">
                Audited ESG & Field Impact
              </h3>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Govt. Form CSR-1 Verified
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center font-semibold">
                <span className="text-slate-700">🌾 Post-Harvest Transit Loss</span>
                <span className="font-bold text-emerald-700">Reduced by 85%</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center font-semibold">
                <span className="text-slate-700">👥 Tribal SHG Farmers Impacted</span>
                <span className="font-bold text-teal-700">400+ Families in Khunti</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center font-semibold">
                <span className="text-slate-700">🌱 Bamboo Materials Utilized</span>
                <span className="font-bold text-teal-700">100% Local Sourcing</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center font-semibold">
                <span className="text-slate-700">📄 First-Look Commercial License</span>
                <span className="font-bold text-teal-700">Tata Steel Foundation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form 80G Tax Exemption Certificate Modal */}
      {showTaxModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-teal-200 shadow-2xl relative space-y-5 animate-scaleUp">
            <button
              onClick={() => setShowTaxModal(false)}
              className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-1 border-b border-teal-100 pb-3">
              <span className="text-[10px] font-extrabold bg-teal-50 text-teal-800 px-3 py-1 rounded-full uppercase tracking-wider border border-teal-200">
                Income Tax Department & Ministry of Corporate Affairs
              </span>
              <h3 className="text-base font-black text-slate-900 mt-2">
                Section 135 & Form 80G Tax Exemption Receipt
              </h3>
              <p className="text-[10px] text-slate-500">Issued under Companies (CSR Policy) Rules, 2014</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500">Corporate Donor:</span>
                <span className="font-bold text-slate-900">{activeSponsor.name}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500">Total Escrow Disbursed:</span>
                <span className="font-black text-teal-700 font-mono">
                  ₹ {activeSponsor.disbursedFunds.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500">Exemption Category:</span>
                <span className="font-bold text-emerald-700">100% Tax Deductible (Sec 80G)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Govt. Verification Hash:</span>
                <span className="font-mono text-[10px] text-slate-600">JH-CSR-2026-TATA-9982</span>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowTaxModal(false)}
                className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
