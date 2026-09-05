export type SectorType = 
  | "Water & Sanitation"
  | "Agriculture & MFP"
  | "Rural Energy"
  | "Primary Health"
  | "Clean Environment & Mining"
  | "Vernacular Education & Assistive Tech";

export type ProjectStage = 
  | "Phase 1: Design & Literature"
  | "Phase 2: Simulation & CAD"
  | "Phase 3: MVP Prototype"
  | "Phase 4: Field Pilot Deployed";

export interface TicketTimelineStep {
  title: string;
  status: "completed" | "current" | "upcoming";
  timestamp?: string;
  detail: string;
}

export interface ProblemTicket {
  id: string;
  title: string;
  description: string;
  district: string;
  village: string;
  sector: SectorType;
  severity: number; // e.g. 8.9 / 10
  submittedAt: string;
  mukhiyaEndorsed: boolean;
  gpsCoords: { lat: number; lng: number };
  photoUrl?: string;
  status: "Submitted" | "Verified" | "Assigned" | "In R&D" | "Pilot Deployed";
  assignedHEI?: string;
  leadFaculty?: string;
  currentPhase: number; // 1 to 4
  timeline: TicketTimelineStep[];
}

export interface Milestone {
  phase: number;
  title: string;
  objective: string;
  deliverableName: string;
  isCompleted: boolean;
  isVerifiedByFaculty: boolean;
  isEscrowReleased: boolean;
  payoutAmount: number; // in INR
  completedDate?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  department: string;
  avatarBg?: string;
}

export interface CapstoneProject {
  id: string;
  ticketId: string;
  title: string;
  district: string;
  sector: SectorType;
  institution: string;
  department: string;
  leadStudent: string;
  academicCredits: number;
  nheqfLevel: number;
  severity: number;
  problemSummary: string;
  sponsorName: string;
  escrowTotal: number;
  escrowReleased: number;
  teamMembers: TeamMember[];
  milestones: Milestone[];
}

export interface CorporateSponsor {
  id: string;
  name: string;
  shortName: string;
  committedFunds: number;
  escrowLocked: number;
  disbursedFunds: number;
  auditedPercentage: number;
  activeProjectsCount: number;
}

export interface DistrictGISData {
  id: string;
  name: string;
  hindiName: string;
  problemCount: number;
  activePilots: number;
  solvedCount: number;
  prioritySector: SectorType;
  coordinates: { x: number; y: number }; // Relative SVG % coordinates
  lat: number;
  lng: number;
  highlightCase?: string;
}

export interface InstitutionRanking {
  rank: number;
  name: string;
  type: "Tier-1 University" | "National Institute" | "Govt. Polytechnic";
  pilotsDeployed: number;
  activeProjects: number;
  csrRaised: string;
  naacGrade: string;
}
