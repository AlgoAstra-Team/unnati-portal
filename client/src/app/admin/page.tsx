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
  Map,
  Compass
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { INSTITUTION_RANKINGS } from "@/lib/data";
import JharkhandMap from "@/components/JharkhandMap";

// Dynamically import Leaflet map with SSR disabled to prevent window object errors
const JharkhandLeafletMap = dynamic(
  () => import("@/components/JharkhandLeafletMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[450px] w-full bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-center text-xs font-bold text-emerald-800 animate-pulse">
        📍 Loading Interactive Leaflet GIS Map of Jharkhand...
      </div>
    ),
  }
);

export default function AdminPage() {
  const { districts, selectedDistrictId, setSelectedDistrictId } = useDemo();

  const [sectorFilter, setSectorFilter] = useState<string>("all");
  const [searchDistrict, setSearchDistrict] = useState("");
  const [showTelemetryModal, setShowTelemetryModal] = useState(false);
  const [mapType, setMapType] = useState<"leaflet" | "vector">("leaflet");

  const selectedDistrict = districts.find(
    (d) => d.id === (selectedDistrictId || "khunti")
  ) || districts[0];

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
          <Link href="/" className="p-1.5 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition shadow-xs">
            <ArrowLeft className="w-4 h-4 text-slate-700" />
          </Link>
          <div>
            <span className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
              State Administrative Command & GIS Analytics
            </span>
            <p className="text-[10px] text-slate-500">Dept. of Higher & Technical Education • Govt. of Jharkhand</p>
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
                <MapPin className="w-4 h-4 text-emerald-600" /> 24-District Jharkhand GIS Map
              </h3>
              <p className="text-xs text-slate-500">
                Interactive spatial density of reported bottlenecks and active student pilots
              </p>
            </div>

            {/* Map Mode Switcher & Search */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => setMapType("leaflet")}
                  className={`px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 cursor-pointer ${
                    mapType === "leaflet"
                      ? "bg-white text-emerald-800 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Map className="w-3 h-3 text-emerald-600" />
                  <span>Leaflet GIS</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMapType("vector")}
                  className={`px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 cursor-pointer ${
                    mapType === "vector"
                      ? "bg-white text-teal-800 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Compass className="w-3 h-3 text-teal-600" />
                  <span>Choropleth</span>
                </button>
              </div>

              <div className="relative w-36">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={searchDistrict}
                  onChange={(e) => setSearchDistrict(e.target.value)}
                  placeholder="Filter..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-2 py-1 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
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

          {/* Map Display: Leaflet or Vector */}
          {mapType === "leaflet" ? (
            <JharkhandLeafletMap
              districts={districts}
              selectedDistrictId={selectedDistrictId}
              onSelectDistrict={setSelectedDistrictId}
              sectorFilter={sectorFilter}
            />
          ) : (
            <JharkhandMap
              districts={districts}
              selectedDistrictId={selectedDistrictId}
              onSelectDistrict={setSelectedDistrictId}
              sectorFilter={sectorFilter}
            />
          )}

          {/* Selected District Detail Card */}
          <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-slate-900">
                  {selectedDistrict.name} ({selectedDistrict.hindiName})
                </span>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Priority: {selectedDistrict.prioritySector}
                </span>
              </div>
              {selectedDistrict.highlightCase && (
                <p className="text-xs text-emerald-700 font-semibold mt-1">
                  ★ Key Case: {selectedDistrict.highlightCase}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4 text-xs font-bold shrink-0">
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
                  <button
                    key={d.id}
                    onClick={() => setSelectedDistrictId(d.id)}
                    className={`p-2 rounded-xl border text-left transition cursor-pointer ${
                      isSel
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                        : "bg-slate-50 hover:bg-white text-slate-800 border-slate-200"
                    }`}
                  >
                    <div className="text-[11px] font-bold truncate">{d.name}</div>
                    <div className={`text-[9px] ${isSel ? "text-emerald-100" : "text-slate-400"}`}>
                      {d.problemCount} issues • {d.solvedCount} pilots
                    </div>
                  </button>
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
    </main>
  );
}
