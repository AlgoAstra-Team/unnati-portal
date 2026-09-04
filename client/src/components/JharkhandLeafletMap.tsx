"use client";

import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { DistrictGISData } from "@/types";
import { Layers, Sparkles, Activity } from "lucide-react";

interface LeafletMapProps {
  districts: DistrictGISData[];
  selectedDistrictId: string | null;
  onSelectDistrict: (id: string) => void;
  sectorFilter: string;
}

// 100% Free Public Tile Servers - Zero API Key Required
const TILE_URLS = {
  osm: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  esri: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
};

const TILE_ATTRIBUTIONS = {
  osm: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  esri: 'Tiles &copy; Esri &mdash; National Geographic, DeLorme, NAVTEQ',
};

export default function JharkhandLeafletMap({
  districts,
  selectedDistrictId,
  onSelectDistrict,
  sectorFilter,
}: LeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const isFirstRender = useRef(true);

  // Default to 100% free OpenStreetMap
  const [tileStyle, setTileStyle] = useState<"osm" | "esri">("osm");
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

    // Initial 100% free OpenStreetMap tile layer (zero API key)
    L.tileLayer(TILE_URLS.osm, {
      attribution: TILE_ATTRIBUTIONS.osm,
      maxZoom: 18,
    }).addTo(map);

    const markersLayer = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;
    markersLayerRef.current = markersLayer;

    // Invalidate size on mount and window resize
    const invalidate = () => map.invalidateSize();
    const t1 = setTimeout(invalidate, 100);
    const t2 = setTimeout(invalidate, 400);
    window.addEventListener("resize", invalidate);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", invalidate);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 2. Switch Tile Layer (OSM vs Esri Topo)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    L.tileLayer(TILE_URLS[tileStyle], {
      attribution: TILE_ATTRIBUTIONS[tileStyle],
      maxZoom: 18,
    }).addTo(map);
  }, [tileStyle]);

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

      const marker = L.marker([d.lat, d.lng], { icon: customIcon });

      const popupContent = `
        <div style="font-family: inherit; min-width: 200px; padding: 2px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <strong style="font-size: 14px; color: #0f172a;">${d.name} (${d.hindiName})</strong>
            <span style="font-size: 9px; font-weight: bold; background: #ecfdf5; color: #065f46; padding: 2px 6px; border-radius: 9999px; border: 1px solid #a7f3d0;">${d.prioritySector}</span>
          </div>
          <div style="font-size: 11px; color: #475569; margin: 6px 0;">
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
            style="width: 100%; background: #059669; color: white; font-weight: bold; font-size: 11px; padding: 5px; border-radius: 8px; border: none; cursor: pointer;"
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
          btn.onclick = () => onSelectDistrict(d.id);
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

        {/* Free Tile Style Switcher */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
          <Layers className="w-3.5 h-3.5 text-slate-500" />
          <button
            type="button"
            onClick={() => setTileStyle("osm")}
            className={`px-2.5 py-1 rounded-lg border transition cursor-pointer ${
              tileStyle === "osm"
                ? "bg-emerald-100/80 text-emerald-800 border-emerald-300 shadow-xs"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            OpenStreetMap (Free)
          </button>
          <button
            type="button"
            onClick={() => setTileStyle("esri")}
            className={`px-2.5 py-1 rounded-lg border transition cursor-pointer ${
              tileStyle === "esri"
                ? "bg-emerald-100/80 text-emerald-800 border-emerald-300 shadow-xs"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            Esri Topo GIS (Free)
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
            GIS Legend
          </span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
            <span className="font-semibold text-slate-700">Flagship Innovation Hub</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <span className="font-semibold text-slate-700">&gt;6 Field Pilots Deployed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
            <span className="font-semibold text-slate-700">Active R&D / Testing</span>
          </div>
        </div>
      </div>
    </div>
  );
}
