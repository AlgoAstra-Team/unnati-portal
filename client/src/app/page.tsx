"use client";

import React, { useState } from "react";
import { 
  Building2, 
  GraduationCap, 
  MapPin, 
  Mic, 
  Send, 
  Users, 
  CheckCircle2, 
  ChevronRight,
  Sparkles
} from "lucide-react";

export default function UnnatiPortal() {
  const [activeTab, setActiveTab] = useState<"landing" | "citizen" | "student" | "csr" | "admin">("landing");
  
  // Citizen Form State
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [problemTitle, setProblemTitle] = useState("Excessive Fluoride & Arsenic in Hand-Pumps");
  const [selectedDistrict, setSelectedDistrict] = useState("Palamu");
  const [selectedSector, setSelectedSector] = useState("Water & Sanitation");

  // Student Milestone Simulation State
  const [milestone2Done, setMilestone2Done] = useState(false);

  // CSR Escrow State
  const [escrowReleased, setEscrowReleased] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between">
      
      {/* 1. TOP GLOBAL NAVIGATION & ROLE SWITCHER */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab("landing")}>
            <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center font-black text-white text-base shadow-lg shadow-emerald-900/50">
              UP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white">उन्नति पोर्टल (Unnati Portal)</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-bold">SIH 26043</span>
              </div>
              <p className="text-[11px] text-slate-400">Dept. of Higher & Technical Education • Govt. of Jharkhand</p>
            </div>
          </div>

          {/* Role Navigation Pills */}
          <nav className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs font-semibold">
            <button 
              onClick={() => setActiveTab("landing")}
              className={`px-3 py-1.5 rounded-lg transition ${activeTab === "landing" ? "bg-slate-700 text-white shadow" : "text-slate-400 hover:text-white"}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab("citizen")}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${activeTab === "citizen" ? "bg-emerald-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
            >
              <Users className="w-3.5 h-3.5" /> 1. Citizen PWA
            </button>
            <button 
              onClick={() => setActiveTab("student")}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${activeTab === "student" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
            >
              <GraduationCap className="w-3.5 h-3.5" /> 2. University R&D
            </button>
            <button 
              onClick={() => setActiveTab("csr")}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${activeTab === "csr" ? "bg-amber-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
            >
              <Building2 className="w-3.5 h-3.5" /> 3. CSR Escrow
            </button>
            <button 
              onClick={() => setActiveTab("admin")}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${activeTab === "admin" ? "bg-purple-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
            >
              <MapPin className="w-3.5 h-3.5" /> 4. State GIS
            </button>
          </nav>
        </div>
      </header>

      {/* 2. DYNAMIC CONTENT CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8">
        
        {/* ==================================================== */}
        {/* VIEW 0: MASTER LANDING GATEWAY                       */}
        {/* ==================================================== */}
        {activeTab === "landing" && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 p-8 md:p-10 rounded-3xl border border-emerald-800/40 shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-4 max-w-2xl relative z-10">
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full">
                  <Sparkles className="w-3.5 h-3.5" /> Jharkhand Quadruple Helix Innovation Platform
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                  Unnati Portal: Transforming Rural Challenges into Academic R&D & Funded Prototypes
                </h1>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Citizens and Panchayats voice grassroots problems in native dialects. Jharkhand’s engineering institutions resolve them for NEP 2020 credits, funded directly via Corporate CSR escrows under Section 135.
                </p>
                
                <div className="flex flex-wrap gap-3 pt-2">
                  <button 
                    onClick={() => setActiveTab("citizen")}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-lg transition flex items-center gap-2"
                  >
                    <Mic className="w-4 h-4" /> Report Problem as Citizen / PRI
                  </button>
                  <button 
                    onClick={() => setActiveTab("student")}
                    className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold px-5 py-3 rounded-xl transition flex items-center gap-2"
                  >
                    <GraduationCap className="w-4 h-4" /> Explore University Challenges
                  </button>
                </div>
              </div>

              {/* Live Telemetry Widget */}
              <div className="w-full md:w-80 bg-slate-950/80 backdrop-blur-md p-5 rounded-2xl border border-slate-800 space-y-3 relative z-10">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">Live State Telemetry</div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Active Districts</span>
                    <span className="font-bold text-white">All 24 Districts</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Problems Ingested</span>
                    <span className="font-bold text-emerald-400">1,420 Tickets</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Committed CSR</span>
                    <span className="font-bold text-amber-400">₹48.5 Lakhs</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Deployed Pilots</span>
                    <span className="font-bold text-blue-400">32 Solutions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Interactive Portal Gateway Doors */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-200">Select Stakeholder View for Live Demonstration</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
                {/* Door 1: Citizen */}
                <div 
                  onClick={() => setActiveTab("citizen")}
                  className="bg-slate-900 hover:bg-slate-850 p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition cursor-pointer space-y-3 group"
                >
                  <div className="w-10 h-10 bg-emerald-950 text-emerald-400 rounded-xl flex items-center justify-center font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase">Demand Tier</span>
                    <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition">1. Citizen & PRI</h3>
                  </div>
                  <p className="text-xs text-slate-400">Multilingual audio input, EXIF geotagged photo capture, and Mukhiya endorsement.</p>
                  <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1 pt-1">
                    Open Citizen View <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Door 2: University */}
                <div 
                  onClick={() => setActiveTab("student")}
                  className="bg-slate-900 hover:bg-slate-850 p-5 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition cursor-pointer space-y-3 group"
                >
                  <div className="w-10 h-10 bg-blue-950 text-blue-400 rounded-xl flex items-center justify-center font-bold">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-blue-400 uppercase">Knowledge Tier</span>
                    <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition">2. Academic Hub</h3>
                  </div>
                  <p className="text-xs text-slate-400">Multidisciplinary teams, 4-phase semester milestones, and ABC credit sync under NEP 2020.</p>
                  <div className="text-xs font-semibold text-blue-400 flex items-center gap-1 pt-1">
                    Open Academic View <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Door 3: CSR */}
                <div 
                  onClick={() => setActiveTab("csr")}
                  className="bg-slate-900 hover:bg-slate-850 p-5 rounded-2xl border border-slate-800 hover:border-amber-500/50 transition cursor-pointer space-y-3 group"
                >
                  <div className="w-10 h-10 bg-amber-950 text-amber-400 rounded-xl flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase">Exploitation Tier</span>
                    <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition">3. Industry CSR</h3>
                  </div>
                  <p className="text-xs text-slate-400">Milestone-gated grant escrows, Sec 135 tax receipts, and preferential IP license discovery.</p>
                  <div className="text-xs font-semibold text-amber-400 flex items-center gap-1 pt-1">
                    Open Corporate View <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Door 4: Admin */}
                <div 
                  onClick={() => setActiveTab("admin")}
                  className="bg-slate-900 hover:bg-slate-850 p-5 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition cursor-pointer space-y-3 group"
                >
                  <div className="w-10 h-10 bg-purple-950 text-purple-400 rounded-xl flex items-center justify-center font-bold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-purple-400 uppercase">Policy Tier</span>
                    <h3 className="text-sm font-bold text-white group-hover:text-purple-400 transition">4. State Command</h3>
                  </div>
                  <p className="text-xs text-slate-400">Interactive GIS heatmaps, pgvector spatial deduplication, and institutional rankings (IPI).</p>
                  <div className="text-xs font-semibold text-purple-400 flex items-center gap-1 pt-1">
                    Open Admin View <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ==================================================== */}
        {/* VIEW 1: CITIZEN PWA INGESTION                        */}
        {/* ==================================================== */}
        {activeTab === "citizen" && (
          <div className="max-w-xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase">Role 1: Citizen / PRI Ingestion</span>
                <h2 className="text-2xl font-bold text-white">Report a Grassroots Challenge</h2>
              </div>
              <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">हिन्दी / संथाली / ENG</span>
            </div>

            {!ticketSubmitted ? (
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
                
                {/* Sector Selector */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Thematic Sector</label>
                  <select 
                    value={selectedSector} 
                    onChange={(e) => setSelectedSector(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white text-xs p-3 rounded-xl focus:outline-none focus:border-emerald-500"
                  >
                    <option>Water & Sanitation (Fluoride / Arsenic Filtration)</option>
                    <option>Agriculture & MFP (Cold Chains / Spoilage)</option>
                    <option>Healthcare Logistics (Vaccine Cold Storage)</option>
                    <option>Mining Externalities (Coal Dust Suppressants)</option>
                    <option>Clean Energy (Off-Grid Microgrids)</option>
                  </select>
                </div>

                {/* District Selector */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Jharkhand District & Block</label>
                  <select 
                    value={selectedDistrict} 
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white text-xs p-3 rounded-xl focus:outline-none focus:border-emerald-500"
                  >
                    <option>Palamu (Paton Block)</option>
                    <option>Khunti (Murhu Block)</option>
                    <option>Dhanbad (Jharia Coal Belt)</option>
                    <option>Ranchi (Kanke Block)</option>
                    <option>Bokaro (Bermo Mining Area)</option>
                  </select>
                </div>

                {/* Title */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Problem Title</label>
                  <input 
                    type="text" 
                    value={problemTitle}
                    onChange={(e) => setProblemTitle(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white text-xs p-3 rounded-xl focus:outline-none" 
                  />
                </div>

                {/* Voice Recording Simulation */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-300">Whisper Indic Voice Transcription</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">Santhali / Nagpuri / Ho</span>
                  </div>
                  <button 
                    onClick={() => setIsRecording(!isRecording)}
                    className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${isRecording ? "bg-rose-600 text-white animate-pulse" : "bg-emerald-600 hover:bg-emerald-500 text-white"}`}
                  >
                    <Mic className="w-4 h-4" />
                    {isRecording ? "Recording Audio (0:14s) • Tap to Finish" : "Hold / Tap to Record Native Voice Note"}
                  </button>
                  <p className="text-[11px] text-slate-400 italic">"42 hand-pumps have high fluoride sedimentation causing skeletal fluorosis in children."</p>
                </div>

                {/* Metadata Badges */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700 text-slate-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> EXIF Camera Geotag
                  </div>
                  <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700 text-slate-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Mukhiya PRI ID: #8821
                  </div>
                </div>

                {/* Submit Action */}
                <button 
                  onClick={() => setTicketSubmitted(true)}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition"
                >
                  <Send className="w-4 h-4" /> Submit Problem to State AI Triage Pool
                </button>
              </div>
            ) : (
              /* Public Tracker Post Submission */
              <div className="bg-slate-900 p-6 rounded-3xl border border-emerald-500/40 space-y-5 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500 text-slate-950 rounded-xl flex items-center justify-center font-black">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Ticket #UP-2026-881 Registered</h3>
                    <p className="text-xs text-emerald-400">AI Triage Matched: NIT Jamshedpur (Chemical Eng.)</p>
                  </div>
                </div>

                {/* Live Stepper */}
                <div className="space-y-3 relative pl-4 border-l-2 border-emerald-500 text-xs">
                  <div>
                    <div className="font-bold text-white">1. Received & Spatially Clustered</div>
                    <div className="text-[10px] text-slate-400">Merged with 4 identical tickets in 12km radius</div>
                  </div>
                  <div>
                    <div className="font-bold text-white">2. Assigned to NIT Jamshedpur</div>
                    <div className="text-[10px] text-slate-400">Team Lead: R. Sharma • Mentor: Dr. K. Anand</div>
                  </div>
                  <div className="text-amber-400">
                    <div className="font-bold">3. Phase 2: CAD Simulation & Lab Testing (In Progress)</div>
                    <div className="text-[10px] text-amber-300/80">Designing ₹250 nano-adsorbent cartridge</div>
                  </div>
                  <div className="text-slate-500">
                    <div className="font-semibold">4. Prototype Fabrication & Field Deployment</div>
                  </div>
                </div>

                <button 
                  onClick={() => setTicketSubmitted(false)}
                  className="w-full bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold py-2.5 rounded-xl"
                >
                  Submit Another Problem
                </button>
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* VIEW 2: UNIVERSITY R&D & NEP 2020 HUB                */}
        {/* ==================================================== */}
        {activeTab === "student" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase">Role 2: Academic Knowledge Exploration</span>
                <h2 className="text-2xl font-bold text-white">BIT Mesra • Department of Mechanical & Biotech Engineering</h2>
              </div>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-xl text-xs font-bold">
                🎓 4 Credits (NHEQF Level 7) ABC Synced
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Problem Dossier */}
              <div className="md:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex gap-2 text-xs">
                  <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg font-semibold">🌾 Agri & MFP</span>
                  <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg font-semibold">📍 Khunti District</span>
                  <span className="bg-rose-950 text-rose-400 border border-rose-800 px-2.5 py-1 rounded-lg font-bold">Severity: 8.9/10</span>
                </div>

                <h3 className="text-lg font-bold text-white">Decentralized Solar-Biomass Hybrid Cold Storage for Tribal Produce</h3>
                <p className="text-xs text-slate-400 leading-relaxed bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                  Tribal farmers in Khunti lose 40% of seasonal Lac, Mahua, and tomato yields during transit due to ambient heat. Commercial cold chains require high-voltage grid lines not present in remote forest blocks.
                </p>

                {/* Multidisciplinary Team Widget */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-300 uppercase">Assigned Multidisciplinary Team:</div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700">
                      <div className="font-bold text-white">Rahul Verma</div>
                      <div className="text-[10px] text-slate-400">Lead • Mech Eng</div>
                    </div>
                    <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700">
                      <div className="font-bold text-white">Sneha Soren</div>
                      <div className="text-[10px] text-slate-400">Co-Lead • CSE (IoT)</div>
                    </div>
                    <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700">
                      <div className="font-bold text-white">Dr. S. Roy</div>
                      <div className="text-[10px] text-slate-400">Faculty Mentor</div>
                    </div>
                  </div>
                </div>

                {/* CSR Sponsor Banner */}
                <div className="bg-blue-950/60 border border-blue-800 p-3.5 rounded-2xl flex justify-between items-center text-xs">
                  <div>
                    <div className="font-bold text-blue-200">Sponsor: Tata Steel Foundation CSR</div>
                    <div className="text-[10px] text-blue-400">Grant Escrow: ₹1,50,000 (₹50,000 Disbursed)</div>
                  </div>
                  <span className="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">Sec 135 Escrow</span>
                </div>
              </div>

              {/* Milestone State Machine */}
              <div className="md:col-span-5 bg-slate-900 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-300 uppercase">
                    <span>NEP Milestone State-Machine</span>
                    <span className="text-emerald-400">{milestone2Done ? "75% Completed" : "50% Completed"}</span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-xl flex justify-between items-center text-emerald-300">
                      <span>✓ Phase 1: Literature & Thermal Design</span>
                      <span className="text-[10px] font-bold">1 Credit Transferred</span>
                    </div>

                    <div className={`p-3 rounded-xl border flex justify-between items-center transition ${milestone2Done ? "bg-emerald-950/60 border-emerald-800 text-emerald-300" : "bg-amber-950/60 border-amber-800 text-amber-300"}`}>
                      <span>{milestone2Done ? "✓ Phase 2: CAD Simulation Signed-Off" : "▶ Phase 2: CAD Simulation & Lab Feasibility"}</span>
                      <span className="text-[10px] font-bold">{milestone2Done ? "Approved" : "In Review"}</span>
                    </div>

                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center text-slate-500">
                      <span>Phase 3: Bamboo-Composite Prototype</span>
                      <span className="text-[10px]">🔒 Locked</span>
                    </div>

                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center text-slate-500">
                      <span>Phase 4: Field Pilot in Khunti Blocks</span>
                      <span className="text-[10px]">🔒 Locked</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setMilestone2Done(!milestone2Done)}
                  className={`w-full py-3 rounded-xl text-xs font-bold transition shadow ${milestone2Done ? "bg-slate-800 text-slate-300" : "bg-emerald-600 hover:bg-emerald-500 text-white"}`}
                >
                  {milestone2Done ? "Reset Milestone 2 Status" : "Simulate Faculty Milestone 2 Sign-Off"}
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* VIEW 3: INDUSTRY CSR & GRANT ESCROW                  */}
        {/* ==================================================== */}
        {activeTab === "csr" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase">Role 3: Corporate CSR & Section 135 Escrow</span>
                <h2 className="text-2xl font-bold text-white">Tata Steel Foundation CSR Portal</h2>
              </div>
              <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-xl text-xs font-bold">
                Form CSR-1 Verified Entity
              </span>
            </div>

            {/* Financial Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-400">Total CSR Pledged</div>
                <div className="text-2xl font-black text-white mt-1">₹48,50,000</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">8 State University Projects</div>
              </div>
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-400">Funds in Smart Escrow</div>
                <div className="text-2xl font-black text-amber-400 mt-1">₹29,00,000</div>
                <div className="text-[10px] text-amber-300/80 mt-0.5">Released on verified sign-offs</div>
              </div>
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-400">Disbursed to Colleges</div>
                <div className="text-2xl font-black text-emerald-400 mt-1">₹19,50,000</div>
                <div className="text-[10px] text-emerald-300/80 mt-0.5">100% Audited for Tax Exemption</div>
              </div>
            </div>

            {/* Escrow Release Card */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white uppercase">Active Project Awaiting Escrow Disbursement</h3>
                <span className="text-xs text-amber-400 bg-amber-950 px-2.5 py-1 rounded-full font-semibold border border-amber-800">Action Required</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="text-xs font-bold text-white">BIT Mesra • Solar Cold Storage Prototype (#UP-2026-AG-09)</div>
                  <div className="text-xs text-slate-400 mt-1">Milestone 2 (CAD simulation & thermal report) approved by Faculty Dean.</div>
                </div>

                <button 
                  onClick={() => setEscrowReleased(!escrowReleased)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap shadow ${escrowReleased ? "bg-emerald-600 text-white" : "bg-amber-600 hover:bg-amber-500 text-white"}`}
                >
                  {escrowReleased ? "✓ ₹50,000 Escrow Disbursed to College Incubation" : "Approve & Release ₹50,000 Escrow"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* VIEW 4: STATE COMMAND & GIS HEATMAP                  */}
        {/* ==================================================== */}
        {activeTab === "admin" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-purple-400 uppercase">Role 4: State Policy & Orchestration</span>
                <h2 className="text-2xl font-bold text-white">Jharkhand 24-District Command Heatmap</h2>
              </div>
              <span className="bg-purple-500/20 text-purple-400 border border-purple-500/30 px-3 py-1 rounded-xl text-xs font-bold">
                pgvector Spatial Deduplication Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Simulated Leaflet GIS Map */}
              <div className="md:col-span-8 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between min-h-[420px]">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-300">Live Jharkhand District Plotting (PostGIS Engine)</span>
                  <span className="text-emerald-400 font-semibold">15km Haversine Clustering Enabled</span>
                </div>

                {/* Map Graphic Area */}
                <div className="flex-1 bg-slate-950 rounded-2xl border border-slate-800 relative flex items-center justify-center overflow-hidden p-6">
                  
                  {/* Pin 1: Palamu */}
                  <div className="absolute top-12 left-16 bg-slate-900 border border-rose-700 p-2.5 rounded-xl shadow-lg flex items-center gap-2">
                    <span className="w-3 h-3 bg-rose-500 rounded-full animate-ping"></span>
                    <div className="text-[10px]">
                      <div className="font-bold text-white">Palamu District</div>
                      <div className="text-rose-400">42 Fluoride Tickets (NIT Jsr)</div>
                    </div>
                  </div>

                  {/* Pin 2: Dhanbad */}
                  <div className="absolute top-20 right-24 bg-slate-900 border border-amber-700 p-2.5 rounded-xl shadow-lg flex items-center gap-2">
                    <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
                    <div className="text-[10px]">
                      <div className="font-bold text-white">Dhanbad Coal Corridor</div>
                      <div className="text-amber-400">IIT-ISM: Dust Suppressant</div>
                    </div>
                  </div>

                  {/* Pin 3: Khunti */}
                  <div className="absolute bottom-12 left-44 bg-slate-900 border border-emerald-700 p-2.5 rounded-xl shadow-lg flex items-center gap-2">
                    <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
                    <div className="text-[10px]">
                      <div className="font-bold text-white">Khunti District</div>
                      <div className="text-emerald-400">BIT Mesra: Solar Cold Crate Deployed</div>
                    </div>
                  </div>

                  <span className="text-xs text-slate-600 font-mono">[24-District Interactive GIS Layer Active]</span>
                </div>

                <div className="flex justify-between text-xs text-slate-400 pt-2">
                  <span>● Red: High Urgency</span>
                  <span>● Amber: Lab R&D Active</span>
                  <span>● Green: Pilot Deployed</span>
                </div>
              </div>

              {/* Institutional Ranking Leaderboard (IPI) */}
              <div className="md:col-span-4 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="text-xs font-bold text-slate-300 uppercase">Institutional Performance Index (IPI)</div>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-white">1. BIT Mesra</div>
                      <div className="text-[10px] text-slate-400">14 Pilots Deployed</div>
                    </div>
                    <span className="font-bold text-emerald-400">₹18.5L CSR</span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-white">2. NIT Jamshedpur</div>
                      <div className="text-[10px] text-slate-400">11 Pilots Deployed</div>
                    </div>
                    <span className="font-bold text-emerald-400">₹14.0L CSR</span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-white">3. IIT (ISM) Dhanbad</div>
                      <div className="text-[10px] text-slate-400">7 Pilots Deployed</div>
                    </div>
                    <span className="font-bold text-emerald-400">₹16.0L CSR</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* 3. FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 px-4 md:px-8 py-4 text-center text-xs text-slate-500">
        Unnati Portal (उन्नति पोर्टल) • SIH PS 26043 • Built by AlgoAstra Team for Dept. of Higher & Technical Education, Jharkhand
      </footer>

    </div>
  );
}