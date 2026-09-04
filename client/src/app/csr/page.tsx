"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Building2, ArrowLeft, CheckCircle2, FileText, ArrowRight, ShieldCheck } from "lucide-react";

export default function CsrPage() {
  const [pledged, setPledged] = useState(false);
  const [released, setReleased] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-100 min-h-screen text-slate-800">
      {/* Top Header matching Figma */}
      <header className="w-full px-4 md:px-8 py-3 bg-white/75 border-b border-teal-100 sticky top-0 z-50 flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-1.5 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition shadow-sm">
            <ArrowLeft className="w-4 h-4 text-slate-700" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center text-emerald-400 font-bold text-xs">UP</div>
            <span className="text-sm font-black text-slate-900 tracking-tight">Corporate Innovation Escrow</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="text-slate-500 hidden sm:inline">Section 135 Companies Act Compliance Portal</span>
          <button className="bg-white border border-teal-300 text-teal-800 font-bold px-3 py-1.5 rounded-full shadow-sm hover:bg-teal-50">Pledge New</button>
          <button className="bg-teal-500 hover:bg-teal-400 text-white font-bold px-4 py-1.5 rounded-full shadow-md">CSR Fund</button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-6">
        {/* Corporate Entity Pill */}
        <div className="flex justify-center">
          <div className="bg-white/80 border border-teal-200 px-6 py-2 rounded-full text-xs font-bold text-teal-900 shadow-sm flex items-center gap-2">
            CORPORATE ENTITY: <span className="text-teal-600 font-extrabold">Tata Steel Foundation</span>
          </div>
        </div>

        {/* Top 4 Metrics Cards matching Figma */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/90 p-5 rounded-3xl border border-teal-100 shadow-sm space-y-1">
            <p className="text-xs font-bold text-slate-600">Total CSR Funds Committed</p>
            <h4 className="text-2xl font-black text-teal-700">₹ 48,50,000</h4>
            <p className="text-[11px] text-slate-400 font-medium">8 Corporate Sponsors Pledged</p>
          </div>
          <div className="bg-white/90 p-5 rounded-3xl border border-teal-100 shadow-sm space-y-1">
            <p className="text-xs font-bold text-slate-600">Funds Held in Smart Escrow</p>
            <h4 className="text-2xl font-black text-teal-700">₹ 29,00,000</h4>
            <p className="text-[11px] text-slate-400 font-medium">Milestone-gated release</p>
          </div>
          <div className="bg-white/90 p-5 rounded-3xl border border-teal-100 shadow-sm space-y-1">
            <p className="text-xs font-bold text-slate-600">Disbursed to College Incubation Cells</p>
            <h4 className="text-2xl font-black text-teal-700">₹ 19,50,000</h4>
            <p className="text-[11px] text-slate-400 font-medium">Upon verified lab sign-offs</p>
          </div>
          <div className="bg-white/90 p-5 rounded-3xl border border-teal-100 shadow-sm space-y-1">
            <p className="text-xs font-bold text-slate-600">Tax Exemption Certs Issued</p>
            <h4 className="text-2xl font-black text-teal-700">100% Audited</h4>
            <p className="text-[11px] text-slate-400 font-medium">Form CSR-1 & Sec 80G sync</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Pre-vetted Academic Capstones */}
          <div className="lg:col-span-7 bg-white/90 p-6 rounded-3xl border border-teal-100 shadow-lg space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-sm font-black text-slate-900">Pre-Vetted Academic Capstones</h3>
                <p className="text-xs text-slate-500 font-medium">Seeking CSR Grants • Projects mapped to Jharkhand district priorities with faculty endorsement</p>
              </div>
              <span className="text-xs font-bold text-teal-600 cursor-pointer hover:underline">View All</span>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <span className="bg-teal-50 border border-teal-200 text-teal-800 px-3 py-1.5 rounded-full flex items-center gap-1.5">🌾 Agriculture & MFP</span>
              <span className="bg-teal-50 border border-teal-200 text-teal-800 px-3 py-1.5 rounded-full flex items-center gap-1.5">💧 Water</span>
              <span className="bg-teal-50 border border-teal-200 text-teal-800 px-3 py-1.5 rounded-full flex items-center gap-1.5">🌿 Environment</span>
            </div>

            {/* Capstone Card 1 */}
            <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span className="bg-teal-700 text-white font-bold text-[10px] px-3 py-1 rounded-xl uppercase tracking-wider">
                  NIT JAMSHEDPUR • CHEMICAL ENG.
                </span>
                <span className="font-black text-teal-800 text-sm">₹ 2,50,000 Requested</span>
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-extrabold text-slate-900">Low-Cost Hybrid Nano-Adsorbent Hand-Pump Filter Cartridge</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Filters Fluoride & Arsenic for 42 villages in Palamu. Cost per cartridge: under ₹250.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2 border-t border-slate-200/60">
                <span className="text-xs font-semibold text-slate-500">Student Lead: R. Sharma • Mentor: Dr. K. Anand</span>
                <button 
                  onClick={() => setPledged(true)}
                  className={`px-5 py-2.5 rounded-2xl text-xs font-bold text-white shadow-md transition ${pledged ? "bg-emerald-600" : "bg-teal-500 hover:bg-teal-400"}`}
                >
                  {pledged ? "✓ Escrow Pledged" : "Pledge Grant Escrow"}
                </button>
              </div>
            </div>

            {/* Capstone Card 2 */}
            <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span className="bg-teal-700 text-white font-bold text-[10px] px-3 py-1 rounded-xl uppercase tracking-wider">
                  IIT (ISM) DHANBAD • MINING ENG.
                </span>
                <span className="font-black text-teal-800 text-sm">₹ 3,00,000 Requested</span>
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-extrabold text-slate-900">Bio-Polymer Fly-Ash Dust Suppressant Spray for Coal Corridors</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Eco-friendly dust reduction spray mitigating particulate pollution in mining zones.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2 border-t border-slate-200/60">
                <span className="text-xs font-semibold text-slate-500">Student Lead: A. Singh • Mentor: Dr. P. Rao</span>
                <button className="bg-teal-500 hover:bg-teal-400 text-white px-5 py-2.5 rounded-2xl text-xs font-bold shadow-md transition">
                  Pledge Grant Escrow
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Pending Escrow Disbursements & Audited ESG Outcomes */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Pending Escrow Disbursements */}
            <div className="bg-white/90 p-6 rounded-3xl border border-teal-100 shadow-lg space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider">Pending Escrow Disbursements</h3>
                <span className="bg-amber-400 text-slate-950 font-bold text-[10px] px-2.5 py-1 rounded-lg shadow-sm">Action Needed !</span>
              </div>

              <div className="bg-teal-50/80 p-5 rounded-2xl border border-teal-200 space-y-3">
                <span className="bg-emerald-600 text-white font-bold text-[10px] px-2.5 py-1 rounded-xl">
                  BIT MESRA • SOLAR COLD STORAGE
                </span>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-900">Milestone 2 Achieved !</p>
                  <p className="text-xs text-slate-600 font-medium">(Thermal CAD test) approved by Dean. Ready for ₹50,000 release.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <button className="flex-1 bg-white border border-teal-300 text-teal-800 font-bold py-2.5 rounded-xl shadow-sm text-xs hover:bg-teal-50 transition">
                    Review PDF
                  </button>
                  <button 
                    onClick={() => setReleased(true)}
                    className="flex-1 bg-teal-500 hover:bg-teal-400 text-white font-bold py-2.5 rounded-xl shadow-md text-xs transition"
                  >
                    {released ? "✓ Funds Released" : "Approve & Release Funds"}
                  </button>
                </div>
              </div>
            </div>

            {/* Audited ESG Outcomes */}
            <div className="bg-white/90 p-6 rounded-3xl border border-teal-100 shadow-lg space-y-3">
              <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider">Audited ESG Outcomes</h3>
              
              <div className="space-y-2 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center font-semibold">
                  <span className="text-slate-700">💧 Safe Water Delivered</span>
                  <span className="font-bold text-teal-700">1.2M Liters</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center font-semibold">
                  <span className="text-slate-700">🌾 Post-Harvest Loss Prevented</span>
                  <span className="font-bold text-teal-700">42 Tons</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center font-semibold">
                  <span className="text-slate-700">📄 First Look IP Licenses</span>
                  <span className="font-bold text-teal-700">3 Patents</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 px-4 py-4 text-center text-xs font-semibold">
        Unnati Portal Corporate CSR Escrow Hub • Section 135 Companies Act Compliance • Govt of Jharkhand
      </footer>
    </div>
  );
}