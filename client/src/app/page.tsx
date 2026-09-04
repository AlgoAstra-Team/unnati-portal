"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  GraduationCap, 
  Building2, 
  Shield, 
  Search, 
  ArrowRight, 
  MapPin, 
  Sparkles,
  ExternalLink
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { ProblemTicket } from "@/types";

export default function LandingPage() {
  const { tickets, projects } = useDemo();
  const [ticketQuery, setTicketQuery] = useState("JH-2026-AG-09");
  const [searchedTicket, setSearchedTicket] = useState<ProblemTicket | null>(tickets[0] || null);
  const [searchError, setSearchError] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketQuery.trim()) return;
    const clean = ticketQuery.trim().toUpperCase();
    const found = tickets.find(t => t.id.toUpperCase() === clean);
    if (found) {
      setSearchedTicket(found);
      setSearchError(false);
    } else {
      setSearchedTicket(null);
      setSearchError(true);
    }
  };

  const quickTickets = ["JH-2026-AG-09", "JH-2026-PA-881", "JH-2026-DH-104"];

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-8">
      {/* Hero & Ticket Tracker Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/80 shadow-md">
        <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-100/70 border border-emerald-200/80 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full w-fit">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>State-Wide Quadruple Helix Innovation Engine</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight">
            Transforming Rural Grassroots Challenges <br />
            <span className="text-xs md:text-sm font-bold text-slate-400 block my-1">INTO</span>
            <span className="text-emerald-600">University R&D & Funded Prototypes</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-xl">
            Citizens and Panchayats voice localized problems in native dialects. Jharkhand colleges and polytechnics solve them for NEP 2020 experiential learning credits, funded milestone-by-milestone through corporate CSR escrow.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
            <Link 
              href="/citizen"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl shadow-md transition flex items-center gap-2"
            >
              <span>Report Local Problem</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/student"
              className="bg-white hover:bg-slate-50 text-slate-700 font-bold px-4 py-2.5 rounded-xl border border-slate-200 shadow-xs transition"
            >
              Browse Student Capstones →
            </Link>
          </div>
        </div>

        {/* Live Ticket Status Lookup */}
        <div className="lg:col-span-5 bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-teal-950 uppercase tracking-wider flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-teal-700" /> Instant Ticket Status Lookup
              </h3>
              <span className="text-[10px] font-bold text-teal-700 bg-teal-100/80 px-2 py-0.5 rounded-md">Live Sync</span>
            </div>

            <form onSubmit={handleTrack} className="flex gap-2">
              <input 
                type="text" 
                value={ticketQuery} 
                onChange={(e) => setTicketQuery(e.target.value)} 
                placeholder="e.g. JH-2026-AG-09" 
                className="flex-1 bg-white border border-emerald-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30" 
              />
              <button 
                type="submit" 
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-sm flex items-center gap-1 cursor-pointer transition"
              >
                Track <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Quick Chips */}
            <div className="flex items-center gap-1.5 mt-2 text-[10px] text-slate-500">
              <span className="font-semibold">Try:</span>
              {quickTickets.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => { setTicketQuery(t); const f = tickets.find(x => x.id === t); if(f) { setSearchedTicket(f); setSearchError(false); } }}
                  className="font-mono bg-white hover:bg-emerald-100 border border-emerald-200 px-1.5 py-0.5 rounded cursor-pointer transition text-emerald-800"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Ticket Detail Box */}
          {searchedTicket ? (
            <div className="bg-white p-3.5 rounded-xl border border-emerald-200 shadow-xs space-y-2 text-xs">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                    {searchedTicket.id}
                  </span>
                  <h4 className="font-bold text-slate-900 mt-1 line-clamp-1">{searchedTicket.title}</h4>
                </div>
                <span className="text-[10px] font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full shrink-0">
                  {searchedTicket.status}
                </span>
              </div>

              <div className="text-[11px] text-slate-600 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-600" /> {searchedTicket.district} ({searchedTicket.village})
                </span>
                <span className="font-semibold text-slate-700">🏛️ {searchedTicket.assignedHEI}</span>
              </div>

              {/* Progress Steps Mini Timeline */}
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <div className="text-[10px] font-bold text-slate-500 uppercase">Current Milestone Progress:</div>
                <div className="grid grid-cols-4 gap-1 text-[9px] text-center font-bold">
                  <div className="p-1 rounded bg-emerald-100 text-emerald-800">✓ Ingestion</div>
                  <div className="p-1 rounded bg-emerald-100 text-emerald-800">✓ Assigned</div>
                  <div className={`p-1 rounded ${searchedTicket.currentPhase >= 2 ? "bg-emerald-100 text-emerald-800" : "bg-cyan-100 text-cyan-800 animate-pulse"}`}>
                    {searchedTicket.currentPhase >= 2 ? "✓ Phase 2" : "● Phase 1"}
                  </div>
                  <div className="p-1 rounded bg-slate-100 text-slate-400">Phase 4 Pilot</div>
                </div>
              </div>

              <Link 
                href="/student" 
                className="text-[10px] text-emerald-700 hover:text-emerald-900 font-bold flex items-center justify-end gap-1 pt-1"
              >
                View capstone R&D milestones <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          ) : searchError ? (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-xl text-xs font-semibold">
              Ticket ID not found in current database. Try selecting one of the suggested tickets above.
            </div>
          ) : null}
        </div>
      </section>

      {/* Real-Time Impact Metric Cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Issues Ingested", val: `${tickets.length + 1417}`, desc: "Across 24 Jharkhand Districts", color: "text-emerald-600" },
          { label: "Active R&D Teams", val: `${projects.length * 28 + 30}`, desc: "BIT, NIT, IIT-ISM, BAU", color: "text-cyan-600" },
          { label: "Committed CSR Escrow", val: "₹ 48.5 L", desc: "Sec 135 Companies Act", color: "text-teal-600" },
          { label: "Field Pilots Deployed", val: "32", desc: "Verified Grassroots Impact", color: "text-emerald-700" }
        ].map((s, i) => (
          <div key={i} className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-emerald-100/80 shadow-xs hover:shadow-md transition">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{s.label}</p>
            <h5 className={`text-2xl font-black mt-0.5 ${s.color}`}>{s.val}</h5>
            <p className="text-[9px] text-slate-500 font-medium mt-1">{s.desc}</p>
          </div>
        ))}
      </section>

      {/* 4 Main Stakeholder Portals */}
      <section className="space-y-4">
        <div className="text-center space-y-1">
          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest">Select Your Stakeholder Portal ↘</h3>
          <p className="text-xs text-slate-500">Every stakeholder role drives a critical leg of the innovation cycle</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { 
              title: "Citizens & Panchayats", 
              label: "Grassroots Intake", 
              desc: "Report local challenges with native audio (Santhali, Nagpuri, Ho, Hindi) & live GPS tagging.", 
              link: "/citizen", 
              icon: Users, 
              btn: "bg-emerald-600 hover:bg-emerald-500", 
              badge: "bg-emerald-50 text-emerald-700 border-emerald-200", 
              list: ["✓ Native Dialect Audio", "✓ Mukhiya 1-Click Endorsement", "✓ Auto-GPS Village Geotag"] 
            },
            { 
              title: "Students & Faculty", 
              label: "Academic R&D Hub", 
              desc: "Claim verified problems for semester capstone projects & earn NEP 2020 NHEQF degree credits.", 
              link: "/student", 
              icon: GraduationCap, 
              btn: "bg-cyan-600 hover:bg-cyan-500", 
              badge: "bg-cyan-50 text-cyan-700 border-cyan-200", 
              list: ["● 4-Phase Milestone Engine", "● Cross-Branch Team Builder", "● ABC Credit Sync (4 Credits)"] 
            },
            { 
              title: "Industry & CSR", 
              label: "Corporate Escrow", 
              desc: "Fund student prototypes through milestone-gated escrow & claim Form 80G tax receipts.", 
              link: "/csr", 
              icon: Building2, 
              btn: "bg-teal-600 hover:bg-teal-500", 
              badge: "bg-teal-50 text-teal-700 border-teal-200", 
              list: ["● Sec. 135 Escrow Release", "● Pre-Vetted Capstones", "● Form CSR-1 Tax Exemption"] 
            },
            { 
              title: "State Gov Admin", 
              label: "State GIS Command", 
              desc: "Real-time command center monitoring district heatmaps, college rankings & ESG ledger.", 
              link: "/admin", 
              icon: Shield, 
              btn: "bg-emerald-800 hover:bg-emerald-700", 
              badge: "bg-emerald-100 text-emerald-900 border-emerald-300", 
              list: ["● 24 Jharkhand District Map", "● Institutional IPI Ranking", "● ESG Impact Ledger"] 
            }
          ].map((p, i) => {
            const Icon = p.icon;
            return (
              <div 
                key={i} 
                className="bg-white border border-slate-200/80 hover:border-emerald-300 hover:shadow-lg rounded-2xl p-5 flex flex-col justify-between space-y-4 group transition"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border ${p.badge}`}>
                      {p.label}
                    </span>
                    <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-emerald-50 transition">
                      <Icon className="w-4 h-4 text-slate-600 group-hover:text-emerald-600 transition" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-black text-slate-900">{p.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{p.desc}</p>
                  </div>

                  <div className="text-[9px] font-semibold text-slate-600 space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    {p.list.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1">
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link 
                  href={p.link} 
                  className={`w-full text-center text-xs font-bold py-2.5 rounded-xl text-white ${p.btn} block shadow-sm transition`}
                >
                  Enter Portal →
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quadruple Helix Innovation Flow Banner */}
      <section className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-lg">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-block bg-white/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-300">
            Quadruple Helix Synergy
          </div>
          <h3 className="text-xl md:text-2xl font-black">
            How Unnati Portal Closes the Loop Between Citizens, Colleges & Corporates
          </h3>
          <p className="text-xs text-emerald-100 leading-relaxed max-w-2xl mx-auto">
            Traditional grievance systems route structural problems to municipal maintenance. Unnati Portal routes unsolved regional challenges to university research laboratories, funded by corporate CSR, creating student-led deployable prototypes.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 text-left">
            <div className="bg-white/10 p-3 rounded-xl border border-white/10">
              <span className="text-[9px] font-bold text-emerald-300 block">STEP 1 • DEMAND</span>
              <p className="text-xs font-bold text-white mt-1">1. Citizens & PRIs</p>
              <p className="text-[10px] text-slate-300 mt-0.5">Voice verified grassroots pain points with GPS & photos.</p>
            </div>
            <div className="bg-white/10 p-3 rounded-xl border border-white/10">
              <span className="text-[9px] font-bold text-cyan-300 block">STEP 2 • R&D</span>
              <p className="text-xs font-bold text-white mt-1">2. University HEIs</p>
              <p className="text-[10px] text-slate-300 mt-0.5">Students build engineering prototypes for NEP credits.</p>
            </div>
            <div className="bg-white/10 p-3 rounded-xl border border-white/10">
              <span className="text-[9px] font-bold text-teal-300 block">STEP 3 • CAPITAL</span>
              <p className="text-xs font-bold text-white mt-1">3. Corporate CSR</p>
              <p className="text-[10px] text-slate-300 mt-0.5">Pledge escrow grants under Sec 135 for tax benefits.</p>
            </div>
            <div className="bg-white/10 p-3 rounded-xl border border-white/10">
              <span className="text-[9px] font-bold text-amber-300 block">STEP 4 • POLICY</span>
              <p className="text-xs font-bold text-white mt-1">4. State Admin</p>
              <p className="text-[10px] text-slate-300 mt-0.5">Monitors 24-district resolution and scales successful pilots.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
