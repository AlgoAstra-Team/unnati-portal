"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  ArrowLeft, 
  Search, 
  MapPin, 
  Building2, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Phone, 
  ShieldCheck
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";

function TrackContent() {
  const searchParams = useSearchParams();
  const { tickets, getTicketById } = useDemo();

  const paramId = searchParams.get("id") || "";
  const [typedQuery, setTypedQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const queryId = (selectedId || typedQuery || paramId || (tickets[0]?.id ?? "")).trim();
  const searchedTicket = queryId ? (getTicketById(queryId) || tickets.find(t => t.id.toUpperCase() === queryId.toUpperCase()) || null) : null;
  const hasSearched = Boolean(queryId);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedQuery.trim()) return;
    setSelectedId(typedQuery.trim());
  };

  const sampleTickets = ["JH-2026-AG-09", "JH-2026-PA-881", "JH-2026-DH-104"];

  return (
    <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8 space-y-6">
      {/* Sub Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white/75 backdrop-blur-xs p-3.5 rounded-2xl border border-emerald-100 shadow-xs">
        <div className="flex items-center gap-2.5">
          <Link 
            href="/" 
            className="p-1.5 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition shadow-xs flex items-center justify-center text-slate-700"
          >
            <ArrowLeft className="w-4 h-4 text-slate-700" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-900 uppercase tracking-wide">
                Citizen Grievance &amp; Solution Tracker
              </span>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200">
                Live Status
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-semibold">
              Transparent real-time tracking for citizens, Gram Panchayats &amp; local SHGs
            </p>
          </div>
        </div>

        <Link
          href="/citizen"
          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-xs transition flex items-center gap-1.5"
        >
          <span>Report New Problem</span>
        </Link>
      </div>

      {/* Ticket Lookup Box */}
      <div className="bg-white/90 backdrop-blur-md p-5 rounded-3xl border border-emerald-100 shadow-md space-y-4">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={typedQuery || queryId}
              onChange={(e) => {
                setTypedQuery(e.target.value);
                setSelectedId(e.target.value);
              }}
              placeholder="Enter Ticket ID (e.g. JH-2026-AG-09, JH-2026-KH-482)..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-xs font-mono font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs transition cursor-pointer shrink-0 flex items-center justify-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Track Problem</span>
          </button>
        </form>

        {/* Quick Sample Chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="font-bold text-[11px] text-slate-400">Sample Mock Tickets:</span>
          {sampleTickets.map((tId) => (
            <button
              key={tId}
              type="button"
              onClick={() => {
                setTypedQuery(tId);
                setSelectedId(tId);
              }}
              className={`font-mono text-[11px] px-2.5 py-1 rounded-lg border transition cursor-pointer font-bold ${
                queryId === tId 
                  ? "bg-emerald-100 text-emerald-800 border-emerald-300 shadow-xs" 
                  : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
              }`}
            >
              {tId}
            </button>
          ))}
        </div>
      </div>

      {/* Ticket Details View */}
      {searchedTicket ? (
        <div className="space-y-6">
          {/* Main Status Banner Card */}
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-emerald-100 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-black text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                    {searchedTicket.id}
                  </span>
                  <span className="text-[11px] font-bold bg-teal-50 text-teal-800 border border-teal-200 px-2.5 py-0.5 rounded-full">
                    Sector: {searchedTicket.sector}
                  </span>
                </div>
                <h2 className="text-lg font-black text-slate-900 mt-2">
                  {searchedTicket.title}
                </h2>
              </div>

              <div className="flex flex-col sm:items-end">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Current Status
                </span>
                <span className="text-xs font-black text-emerald-700 bg-emerald-100/70 border border-emerald-300 px-3 py-1 rounded-full mt-0.5 inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {searchedTicket.status === "Verified" ? "Active Academic R&D" : searchedTicket.status}
                </span>
              </div>
            </div>

            {/* Problem Description */}
            <div className="space-y-1">
              <span className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                Grievance Description
              </span>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                {searchedTicket.description}
              </p>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-0.5">
                <div className="flex items-center gap-1 text-slate-500 font-semibold text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Reported Location</span>
                </div>
                <div className="font-extrabold text-slate-900">
                  {searchedTicket.village}, {searchedTicket.district}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  GPS: {searchedTicket.gpsCoords.lat.toFixed(4)}° N, {searchedTicket.gpsCoords.lng.toFixed(4)}° E
                </div>
              </div>

              <div className="p-3 bg-cyan-50/50 rounded-2xl border border-cyan-100 space-y-0.5">
                <div className="flex items-center gap-1 text-slate-500 font-semibold text-[11px]">
                  <Building2 className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Assigned University Lab</span>
                </div>
                <div className="font-extrabold text-slate-900">
                  {searchedTicket.assignedHEI}
                </div>
                <div className="text-[10px] text-cyan-800 font-medium">
                  NEP 2020 Student Innovation Cell
                </div>
              </div>

              <div className="p-3 bg-teal-50/50 rounded-2xl border border-teal-100 space-y-0.5">
                <div className="flex items-center gap-1 text-slate-500 font-semibold text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                  <span>Panchayati Raj Endorsement</span>
                </div>
                <div className="font-extrabold text-teal-900 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{searchedTicket.mukhiyaEndorsed ? "Verified by Gram Mukhiya" : "Citizen Web Filing"}</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  Ingested on {searchedTicket.submittedAt}
                </div>
              </div>
            </div>
          </div>

          {/* Citizen Lifecycle Progress Timeline */}
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-emerald-100 shadow-md space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600" /> Problem Resolution Lifecycle
                </h3>
                <p className="text-xs text-slate-500">
                  Transparent progress from grassroots voice recording to village pilot deployment
                </p>
              </div>
              <span className="text-xs font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full">
                Phase {searchedTicket.currentPhase} of 4
              </span>
            </div>

            <div className="space-y-4 pt-2">
              {searchedTicket.timeline.map((step, idx) => {
                const isCompleted = step.status === "completed";
                const isCurrent = step.status === "current";

                return (
                  <div key={idx} className="flex items-start gap-3.5 relative">
                    {/* Vertical connecting line */}
                    {idx < searchedTicket.timeline.length - 1 && (
                      <div 
                        className={`absolute left-4 top-8 w-0.5 h-full -ml-[1px] ${
                          isCompleted ? "bg-emerald-400" : "bg-slate-200"
                        }`}
                      />
                    )}

                    <div className="mt-0.5 shrink-0 z-10">
                      {isCompleted ? (
                        <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      ) : isCurrent ? (
                        <div className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center shadow-xs ring-4 ring-cyan-100 animate-pulse">
                          <Clock className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-slate-300 text-slate-400 flex items-center justify-center text-xs font-bold">
                          {idx + 1}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 pb-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className={`text-xs font-bold ${
                          isCompleted ? "text-slate-900" : isCurrent ? "text-cyan-900 font-black" : "text-slate-400"
                        }`}>
                          {step.title}
                        </h4>
                        {step.timestamp && (
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold w-fit border border-emerald-100">
                            {step.timestamp}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Citizen Assistance & Helpline */}
          <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" /> Need Assistance with this Grievance?
              </h4>
              <p className="text-xs text-slate-300">
                Jharkhand Technical Education &amp; PRI Grievance Cell • Toll-Free Dialect Support
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="tel:1800-JH-RND"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-xs flex items-center gap-1.5"
              >
                <span>Call 1800-JH-RND</span>
              </a>
              <Link
                href="/"
                className="bg-white/10 hover:bg-white/20 text-slate-200 font-bold text-xs px-4 py-2 rounded-xl border border-white/10 transition"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      ) : hasSearched ? (
        <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl border border-rose-200 text-center space-y-3 shadow-md">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-black text-slate-900">
            Ticket ID &quot;{queryId}&quot; Not Found
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Please verify the Ticket ID. If you recently submitted a problem via the Citizen portal, ensure the full ID starting with &apos;JH-2026-&apos; is typed.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setTypedQuery(sampleTickets[0]);
                setSelectedId(sampleTickets[0]);
              }}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer shadow-xs"
            >
              Load Sample Ticket ({sampleTickets[0]})
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center p-12 text-xs font-bold text-emerald-800">
        Loading Grievance Tracking Status...
      </div>
    }>
      <TrackContent />
    </Suspense>
  );
}
