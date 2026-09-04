"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Users, GraduationCap, Building2, Shield, Search, PhoneCall, ArrowRight, TrendingUp } from "lucide-react";

export default function LandingPage() {
  const [ticketId, setTicketId] = useState("");
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketId.trim()) return;
    setSearchResult(ticketId.toUpperCase().includes("2026") 
      ? "✅ Assigned: NIT Jamshedpur • Status: Phase 2 Lab Testing (CAD design verified)." 
      : "ℹ️ Status: Under spatial clustering review for BIT Mesra.");
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 min-h-screen text-slate-800">
      <header className="w-full px-4 py-3 bg-white/70 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-sm font-black text-slate-900 leading-none">Unnati Portal <span className="text-emerald-600">उन्नति पोर्टल</span></h1>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Govt of Jharkhand</p>
            </div>
          </Link>
          <div className="flex items-center gap-2 text-[10px]">
            <span className="bg-slate-100 border px-2 py-0.5 rounded-full font-semibold">24 Dist GIS</span>
            <span className="bg-slate-100 border px-2 py-0.5 rounded-full font-semibold">NEP 2020</span>
            <a href="tel:1800-JH-RND" className="bg-white border border-emerald-200 px-2 py-0.5 rounded-full font-bold shadow-sm">📞 Direct: 1800-JH-RND</a>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-8">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-white/50 p-6 rounded-2xl border border-white/80 shadow-md">
          <div className="lg:col-span-7 space-y-3">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">
              Transforming Rural Grassroots Challenges <br />
              <span className="text-xs font-bold text-slate-400 block my-0.5">INTO</span>
              <span className="text-emerald-600">University R&D & Funded Prototypes</span>
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              Citizens & Panchayats voice problems in native languages. Jharkhand colleges solve them for NEP 2020 credits, funded by corporate CSR.
            </p>
          </div>
          <div className="lg:col-span-5 bg-teal-50 border border-teal-100 rounded-xl p-4 shadow-sm space-y-2">
            <h4 className="text-xs font-bold text-teal-950 uppercase">Instant Ticket Status Lookup</h4>
            <form onSubmit={handleTrack} className="flex gap-2">
              <input type="text" value={ticketId} onChange={e => setTicketId(e.target.value)} placeholder="e.g. JH-2026-AG-09" className="flex-1 bg-white border border-emerald-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold" />
              <button type="submit" className="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs shadow flex items-center gap-1">Track <ArrowRight className="w-3 h-3" /></button>
            </form>
            {searchResult && <div className="p-2 bg-emerald-50 rounded border text-[10px] text-slate-700 font-semibold">{searchResult}</div>}
          </div>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Issues Ingested", val: "1420", desc: "Across 24 Districts" },
            { label: "Active Teams", val: "86", desc: "BIT, NIT, IIT-ISM, BAU" },
            { label: "Committed CSR", val: "₹ 48.5 L", desc: "Sec 135 Escrow" },
            { label: "Pilots Deployed", val: "32", desc: "Verified Field Impact" }
          ].map((s, i) => (
            <div key={i} className="bg-white/80 p-3 rounded-xl border border-emerald-100 shadow-sm">
              <p className="text-[9px] font-bold text-slate-500 uppercase">{s.label}</p>
              <h5 className="text-xl font-black text-emerald-600">{s.val}</h5>
              <p className="text-[8px] text-slate-500">{s.desc}</p>
            </div>
          ))}
        </section>

        <section className="space-y-4">
          <h3 className="text-xs font-extrabold text-slate-950 uppercase tracking-widest text-center">Select Your Portal ↘</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { title: "Citizens & Panchayats", label: "Citizen Door", desc: "Report challenges with audio (Santhali, Nagpuri, Ho) & GPS.", link: "/citizen", icon: Users, btn: "bg-emerald-600 hover:bg-emerald-500", badge: "bg-emerald-50 text-emerald-600", list: ["✓ Mobile OTP Login", "✓ Mukhiya Endorsement"] },
              { title: "Students & Faculty", label: "R&D Exploration", desc: "Claim problems for final-year capstone projects & earn NEP 2020 credits.", link: "/student", icon: GraduationCap, btn: "bg-cyan-600 hover:bg-cyan-500", badge: "bg-cyan-50 text-cyan-600", list: ["● Institutional SSO", "● ABC Credit Sync"] },
              { title: "Industry & CSR", label: "CSR Escrow", desc: "Fund verified prototypes through smart escrow & claim Sec 135 tax receipts.", link: "/csr", icon: Building2, btn: "bg-teal-600 hover:bg-teal-500", badge: "bg-teal-50 text-teal-600", list: ["● Milestone Escrow", "● Form 80G Tax Certs"] },
              { title: "State Gov Admin", label: "Orchestration", desc: "Real-time command center monitoring district heatmaps & college rankings.", link: "/admin", icon: Shield, btn: "bg-slate-800 hover:bg-slate-700", badge: "bg-slate-50 text-slate-600", list: ["● 24 District Map", "● IPI Rankings"] }
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className="bg-white border hover:shadow-md rounded-xl p-4 flex flex-col justify-between space-y-3 group transition">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${p.badge}`}>{p.label}</span>
                      <Icon className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-950">{p.title}</h4>
                    <p className="text-[10px] text-slate-500 leading-normal">{p.desc}</p>
                    <div className="text-[8px] font-semibold text-slate-400 space-y-0.5">
                      {p.list.map((item, idx) => <div key={idx}>{item}</div>)}
                    </div>
                  </div>
                  <Link href={p.link} className={`w-full text-center text-[10px] font-bold py-1.5 rounded-lg text-white ${p.btn} block transition`}>
                    Enter Portal →
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 px-4 py-3 text-center text-[9px]">
        Unnati Portal (उन्नति पोर्टल) • SIH PS 26043 • Dept. of Higher & Technical Education, Jharkhand
      </footer>
    </div>
  );
}