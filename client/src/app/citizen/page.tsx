"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Users, ArrowLeft, Mic, Send, CheckCircle2, MapPin } from "lucide-react";

export default function CitizenPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [title, setTitle] = useState("Excessive Fluoride & Arsenic in Hand-Pumps");

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 min-h-screen text-slate-800">
      <header className="w-full px-4 py-3 bg-white/75 border-b border-emerald-100 sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="p-1 bg-white rounded border"><ArrowLeft className="w-4 h-4" /></Link>
          <span className="text-xs font-bold text-emerald-900 uppercase">Citizen & PRI PWA Portal</span>
        </div>
        <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">Palamu District</span>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8 space-y-6">
        <div className="bg-white/90 p-6 rounded-3xl border border-emerald-200 shadow-lg space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-black text-slate-900">Report Local Village Problem</h2>
              <p className="text-xs text-slate-500">Voice note in Santhali / Mundari / Ho or text with GPS tagging</p>
            </div>
            <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-xl border border-emerald-200">📍 Auto-Geotagged</span>
          </div>

          {!submitted ? (
            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Problem Title / Description</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border rounded-xl px-3 py-2 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">District</label>
                  <select className="w-full bg-slate-50 border rounded-xl px-3 py-2 font-semibold text-slate-800">
                    <option>Palamu</option>
                    <option>Khunti</option>
                    <option>Dhanbad</option>
                    <option>Ranchi</option>
                    <option>Dumka</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Sector</label>
                  <select className="w-full bg-slate-50 border rounded-xl px-3 py-2 font-semibold text-slate-800">
                    <option>Water & Sanitation</option>
                    <option>Agriculture & MFP</option>
                    <option>Rural Electricity</option>
                    <option>Primary Health</option>
                  </select>
                </div>
              </div>

              {/* Voice Note Recording Simulator */}
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                <div className="font-bold text-emerald-900">Native Dialect Voice Note (Santhali / हिंदी)</div>
                <button 
                  type="button"
                  onClick={() => setIsRecording(!isRecording)}
                  className={`px-5 py-2.5 rounded-full font-bold text-white shadow transition flex items-center gap-2 mx-auto ${isRecording ? "bg-rose-600 animate-pulse" : "bg-emerald-600 hover:bg-emerald-500"}`}
                >
                  <Mic className="w-4 h-4" /> {isRecording ? "Recording... Click to Stop" : "Tap & Speak Problem"}
                </button>
              </div>

              <button 
                onClick={() => setSubmitted(true)}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Submit with Mukhiya Endorsement
              </button>
            </div>
          ) : (
            <div className="p-8 text-center space-y-4 bg-emerald-50 rounded-2xl border border-emerald-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-base font-black text-emerald-950">Ticket Ingested & AI Triaged Successfully!</h3>
              <p className="text-xs text-slate-600">Ticket ID: <span className="font-mono font-bold">JH-2026-PA-881</span>. Automatically assigned to NIT Jamshedpur R&D Cell with SMS alert sent to Mukhiya.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="bg-slate-800 text-white font-bold text-xs py-2 px-4 rounded-xl"
              >
                Report Another Problem
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 border-t px-4 py-3 text-center text-[9px]">
        Unnati Portal Citizen PWA • Offline-First Field Reporting • Govt of Jharkhand
      </footer>
    </div>
  );
}
