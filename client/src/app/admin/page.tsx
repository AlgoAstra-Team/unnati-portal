"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, Award } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-slate-900 via-purple-950 to-slate-950 min-h-screen text-slate-100">
      <header className="w-full px-4 py-3 bg-slate-900 border-b border-slate-800 sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="p-1 bg-slate-800 rounded border border-slate-700"><ArrowLeft className="w-4 h-4 text-white" /></Link>
          <span className="text-xs font-bold text-purple-400 uppercase">State Admin & GIS Command Center</span>
        </div>
        <span className="text-xs font-bold bg-purple-500/20 text-purple-300 border px-3 py-1 rounded-full">Dept. of Higher Education</span>
      </header>
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white">24-District Interactive GIS Heatmap & Institutional Leaderboard</h2>
            <p className="text-xs text-slate-400">Real-time monitoring of grassroots problem resolution and NEP credit velocity</p>
          </div>
          <div className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-xs font-bold">🟢 Live pgvector AI Triage Active</div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex justify-between items-center text-xs font-extrabold uppercase text-slate-300">
              <span>Jharkhand District Grid (24 Districts)</span>
              <span className="text-emerald-400">32 Pilots Deployed</span>
            </div>
            <div className="h-64 bg-slate-950 rounded-2xl border border-slate-800 relative flex items-center justify-center p-4">
              <div className="absolute top-10 left-12 bg-slate-900 border border-rose-500/50 p-2 rounded-xl shadow flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping"></span>
                <div className="text-[10px]"><div className="font-bold text-white">Palamu District</div><div className="text-rose-400">Fluoride Crisis</div></div>
              </div>
              <div className="absolute top-24 right-16 bg-slate-900 border border-amber-500/50 p-2 rounded-xl shadow flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span>
                <div className="text-[10px]"><div className="font-bold text-white">Dhanbad Corridor</div><div className="text-amber-400">Dust Suppressant</div></div>
              </div>
              <span className="text-xs text-slate-600 font-mono">[Interactive GIS Layer Active]</span>
            </div>
          </div>
          <div className="lg:col-span-4 bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <div className="text-xs font-extrabold text-slate-300 uppercase flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-400" /> Institutional Performance Index (IPI)
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <div><div className="font-bold text-white">1. BIT Mesra</div><div className="text-[10px] text-slate-400">14 Pilots Deployed</div></div>
                <span className="font-bold text-emerald-400">₹18.5L CSR</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <div><div className="font-bold text-white">2. NIT Jamshedpur</div><div className="text-[10px] text-slate-400">11 Pilots Deployed</div></div>
                <span className="font-bold text-emerald-400">₹14.0L CSR</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <div><div className="font-bold text-white">3. IIT (ISM) Dhanbad</div><div className="text-[10px] text-slate-400">7 Pilots Deployed</div></div>
                <span className="font-bold text-emerald-400">₹16.0L CSR</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-slate-900 text-slate-500 border-t px-4 py-3 text-center text-[10px]">
        Unnati Portal State Admin Command Center • Govt. of Jharkhand
      </footer>
    </div>
  );
}
