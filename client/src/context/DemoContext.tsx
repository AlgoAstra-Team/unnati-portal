"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  ProblemTicket, 
  CapstoneProject, 
  CorporateSponsor, 
  DistrictGISData, 
  SectorType, 
  TeamMember 
} from "@/types";
import { 
  INITIAL_TICKETS, 
  INITIAL_PROJECTS, 
  CORPORATE_SPONSORS, 
  JHARKHAND_DISTRICTS 
} from "@/lib/data";

interface DemoContextType {
  tickets: ProblemTicket[];
  projects: CapstoneProject[];
  sponsors: CorporateSponsor[];
  districts: DistrictGISData[];
  activeSponsorId: string;
  selectedProjectId: string;
  selectedDistrictId: string | null;
  setActiveSponsorId: (id: string) => void;
  setSelectedProjectId: (id: string) => void;
  setSelectedDistrictId: (id: string | null) => void;
  submitTicket: (data: {
    title: string;
    description: string;
    district: string;
    village: string;
    sector: SectorType;
    mukhiyaEndorsed: boolean;
    gpsCoords?: { lat: number; lng: number };
  }) => ProblemTicket;
  verifyMilestone: (projectId: string, phase: number) => void;
  releaseMilestoneEscrow: (projectId: string, phase: number) => void;
  addTeamMember: (projectId: string, member: TeamMember) => void;
  getTicketById: (id: string) => ProblemTicket | undefined;
  resetDemoData: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

const STORAGE_KEY = "unnati_portal_demo_state_v1";

export function DemoProvider({ children }: { children: React.ReactNode }) {
  // Consistent in-memory initial state for both SSR and client to prevent hydration mismatches
  const [tickets, setTickets] = useState<ProblemTicket[]>(INITIAL_TICKETS);
  const [projects, setProjects] = useState<CapstoneProject[]>(INITIAL_PROJECTS);
  const [sponsors, setSponsors] = useState<CorporateSponsor[]>(CORPORATE_SPONSORS);
  const [districts, setDistricts] = useState<DistrictGISData[]>(JHARKHAND_DISTRICTS);
  const [activeSponsorId, setActiveSponsorId] = useState<string>("tata-steel");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("proj-khunti-01");
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>("khunti");

  // Clean any stale localStorage key on client mount
  useEffect(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  const submitTicket = (data: {
    title: string;
    description: string;
    district: string;
    village: string;
    sector: SectorType;
    mukhiyaEndorsed: boolean;
    gpsCoords?: { lat: number; lng: number };
  }): ProblemTicket => {
    const districtSlug = data.district.slice(0, 2).toUpperCase();
    const randomNum = Math.floor(100 + Math.random() * 900);
    const newId = `JH-2026-${districtSlug}-${randomNum}`;
    
    let assignedHEI = "BIT Mesra (R&D Cell)";
    if (data.sector === "Water & Sanitation") assignedHEI = "NIT Jamshedpur (Chemical Eng.)";
    else if (data.sector === "Clean Environment & Mining") assignedHEI = "IIT (ISM) Dhanbad (Mining & Env.)";
    else if (data.sector === "Agriculture & MFP") assignedHEI = "Birsa Agricultural University + BIT Mesra";
    else if (data.sector === "Primary Health") assignedHEI = "RIMS Ranchi + IIIT Ranchi (Biomedical)";

    const newTicket: ProblemTicket = {
      id: newId,
      title: data.title,
      description: data.description,
      district: data.district,
      village: data.village || "Panchayat Core Cluster",
      sector: data.sector,
      severity: 8.5,
      submittedAt: new Date().toISOString().split("T")[0],
      mukhiyaEndorsed: data.mukhiyaEndorsed,
      gpsCoords: data.gpsCoords || { lat: 23.3441, lng: 85.3096 },
      status: "Verified",
      assignedHEI,
      leadFaculty: "Assigned Nodal Faculty",
      currentPhase: 1,
      timeline: [
        { 
          title: "Ticket Submitted & Geotagged", 
          status: "completed", 
          timestamp: "Just Now", 
          detail: data.mukhiyaEndorsed ? "Verified by Gram Mukhiya with live camera EXIF validation." : "Submitted via Citizen Web PWA." 
        },
        { 
          title: "Institutional Matching", 
          status: "completed", 
          timestamp: "Auto-Triaged", 
          detail: `Matched to ${assignedHEI} based on departmental lab facilities.` 
        },
        { 
          title: "Phase 1: Student Capstone Formulation", 
          status: "current", 
          detail: "Listed in University R&D problem pool for student-faculty team claiming." 
        },
        { 
          title: "Phase 2: Simulation & Lab CAD Testing", 
          status: "upcoming", 
          detail: "Lab testing and faculty mentor sign-off." 
        },
        { 
          title: "Phase 3: Prototype & CSR Escrow", 
          status: "upcoming", 
          detail: "Prototype development with corporate grant support." 
        },
        { 
          title: "Phase 4: Field Pilot Deployed", 
          status: "upcoming", 
          detail: "Deployment in affected village cluster." 
        }
      ]
    };

    setTickets(prev => [newTicket, ...prev]);

    setDistricts(prev => prev.map(d => {
      if (d.name.toLowerCase() === data.district.toLowerCase()) {
        return { ...d, problemCount: d.problemCount + 1 };
      }
      return d;
    }));

    return newTicket;
  };

  const verifyMilestone = (projectId: string, phase: number) => {
    setProjects(prev => prev.map(proj => {
      if (proj.id !== projectId) return proj;
      const updatedMilestones = proj.milestones.map(m => {
        if (m.phase === phase) {
          return {
            ...m,
            isCompleted: true,
            isVerifiedByFaculty: true,
            completedDate: "Verified"
          };
        }
        return m;
      });
      return { ...proj, milestones: updatedMilestones };
    }));

    const project = projects.find(p => p.id === projectId);
    if (project) {
      setTickets(prev => prev.map(t => {
        if (t.id === project.ticketId) {
          return {
            ...t,
            currentPhase: Math.min(4, phase + 1),
            status: phase >= 3 ? "In R&D" : t.status
          };
        }
        return t;
      }));
    }
  };

  const releaseMilestoneEscrow = (projectId: string, phase: number) => {
    let releasedAmount = 0;
    setProjects(prev => prev.map(proj => {
      if (proj.id !== projectId) return proj;
      const updatedMilestones = proj.milestones.map(m => {
        if (m.phase === phase && !m.isEscrowReleased) {
          releasedAmount = m.payoutAmount;
          return { ...m, isEscrowReleased: true };
        }
        return m;
      });
      return {
        ...proj,
        escrowReleased: proj.escrowReleased + releasedAmount,
        milestones: updatedMilestones
      };
    }));

    if (releasedAmount > 0) {
      setSponsors(prev => prev.map(s => {
        if (s.id === activeSponsorId) {
          return {
            ...s,
            escrowLocked: Math.max(0, s.escrowLocked - releasedAmount),
            disbursedFunds: s.disbursedFunds + releasedAmount
          };
        }
        return s;
      }));
    }
  };

  const addTeamMember = (projectId: string, member: TeamMember) => {
    setProjects(prev => prev.map(proj => {
      if (proj.id === projectId) {
        return {
          ...proj,
          teamMembers: [...proj.teamMembers, member]
        };
      }
      return proj;
    }));
  };

  const getTicketById = (id: string): ProblemTicket | undefined => {
    const clean = id.trim().toUpperCase();
    return tickets.find(t => t.id.toUpperCase() === clean);
  };

  const resetDemoData = () => {
    setTickets(INITIAL_TICKETS);
    setProjects(INITIAL_PROJECTS);
    setSponsors(CORPORATE_SPONSORS);
    setDistricts(JHARKHAND_DISTRICTS);
    setSelectedProjectId("proj-khunti-01");
    setSelectedDistrictId("khunti");
  };

  return (
    <DemoContext.Provider
      value={{
        tickets,
        projects,
        sponsors,
        districts,
        activeSponsorId,
        selectedProjectId,
        selectedDistrictId,
        setActiveSponsorId,
        setSelectedProjectId,
        setSelectedDistrictId,
        submitTicket,
        verifyMilestone,
        releaseMilestoneEscrow,
        addTeamMember,
        getTicketById,
        resetDemoData
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemo must be used within a DemoProvider");
  }
  return context;
}
