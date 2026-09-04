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
    activeSponsorId, 
    setActiveSponsorId, 
    releaseMilestoneEscrow 
  } = useDemo();

  const activeSponsor = sponsors.find((s) => s.id === activeSponsorId) || sponsors[0];

  // Escrow release state
  const [releasedPhases, setReleasedPhases] = useState<Record<string, boolean>>({
    "proj-khunti-01-2": false
  });
  const [showTaxModal, setShowTaxModal] = useState(false);
  const [pledgedProjects, setPledgedProjects] = useState<Record<string, boolean>>({});

  const handleRelease = (projectId: string, phaseNum: number) => {
    releaseMilestoneEscrow(projectId, phaseNum);
    setReleasedPhases((prev) => ({ ...prev, [`${projectId}-${phaseNum}`]: true }));
  };

  const handlePledge = (projId: string) => {
    setPledgedProjects((prev) => ({ ...prev, [projId]: true }));
  };

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-6">
      {/* Sub Header / Context Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white/75 backdrop-blur-xs p-3.5 rounded-2xl border border-teal-100 shadow-xs">
        <div className="flex items-center gap-2.5">
          <Link href="/" className="p-1.5 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition shadow-xs">
            <ArrowLeft className="w-4 h-4 text-slate-700" />
          </Link>
          <div>
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Corporate Innovation Escrow Hub
            </span>
            <p className="text-[10px] text-slate-500">Section 135 Companies Act Compliance • Milestone-Gated Disbursements</p>
          </div>
        </div>

        {/* Corporate Entity Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Sponsor:</span>
          <select
            value={activeSponsorId}
            onChange={(e) => setActiveSponsorId(e.target.value)}
            className="bg-white border border-teal-300 text-teal-900 font-bold text-xs rounded-xl px-3 py-1.5 shadow-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            {sponsors.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Corporate Entity Pill */}
      <div className="flex justify-center">
        <div className="bg-white/90 border border-teal-200 px-6 py-2 rounded-full text-xs font-bold text-teal-900 shadow-xs flex items-center gap-2">
          ACTIVE CORPORATE ESCROW ACCOUNT: <span className="text-teal-600 font-extrabold">{activeSponsor.name}</span>
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
              <Download className="w-3 h-3" /> Form 80G
            </button>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Form CSR-1 & Sec 80G synchronized</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Pre-vetted Academic Capstones */}
        <div className="lg:col-span-7 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-teal-100 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="text-sm font-black text-slate-900">Pre-Vetted Academic Capstones</h3>
              <p className="text-xs text-slate-500 font-medium">
                Mapped to Jharkhand district priorities with faculty endorsement
              </p>
            </div>
            <span className="text-xs font-bold text-teal-600">3 Verified Opportunities</span>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span className="bg-teal-50 border border-teal-200 text-teal-800 px-3 py-1.5 rounded-full flex items-center gap-1.5">
              🌾 Agriculture & MFP
            </span>
            <span className="bg-teal-50 border border-teal-200 text-teal-800 px-3 py-1.5 rounded-full flex items-center gap-1.5">
              💧 Drinking Water
            </span>
            <span className="bg-teal-50 border border-teal-200 text-teal-800 px-3 py-1.5 rounded-full flex items-center gap-1.5">
              🌿 Clean Environment
            </span>
          </div>

          {/* Capstone 1: Palamu Water Filter */}
          <div className="bg-slate-50/90 p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <span className="bg-teal-700 text-white font-bold text-[10px] px-3 py-1 rounded-xl uppercase tracking-wider">
                NIT Jamshedpur • Chemical Eng.
              </span>
              <span className="font-black text-teal-800 text-xs sm:text-sm">₹ 2,00,000 Requested</span>
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-extrabold text-slate-900">
                Low-Cost Nano-Adsorbent Hand-Pump Filter Cartridge
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Eliminates excess Fluoride & Arsenic for 42 villages in Palamu. Cost per replacement cartridge: under ₹250.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2 border-t border-slate-200/60">
              <span className="text-xs font-semibold text-slate-500">Student Lead: Priya Sharma • Mentor: Prof. S. Soren</span>
              <button
                onClick={() => handlePledge("palamu")}
                className={`px-5 py-2 rounded-xl text-xs font-bold text-white shadow-xs transition cursor-pointer ${
                  pledgedProjects["palamu"] ? "bg-emerald-600" : "bg-teal-600 hover:bg-teal-500"
                }`}
              >
                {pledgedProjects["palamu"] ? "✓ Grant Pledged to Escrow" : "Pledge Grant Escrow"}
              </button>
            </div>
          </div>

          {/* Capstone 2: Dhanbad Dust Suppressant */}
          <div className="bg-slate-50/90 p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <span className="bg-teal-700 text-white font-bold text-[10px] px-3 py-1 rounded-xl uppercase tracking-wider">
                IIT (ISM) Dhanbad + BIT Sindri
              </span>
              <span className="font-black text-teal-800 text-xs sm:text-sm">₹ 2,50,000 Requested</span>
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-extrabold text-slate-900">
                Bio-Polymer Fly-Ash Dust Suppressant Spray for Coal Corridors
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Eco-friendly dust reduction spray mitigating particulate pollution (PM10/PM2.5) along mining transport routes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2 border-t border-slate-200/60">
              <span className="text-xs font-semibold text-slate-500">Student Lead: Amit Kumar • Mentor: Dr. R. Mishra</span>
              <button
                onClick={() => handlePledge("dhanbad")}
                className={`px-5 py-2 rounded-xl text-xs font-bold text-white shadow-xs transition cursor-pointer ${
                  pledgedProjects["dhanbad"] ? "bg-emerald-600" : "bg-teal-600 hover:bg-teal-500"
                }`}
              >
                {pledgedProjects["dhanbad"] ? "✓ Grant Pledged to Escrow" : "Pledge Grant Escrow"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Pending Escrow Releases & ESG Outcomes */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-teal-100 shadow-md space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-teal-600" /> Pending Escrow Disbursements
              </h3>
              <span className="bg-amber-400 text-slate-950 font-bold text-[10px] px-2.5 py-0.5 rounded-full shadow-xs">
                Faculty Sign-off Complete
              </span>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-5 rounded-2xl border border-teal-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-emerald-700 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-lg">
                  BIT MESRA • SOLAR COLD STORAGE
                </span>
                <span className="text-xs font-black text-emerald-800">₹ 50,000 Milestone</span>
              </div>

              <div className="space-y-1 text-xs">
                <p className="font-bold text-slate-900">Phase 2 CAD & Thermal Chamber Verification Complete</p>
                <p className="text-slate-600 text-[11px]">
                  Dr. A. K. Roy (Dean R&D) signed off on 12-hr temperature retention deliverable.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleRelease("proj-khunti-01", 2)}
                  disabled={releasedPhases["proj-khunti-01-2"]}
                  className={`w-full font-bold py-2.5 rounded-xl shadow-xs text-xs transition flex items-center justify-center gap-2 cursor-pointer ${
                    releasedPhases["proj-khunti-01-2"]
                      ? "bg-emerald-600 text-white cursor-default"
                      : "bg-teal-600 hover:bg-teal-500 text-white"
                  }`}
                >
                  {releasedPhases["proj-khunti-01-2"] ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Escrow Disbursed to College Cell
                    </>
                  ) : (
                    <>
                      <Unlock className="w-4 h-4" /> Authorize ₹50,000 Payout
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-teal-100 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider">
                Audited ESG & Field Impact
              </h3>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Government Verified
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center font-semibold">
                <span className="text-slate-700">💧 Safe Fluoride-Free Water</span>
                <span className="font-bold text-teal-700">1.2M Liters Delivered</span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center font-semibold">
                <span className="text-slate-700">🌾 Perishable Produce Protected</span>
                <span className="font-bold text-teal-700">42 Metric Tons</span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center font-semibold">
                <span className="text-slate-700">🌫️ Ambient PM10 Dust Suppressed</span>
                <span className="font-bold text-teal-700">60% Reduction</span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center font-semibold">
                <span className="text-slate-700">📄 First-Look Commercial IP Rights</span>
                <span className="font-bold text-teal-700">3 Priority Licenses</span>
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
