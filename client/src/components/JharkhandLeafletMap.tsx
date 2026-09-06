"use client";

import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { DistrictGISData } from "@/types";
import { Sparkles, Activity } from "lucide-react";

interface LeafletMapProps {
  districts: DistrictGISData[];
  selectedDistrictId: string | null;
  onSelectDistrict: (id: string) => void;
  onInspectDistrict?: (id: string) => void;
  sectorFilter: string;
}

// 100% Free Public OpenStreetMap Tile Server - Zero API Key Required
const OSM_TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const OSM_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export default function JharkhandLeafletMap({
  districts,
  selectedDistrictId,
  onSelectDistrict,
  onInspectDistrict,
  sectorFilter,
}: LeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const isFirstRender = useRef(true);

  const onSelectDistrictRef = useRef(onSelectDistrict);
  const onInspectDistrictRef = useRef(onInspectDistrict);

  useEffect(() => {
    onSelectDistrictRef.current = onSelectDistrict;
    onInspectDistrictRef.current = onInspectDistrict;
  }, [onSelectDistrict, onInspectDistrict]);

  const handleInspect = (id: string) => {
    onSelectDistrictRef.current(id);
    if (onInspectDistrictRef.current) {
      onInspectDistrictRef.current(id);
    }
  };

  const [viewMetric, setViewMetric] = useState<"problems" | "pilots">("problems");

  // 1. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Defense against React StrictMode multiple mounts on same DOM node
    const container = mapContainerRef.current as HTMLDivElement & { _leaflet_id?: number };
    if (container._leaflet_id) {
      delete container._leaflet_id;
    }
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Center on Jharkhand geographic center
    const map = L.map(container, {
      center: [23.6102, 85.2799],
      zoom: 7.5,
      minZoom: 6.5,
      maxZoom: 13,
      zoomControl: false,
    });

    L.control.zoom({ position: "topright" }).addTo(map);

    // 100% free OpenStreetMap tile layer (zero API key)
    L.tileLayer(OSM_TILE_URL, {
      attribution: OSM_ATTRIBUTION,
      maxZoom: 18,
    }).addTo(map);

    const markersLayer = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;
    markersLayerRef.current = markersLayer;

    // Global fallback for any popup button click
    if (typeof window !== "undefined") {
      (window as unknown as { __inspectDistrict?: (id: string) => void }).__inspectDistrict = (id: string) => {
        handleInspect(id);
      };
    }

    // Delegated container click listener for map popup button
    const handleContainerClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(".inspect-district-btn");
      if (target) {
        const districtId = target.getAttribute("data-district-id");
        if (districtId) {
          e.preventDefault();
          e.stopPropagation();
          handleInspect(districtId);
        }
      }
    };
    container.addEventListener("click", handleContainerClick);

    // Invalidate size on mount and window resize
    const invalidate = () => map.invalidateSize();
    const t1 = setTimeout(invalidate, 100);
    const t2 = setTimeout(invalidate, 400);
    window.addEventListener("resize", invalidate);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", invalidate);
      container.removeEventListener("click", handleContainerClick);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 3. Render / Update District Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    districts.forEach((d) => {
      const isSelected = selectedDistrictId === d.id;
      const matchesSector = sectorFilter === "all" || d.prioritySector === sectorFilter;

      if (!matchesSector) return;

      let markerColor = "#059669";
      let badgeText = `${d.problemCount} Issues`;

      if (viewMetric === "pilots") {
        markerColor = d.solvedCount >= 8 ? "#047857" : d.solvedCount >= 4 ? "#0d9488" : "#0284c7";
        badgeText = `${d.solvedCount} Pilots`;
      } else {
        markerColor = d.problemCount >= 100 ? "#e11d48" : d.problemCount >= 60 ? "#d97706" : "#059669";
      }

      const isFlagship = ["khunti", "palamu", "dhanbad", "ranchi", "east-singhbhum"].includes(d.id);

      const iconHtml = `
        <div class="relative flex flex-col items-center cursor-pointer group" style="transform: translate(-50%, -100%);">
          ${isFlagship ? `
            <span class="absolute -top-1 w-6 h-6 rounded-full animate-ping opacity-75" style="background-color: ${markerColor};"></span>
          ` : ""}
          <div class="relative flex items-center gap-1 px-2 py-1 rounded-xl shadow-md border-2 transition transform group-hover:scale-110 ${
            isSelected 
              ? "bg-slate-900 text-white border-emerald-400 scale-110 z-50 ring-2 ring-emerald-500/50" 
              : "bg-white/95 text-slate-800 border-emerald-500 hover:border-emerald-600"
          }">
            <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${markerColor};"></span>
            <span class="text-[11px] font-black leading-none">${d.name}</span>
            <span class="text-[9px] font-bold opacity-80 px-1 py-0.2 rounded ${
              isSelected ? "bg-emerald-800 text-emerald-100" : "bg-emerald-50 text-emerald-800"
            }">${badgeText}</span>
          </div>
          <div class="w-2 h-2 rotate-45 -mt-1 ${isSelected ? "bg-slate-900 border-r-2 border-b-2 border-emerald-400" : "bg-white border-r-2 border-b-2 border-emerald-500"}"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: "custom-leaflet-district-pin",
        iconSize: [0, 0],
      });

      // Spatial Heatmap Density Circle Halo on real map
      const radiusMeters = Math.max(12000, Math.min(28000, (viewMetric === "pilots" ? d.solvedCount * 2600 : d.problemCount * 180)));
      const heatCircle = L.circle([d.lat, d.lng], {
        radius: radiusMeters,
        fillColor: markerColor,
        fillOpacity: isSelected ? 0.42 : 0.22,
        stroke: true,
        color: markerColor,
        weight: isSelected ? 2 : 1,
        opacity: isSelected ? 0.8 : 0.4,
      });
      heatCircle.on("click", () => onSelectDistrict(d.id));
      heatCircle.addTo(markersLayer);

      const marker = L.marker([d.lat, d.lng], { icon: customIcon });

      const popupContent = `
        <div style="font-family: inherit; min-width: 210px; padding: 2px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <strong style="font-size: 14px; color: #0f172a;">${d.name} (${d.hindiName})</strong>
            <span style="font-size: 9px; font-weight: bold; background: #ecfdf5; color: #065f46; padding: 2px 6px; border-radius: 9999px; border: 1px solid #a7f3d0;">${d.prioritySector}</span>
          </div>
          <div style="font-size: 11px; color: #475569; margin: 6px 0; line-height: 1.5;">
            <div>• Reported Problems: <strong style="color: #0f172a;">${d.problemCount}</strong></div>
            <div>• Active R&D Teams: <strong style="color: #0284c7;">${d.activePilots}</strong></div>
            <div>• Verified Pilots: <strong style="color: #059669;">${d.solvedCount}</strong></div>
          </div>
          ${d.highlightCase ? `
            <div style="font-size: 10px; color: #047857; font-weight: 600; background: #f0fdf4; padding: 4px 6px; border-radius: 6px; margin: 4px 0 8px 0; border: 1px solid #bbf7d0;">
              ★ ${d.highlightCase}
            </div>
          ` : ""}
          <button 
            id="popup-btn-${d.id}"
            class="inspect-district-btn"
            data-district-id="${d.id}"
            onclick="window.__inspectDistrict && window.__inspectDistrict('${d.id}')"
            style="width: 100%; background: #059669; color: white; font-weight: bold; font-size: 11px; padding: 6px; border-radius: 8px; border: none; cursor: pointer; display: block; text-align: center; margin-top: 4px;"
          >
            Inspect District Details →
          </button>
        </div>
      `;

      marker.bindPopup(popupContent, {
        closeButton: true,
        className: "custom-leaflet-popup",
      });

      marker.on("popupopen", () => {
        const btn = document.getElementById(`popup-btn-${d.id}`);
        if (btn) {
          btn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            handleInspect(d.id);
          };
        }
      });

      marker.on("click", () => {
        onSelectDistrict(d.id);
      });

      marker.addTo(markersLayer);
    });
  }, [districts, selectedDistrictId, sectorFilter, viewMetric, onSelectDistrict]);

  // 4. Smooth Pan/Zoom to Selected District
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const map = mapInstanceRef.current;
    if (!map || !selectedDistrictId) return;

    const district = districts.find((d) => d.id === selectedDistrictId);
    if (district) {
      map.flyTo([district.lat, district.lng], 9, {
        duration: 1.2,
      });
    }
  }, [selectedDistrictId, districts]);

  return (
    <div className="space-y-3">
      {/* Map Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Metric Selector */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => setViewMetric("problems")}
            className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
              viewMetric === "problems"
                ? "bg-white text-emerald-800 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            <span>Problem Severity</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMetric("pilots")}
            className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
              viewMetric === "pilots"
                ? "bg-white text-teal-800 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Pilots Deployed</span>
          </button>
        </div>

      </div>

      {/* Leaflet Map Canvas */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-200/90 shadow-md">
        <div
          ref={mapContainerRef}
          className="w-full h-[450px] z-10"
          style={{ background: "#f0fdfa" }}
        />

        {/* Map Legend Overlay */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md border border-emerald-200 p-2.5 rounded-xl shadow-md text-[10px] space-y-1.5 z-20 pointer-events-auto">
          <span className="font-extrabold text-slate-800 block uppercase tracking-wider text-[9px]">
            GIS Heatmap Legend
          </span>
          {viewMetric === "problems" ? (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse"></span>
                <span className="font-semibold text-slate-700">Critical Hotspot (&gt;100 Issues)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="font-semibold text-slate-700">Moderate Density (60-100)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                <span className="font-semibold text-slate-700">Low / Stable (&lt;60)</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
                <span className="font-semibold text-slate-700">&gt;6 Pilots Deployed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span>
                <span className="font-semibold text-slate-700">2-5 Pilots Active</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                <span className="font-semibold text-slate-700">Early Triage</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
