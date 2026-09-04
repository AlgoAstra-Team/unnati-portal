"use client";

import React, { useState } from "react";
import { DistrictGISData } from "@/types";
import { Sparkles, Activity } from "lucide-react";

interface JharkhandMapProps {
  districts: DistrictGISData[];
  selectedDistrictId: string | null;
  onSelectDistrict: (id: string) => void;
  sectorFilter: string;
}

// Coordinate layout for Jharkhand's 24 districts on an 880x640 SVG canvas
interface DistrictSVGDef {
  id: string;
  name: string;
  hindiName: string;
  cx: number;
  cy: number;
  d: string; // SVG path outline
  hasHub?: boolean;
  hubLabel?: string;
}

const DISTRICT_SHAPES: DistrictSVGDef[] = [
  // NORTH-WEST
  {
    id: "garhwa",
    name: "Garhwa",
    hindiName: "गढ़वा",
    cx: 80,
    cy: 110,
    d: "M 30,80 L 110,60 L 140,110 L 110,170 L 40,150 Z"
  },
  {
    id: "palamu",
    name: "Palamu",
    hindiName: "पलामू",
    cx: 175,
    cy: 130,
    d: "M 110,60 L 210,70 L 240,140 L 180,190 L 140,110 Z",
    hasHub: true,
    hubLabel: "NIT Water Lab"
  },
  {
    id: "chatra",
    name: "Chatra",
    hindiName: "चतरा",
    cx: 275,
    cy: 130,
    d: "M 210,70 L 320,80 L 330,160 L 250,190 L 240,140 Z"
  },
  {
    id: "latehar",
    name: "Latehar",
    hindiName: "लातेहार",
    cx: 190,
    cy: 235,
    d: "M 140,165 L 240,160 L 250,230 L 230,290 L 150,270 Z"
  },

  // NORTH-CENTRAL & NORTH-EAST
  {
    id: "hazaribagh",
    name: "Hazaribagh",
    hindiName: "हज़ारीबाग",
    cx: 375,
    cy: 170,
    d: "M 320,80 L 420,95 L 430,195 L 345,230 L 330,160 Z"
  },
  {
    id: "koderma",
    name: "Koderma",
    hindiName: "कोडरमा",
    cx: 440,
    cy: 105,
    d: "M 405,65 L 485,75 L 490,135 L 420,130 Z"
  },
  {
    id: "giridih",
    name: "Giridih",
    hindiName: "गिरिडीह",
    cx: 525,
    cy: 155,
    d: "M 485,75 L 590,95 L 595,190 L 495,195 L 490,135 Z"
  },
  {
    id: "deoghar",
    name: "Deoghar",
    hindiName: "देवघर",
    cx: 630,
    cy: 145,
    d: "M 590,95 L 675,100 L 685,185 L 600,190 Z"
  },
  {
    id: "dumka",
    name: "Dumka",
    hindiName: "दुमका",
    cx: 705,
    cy: 185,
    d: "M 675,100 L 760,120 L 765,220 L 685,220 L 685,185 Z"
  },
  {
    id: "godda",
    name: "Godda",
    hindiName: "गोड्डा",
    cx: 735,
    cy: 95,
    d: "M 700,55 L 780,65 L 785,130 L 725,125 Z"
  },
  {
    id: "sahibganj",
    name: "Sahibganj",
    hindiName: "साहिबगंज",
    cx: 795,
    cy: 65,
    d: "M 770,30 L 845,45 L 840,110 L 775,95 Z"
  },
  {
    id: "pakur",
    name: "Pakur",
    hindiName: "पाकुड़",
    cx: 785,
    cy: 180,
    d: "M 765,130 L 835,140 L 830,225 L 765,220 Z"
  },
  {
    id: "jamtara",
    name: "Jamtara",
    hindiName: "जामताड़ा",
    cx: 665,
    cy: 250,
    d: "M 630,205 L 710,215 L 715,280 L 645,280 Z"
  },

  // EAST-CENTRAL (COAL BELT & INDUSTRY)
  {
    id: "dhanbad",
    name: "Dhanbad",
    hindiName: "धनबाद",
    cx: 605,
    cy: 275,
    d: "M 565,225 L 645,235 L 650,310 L 580,315 Z",
    hasHub: true,
    hubLabel: "IIT-ISM Dust Lab"
  },
  {
    id: "bokaro",
    name: "Bokaro",
    hindiName: "बोकारो",
    cx: 525,
    cy: 275,
    d: "M 485,225 L 565,225 L 575,315 L 490,305 Z"
  },
  {
    id: "ramgarh",
    name: "Ramgarh",
    hindiName: "रामगढ़",
    cx: 440,
    cy: 275,
    d: "M 410,230 L 485,225 L 480,310 L 415,305 Z"
  },

  // CENTRAL (CAPITAL & AGRI)
  {
    id: "ranchi",
    name: "Ranchi",
    hindiName: "राँची",
    cx: 395,
    cy: 355,
    d: "M 340,295 L 465,305 L 470,395 L 350,405 Z",
    hasHub: true,
    hubLabel: "BIT Mesra & BAU"
  },
  {
    id: "lohardaga",
    name: "Lohardaga",
    hindiName: "लोहरदगा",
    cx: 285,
    cy: 335,
    d: "M 250,295 L 330,295 L 335,370 L 260,370 Z"
  },
  {
    id: "gumla",
    name: "Gumla",
    hindiName: "गुमला",
    cx: 245,
    cy: 435,
    d: "M 195,370 L 310,365 L 315,485 L 205,485 Z"
  },
  {
    id: "simdega",
    name: "Simdega",
    hindiName: "सिमडेगा",
    cx: 235,
    cy: 535,
    d: "M 180,485 L 305,485 L 295,595 L 185,585 Z"
  },

  // SOUTH (TRIBAL & INDUSTRIAL CORRIDOR)
  {
    id: "khunti",
    name: "Khunti",
    hindiName: "खूंटी",
    cx: 385,
    cy: 445,
    d: "M 330,405 L 440,405 L 445,485 L 335,485 Z",
    hasHub: true,
    hubLabel: "Cold Chain Pilot"
  },
  {
    id: "west-singhbhum",
    name: "West Singhbhum",
    hindiName: "प. सिंहभूम",
    cx: 435,
    cy: 545,
    d: "M 345,485 L 500,485 L 520,605 L 360,605 Z"
  },
  {
    id: "seraikela-kharsawan",
    name: "Seraikela-Kharsawan",
    hindiName: "सरायकेला",
    cx: 545,
    cy: 455,
    d: "M 480,415 L 600,415 L 605,505 L 490,505 Z"
  },
  {
    id: "east-singhbhum",
    name: "East Singhbhum",
    hindiName: "पू. सिंहभूम",
    cx: 645,
    cy: 485,
    d: "M 595,425 L 705,435 L 710,545 L 605,535 Z",
    hasHub: true,
    hubLabel: "Tata Steel CSR"
  }
];

export default function JharkhandMap({
  districts,
  selectedDistrictId,
  onSelectDistrict,
  sectorFilter
}: JharkhandMapProps) {
  const [hoveredDistrict, setHoveredDistrict] = useState<DistrictGISData | null>(null);
  const [viewMode, setViewMode] = useState<"severity" | "pilots">("severity");

  // Map district data by id
  const dataMap = new Map<string, DistrictGISData>();
  districts.forEach((d) => dataMap.set(d.id, d));

  return (
    <div className="space-y-3">
      {/* Map Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => setViewMode("severity")}
            className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
              viewMode === "severity"
                ? "bg-white text-emerald-800 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            <span>Problem Density</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("pilots")}
            className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
              viewMode === "pilots"
                ? "bg-white text-teal-800 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Active Pilots</span>
          </button>
        </div>

        <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <span>High Resolution (&gt;6 Pilots)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
            <span>Active R&D (2-5 Pilots)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span>Triage Ingestion</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas Map */}
      <div className="relative bg-gradient-to-br from-emerald-50/80 via-teal-50/40 to-cyan-50/60 rounded-2xl border border-emerald-200/90 p-2 sm:p-4 overflow-hidden shadow-inner">
        <svg
          viewBox="0 0 880 640"
          className="w-full h-auto max-h-[460px] drop-shadow-sm select-none"
        >
          {/* Subtle Map Background Watermark */}
          <text
            x="440"
            y="320"
            textAnchor="middle"
            fill="currentColor"
            className="text-emerald-950 font-black opacity-[0.03] text-7xl uppercase tracking-widest pointer-events-none"
          >
            Jharkhand State GIS
          </text>

          {/* District Regions */}
          {DISTRICT_SHAPES.map((shape) => {
            const data = dataMap.get(shape.id);
            const isSelected = selectedDistrictId === shape.id;
            const matchesSector =
              sectorFilter === "all" || (data && data.prioritySector === sectorFilter);

            // Calculate fill color based on view mode and data
            let fillColor = "#e2e8f0"; // default slate
            let strokeColor = "#cbd5e1";

            if (data && matchesSector) {
              if (viewMode === "severity") {
                if (data.problemCount >= 100) fillColor = "#a7f3d0"; // bright emerald-200
                else if (data.problemCount >= 60) fillColor = "#bbf7d0"; // green-200
                else fillColor = "#cffafe"; // cyan-100
                strokeColor = isSelected ? "#059669" : "#10b981";
              } else {
                if (data.solvedCount >= 8) fillColor = "#6ee7b7";
                else if (data.solvedCount >= 4) fillColor = "#99f6e4";
                else fillColor = "#e0f2fe";
                strokeColor = isSelected ? "#0d9488" : "#14b8a6";
              }
            } else if (!matchesSector) {
              fillColor = "#f1f5f9";
              strokeColor = "#e2e8f0";
            }

            return (
              <g
                key={shape.id}
                onClick={() => onSelectDistrict(shape.id)}
                onMouseEnter={() => data && setHoveredDistrict(data)}
                onMouseLeave={() => setHoveredDistrict(null)}
                className="cursor-pointer transition-all duration-200 group"
              >
                {/* District Shape Polygon */}
                <path
                  d={shape.d}
                  fill={fillColor}
                  stroke={isSelected ? "#047857" : strokeColor}
                  strokeWidth={isSelected ? "3" : "1.5"}
                  className={`transition-colors duration-150 ${
                    isSelected ? "filter drop-shadow-md" : "hover:brightness-95"
                  }`}
                />

                {/* District Name Label */}
                <text
                  x={shape.cx}
                  y={shape.cy - 4}
                  textAnchor="middle"
                  className={`text-[11px] font-extrabold tracking-tight transition-all pointer-events-none ${
                    isSelected
                      ? "fill-emerald-950 font-black"
                      : matchesSector
                      ? "fill-slate-800"
                      : "fill-slate-400"
                  }`}
                >
                  {shape.name}
                </text>

                {/* Subtitle / Hindi Name / Count */}
                <text
                  x={shape.cx}
                  y={shape.cy + 9}
                  textAnchor="middle"
                  className={`text-[9px] font-bold pointer-events-none ${
                    isSelected ? "fill-emerald-800" : "fill-slate-500"
                  }`}
                >
                  {data ? `${data.problemCount} iss • ${data.solvedCount} pil` : shape.hindiName}
                </text>

                {/* Innovation Radar Pulse for Flagship Hubs */}
                {shape.hasHub && matchesSector && (
                  <g transform={`translate(${shape.cx + 28}, ${shape.cy - 18})`}>
                    <circle r="6" fill="#059669" className="animate-ping opacity-60" />
                    <circle r="4" fill="#047857" stroke="#ffffff" strokeWidth="1.5" />
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredDistrict && (
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md border border-emerald-200 p-3 rounded-2xl shadow-lg text-xs space-y-1 z-30 pointer-events-none animate-fadeIn max-w-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="font-black text-slate-900 text-sm">
                {hoveredDistrict.name} ({hoveredDistrict.hindiName})
              </span>
              <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                {hoveredDistrict.prioritySector}
              </span>
            </div>
            <div className="text-[11px] text-slate-600 flex items-center gap-3">
              <span>⚠️ <strong className="text-slate-800">{hoveredDistrict.problemCount}</strong> Ingested</span>
              <span>🔬 <strong className="text-cyan-700">{hoveredDistrict.activePilots}</strong> R&D Teams</span>
              <span>✅ <strong className="text-emerald-700">{hoveredDistrict.solvedCount}</strong> Deployed</span>
            </div>
            {hoveredDistrict.highlightCase && (
              <p className="text-[10px] text-emerald-700 font-semibold pt-1 border-t border-emerald-100">
                ★ {hoveredDistrict.highlightCase}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
