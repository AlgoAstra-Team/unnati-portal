"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Upload, 
  Award, 
  Users, 
  FileText, 
  FileCheck, 
  Plus, 
  X, 
  Sparkles, 
  Building2, 
  ExternalLink
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";

export default function StudentPage() {
  const { projects, selectedProjectId, setSelectedProjectId, verifyMilestone, addTeamMember } = useDemo();

  const currentProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  // Modals state
  const [showCertificate, setShowCertificate] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("");
  const [newMemberDept, setNewMemberDept] = useState("Computer Science & Engineering");

  // Lab deliverable upload state
  const [uploadingMilestone, setUploadingMilestone] = useState<number | null>(null);

  const handleVerify = (phaseNum: number) => {
    setUploadingMilestone(phaseNum);
    setTimeout(() => {
      verifyMilestone(currentProject.id, phaseNum);
      setUploadingMilestone(null);
    }, 600);
  };

  const handleAddCollaborator = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;
    addTeamMember(currentProject.id, {
      name: newMemberName.trim(),
      role: newMemberRole.trim() || "Multidisciplinary Collaborator",
      department: newMemberDept,
      avatarBg: "bg-cyan-700"
    });
    setNewMemberName("");
    setNewMemberRole("");
    setShowAddMember(false);
  };

  const completedCount = currentProject.milestones.filter((m) => m.isCompleted).length;
  const progressPercent = Math.round((completedCount / currentProject.milestones.length) * 100);

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-6">
      {/* Sub Header / Context Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white/75 backdrop-blur-xs p-3.5 rounded-2xl border border-cyan-100 shadow-xs">
        <div className="flex items-center gap-2.5">
          <Link href="/" className="p-1.5 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition shadow-xs">
            <ArrowLeft className="w-4 h-4 text-slate-700" />
          </Link>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
              Capstone R&D: <span className="text-cyan-700 font-mono font-bold">{currentProject.ticketId}</span>
            </span>
            <p className="text-[10px] text-slate-500 font-semibold">{currentProject.institution} • Departmental R&D Cell</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCertificate(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Award className="w-3.5 h-3.5" /> View NEP 2020 Credit Certificate
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar: Problem Selector & Team */}
        <aside className="lg:col-span-4 space-y-5">
          <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-cyan-100 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs font-extrabold uppercase text-slate-400">
              <span>Assigned R&D Pool</span>
              <span className="text-cyan-600">{projects.length} Active</span>
            </div>

            <div className="space-y-2">
              {projects.map((proj) => {
                const isSel = proj.id === currentProject.id;
                return (
                  <button
                    key={proj.id}
                    onClick={() => setSelectedProjectId(proj.id)}
                    className={`w-full text-left p-3 rounded-xl border transition text-xs cursor-pointer ${
                      isSel
                        ? "bg-cyan-50 border-cyan-300 text-slate-900 shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[9px] font-mono font-bold text-cyan-700">{proj.ticketId}</span>
                      <span className="text-[9px] font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                        {proj.district}
                      </span>
                    </div>
                    <h4 className="font-bold text-[11px] line-clamp-1">{proj.title}</h4>
                    <p className="text-[10px] text-slate-500 mt-1">{proj.institution}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xs p-5 rounded-2xl border border-cyan-100 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-cyan-600" /> Multidisciplinary Team
                </h4>
                <p className="text-[10px] text-slate-500">Cross-branch student-faculty squad</p>
              </div>
              <button
                onClick={() => setShowAddMember(true)}
                className="text-[10px] font-bold text-cyan-700 hover:text-cyan-900 bg-cyan-50 border border-cyan-200 px-2 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" /> Add Branch
              </button>
            </div>

            <div className="space-y-2 pt-1">
              {currentProject.teamMembers.map((m, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg ${m.avatarBg || "bg-cyan-600"} text-white flex items-center justify-center font-bold text-[10px]`}>
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 text-[11px]">{m.name}</div>
                      <div className="text-[9px] text-slate-500">{m.role}</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold text-slate-600 bg-white border px-1.5 py-0.5 rounded">
                    {m.department}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-2xl border border-emerald-200 shadow-xs space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-emerald-950 text-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> IPR & Prior-Art Assistant
            </div>
            <p className="text-[10px] text-slate-600 leading-normal">
              Patent database checked: No conflicting active patent for bamboo-composite PCM cooling. Qualifies for Jharkhand State Patent Filing Grant (100% reimbursed).
            </p>
            <div className="flex items-center justify-between pt-1 text-[10px] font-bold text-emerald-800">
              <span>National IPR Policy Aligned</span>
              <span className="underline cursor-pointer">Draft Provisional Claim →</span>
            </div>
          </div>
        </aside>

        {/* Right Main Column: Capstone Overview & NEP Milestones */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-cyan-100 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold mb-2">
                  <span className="bg-slate-100 px-2.5 py-0.5 rounded-md font-bold text-slate-700">
                    🌾 {currentProject.sector}
                  </span>
                  <span className="bg-rose-50 text-rose-700 border border-rose-200 font-bold px-2 py-0.5 rounded-md">
                    Severity: {currentProject.severity}/10
                  </span>
                  <span className="bg-cyan-50 text-cyan-800 border border-cyan-200 font-bold px-2 py-0.5 rounded-md">
                    📍 {currentProject.district} District
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {currentProject.title}
                </h2>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-100 border border-emerald-300 px-4 py-2.5 rounded-2xl text-center shrink-0 shadow-xs">
                <div className="text-base font-black text-emerald-800">
                  {currentProject.academicCredits} CREDITS
                </div>
                <div className="text-[9px] font-extrabold text-emerald-950 uppercase tracking-wider">
                  NHEQF Level {currentProject.nheqfLevel}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-cyan-50/60 p-3.5 rounded-2xl border border-cyan-100/80 leading-relaxed">
              {currentProject.problemSummary}
            </p>

            <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center text-emerald-400">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-white flex items-center gap-1.5">
                    <span>Corporate CSR Sponsor: {currentProject.sponsorName}</span>
                    <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] px-2 py-0.5 rounded-full font-bold">
                      Sec. 135 Escrow
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Pledged Escrow: <span className="text-white font-bold">₹{currentProject.escrowTotal.toLocaleString("en-IN")}</span> • Unlocked: <span className="text-emerald-400 font-bold">₹{currentProject.escrowReleased.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/csr"
                className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1 shrink-0"
              >
                View in CSR Portal <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-cyan-100 shadow-md space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-cyan-600" /> NEP 2020 Milestone State-Machine
                </h3>
                <p className="text-[11px] text-slate-500">4-Phase structured experiential capstone progression</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-cyan-800">{progressPercent}% Completed</span>
                <div className="w-24 h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-500" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              {currentProject.milestones.map((m) => {
                return (
                  <div
                    key={m.phase}
                    className={`p-4 rounded-2xl border transition ${
                      m.isCompleted
                        ? "bg-emerald-50/70 border-emerald-200"
                        : "bg-white border-slate-200 shadow-xs"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                          m.isCompleted ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"
                        }`}>
                          {m.isCompleted ? "✓" : m.phase}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-xs">
                            Phase {m.phase}: {m.title}
                          </h4>
                          <span className="text-[10px] text-slate-500">{m.objective}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <span className="text-[10px] font-bold bg-white border border-slate-200 text-slate-700 px-2 py-1 rounded-lg">
                          Grant: ₹{m.payoutAmount.toLocaleString("en-IN")}
                        </span>
                        {m.isCompleted ? (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Faculty Approved
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleVerify(m.phase)}
                            disabled={uploadingMilestone === m.phase}
                            className="text-[10px] font-bold text-white bg-cyan-600 hover:bg-cyan-500 px-3 py-1.5 rounded-xl shadow-xs transition flex items-center gap-1 cursor-pointer disabled:opacity-50"
                          >
                            <Upload className="w-3 h-3" />
                            <span>{uploadingMilestone === m.phase ? "Signing..." : "Upload Lab Test & Verify"}</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-500">
                      <div className="flex items-center gap-1 font-mono">
                        <FileText className="w-3 h-3 text-slate-400" /> Deliverable: {m.deliverableName}
                      </div>
                      <div className="flex items-center gap-3">
                        <span>Escrow Status: {m.isEscrowReleased ? "✅ Disbursed to College Cell" : "🔒 Pledged in Smart Escrow"}</span>
                        {m.completedDate && <span className="font-semibold text-slate-700">Signed: {m.completedDate}</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* NEP 2020 Credit Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-emerald-200 shadow-2xl relative space-y-5 animate-scaleUp">
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-1 border-b border-emerald-100 pb-4">
              <div className="inline-block bg-emerald-50 text-emerald-800 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200 mb-1">
                National Education Policy (NEP) 2020
              </div>
              <h3 className="text-lg font-black text-slate-900">
                Academic Bank of Credits (ABC) Transfer Certificate
              </h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Dept. of Higher & Technical Education, Government of Jharkhand
              </p>
            </div>

            <div className="bg-gradient-to-b from-emerald-50/50 to-teal-50/30 p-5 rounded-2xl border border-emerald-100 space-y-4 text-xs">
              <p className="text-slate-700 leading-relaxed text-center italic">
                This is to certify that the student innovation team at <span className="font-bold text-slate-900">{currentProject.institution}</span> has successfully achieved experiential R&D milestone deliverables for societal challenge:
              </p>

              <div className="bg-white p-3.5 rounded-xl border border-emerald-200 shadow-xs text-center space-y-1">
                <div className="text-sm font-black text-emerald-800">{currentProject.title}</div>
                <div className="text-[10px] font-bold text-slate-500">
                  Target District: {currentProject.district} • Capstone ID: {currentProject.ticketId}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Lead Student</span>
                  <span className="font-bold text-slate-800">{currentProject.leadStudent}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">NHEQF Qualification Level</span>
                  <span className="font-bold text-slate-800">Level {currentProject.nheqfLevel} (4 Academic Credits)</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-emerald-100 text-[10px] text-slate-600">
                <div>
                  <div className="font-bold text-slate-900">Dr. A. K. Roy</div>
                  <div>Dean (R&D), Faculty Mentor</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-emerald-700">ABC-JH-2026-NHEQF-0941</div>
                  <div className="text-[9px] text-slate-400">Digitally Verified & Linked</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCertificate(false)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2 rounded-xl shadow-xs transition"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Collaborator Modal */}
      {showAddMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-cyan-100 shadow-2xl relative space-y-4">
            <button
              onClick={() => setShowAddMember(false)}
              className="absolute top-4 right-4 p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-600" /> Invite Cross-Branch Collaborator
            </h3>
            <p className="text-xs text-slate-500">Assemble multidisciplinary engineering skillsets for NEP credit sharing.</p>

            <form onSubmit={handleAddCollaborator} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Student Name</label>
                <input
                  type="text"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="e.g. Ankit Verma"
                  required
                  className="w-full bg-slate-50 border rounded-xl px-3 py-2 font-semibold text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Role in Prototype</label>
                <input
                  type="text"
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value)}
                  placeholder="e.g. Embedded Firmware & IoT"
                  required
                  className="w-full bg-slate-50 border rounded-xl px-3 py-2 font-semibold text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Branch / Department</label>
                <select
                  value={newMemberDept}
                  onChange={(e) => setNewMemberDept(e.target.value)}
                  className="w-full bg-slate-50 border rounded-xl px-3 py-2 font-semibold text-slate-800"
                >
                  <option>Computer Science & Engineering</option>
                  <option>Biotechnology & Bioinformatics</option>
                  <option>Electrical & Electronics Eng.</option>
                  <option>Civil & Environmental Eng.</option>
                  <option>Chemical Engineering</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2.5 rounded-xl shadow-xs transition"
              >
                Add Collaborator to Squad
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
