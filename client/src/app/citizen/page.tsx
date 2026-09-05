"use client";

import React, { useState, useRef, useEffect } from "react";
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
  RefreshCw,
  X,
  SwitchCamera,
  Trash2,
  ExternalLink,
  Check,
  CheckCheck,
  AlertCircle
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { DIALECT_SAMPLES, JHARKHAND_DISTRICTS } from "@/lib/data";
import { SectorType, ProblemTicket } from "@/types";

// Authentic WhatsApp Brand Logo SVG
function WhatsAppLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  options?: string[];
  photo?: string;
  ticketId?: string;
}

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

  // Geotag & Photo proof state (Captured only through Live Camera)
  const [coords, setCoords] = useState({ lat: 23.0725, lng: 85.2798 });
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoTimestamp, setPhotoTimestamp] = useState<string | null>(null);

  // Live Camera state
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraFacing, setCameraFacing] = useState<"environment" | "user">("environment");
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // WhatsApp Chatbot Simulator state
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [whatsappInput, setWhatsappInput] = useState("");
  const [whatsappMessages, setWhatsappMessages] = useState<ChatMessage[]>([
    {
      id: "m1",
      sender: "bot",
      text: "नमस्ते! जोहार! 🙏 मैं झारखंड उन्नति AI साथी हूँ। आप ग्रामीण समस्या (सड़क, पेयजल, फसल नुकसान, सौर ऊर्जा) यहाँ दर्ज कर सकते हैं।",
      time: "09:30 AM",
    },
    {
      id: "m2",
      sender: "bot",
      text: "कृपया अपनी समस्या की श्रेणी चुनें या लाइव कैमरा से फोटो खींचकर भेजें:",
      time: "09:30 AM",
      options: [
        "🌾 फसल एवं कोल्ड स्टोरेज (Agriculture & Storage)",
        "💧 पेयजल एवं फ्लोराइड (Water & Fluoride)",
        "⚡ ग्रामीण सौर ऊर्जा (Solar & Energy)",
        "📸 लाइव कैमरा से फोटो खींचें (Capture Live Camera Photo)",
      ],
    },
  ]);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Submitted ticket result
  const [submittedTicket, setSubmittedTicket] = useState<ProblemTicket | null>(null);

  // Audio recording toggle
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

  // ------------------ LIVE CAMERA HANDLING ONLY ------------------
  const startCamera = async (facing: "environment" | "user" = cameraFacing) => {
    setCameraError(null);
    setIsCameraOpen(true);
    setIsStreaming(false);

    // Stop existing stream if any
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Live camera is not accessible in this browser context.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facing },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
        setIsStreaming(true);
      }
    } catch (err: unknown) {
      console.warn("Live camera access issue:", err);
      setCameraError(
        "Camera permission is required to capture ground evidence. Please enable camera permission and tap Retry."
      );
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setIsStreaming(false);
    setIsCameraOpen(false);
    setCameraError(null);
  };

  const flipCamera = () => {
    const nextFacing = cameraFacing === "environment" ? "user" : "environment";
    setCameraFacing(nextFacing);
    startCamera(nextFacing);
  };

  const captureSnapshot = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw frame from live video
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Overlay tamper-proof EXIF & GPS watermark on bottom banner
    const now = new Date();
    const timeStr =
      now.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) +
      " " +
      now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    const bannerH = Math.max(36, Math.floor(canvas.height * 0.08));
    ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
    ctx.fillRect(0, canvas.height - bannerH, canvas.width, bannerH);

    ctx.fillStyle = "#34d399"; // emerald
    ctx.font = `bold ${Math.max(12, Math.floor(bannerH * 0.38))}px monospace`;
    ctx.fillText(`📍 UNNATI GEO-EXIF: ${coords.lat}° N, ${coords.lng}° E | ${district.toUpperCase()}`, 12, canvas.height - bannerH * 0.52);

    ctx.fillStyle = "#ffffff";
    ctx.font = `${Math.max(10, Math.floor(bannerH * 0.3))}px sans-serif`;
    ctx.fillText(`LIVE CAMERA CAPTURED: ${timeStr} IST • TAMPER-PROOF`, 12, canvas.height - bannerH * 0.16);

    const capturedDataUrl = canvas.toDataURL("image/jpeg", 0.88);
    setPhotoUrl(capturedDataUrl);
    setPhotoTimestamp(timeStr);
    stopCamera();
  };

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  // ------------------ WHATSAPP CHATBOT HANDLING ------------------
  useEffect(() => {
    if (isWhatsAppOpen && chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [whatsappMessages, isWhatsAppOpen]);

  const handleWhatsAppSend = (textToSend?: string) => {
    const text = textToSend || whatsappInput.trim();
    if (!text) return;

    const userMsgTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg: ChatMessage = {
      id: "msg-" + Date.now(),
      sender: "user",
      text,
      time: userMsgTime,
    };

    setWhatsappMessages((prev) => [...prev, newMsg]);
    if (!textToSend) setWhatsappInput("");

    // Bot automated triage logic
    setTimeout(() => {
      const botMsgTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const lower = text.toLowerCase();

      if (lower.includes("फसल") || lower.includes("crop") || lower.includes("storage") || lower.includes("cold")) {
        setTitle("Perishable Lac & Tomato Post-Harvest Loss in Transit");
        setSector("Agriculture & MFP");
        setDistrict("Khunti");
        setVillage("Torpa Block, Murhu");
        setWhatsappMessages((prev) => [
          ...prev,
          {
            id: "bot-" + Date.now(),
            sender: "bot",
            text: "✅ खूंटी जिले में फसल बर्बादी व कोल्ड स्टोरेज की समस्या चिह्नित की गई है। कृपया लाइव कैमरा खोलकर एक फोटो खींचें ताकि BIT Mesra R&D सेल तुरंत विश्लेषण कर सके।",
            time: botMsgTime,
            options: [
              "📸 लाइव कैमरा से फोटो खींचें (Capture Live Camera)",
              "🚀 सीधे टिकट सबमिट करें (Submit Ticket Now)",
            ],
          },
        ]);
      } else if (lower.includes("पानी") || lower.includes("water") || lower.includes("fluoride") || lower.includes("पेयजल")) {
        setTitle("Excessive Fluoride & Arsenic Contamination in Borewells");
        setSector("Water & Sanitation");
        setDistrict("Palamu");
        setVillage("Satbarwa Gram Panchayat");
        setWhatsappMessages((prev) => [
          ...prev,
          {
            id: "bot-" + Date.now(),
            sender: "bot",
            text: "✅ पलामू जिले में फ्लोराइड व बोरवेल प्रदूषण की शिकायत नोट की गई। एनआईटी जमशेदपुर केमिकल इंजीनियरिंग टीम इसे देखेगी।",
            time: botMsgTime,
            options: [
              "📸 लाइव कैमरा से फोटो खींचें (Capture Live Camera)",
              "🚀 सीधे टिकट सबमिट करें (Submit Ticket Now)",
            ],
          },
        ]);
      } else if (lower.includes("फोटो") || lower.includes("photo") || lower.includes("camera") || lower.includes("कैमरा")) {
        setIsWhatsAppOpen(false);
        startCamera();
      } else if (lower.includes("सबमिट") || lower.includes("submit") || lower.includes("दर्ज")) {
        const newTicket = submitTicket({
          title,
          description,
          district,
          village,
          sector,
          mukhiyaEndorsed,
          gpsCoords: coords,
          photoUrl: photoUrl || undefined,
        });

        setWhatsappMessages((prev) => [
          ...prev,
          {
            id: "bot-" + Date.now(),
            sender: "bot",
            text: `🎉 बधाई! आपकी समस्या दर्ज हो गई है।\n\n📌 टिकट ID: ${newTicket.id}\n📍 जिला: ${newTicket.district}\n🏛️ आवंटित संस्थान: ${newTicket.assignedHEI}\n\nआप नीचे बटन दबाकर पोर्टल डैशबोर्ड में इसे देख सकते हैं।`,
            time: botMsgTime,
            ticketId: newTicket.id,
          },
        ]);
      } else {
        setWhatsappMessages((prev) => [
          ...prev,
          {
            id: "bot-" + Date.now(),
            sender: "bot",
            text: `धन्यवाद! आपका संदेश प्राप्त हुआ: "${text}"। आप नीचे दिए गए विकल्पों से आगे बढ़ सकते हैं:`,
            time: botMsgTime,
            options: [
              "🌾 फसल नुकसान दर्ज करें",
              "💧 पेयजल समस्या दर्ज करें",
              "📸 लाइव कैमरा से फोटो खींचें",
              "🚀 सीधे टिकट सबमिट करें (Submit Ticket Now)",
            ],
          },
        ]);
      }
    }, 600);
  };

  const handleOptionClick = (option: string) => {
    if (option.includes("Capture") || option.includes("कैमरा") || option.includes("Camera")) {
      setIsWhatsAppOpen(false);
      startCamera();
    } else {
      handleWhatsAppSend(option);
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
      photoUrl: photoUrl || undefined,
    });

    setSubmittedTicket(newTicket);
  };

  return (
    <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8 space-y-6">
      {/* Sub Header / Context Bar without District Badge */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white/75 backdrop-blur-xs p-3.5 rounded-2xl border border-emerald-100 shadow-xs">
        <div className="flex items-center gap-2.5">
          <Link href="/" className="p-1.5 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition shadow-xs">
            <ArrowLeft className="w-4 h-4 text-slate-700" />
          </Link>
          <div>
            <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
              Citizen & PRI Grassroots Ingestion Engine
            </span>
            <p className="text-[10px] text-slate-500">PWA field reporting with dialect transcription, camera proof & WhatsApp bot</p>
          </div>
        </div>
      </div>

      {/* WHATSAPP CHATBOT OMNICHANNEL OPTION BANNER */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-4 sm:p-5 rounded-3xl border border-emerald-600/50 shadow-lg relative overflow-hidden">
        {/* Subtle background glow effect */}
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-[#25D366]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-md shrink-0 ring-4 ring-white/10">
              <WhatsAppLogo className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/30 text-emerald-200 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                  Omnichannel WhatsApp Bot
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping inline-block" /> 24x7 Live
                </span>
              </div>
              <h3 className="text-base font-black text-white">
                झारखंड उन्नति WhatsApp साथी (AI Grassroots Chatbot)
              </h3>
              <p className="text-xs text-emerald-100/85 max-w-xl leading-relaxed">
                Can&apos;t type or facing weak network? Report civic issues, capture live camera photos, or send voice notes directly in Nagpuri, Hindi or Santhali via WhatsApp (<span className="font-mono text-emerald-200 font-bold">+91 94311 00000</span>).
              </p>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full md:w-auto shrink-0 pt-1 md:pt-0">
            {/* Interactive Bot Simulator Modal Button */}
            <button
              type="button"
              onClick={() => setIsWhatsAppOpen(true)}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <WhatsAppLogo className="w-4 h-4 text-[#25D366]" />
              <span>Chat with Bot Here</span>
            </button>

            {/* Direct WhatsApp URL link */}
            <a
              href="https://wa.me/919431100000?text=Namaste%20Unnati%20Jharkhand%2C%20I%20want%20to%20report%20a%20local%20problem%20in%20my%20panchayat."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-3.5 py-2.5 bg-emerald-700/60 hover:bg-emerald-600 text-white border border-emerald-400/30 font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
            >
              <span>Open in App</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-200" />
            </a>
          </div>
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
                  Submissions are triaged directly to university research cells &amp; polytechnics across Jharkhand.
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
                    <p className="text-[10px] text-slate-600">Select native Jharkhand dialect &amp; tap record to auto-transcribe</p>
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
                  <option value="Agriculture & MFP">1. Agriculture &amp; Minor Forest Produce (MFP)</option>
                  <option value="Water & Sanitation">2. Drinking Water &amp; Sanitation (Fluoride/Arsenic)</option>
                  <option value="Rural Energy">3. Clean Energy &amp; Off-Grid Infrastructure</option>
                  <option value="Primary Health">4. Rural Healthcare &amp; Vaccine Logistics</option>
                  <option value="Clean Environment & Mining">5. Mining Externalities &amp; Clean Environment</option>
                  <option value="Vernacular Education & Assistive Tech">6. Vernacular Education &amp; Assistive Tech</option>
                </select>
              </div>

              {/* Geotag & LIVE CAMERA ONLY Evidence Proof Section */}
              <div className="space-y-2 pt-1">
                <label className="font-bold text-slate-800 flex justify-between items-center">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Verified Evidence &amp; Geotag Authentication
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">Live Camera capture &amp; EXIF GPS validation</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Geolocation Pin Card */}
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-bold text-slate-800 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Geolocation Pin
                      </div>
                      <div className="text-[10px] font-mono text-slate-600">
                        {coords.lat}° N, {coords.lng}° E
                      </div>
                      <div className="text-[9px] text-emerald-700 font-semibold">
                        GPS Status: Locked &amp; Calibrated
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCaptureGps}
                      className="text-[10px] font-bold text-emerald-700 bg-white border border-emerald-300 px-2.5 py-1 rounded-xl hover:bg-emerald-50 transition cursor-pointer flex items-center gap-1 shadow-xs"
                    >
                      <RefreshCw className="w-3 h-3" /> Refresh GPS
                    </button>
                  </div>

                  {/* Camera Evidence Photo Card (Live Camera Only) */}
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl flex flex-col justify-between gap-2.5">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-800 flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-700">
                            <Camera className="w-3.5 h-3.5" />
                          </div>
                          <span>Ground Evidence Photo</span>
                        </div>
                        <div className="text-[9px] text-slate-500">
                          {photoUrl ? "Photo captured via live camera & verified" : "Live camera capture required for verification"}
                        </div>
                      </div>
                      {photoUrl ? (
                        <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                          <Check className="w-2.5 h-2.5" /> Attached
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
                          Camera Photo Required
                        </span>
                      )}
                    </div>

                    {/* Photo Action Triggers (Live Camera Only) */}
                    {!photoUrl ? (
                      <button
                        type="button"
                        onClick={() => startCamera()}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 px-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                      >
                        <Camera className="w-4 h-4" />
                        <span>Capture with Live Camera</span>
                      </button>
                    ) : (
                      /* Photo Preview & Controls */
                      <div className="flex items-center justify-between gap-2 bg-white p-2 rounded-xl border border-emerald-200 shadow-xs">
                        <div className="flex items-center gap-2 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={photoUrl}
                            alt="Captured Ground Evidence"
                            className="w-12 h-10 object-cover rounded-lg border border-emerald-300 shrink-0"
                          />
                          <div className="truncate">
                            <span className="text-[10px] font-bold text-slate-800 block truncate">
                              live-camera-evidence.jpg
                            </span>
                            <span className="text-[9px] text-emerald-700 block truncate">
                              ✓ Geotagged • {photoTimestamp || "Just Now"}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => startCamera()}
                            className="text-[10px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1 cursor-pointer"
                          >
                            <Camera className="w-3 h-3" /> Retake
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setPhotoUrl(null);
                              setPhotoTimestamp(null);
                            }}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                            title="Delete photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
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
              <Send className="w-4 h-4" /> Submit Problem Ticket to State R&amp;D Pipeline
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
                Successfully Ingested &amp; Triaged
              </span>
              <h3 className="text-2xl font-black text-slate-900">
                Ticket Generated: <span className="text-emerald-700 font-mono">{submittedTicket.id}</span>
              </h3>
              <p className="text-xs text-slate-600 max-w-lg mx-auto">
                Your problem has been geotagged in <span className="font-bold text-slate-800">{submittedTicket.district}</span>, categorized under <span className="font-bold text-slate-800">{submittedTicket.sector}</span>, and automatically routed to <span className="font-bold text-emerald-700">{submittedTicket.assignedHEI}</span>.
              </p>
            </div>

            {/* Attached Live Camera Evidence Photo in Ticket Result */}
            {submittedTicket.photoUrl && (
              <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-xs text-left max-w-xl mx-auto space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                      <Camera className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Verified Live Camera Ground Evidence</h4>
                      <p className="text-[10px] text-slate-500">EXIF Geotag Timestamped &amp; Pinned</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> GPS Hash Validated
                  </span>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-video max-h-56 bg-slate-900 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={submittedTicket.photoUrl}
                    alt="Ground Evidence Photo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-slate-900/80 backdrop-blur-xs px-3 py-1.5 text-[10px] font-mono text-emerald-300 flex justify-between items-center">
                    <span>📍 {submittedTicket.gpsCoords.lat}° N, {submittedTicket.gpsCoords.lng}° E</span>
                    <span>{submittedTicket.district} District</span>
                  </div>
                </div>
              </div>
            )}

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
                View in Student R&amp;D Hub →
              </Link>
              <button
                onClick={() => {
                  setSubmittedTicket(null);
                  setPhotoUrl(null);
                }}
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold text-xs py-2.5 px-4 rounded-xl shadow-xs transition cursor-pointer"
              >
                Submit Another Problem
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* 1. LIVE CAMERA VIEWFINDER MODAL (LIVE CAMERA CAPTURE ONLY) */}
      {/* ============================================================ */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
            {/* Viewfinder Header */}
            <div className="bg-slate-950/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-black tracking-wide flex items-center gap-1.5">
                    <span>LIVE EVIDENCE CAMERA</span>
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block" />
                  </h3>
                  <p className="text-[10px] text-slate-400 font-mono">
                    EXIF Geotag: {coords.lat}° N, {coords.lng}° E
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={flipCamera}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition cursor-pointer"
                  title="Switch Camera (Front/Rear)"
                >
                  <SwitchCamera className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={stopCamera}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition cursor-pointer"
                  title="Close Camera"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Video Viewport with Framing Reticle */}
            <div className="relative aspect-4/3 sm:aspect-square bg-black overflow-hidden flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* Viewfinder Corner Framing Lines */}
              <div className="absolute inset-6 pointer-events-none border border-white/20 rounded-2xl">
                {/* Top-Left */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-emerald-400 rounded-tl-lg" />
                {/* Top-Right */}
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-emerald-400 rounded-tr-lg" />
                {/* Bottom-Left */}
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-emerald-400 rounded-bl-lg" />
                {/* Bottom-Right */}
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-emerald-400 rounded-br-lg" />

                {/* Center crosshair */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                  <div className="w-6 h-0.5 bg-white/60" />
                  <div className="h-6 w-0.5 bg-white/60 -ml-3.25" />
                </div>
              </div>

              {/* Live Overlay GPS Watermark Tag */}
              <div className="absolute bottom-3 inset-x-3 bg-slate-950/75 backdrop-blur-xs border border-white/10 rounded-xl p-2 text-[10px] font-mono text-emerald-300 flex justify-between items-center pointer-events-none">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  {coords.lat}° N, {coords.lng}° E
                </span>
                <span className="text-white/80 uppercase font-sans font-bold text-[9px]">
                  {district} • {village.slice(0, 16)}
                </span>
              </div>

              {/* Camera Error or Permission Request Notice */}
              {cameraError && (
                <div className="absolute inset-4 bg-slate-950/95 p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-3 text-white">
                  <AlertCircle className="w-8 h-8 text-amber-400" />
                  <p className="text-xs text-slate-300 max-w-xs">{cameraError}</p>
                  <button
                    type="button"
                    onClick={() => startCamera()}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Retry Camera
                  </button>
                </div>
              )}
            </div>

            {/* Camera Controls & Shutter Bar */}
            <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-center gap-6">
              {/* Cancel Button */}
              <button
                type="button"
                onClick={stopCamera}
                className="px-4 py-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition flex items-center gap-1 text-xs cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>

              {/* Large Camera Shutter Snap Button */}
              <button
                type="button"
                onClick={captureSnapshot}
                disabled={!isStreaming && !cameraError}
                className="w-16 h-16 rounded-full bg-white hover:bg-slate-100 active:scale-95 transition-all p-1.5 shadow-lg flex items-center justify-center ring-4 ring-emerald-500/40 cursor-pointer disabled:opacity-50"
                title="Capture Photo"
              >
                <div className="w-full h-full rounded-full border-2 border-slate-900 bg-white flex items-center justify-center text-slate-900">
                  <Camera className="w-6 h-6" />
                </div>
              </button>

              {/* Flip camera button */}
              <button
                type="button"
                onClick={flipCamera}
                className="px-4 py-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition flex items-center gap-1 text-xs cursor-pointer"
                title="Flip Camera"
              >
                <SwitchCamera className="w-4 h-4" />
                <span>Flip</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 2. INTERACTIVE WHATSAPP CHATBOT SIMULATOR WITH WHATSAPP LOGO */}
      {/* ============================================================ */}
      {isWhatsAppOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="max-w-md w-full h-[620px] max-h-[92vh] bg-[#efeae2] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-emerald-300 relative animate-in fade-in zoom-in-95 duration-200">
            {/* WhatsApp Header */}
            <div className="bg-[#075E54] px-3.5 py-2.5 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    <WhatsAppLogo className="w-6 h-6" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#075E54]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-black tracking-wide">झारखंड उन्नति साथी</h3>
                    <span className="text-[9px] bg-emerald-600/80 text-emerald-100 px-1.5 py-0.2 rounded-full font-bold">
                      ✓ Official Bot
                    </span>
                  </div>
                  <p className="text-[10px] text-emerald-200/90 font-medium">
                    online • +91 94311 00000
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsWhatsAppOpen(false)}
                  className="p-1.5 text-emerald-100 hover:text-white hover:bg-emerald-800/50 rounded-xl transition cursor-pointer"
                  title="Close WhatsApp"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Body with subtle WhatsApp message bubbles */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3 text-xs">
              {/* Security Banner */}
              <div className="bg-[#ffeecd] border border-[#fae2a6] text-[#6e5828] text-[10px] text-center p-2 rounded-xl shadow-2xs font-medium max-w-xs mx-auto">
                🔒 Messages are end-to-end encrypted and routed directly to State Higher Education R&amp;D Cells.
              </div>

              {/* Chat Thread */}
              {whatsappMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl shadow-xs space-y-2 ${
                      msg.sender === "user"
                        ? "bg-[#dcf8c6] text-slate-900 rounded-tr-xs"
                        : "bg-white text-slate-800 rounded-tl-xs"
                    }`}
                  >
                    <p className="whitespace-pre-line leading-relaxed font-medium text-[12px]">
                      {msg.text}
                    </p>

                    {/* Attached Live Camera Photo inside Chat */}
                    {msg.photo && (
                      <div className="rounded-xl overflow-hidden border border-slate-200 mt-1.5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={msg.photo} alt="Attached Live Camera Evidence" className="w-full h-32 object-cover" />
                      </div>
                    )}

                    {/* Ticket Link inside Chat */}
                    {msg.ticketId && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsWhatsAppOpen(false);
                          const generated = submitTicket({
                            title,
                            description,
                            district,
                            village,
                            sector,
                            mukhiyaEndorsed,
                            gpsCoords: coords,
                            photoUrl: photoUrl || undefined,
                          });
                          setSubmittedTicket(generated);
                        }}
                        className="w-full mt-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-[11px] py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> View Ticket in Portal Dashboard
                      </button>
                    )}

                    {/* Timestamp & double tick */}
                    <div className="flex items-center justify-end gap-1 text-[9px] text-slate-400 font-medium">
                      <span>{msg.time}</span>
                      {msg.sender === "user" && <CheckCheck className="w-3 h-3 text-sky-600" />}
                    </div>
                  </div>

                  {/* Interactive Option Chips for Quick Actions */}
                  {msg.options && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                      {msg.options.map((opt, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleOptionClick(opt)}
                          className="text-[11px] font-bold bg-white text-emerald-800 border border-emerald-200 hover:bg-emerald-50 px-2.5 py-1.5 rounded-full shadow-2xs transition cursor-pointer flex items-center gap-1"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={chatBottomRef} />
            </div>

            {/* Quick action bar */}
            <div className="px-3 py-2 bg-[#f0f2f5] border-t border-slate-200 flex items-center gap-2 text-slate-600">
              <button
                type="button"
                onClick={() => {
                  setIsWhatsAppOpen(false);
                  startCamera();
                }}
                className="text-[11px] font-bold bg-white text-slate-700 hover:text-emerald-700 border border-slate-300 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5 text-cyan-600" />
                <span>Open Live Camera</span>
              </button>
              <button
                type="button"
                onClick={() => handleWhatsAppSend("🚀 सबमिट करें (Submit Problem Ticket)")}
                className="text-[11px] font-bold bg-emerald-600 text-white hover:bg-emerald-500 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs cursor-pointer ml-auto"
              >
                <Send className="w-3 h-3" />
                <span>Submit Ticket</span>
              </button>
            </div>

            {/* WhatsApp Input Bar */}
            <div className="p-2.5 bg-[#f0f2f5] border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={whatsappInput}
                onChange={(e) => setWhatsappInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleWhatsAppSend();
                  }
                }}
                placeholder="Type in Hindi, Nagpuri or English..."
                className="flex-1 bg-white border border-slate-300 rounded-full px-4 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={() => handleWhatsAppSend()}
                className="w-9 h-9 rounded-full bg-[#075E54] hover:bg-emerald-700 text-white flex items-center justify-center transition shadow-xs shrink-0 cursor-pointer"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

