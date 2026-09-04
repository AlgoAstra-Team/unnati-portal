"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Mic, 
  Send, 
  CheckCircle2, 
  MapPin, 
  Camera, 
  ShieldCheck, 
  Volume2, 
  Sparkles,
  RefreshCw
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { DIALECT_SAMPLES, JHARKHAND_DISTRICTS } from "@/lib/data";
import { SectorType, ProblemTicket } from "@/types";

export default function CitizenPage() {
  const { submitTicket } = useDemo();

  const [title, setTitle] = useState("Severe Post-Harvest Spoilage of Lac & Vegetables in Transit");
  const [description, setDescription] = useState(
    "Tribal farmers in Khunti lose up to 40% of their harvest due to high temperatures during transport to weekly haats. We need low-cost decentralized cold storage fabricated from local bamboo and solar power."
  );
  const [district, setDistrict] = useState("Khunti");
  const [village, setVillage] = useState("Torpa Block, Murhu GP");
  const [sector, setSector] = useState<SectorType>("Agriculture & MFP");
  const [mukhiyaEndorsed, setMukhiyaEndorsed] = useState(true);

  // Audio recording simulation state
  const [selectedDialect, setSelectedDialect] = useState<string>("nagpuri");
  const [isRecording, setIsRecording] = useState(false);
  const [audioRecorded, setAudioRecorded] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  // Geotag & Photo proof state
  const [coords, setCoords] = useState({ lat: 23.0725, lng: 85.2798 });

  // Submitted ticket result
  const [submittedTicket, setSubmittedTicket] = useState<ProblemTicket | null>(null);

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingSeconds(0);
      const timer = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 4) {
            clearInterval(timer);
            setIsRecording(false);
            setAudioRecorded(true);
            const sample = DIALECT_SAMPLES[selectedDialect];
            if (sample) {
              setDescription(sample.text);
              if (selectedDialect === "hindi") {
                setTitle("Excessive Fluoride & Arsenic Contamination in Borewells");
                setSector("Water & Sanitation");
                setDistrict("Palamu");
                setVillage("Satbarwa Gram Panchayat");
              } else if (selectedDialect === "nagpuri") {
                setTitle("Perishable Lac & Tomato Post-Harvest Loss in Transit");
                setSector("Agriculture & MFP");
                setDistrict("Khunti");
                setVillage("Torpa Block, Murhu");
              }
            }
            return 4;
          }
          return prev + 1;
        });
      }, 700);
    } else {
      setIsRecording(false);
      setAudioRecorded(true);
    }
  };

  const handleCaptureGps = () => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({
            lat: Number(pos.coords.latitude.toFixed(4)),
            lng: Number(pos.coords.longitude.toFixed(4)),
          });
        },
        () => {}
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTicket = submitTicket({
      title,
      description,
      district,
      village,
      sector,
      mukhiyaEndorsed,
      gpsCoords: coords,
    });

    setSubmittedTicket(newTicket);
  };

  return (
    <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8 space-y-6">
      {/* Sub Header / Context Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white/75 backdrop-blur-xs p-3.5 rounded-2xl border border-emerald-100 shadow-xs">
        <div className="flex items-center gap-2.5">
          <Link href="/" className="p-1.5 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition shadow-xs">
            <ArrowLeft className="w-4 h-4 text-slate-700" />
          </Link>
          <div>
            <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
              Citizen & PRI Grassroots Ingestion Engine
            </span>
            <p className="text-[10px] text-slate-500">PWA field reporting with dialect transcription & GPS proof</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold bg-emerald-100/80 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
            📍 {district} District Cluster
          </span>
        </div>
      </div>

      {/* Main Submission Form or Success View */}
      <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-emerald-200 shadow-lg space-y-6">
        {!submittedTicket ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-emerald-100 pb-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">Report Local Grassroots Problem</h2>
                <p className="text-xs text-slate-500">
                  Submissions are triaged directly to university research cells & polytechnics across Jharkhand.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-200 shrink-0">
                <MapPin className="w-3.5 h-3.5" /> GPS Auto-Tagged
              </span>
            </div>

            {/* Omnichannel Voice Recording Simulator */}
            <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 p-4 sm:p-5 rounded-2xl border border-emerald-200/80 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-emerald-950">Multilingual Voice Note Input</h3>
                    <p className="text-[10px] text-slate-600">Select native Jharkhand dialect & tap record to auto-transcribe</p>
                  </div>
                </div>

                {/* Dialect Selector */}
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Dialect:</span>
                  <select
                    value={selectedDialect}
                    onChange={(e) => setSelectedDialect(e.target.value)}
                    className="bg-white border border-emerald-300 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="nagpuri">नागपुरी (Nagpuri)</option>
                    <option value="hindi">हिंदी (Hindi)</option>
                    <option value="santhali">संताली (Santhali)</option>
                    <option value="ho">हो (Ho)</option>
                    <option value="english">English</option>
                  </select>
                </div>
              </div>

              {/* Record Action Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/80 p-3.5 rounded-xl border border-emerald-100">
                <button
                  type="button"
                  onClick={toggleRecording}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow transition flex items-center gap-2 cursor-pointer ${
                    isRecording
                      ? "bg-rose-600 animate-pulse"
                      : "bg-emerald-600 hover:bg-emerald-500"
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  <span>{isRecording ? `Recording... (${recordingSeconds}s) Tap to Stop` : "Tap & Speak Problem"}</span>
                </button>

                {/* Audio Waveform Simulator */}
                {isRecording ? (
                  <div className="flex items-center gap-1 py-1 px-3 bg-rose-50 border border-rose-200 rounded-lg">
                    <span className="text-[10px] font-bold text-rose-700 animate-pulse mr-2">Listening...</span>
                    {[24, 38, 16, 42, 28, 50, 32, 20, 45, 25].map((h, i) => (
                      <span
                        key={i}
                        className="w-1 bg-rose-500 rounded-full animate-bounce"
                        style={{ height: `${h}px`, animationDelay: `${i * 70}ms` }}
                      />
                    ))}
                  </div>
                ) : audioRecorded ? (
                  <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Transcribed via Whisper Indic ({DIALECT_SAMPLES[selectedDialect]?.audioDuration})</span>
                  </div>
                ) : (
                  <span className="text-[11px] text-slate-500 font-medium italic">
                    Press button to record audio in {DIALECT_SAMPLES[selectedDialect]?.label}
                  </span>
                )}
              </div>
            </div>

            {/* Problem Details */}
            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-800 flex justify-between">
                  <span>Problem Title</span>
                  <span className="text-[10px] text-slate-400 font-normal">Clear descriptive summary</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Excessive Fluoride in Borewells or Perishable Crop Spoilage"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:bg-white transition"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800 flex justify-between">
                  <span>Ground-Level Societal Bottleneck / Description</span>
                  <span className="text-[10px] text-slate-400 font-normal">Detailed local reality</span>
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the problem, community impact, and previous failed attempts..."
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:bg-white transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Target Jharkhand District</label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  >
                    {JHARKHAND_DISTRICTS.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name} ({d.hindiName})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Village / Block / Panchayat</label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    placeholder="e.g. Torpa Block, Murhu GP"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">Thematic Societal Domain</label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value as SectorType)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                >
                  <option value="Agriculture & MFP">1. Agriculture & Minor Forest Produce (MFP)</option>
                  <option value="Water & Sanitation">2. Drinking Water & Sanitation (Fluoride/Arsenic)</option>
                  <option value="Rural Energy">3. Clean Energy & Off-Grid Infrastructure</option>
                  <option value="Primary Health">4. Rural Healthcare & Vaccine Logistics</option>
                  <option value="Clean Environment & Mining">5. Mining Externalities & Clean Environment</option>
                  <option value="Vernacular Education & Assistive Tech">6. Vernacular Education & Assistive Tech</option>
                </select>
              </div>

              {/* Geotag & Proof Verification Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-800 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Geolocation Pin
                    </div>
                    <div className="text-[10px] font-mono text-slate-600">
                      {coords.lat}° N, {coords.lng}° E
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCaptureGps}
                    className="text-[10px] font-bold text-emerald-700 bg-white border border-emerald-300 px-2 py-1 rounded-lg hover:bg-emerald-50 transition cursor-pointer flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Refresh
                  </button>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-cyan-600" /> Evidence Photo
                    </div>
                    <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" /> EXIF Headers Validated
                    </div>
                  </div>
                  <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    Camera Live
                  </span>
                </div>
              </div>

              {/* Mukhiya / Ward Councillor Endorsement Toggle */}
              <div 
                onClick={() => setMukhiyaEndorsed(!mukhiyaEndorsed)}
                className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                  mukhiyaEndorsed 
                    ? "bg-emerald-50/80 border-emerald-300" 
                    : "bg-slate-50 border-slate-200 opacity-80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border font-bold text-xs ${
                    mukhiyaEndorsed ? "bg-emerald-600 text-white border-emerald-600" : "bg-white border-slate-300"
                  }`}>
                    {mukhiyaEndorsed ? "✓" : ""}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Panchayat / Mukhiya Endorsement</h4>
                    <p className="text-[10px] text-slate-500">
                      Pre-authenticated Gram Mukhiya / Ward Member signature boosts authenticity weight.
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-white border border-emerald-200 px-2.5 py-1 rounded-full shrink-0 shadow-xs">
                  {mukhiyaEndorsed ? "Stamped & Endorsed" : "Tap to Endorse"}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" /> Submit Problem Ticket to State R&D Pipeline
            </button>
          </form>
        ) : (
          /* Submission Success State */
          <div className="p-8 text-center space-y-6 bg-gradient-to-b from-emerald-50 to-white rounded-2xl border border-emerald-200">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Successfully Ingested & Triaged
              </span>
              <h3 className="text-2xl font-black text-slate-900">
                Ticket Generated: <span className="text-emerald-700 font-mono">{submittedTicket.id}</span>
              </h3>
              <p className="text-xs text-slate-600 max-w-lg mx-auto">
                Your problem has been geotagged in <span className="font-bold text-slate-800">{submittedTicket.district}</span>, categorized under <span className="font-bold text-slate-800">{submittedTicket.sector}</span>, and automatically routed to <span className="font-bold text-emerald-700">{submittedTicket.assignedHEI}</span>.
              </p>
            </div>

            {/* Tracking Stages Timeline Card */}
            <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-xs text-left max-w-xl mx-auto space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Live Resolution Progress:</h4>
              <div className="space-y-2.5">
                {submittedTicket.timeline.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <div className="mt-0.5">
                      {step.status === "completed" ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : step.status === "current" ? (
                        <div className="w-4 h-4 rounded-full border-2 border-emerald-600 flex items-center justify-center">
                          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className={`font-bold ${step.status === "completed" ? "text-slate-900" : step.status === "current" ? "text-emerald-700" : "text-slate-400"}`}>
                          {step.title}
                        </span>
                        {step.timestamp && (
                          <span className="text-[10px] text-slate-400 font-medium">{step.timestamp}</span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/student"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-5 rounded-xl shadow-sm transition"
              >
                View in Student R&D Hub →
              </Link>
              <button
                onClick={() => setSubmittedTicket(null)}
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold text-xs py-2.5 px-4 rounded-xl shadow-xs transition"
              >
                Submit Another Problem
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
