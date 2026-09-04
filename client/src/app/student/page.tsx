"use client";
import React, { useState } from "react";
import Link from "next/link";
import { GraduationCap, CheckCircle2, ArrowLeft, Upload } from "lucide-react";

export default function StudentPage() {
  const [done, setDone] = useState(false);
  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-100 min-h-screen text-slate-800">
      <header className="w-full px-4 py-3 bg-white/75 border-b border-cyan-100 sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="p-1 bg-white rounded border"><ArrowLeft className="w-4 h-4" /></Link>
          <span className="text-xs font-bold text-slate-500 uppercase">Capstone: <span className="text-emerald-600 font-mono">#JH-2026-AG-09</span></span>
        </div>
        <span className="text-xs font-semibold text-slate-600">BIT Mesra R&D</span>
      </header>
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside className="lg:col-span-3">
          <div className="bg-white/90 p-4 rounded-xl border border-cyan-100 shadow-sm text-xs space-y-2">
            <div className="font-bold text-slate-400 uppercase text-[10px]">Hub</div>
            <div className="p-2 rounded-lg bg-cyan-600 text-white font-bold flex items-center gap-2"><GraduationCap className="w-4 h-4" /> Challenges</div>
          </div>
        </aside>
        <div className="lg:col-span-9 space-y-6">
          <div className="bg-white/80 p-6 rounded-2xl border border-cyan-100 shadow-md space-y-4">
            <div className="flex justify-between items-start gap-4">
              <div>
                <div className="flex gap-2 text-[10px] font-semibold mb-2">
                  <span className="bg-slate-100 px-2 py-0.5 rounded">🌾 Agri</span>
                  <span className="bg-rose-50 text-rose-600 font-bold px-2 py-0.5 rounded">Severity: 8.9/10</span>
                </div>
                <h2 className="text-xl font-black text-slate-900">Decentralized Solar-Biomass Cold Storage</h2>
              </div>
              <div className="bg-emerald-50 border px-3 py-2 rounded-xl text-center">
                <div className="text-sm font-black text-emerald-700">4 CREDITS</div>
                <div className="text-[9px] font-bold text-slate-500 uppercase">NHEQF 7</div>
              </div>
            </div>
            <p className="text-xs text-slate-600 bg-cyan-50/50 p-3 rounded-xl">Tribal farmers in Khunti face 40% post-harvest loss in perishable Mahua and Lac transit due to ambient heat.</p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-slate-50 p-2 rounded border font-bold">Rahul (Lead)</div>
              <div className="bg-slate-50 p-2 rounded border font-bold">Sneha (Co)</div>
              <div className="bg-slate-50 p-2 rounded border font-bold">Dr. Roy (Mentor)</div>
            </div>
            <div className="bg-blue-900 text-white p-3 rounded-xl flex justify-between items-center text-xs">
              <div>
                <div className="font-bold text-blue-100">Tata Steel Foundation</div>
                <div className="text-[10px] text-blue-200">Escrow: ₹1,50,000 (₹50k Unlocked)</div>
              </div>
              <span className="bg-emerald-500 text-white font-bold text-[9px] px-2 py-1 rounded">SEC. 135</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 bg-white/80 p-5 rounded-2xl border border-cyan-100 shadow-md space-y-3">
              <div className="flex justify-between items-center text-xs font-extrabold uppercase">
                <span>NEP Milestone State-Machine</span>
                <span className="text-emerald-600">{done ? "75%" : "50%"}</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-emerald-50 border rounded-xl flex justify-between items-center text-emerald-800 font-semibold">
                  <span>✓ Phase 1: Lit Review</span>
                  <span className="text-[9px] font-bold bg-emerald-100 px-2 py-0.5 rounded">1 Cr</span>
                </div>
                <div className={`p-3 rounded-xl border flex justify-between items-center font-semibold ${done ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"}`}>
                  <span>{done ? "✓ Phase 2: CAD Verified" : "▶ Phase 2: CAD Simulation"}</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-white">{done ? "Approved" : "In Review"}</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-5 bg-white/80 p-5 rounded-2xl border border-cyan-100 shadow-md flex flex-col justify-between space-y-3">
              <div className="space-y-2 text-xs">
                <div className="font-extrabold uppercase">Submit Proof</div>
                <div className="border-2 border-dashed border-cyan-200 rounded-xl p-3 text-center bg-cyan-50/40">
                  <Upload className="w-5 h-5 text-cyan-600 mx-auto mb-1" />
                  <p className="text-[10px] font-bold text-slate-700">Drop Lab Report (.PDF)</p>
                </div>
              </div>
              <button onClick={() => setDone(true)} disabled={done} className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-emerald-600 text-white font-bold py-2.5 rounded-xl shadow text-xs flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> {done ? "Submitted!" : "Submit Milestone 2"}
              </button>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-slate-900 text-slate-400 border-t px-4 py-3 text-center text-[9px]">
        Unnati Portal • NEP 2020 • Govt of Jharkhand
      </footer>
    </div>
  );
}
