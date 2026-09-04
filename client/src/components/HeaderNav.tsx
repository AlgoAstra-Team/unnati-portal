"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TrendingUp, Users, GraduationCap, Building2, Shield, RotateCcw, Menu, X } from "lucide-react";
import { useDemo } from "@/context/DemoContext";

export default function HeaderNav() {
  const pathname = usePathname();
  const { resetDemoData } = useDemo();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showResetNotice, setShowResetNotice] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", icon: TrendingUp },
    { href: "/citizen", label: "Citizen & PRI", icon: Users },
    { href: "/student", label: "Student R&D", icon: GraduationCap },
    { href: "/csr", label: "Corporate CSR", icon: Building2 },
    { href: "/admin", label: "State Admin", icon: Shield },
  ];

  const handleReset = () => {
    resetDemoData();
    setShowResetNotice(true);
    setTimeout(() => setShowResetNotice(false), 2500);
  };

  return (
    <header className="w-full bg-white/85 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-8 h-8 bg-slate-900 rounded-xl flex items-center justify-center shadow-xs group-hover:scale-105 transition">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black text-slate-900 tracking-tight">Unnati Portal</span>
              <span className="text-xs font-bold text-emerald-600">उन्नति पोर्टल</span>
            </div>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Govt. of Jharkhand</p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60 text-xs">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition ${
                  isActive
                    ? "bg-white text-emerald-800 shadow-xs border border-emerald-200/80"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-emerald-600" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Badges & Reset */}
        <div className="hidden lg:flex items-center gap-2 text-[10px]">
          <span className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-2.5 py-1 rounded-full font-bold">
            24 Dist GIS
          </span>
          <span className="bg-cyan-50 border border-cyan-200 text-cyan-800 px-2.5 py-1 rounded-full font-bold">
            NEP 2020
          </span>
          <a
            href="tel:1800-JH-RND"
            className="bg-white border border-emerald-200 text-slate-700 px-2.5 py-1 rounded-full font-bold shadow-xs hover:bg-emerald-50 transition"
          >
            📞 1800-JH-RND
          </a>
          <button
            onClick={handleReset}
            title="Reset Demo Data to Initial State"
            className="flex items-center gap-1 text-[10px] font-semibold text-slate-500 hover:text-rose-600 bg-white border border-slate-200 px-2.5 py-1 rounded-full transition shadow-xs cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={handleReset}
            title="Reset Demo"
            className="p-1.5 bg-white border rounded-lg text-slate-500 text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-700"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Reset Toast Feedback */}
      {showResetNotice && (
        <div className="w-full bg-emerald-600 text-white text-[11px] font-bold text-center py-1 animate-fadeIn">
          ✓ Demo dataset successfully reset to default state.
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 border-b border-slate-200 px-4 py-3 space-y-2">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold ${
                  isActive ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "text-slate-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

