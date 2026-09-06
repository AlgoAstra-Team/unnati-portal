"use client";

import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { 
  ArrowLeft, 
  Award, 
  MapPin, 
  Download, 
  Search,
  BarChart3,
  Building2,
  GraduationCap,
  FileText,
  ExternalLink,
  X
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { INSTITUTION_RANKINGS } from "@/lib/data";
import { DistrictGISData } from "@/types";

// Dynamically import Leaflet heatmap with SSR disabled to prevent window object errors
const JharkhandLeafletMap = dynamic(
  () => import("@/components/JharkhandLeafletMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[450px] w-full bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-center text-xs font-bold text-emerald-800 animate-pulse">
        📍 Loading Real-Time GIS Heatmap of Jharkhand...
      </div>
    ),
  }
);

export default function AdminPage() {
  const { districts, selectedDistrictId, setSelectedDistrictId, tickets } = useDemo();

  const [sectorFilter, setSectorFilter] = useState<string>("all");
  const [searchDistrict, setSearchDistrict] = useState("");
  const [showTelemetryModal, setShowTelemetryModal] = useState(false);
  const [inspectingDistrict, setInspectingDistrict] = useState<DistrictGISData | null>(null);

  const selectedDistrict = districts.find(
    (d) => d.id === (selectedDistrictId || "khunti")
  ) || districts[0];

  const handleInspectDistrict = (districtId: string) => {
    const d = districts.find((item) => item.id === districtId);
    if (d) {
      setSelectedDistrictId(d.id);
      setInspectingDistrict(d);
    }
  };

  const getAnchorInstitution = (district: DistrictGISData) => {
    const id = district.id;
    if (id === "khunti" || id === "ranchi") return "BIT Mesra (Mechanical & Agricultural Eng.)";
    if (id === "palamu" || id === "east-singhbhum") return "NIT Jamshedpur (Chemical & Environmental Eng.)";
    if (id === "dhanbad" || id === "bokaro") return "IIT (ISM) Dhanbad & BIT Sindri";
    if (id === "hazaribagh" || id === "ramgarh") return "Vinoba Bhave University & UCET Hazaribagh";
    if (id === "dumka" || id === "deoghar" || id === "godda" || id === "sahibganj" || id === "pakur" || id === "jamtara") return "Sido Kanhu Murmu University & Dumka Govt. Engg. College";
    if (id === "west-singhbhum" || id === "seraikela-kharsawan") return "Kolhan University & Chaibasa Engineering College";
    return `${district.name} State Polytechnic & Innovation Cluster`;
  };

  const getDistrictEscrowSponsor = (district: DistrictGISData) => {
    const id = district.id;
    if (id === "khunti" || id === "east-singhbhum" || id === "west-singhbhum") return "Tata Steel Foundation (Escrow: ₹ 1,50,000)";
    if (id === "dhanbad" || id === "bokaro") return "Bharat Coking Coal Limited (BCCL CSR: ₹ 1,80,000)";
    if (id === "ranchi" || id === "ramgarh") return "Central Coalfields Limited (CCL CSR: ₹ 1,40,000)";
    return "State CSR Innovation Corpus (Govt. of Jharkhand)";
  };

  const handleDownloadDossier = (district: DistrictGISData) => {
    const districtTickets = tickets.filter(
      (t) => t.district.toLowerCase() === district.name.toLowerCase()
    );
    const dossierData = {
      state: "Jharkhand",
      authority: "Dept. of Higher & Technical Education",
      district: {
        id: district.id,
        name: district.name,
        hindiName: district.hindiName,
        prioritySector: district.prioritySector,
        coordinates: { lat: district.lat, lng: district.lng },
        flagshipCase: district.highlightCase || "General District Ingestion",
        anchorInstitution: getAnchorInstitution(district),
        csrSponsor: getDistrictEscrowSponsor(district),
      },
      metrics: {
        totalGrievancesIngested: district.problemCount,
        activeStudentRNDTeams: district.activePilots,
        verifiedPilotsDeployed: district.solvedCount,
        resolutionRate: `${Math.round((district.solvedCount / Math.max(district.problemCount, 1)) * 100)}%`,
      },
      activeTickets: districtTickets.map((t) => ({
        id: t.id,
        title: t.title,
        village: t.village,
        sector: t.sector,
        status: t.status,
        assignedHEI: t.assignedHEI,
        leadFaculty: t.leadFaculty,
      })),
      generatedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(dossierData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `unnati-dossier-${district.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filter districts based on sector & search query
  const filteredDistricts = districts.filter((d) => {
    const matchesSector = sectorFilter === "all" || d.prioritySector === sectorFilter;
    const matchesSearch = d.name.toLowerCase().includes(searchDistrict.toLowerCase()) || 
                          d.hindiName.includes(searchDistrict);
    return matchesSector && matchesSearch;
  });

  const totalProblems = districts.reduce((acc, curr) => acc + curr.problemCount, 0);
  const totalSolved = districts.reduce((acc, curr) => acc + curr.solvedCount, 0);

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-6">
      {/* Sub Header / Context Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white/75 backdrop-blur-xs p-3.5 rounded-2xl border border-emerald-100 shadow-xs">
        <div className="flex items-center gap-2.5">
          <Link href="/" className="p-1.5 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition shadow-xs flex items-center justify-center text-slate-700">
            <ArrowLeft className="w-4 h-4 text-slate-700" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-emerald-950 uppercase tracking-wide">
                State Administrative Command &amp; GIS Analytics
              </span>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200">
                Live State Oversight
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-semibold">Dept. of Higher &amp; Technical Education • Govt. of Jharkhand</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-emerald-100/90 text-emerald-800 border border-emerald-300 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            24 Districts Monitored
          </span>
          <button
            onClick={() => setShowTelemetryModal(true)}
            className="bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs px-3 py-1.5 rounded-xl shadow-xs transition flex items-center gap-1 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Export Telemetry
          </button>
        </div>
      </div>

      {/* Top 4 Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/90 backdrop-blur-xs p-5 rounded-3xl border border-emerald-100 shadow-xs space-y-1">
          <p className="text-xs font-bold text-slate-500">Total Grassroots Issues Ingested</p>
          <h4 className="text-2xl font-black text-emerald-700">{totalProblems}</h4>
          <p className="text-[11px] text-slate-400 font-medium">Mapped across all 24 districts</p>
        </div>
        <div className="bg-white/90 backdrop-blur-xs p-5 rounded-3xl border border-emerald-100 shadow-xs space-y-1">
          <p className="text-xs font-bold text-slate-500">Colleges & Polytechnics Active</p>
          <h4 className="text-2xl font-black text-teal-700">32 Institutions</h4>
          <p className="text-[11px] text-slate-400 font-medium">Engineering, Agricultural & Polytechnics</p>
        </div>
        <div className="bg-white/90 backdrop-blur-xs p-5 rounded-3xl border border-emerald-100 shadow-xs space-y-1">
          <p className="text-xs font-bold text-slate-500">Committed CSR Grant Capital</p>
          <h4 className="text-2xl font-black text-cyan-700">₹ 48,50,000</h4>
          <p className="text-[11px] text-slate-400 font-medium">Sec. 135 Milestone Escrow</p>
        </div>
        <div className="bg-white/90 backdrop-blur-xs p-5 rounded-3xl border border-emerald-100 shadow-xs space-y-1">
          <p className="text-xs font-bold text-slate-500">Verified Field Pilots Deployed</p>
          <h4 className="text-2xl font-black text-emerald-800">{totalSolved} Deployed</h4>
          <p className="text-[11px] text-slate-400 font-medium">Delivering measurable community impact</p>
        </div>
      </div>

      {/* Main Grid: 24-District Interactive GIS Map & Institutional Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive 24-District Map & District Grid */}
        <div className="lg:col-span-7 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-emerald-100 shadow-md space-y-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" /> 24-District Jharkhand GIS Heatmap
              </h3>
              <p className="text-xs text-slate-500">
                Real-time geographic spatial heatmap of reported bottlenecks and active student pilots
              </p>
            </div>

            {/* District Search Filter */}
            <div className="relative w-full sm:w-44">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchDistrict}
                onChange={(e) => setSearchDistrict(e.target.value)}
                placeholder="Filter district..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Sector Filter Chips */}
          <div className="flex flex-wrap gap-1.5 text-[11px] font-bold">
            {[
              { id: "all", label: "All Sectors" },
              { id: "Agriculture & MFP", label: "🌾 Agriculture" },
              { id: "Water & Sanitation", label: "💧 Water" },
              { id: "Clean Environment & Mining", label: "⛏️ Mining / Dust" },
              { id: "Rural Energy", label: "⚡ Clean Energy" },
              { id: "Primary Health", label: "🏥 Health" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSectorFilter(f.id)}
                className={`px-3 py-1 rounded-xl transition cursor-pointer ${
                  sectorFilter === f.id
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Real-Time 24-District Leaflet Heatmap */}
          <JharkhandLeafletMap
            districts={districts}
            selectedDistrictId={selectedDistrictId}
            onSelectDistrict={setSelectedDistrictId}
            onInspectDistrict={handleInspectDistrict}
            sectorFilter={sectorFilter}
          />

          {/* Selected District Detail Card */}
          <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-slate-900">
                  {selectedDistrict.name} ({selectedDistrict.hindiName})
                </span>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Priority: {selectedDistrict.prioritySector}
                </span>
              </div>
              {selectedDistrict.highlightCase && (
                <p className="text-xs text-emerald-700 font-semibold">
                  ★ Key Case: {selectedDistrict.highlightCase}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold shrink-0">
              <div className="text-center">
                <div className="text-slate-400 text-[9px] uppercase">Issues</div>
                <div className="text-slate-900 text-sm">{selectedDistrict.problemCount}</div>
              </div>
              <div className="text-center">
                <div className="text-slate-400 text-[9px] uppercase">Active R&D</div>
                <div className="text-cyan-700 text-sm">{selectedDistrict.activePilots}</div>
              </div>
              <div className="text-center">
                <div className="text-slate-400 text-[9px] uppercase">Pilots Deployed</div>
                <div className="text-emerald-700 text-sm">{selectedDistrict.solvedCount}</div>
              </div>
              <button
                onClick={() => setInspectingDistrict(selectedDistrict)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer ml-1"
              >
                Inspect District Details →
              </button>
            </div>
          </div>

          {/* Quick District Grid (All 24 Districts) */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              District Directory ({filteredDistricts.length} shown)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-1">
              {filteredDistricts.map((d) => {
                const isSel = d.id === selectedDistrict.id;
                return (
                  <div
                    key={d.id}
                    onClick={() => setSelectedDistrictId(d.id)}
                    className={`p-2 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                      isSel
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                        : "bg-slate-50 hover:bg-white text-slate-800 border-slate-200"
                    }`}
                  >
                    <div>
                      <div className="text-[11px] font-bold truncate">{d.name}</div>
                      <div className={`text-[9px] ${isSel ? "text-emerald-100" : "text-slate-400"}`}>
                        {d.problemCount} issues • {d.solvedCount} pilots
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDistrictId(d.id);
                        setInspectingDistrict(d);
                      }}
                      className={`mt-1.5 text-[9px] font-bold py-0.5 px-1.5 rounded text-center cursor-pointer ${
                        isSel 
                          ? "bg-white/20 hover:bg-white/30 text-white" 
                          : "bg-emerald-100 hover:bg-emerald-200 text-emerald-800"
                      }`}
                    >
                      Inspect →
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Institutional Performance Index (IPI) & ESG Ledger */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Institutional Performance Index (IPI) */}
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-emerald-100 shadow-md space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-600" /> Institutional Performance Index (IPI)
                </h3>
                <p className="text-[10px] text-slate-500">Ranking universities & polytechnics on solved challenges</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                NEP 2020 Sync
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {INSTITUTION_RANKINGS.map((inst) => (
                <div
                  key={inst.rank}
                  className="p-3 bg-slate-50/90 hover:bg-white rounded-2xl border border-slate-200/80 flex justify-between items-center transition shadow-2xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                        inst.rank === 1 ? "bg-amber-100 text-amber-900 border border-amber-300" : 
                        inst.rank === 2 ? "bg-slate-200 text-slate-800" : 
                        inst.rank === 3 ? "bg-orange-100 text-orange-900" : "bg-white text-slate-600 border"
                      }`}>
                        {inst.rank}
                      </span>
                      <span className="font-bold text-slate-900 text-xs">{inst.name}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 pl-7">
                      {inst.pilotsDeployed} Pilots Deployed • {inst.activeProjects} In Lab Testing
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-black text-emerald-700 block text-xs">{inst.csrRaised}</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">NAAC {inst.naacGrade}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-Time ESG Impact Ledger */}
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-emerald-100 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-teal-600" /> State ESG & Community Impact Ledger
              </h3>
              <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                Audited Real-World Data
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-200 flex justify-between items-center">
                <span className="text-slate-800 font-semibold">💧 Fluoride-Free Drinking Water</span>
                <span className="font-black text-emerald-800">1,240,000 Liters</span>
              </div>
              <div className="p-3 bg-teal-50/70 rounded-2xl border border-teal-200 flex justify-between items-center">
                <span className="text-slate-800 font-semibold">🌾 Perishable Crop Loss Averted</span>
                <span className="font-black text-teal-800">42 Metric Tons</span>
              </div>
              <div className="p-3 bg-cyan-50/70 rounded-2xl border border-cyan-200 flex justify-between items-center">
                <span className="text-slate-800 font-semibold">🌫️ Mining Coal Dust PM10 Suppressed</span>
                <span className="font-black text-cyan-800">60% Reduction</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center">
                <span className="text-slate-800 font-semibold">🎓 NEP 2020 Degree Credits Issued</span>
                <span className="font-black text-slate-900">480 ABC Credits</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Open Telemetry API Simulator Modal */}
      {showTelemetryModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-emerald-200 shadow-2xl relative space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Download className="w-4 h-4 text-emerald-600" /> Open Telemetry Export API
                </h3>
                <p className="text-xs text-slate-500">Anonymized state research data for socio-economic planners</p>
              </div>
              <button
                onClick={() => setShowTelemetryModal(false)}
                className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 text-xs"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-900 text-emerald-400 p-4 rounded-2xl font-mono text-[11px] overflow-x-auto max-h-60">
              <pre>{JSON.stringify({
                state: "Jharkhand",
                portal: "Unnati Portal",
                authority: "Dept. of Higher & Technical Education",
                generated_at: "2026-09-04T12:00:00.000Z",
                districts_count: 24,
                metrics: {
                  total_problems_ingested: totalProblems,
                  active_student_teams: 86,
                  corporate_csr_escrow_inr: 4850000,
                  verified_pilots: totalSolved
                },
                top_colleges: [
                  "BIT Mesra", "NIT Jamshedpur", "IIT (ISM) Dhanbad", "Birsa Agricultural University"
                ],
                api_status: "HEALTHY_TELEMETRY_SYNC"
              }, null, 2)}</pre>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-[10px] text-slate-500">Data compliant with Govt. of Jharkhand Open Data Guidelines</span>
              <button
                onClick={() => setShowTelemetryModal(false)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2 rounded-xl shadow-xs transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comprehensive District Details Inspection Modal */}
      {inspectingDistrict && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 border border-emerald-200 shadow-2xl relative space-y-6 animate-scaleUp my-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-emerald-100 pb-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xl font-black text-slate-900">
                    {inspectingDistrict.name} ({inspectingDistrict.hindiName})
                  </span>
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                    {inspectingDistrict.prioritySector}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                    📍 {inspectingDistrict.lat}° N, {inspectingDistrict.lng}° E
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  District Administrative Dossier • Department of Higher &amp; Technical Education, Govt. of Jharkhand
                </p>
              </div>
              <button
                onClick={() => setInspectingDistrict(null)}
                className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition cursor-pointer"
                title="Close Dossier"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 4 Overview Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3.5 text-center">
                <div className="text-[10px] uppercase font-bold text-emerald-800">Total Grievances</div>
                <div className="text-xl font-black text-emerald-950 mt-0.5">{inspectingDistrict.problemCount}</div>
                <div className="text-[9px] text-emerald-700">Gram Panchayat Ingestion</div>
              </div>
              <div className="bg-cyan-50/70 border border-cyan-200 rounded-2xl p-3.5 text-center">
                <div className="text-[10px] uppercase font-bold text-cyan-800">Active R&amp;D Teams</div>
                <div className="text-xl font-black text-cyan-950 mt-0.5">{inspectingDistrict.activePilots}</div>
                <div className="text-[9px] text-cyan-700">University Capstones</div>
              </div>
              <div className="bg-teal-50/70 border border-teal-200 rounded-2xl p-3.5 text-center">
                <div className="text-[10px] uppercase font-bold text-teal-800">Verified Pilots</div>
                <div className="text-xl font-black text-teal-950 mt-0.5">{inspectingDistrict.solvedCount}</div>
                <div className="text-[9px] text-teal-700">On-Ground Deployed</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-600">Resolution Rate</div>
                <div className="text-xl font-black text-slate-900 mt-0.5">
                  {Math.round((inspectingDistrict.solvedCount / Math.max(inspectingDistrict.problemCount, 1)) * 100)}%
                </div>
                <div className="text-[9px] text-slate-500">Pipeline Efficacy</div>
              </div>
            </div>

            {/* Strategic Interventions & Partner Institutions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  Anchor Higher Education Institution (HEI)
                </div>
                <p className="text-xs font-semibold text-slate-900">
                  {getAnchorInstitution(inspectingDistrict)}
                </p>
                <p className="text-[11px] text-slate-500">
                  Assigned multidisciplinary faculty mentor and student capstone innovation team under NEP 2020 experiential learning framework.
                </p>
              </div>

              <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <Building2 className="w-4 h-4 text-cyan-600" />
                  CSR Sponsor &amp; Milestone Escrow Partner
                </div>
                <p className="text-xs font-semibold text-slate-900">
                  {getDistrictEscrowSponsor(inspectingDistrict)}
                </p>
                <p className="text-[11px] text-slate-500">
                  Sec. 135 CSR escrow funds pre-allocated for rapid material acquisition and fabrication milestones.
                </p>
              </div>
            </div>

            {/* Flagship Innovation Case (if present) */}
            {inspectingDistrict.highlightCase && (
              <div className="bg-linear-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
                <span className="text-xl">🌟</span>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                    District Flagship Innovation Pilot
                  </h4>
                  <p className="text-sm font-black text-slate-900 mt-0.5">
                    {inspectingDistrict.highlightCase}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Certified in field trials with measurable reduction in community hardship and validated local economic impact.
                  </p>
                </div>
              </div>
            )}

            {/* Ingested Grassroots Grievances in this District */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  Grassroots Problems &amp; Verified Case Files ({
                    tickets.filter(t => t.district.toLowerCase() === inspectingDistrict.name.toLowerCase()).length
                  })
                </h4>
                <Link
                  href={`/track`}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                >
                  Track All Tickets <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              {tickets.filter(t => t.district.toLowerCase() === inspectingDistrict.name.toLowerCase()).length > 0 ? (
                <div className="space-y-2.5">
                  {tickets
                    .filter(t => t.district.toLowerCase() === inspectingDistrict.name.toLowerCase())
                    .map((t) => (
                      <div
                        key={t.id}
                        className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs hover:border-emerald-300 transition space-y-2"
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-black bg-slate-900 text-white px-2 py-0.5 rounded-md">
                              {t.id}
                            </span>
                            <span className="text-xs font-bold text-slate-900">
                              {t.village}
                            </span>
                            {t.mukhiyaEndorsed && (
                              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 rounded">
                                ✓ Gram Mukhiya Endorsed
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full">
                            {t.status}
                          </span>
                        </div>

                        <p className="text-xs font-semibold text-slate-800">
                          {t.title}
                        </p>
                        <p className="text-xs text-slate-500 line-clamp-2">
                          {t.description}
                        </p>

                        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                          <div className="text-[11px] text-slate-600">
                            <strong>Assigned HEI:</strong> {t.assignedHEI} {t.leadFaculty && `• Faculty: ${t.leadFaculty}`}
                          </div>
                          <Link
                            href={`/track?id=${t.id}`}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition flex items-center gap-1 shrink-0"
                          >
                            Track Live Status →
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center space-y-2">
                  <p className="text-xs text-slate-600 font-medium">
                    District baseline ingestion is synchronized for all gram panchayats in <strong>{inspectingDistrict.name}</strong>.
                    No critical field escalations currently awaiting academic triage.
                  </p>
                  <Link
                    href={`/citizen`}
                    className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition"
                  >
                    Report Grassroots Problem for {inspectingDistrict.name} →
                  </Link>
                </div>
              )}
            </div>

            {/* Official Nodal Contacts */}
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <strong>Deputy Commissioner Liaison:</strong> dc-{inspectingDistrict.id}@jharkhand.gov.in
              </div>
              <div>
                <strong>District Planning Office:</strong> dpo-{inspectingDistrict.id}@nic.in
              </div>
            </div>

            {/* Action Buttons in Modal Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2 border-t border-slate-100">
              <button
                onClick={() => handleDownloadDossier(inspectingDistrict)}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                Download District Dossier (.JSON)
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <Link
                  href={`/track`}
                  className="w-full sm:w-auto text-center bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition"
                >
                  Citizen Tracking Portal
                </Link>
                <button
                  onClick={() => setInspectingDistrict(null)}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2 rounded-xl shadow-xs transition cursor-pointer"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
