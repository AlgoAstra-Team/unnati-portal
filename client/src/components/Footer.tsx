import React from "react";
import Link from "next/link";
import { TrendingUp, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 px-4 py-6 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-emerald-500/20 rounded-md flex items-center justify-center text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-bold text-white text-xs">Unnati Portal (उन्नति पोर्टल)</span>
            <span className="text-slate-500 text-[10px] ml-2">Dept. of Higher & Technical Education, Govt. of Jharkhand</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium">
          <Link href="/citizen" className="hover:text-emerald-400 transition">Citizen Ingestion</Link>
          <span>•</span>
          <Link href="/student" className="hover:text-emerald-400 transition">Academic R&D Hub</Link>
          <span>•</span>
          <Link href="/csr" className="hover:text-emerald-400 transition">CSR Escrow</Link>
          <span>•</span>
          <Link href="/admin" className="hover:text-emerald-400 transition">State GIS Command</Link>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>NEP 2020 & Section 135 Compliant</span>
        </div>
      </div>
    </footer>
  );
}

