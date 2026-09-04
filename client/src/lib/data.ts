import { ProblemTicket, CapstoneProject, CorporateSponsor, DistrictGISData, InstitutionRanking } from "@/types";

export const JHARKHAND_DISTRICTS: DistrictGISData[] = [
  { id: "ranchi", name: "Ranchi", hindiName: "राँची", problemCount: 142, activePilots: 6, solvedCount: 12, prioritySector: "Agriculture & MFP", coordinates: { x: 50, y: 56 }, lat: 23.3441, lng: 85.3096, highlightCase: "Birsa Agri Univ & BIT Mesra Hub" },
  { id: "khunti", name: "Khunti", hindiName: "खूंटी", problemCount: 88, activePilots: 4, solvedCount: 9, prioritySector: "Agriculture & MFP", coordinates: { x: 48, y: 66 }, lat: 23.0725, lng: 85.2798, highlightCase: "Lac & Perishable Cold Chain (BIT Mesra)" },
  { id: "palamu", name: "Palamu", hindiName: "पलामू", problemCount: 114, activePilots: 5, solvedCount: 8, prioritySector: "Water & Sanitation", coordinates: { x: 22, y: 35 }, lat: 24.0385, lng: 84.0715, highlightCase: "Fluoride Nano-Adsorbent Filter (NIT Jamshedpur)" },
  { id: "dhanbad", name: "Dhanbad", hindiName: "धनबाद", problemCount: 135, activePilots: 4, solvedCount: 11, prioritySector: "Clean Environment & Mining", coordinates: { x: 74, y: 48 }, lat: 23.7957, lng: 86.4304, highlightCase: "Organic Fly-Ash Dust Suppressant (IIT-ISM Dhanbad)" },
  { id: "east-singhbhum", name: "East Singhbhum", hindiName: "पूर्वी सिंहभूम", problemCount: 96, activePilots: 4, solvedCount: 7, prioritySector: "Primary Health", coordinates: { x: 78, y: 78 }, lat: 22.8046, lng: 86.2029, highlightCase: "Tata Steel Foundation CSR Core Corridor" },
  { id: "west-singhbhum", name: "West Singhbhum", hindiName: "पश्चिमी सिंहभूम", problemCount: 102, activePilots: 3, solvedCount: 6, prioritySector: "Vernacular Education & Assistive Tech", coordinates: { x: 56, y: 82 }, lat: 22.5528, lng: 85.8083 },
  { id: "bokaro", name: "Bokaro", hindiName: "बोकारो", problemCount: 89, activePilots: 3, solvedCount: 8, prioritySector: "Clean Environment & Mining", coordinates: { x: 67, y: 46 }, lat: 23.6693, lng: 86.1511 },
  { id: "hazaribagh", name: "Hazaribagh", hindiName: "हज़ारीबाग", problemCount: 76, activePilots: 2, solvedCount: 5, prioritySector: "Rural Energy", coordinates: { x: 45, y: 38 }, lat: 23.9925, lng: 85.3637 },
  { id: "garhwa", name: "Garhwa", hindiName: "गढ़वा", problemCount: 68, activePilots: 2, solvedCount: 4, prioritySector: "Water & Sanitation", coordinates: { x: 12, y: 28 }, lat: 24.1610, lng: 83.8118 },
  { id: "chatra", name: "Chatra", hindiName: "चतरा", problemCount: 54, activePilots: 1, solvedCount: 3, prioritySector: "Rural Energy", coordinates: { x: 33, y: 30 }, lat: 24.2144, lng: 84.8714 },
  { id: "koderma", name: "Koderma", hindiName: "कोडरमा", problemCount: 47, activePilots: 2, solvedCount: 4, prioritySector: "Water & Sanitation", coordinates: { x: 54, y: 28 }, lat: 24.4674, lng: 85.5939 },
  { id: "giridih", name: "Giridih", hindiName: "गिरिडीह", problemCount: 82, activePilots: 3, solvedCount: 5, prioritySector: "Clean Environment & Mining", coordinates: { x: 68, y: 33 }, lat: 24.1856, lng: 86.3087 },
  { id: "deoghar", name: "Deoghar", hindiName: "देवघर", problemCount: 61, activePilots: 2, solvedCount: 4, prioritySector: "Primary Health", coordinates: { x: 78, y: 30 }, lat: 24.4826, lng: 86.7000 },
  { id: "dumka", name: "Dumka", hindiName: "दुमका", problemCount: 73, activePilots: 2, solvedCount: 5, prioritySector: "Vernacular Education & Assistive Tech", coordinates: { x: 88, y: 34 }, lat: 24.2676, lng: 87.2483 },
  { id: "godda", name: "Godda", hindiName: "गोड्डा", problemCount: 45, activePilots: 1, solvedCount: 3, prioritySector: "Agriculture & MFP", coordinates: { x: 92, y: 23 }, lat: 24.8267, lng: 87.2141 },
  { id: "sahibganj", name: "Sahibganj", hindiName: "साहिबगंज", problemCount: 52, activePilots: 1, solvedCount: 3, prioritySector: "Water & Sanitation", coordinates: { x: 95, y: 15 }, lat: 25.2425, lng: 87.6433 },
  { id: "pakur", name: "Pakur", hindiName: "पाकुड़", problemCount: 41, activePilots: 1, solvedCount: 2, prioritySector: "Primary Health", coordinates: { x: 94, y: 35 }, lat: 24.6330, lng: 87.8492 },
  { id: "jamtara", name: "Jamtara", hindiName: "जामताड़ा", problemCount: 38, activePilots: 1, solvedCount: 3, prioritySector: "Vernacular Education & Assistive Tech", coordinates: { x: 82, y: 44 }, lat: 23.9629, lng: 86.8029 },
  { id: "ramgarh", name: "Ramgarh", hindiName: "रामगढ़", problemCount: 64, activePilots: 2, solvedCount: 6, prioritySector: "Clean Environment & Mining", coordinates: { x: 55, y: 50 }, lat: 23.6292, lng: 85.5132 },
  { id: "lohardaga", name: "Lohardaga", hindiName: "लोहरदगा", problemCount: 39, activePilots: 1, solvedCount: 3, prioritySector: "Agriculture & MFP", coordinates: { x: 38, y: 55 }, lat: 23.4357, lng: 84.6789 },
  { id: "gumla", name: "Gumla", hindiName: "गुमला", problemCount: 58, activePilots: 2, solvedCount: 4, prioritySector: "Rural Energy", coordinates: { x: 33, y: 66 }, lat: 23.0435, lng: 84.5422 },
  { id: "simdega", name: "Simdega", hindiName: "सिमडेगा", problemCount: 42, activePilots: 1, solvedCount: 2, prioritySector: "Primary Health", coordinates: { x: 32, y: 80 }, lat: 22.6148, lng: 84.5097 },
  { id: "latehar", name: "Latehar", hindiName: "लातेहार", problemCount: 53, activePilots: 2, solvedCount: 3, prioritySector: "Rural Energy", coordinates: { x: 30, y: 45 }, lat: 23.7438, lng: 84.4983 },
  { id: "seraikela-kharsawan", name: "Seraikela-Kharsawan", hindiName: "सरायकेला-खरसावां", problemCount: 62, activePilots: 2, solvedCount: 5, prioritySector: "Clean Environment & Mining", coordinates: { x: 67, y: 72 }, lat: 22.7006, lng: 85.9298 }
];

export const INITIAL_TICKETS: ProblemTicket[] = [
  {
    id: "JH-2026-AG-09",
    title: "Severe Post-Harvest Spoilage of Perishable Lac & Vegetables",
    description: "Tribal farmers in Khunti face 40% post-harvest loss in perishable Mahua and Lac transit due to ambient heat and absence of affordable decentralized cold storage.",
    district: "Khunti",
    village: "Torpa Block, Murhu",
    sector: "Agriculture & MFP",
    severity: 8.9,
    submittedAt: "2026-08-12",
    mukhiyaEndorsed: true,
    gpsCoords: { lat: 23.0725, lng: 85.2798 },
    status: "In R&D",
    assignedHEI: "BIT Mesra (Mechanical & Agri Eng.)",
    leadFaculty: "Dr. A. K. Roy",
    currentPhase: 2,
    timeline: [
      { title: "Ticket Submitted & Geotagged", status: "completed", timestamp: "12 Aug, 10:15 AM", detail: "Gram Mukhiya authenticated via mobile OTP with live camera capture." },
      { title: "AI Triage & Categorization", status: "completed", timestamp: "12 Aug, 10:18 AM", detail: "Mapped to Agriculture & MFP sector with 94.2% confidence." },
      { title: "Assigned to Higher Education Institution", status: "completed", timestamp: "14 Aug, 02:30 PM", detail: "Matched to BIT Mesra based on cold storage fabrication lab capabilities." },
      { title: "Phase 2 Lab CAD Simulation Testing", status: "current", timestamp: "In Progress", detail: "Phase-change material evaporative cooling crate verified in thermal chamber." },
      { title: "Phase 3 MVP Physical Fabrication", status: "upcoming", detail: "Bamboo-composite crate assembly and local SHG trials." },
      { title: "Phase 4 Field Pilot Deployed", status: "upcoming", detail: "Distribution of 50 units in Khunti Torpa mandi with NABARD/CSR support." }
    ]
  },
  {
    id: "JH-2026-PA-881",
    title: "Excessive Fluoride & Arsenic Contamination in Tube Wells",
    description: "Groundwater fluoride levels exceeding 3.5 mg/L in 42 community hand-pumps across Medininagar and Satbarwa, causing endemic skeletal fluorosis in children.",
    district: "Palamu",
    village: "Satbarwa Gram Panchayat",
    sector: "Water & Sanitation",
    severity: 9.4,
    submittedAt: "2026-08-18",
    mukhiyaEndorsed: true,
    gpsCoords: { lat: 24.0385, lng: 84.0715 },
    status: "In R&D",
    assignedHEI: "NIT Jamshedpur (Chemical Engineering)",
    leadFaculty: "Prof. S. Soren",
    currentPhase: 2,
    timeline: [
      { title: "Ticket Submitted & Geotagged", status: "completed", timestamp: "18 Aug, 09:20 AM", detail: "Assisted reporting by PRI Ward Councillor with water sample photos." },
      { title: "AI Triage & Deduplication", status: "completed", timestamp: "18 Aug, 09:22 AM", detail: "Clustered with 3 adjacent village reports within 12km radius." },
      { title: "Assigned to Higher Education Institution", status: "completed", timestamp: "19 Aug, 11:00 AM", detail: "Matched to NIT Jamshedpur Department of Chemical Engineering." },
      { title: "Phase 2 Lab Synthesis & Adsorption Testing", status: "current", timestamp: "In Progress", detail: "Hydroxyapatite-biochar composite cartridge lab testing shows 89% fluoride reduction." },
      { title: "Phase 3 Hand-Pump Retrofit Prototype", status: "upcoming", detail: "Manufacturing low-cost ₹250 cartridge retrofit for Mark-II hand-pumps." },
      { title: "Phase 4 Village Field Deployment", status: "upcoming", detail: "Installation across 40 borewells funded by Tata Steel CSR Escrow." }
    ]
  },
  {
    id: "JH-2026-DH-104",
    title: "Heavy Coal Dust Runoff Clogging Soil Pores & Air Pollution",
    description: "Open coal transport corridors generating toxic particulate matter (PM10 and PM2.5) that pollutes agricultural soil and causes acute respiratory problems in surrounding villages.",
    district: "Dhanbad",
    village: "Jharia Coal Belt, Katras",
    sector: "Clean Environment & Mining",
    severity: 8.7,
    submittedAt: "2026-08-25",
    mukhiyaEndorsed: true,
    gpsCoords: { lat: 23.7957, lng: 86.4304 },
    status: "In R&D",
    assignedHEI: "IIT (ISM) Dhanbad + BIT Sindri",
    leadFaculty: "Dr. R. Mishra",
    currentPhase: 1,
    timeline: [
      { title: "Ticket Submitted & Geotagged", status: "completed", timestamp: "25 Aug, 04:10 PM", detail: "Local SHG federated submission with air monitor readings." },
      { title: "AI Triage & Categorization", status: "completed", timestamp: "25 Aug, 04:12 PM", detail: "High priority mining environmental remediation cluster." },
      { title: "Assigned to Higher Education Institution", status: "completed", timestamp: "27 Aug, 01:45 PM", detail: "Jointly assigned to IIT (ISM) Dhanbad and BIT Sindri." },
      { title: "Phase 1 Formulation & Bio-Polymer Testing", status: "current", timestamp: "In Progress", detail: "Testing fly-ash bio-polymer dust suppressant formulation in wind tunnel." },
      { title: "Phase 2 Automated Misting Cannon Design", status: "upcoming", detail: "Solar-powered roadside misting cannon nozzle optimization." },
      { title: "Phase 4 Corridor Pilot Deployment", status: "upcoming", detail: "Demonstration along BCCL transport corridor in Katras." }
    ]
  }
];

export const INITIAL_PROJECTS: CapstoneProject[] = [
  {
    id: "proj-khunti-01",
    ticketId: "JH-2026-AG-09",
    title: "Decentralized Solar-Biomass Hybrid Cold Storage Crate",
    district: "Khunti",
    sector: "Agriculture & MFP",
    institution: "BIT Mesra",
    department: "Mechanical & Agricultural Engineering",
    leadStudent: "Rahul Kumar (Final Year)",
    academicCredits: 4,
    nheqfLevel: 7,
    severity: 8.9,
    problemSummary: "Tribal farmers in Khunti face 40% post-harvest loss in perishable Mahua and Lac transit due to ambient heat.",
    sponsorName: "Tata Steel Foundation",
    escrowTotal: 150000,
    escrowReleased: 50000,
    teamMembers: [
      { name: "Rahul Kumar", role: "Team Lead (Mechanical)", department: "Mech. Eng.", avatarBg: "bg-cyan-600" },
      { name: "Sneha Kumari", role: "Thermal & IoT Sensor Systems", department: "ECE", avatarBg: "bg-teal-600" },
      { name: "Amit Murmu", role: "Biomass Composite Fabrication", department: "Chemical & Materials", avatarBg: "bg-emerald-600" },
      { name: "Dr. A. K. Roy", role: "Faculty Mentor & PI", department: "Dean (R&D), BIT Mesra", avatarBg: "bg-slate-700" }
    ],
    milestones: [
      {
        phase: 1,
        title: "Literature Review, Heat Flux Calculations & CAD",
        objective: "Simulate temperature insulation and phase change material (PCM) gel packs within bamboo frame.",
        deliverableName: "CAD_Thermal_Report_v1.pdf",
        isCompleted: true,
        isVerifiedByFaculty: true,
        isEscrowReleased: true,
        payoutAmount: 50000,
        completedDate: "18 Aug 2026"
      },
      {
        phase: 2,
        title: "Lab Simulation, Sensor Telemetry & PCM Synthesis",
        objective: "Verify 12-hour temperature retention under 42°C ambient conditions in environmental chamber.",
        deliverableName: "Chamber_Lab_Validation_Signed.pdf",
        isCompleted: true,
        isVerifiedByFaculty: true,
        isEscrowReleased: false,
        payoutAmount: 50000,
        completedDate: "02 Sep 2026"
      },
      {
        phase: 3,
        title: "MVP Working Prototype Fabrication & SHG Trials",
        objective: "Fabricate 5 physical hybrid crates utilizing local bamboo craft and run 10-day field transit trials.",
        deliverableName: "Prototype_Field_Test_Logs.pdf",
        isCompleted: false,
        isVerifiedByFaculty: false,
        isEscrowReleased: false,
        payoutAmount: 30000
      },
      {
        phase: 4,
        title: "Field Deployment & Impact Telemetry Handover",
        objective: "Deliver verified units to Khunti Torpa SHG cluster and publish open fabrication blueprints.",
        deliverableName: "District_Handover_Endorsement.pdf",
        isCompleted: false,
        isVerifiedByFaculty: false,
        isEscrowReleased: false,
        payoutAmount: 20000
      }
    ]
  },
  {
    id: "proj-palamu-02",
    ticketId: "JH-2026-PA-881",
    title: "Low-Cost Nano-Adsorbent Cartridge for Community Borewells",
    district: "Palamu",
    sector: "Water & Sanitation",
    institution: "NIT Jamshedpur",
    department: "Chemical Engineering",
    leadStudent: "Priya Sharma (Final Year)",
    academicCredits: 4,
    nheqfLevel: 7,
    severity: 9.4,
    problemSummary: "Fluoride levels exceeding 3.5 mg/L in 42 village hand-pumps causing endemic skeletal fluorosis.",
    sponsorName: "Tata Steel Foundation",
    escrowTotal: 200000,
    escrowReleased: 60000,
    teamMembers: [
      { name: "Priya Sharma", role: "Team Lead (Chemical)", department: "Chem. Eng.", avatarBg: "bg-teal-600" },
      { name: "Vikas Soren", role: "Materials Synthesizer", department: "Metallurgy", avatarBg: "bg-emerald-600" },
      { name: "Prof. S. Soren", role: "Faculty Mentor", department: "Chemical Eng, NIT Jamshedpur", avatarBg: "bg-slate-700" }
    ],
    milestones: [
      {
        phase: 1,
        title: "Water Chemistry Analysis & Media Formulation",
        objective: "Synthesize activated alumina + hydroxyapatite hybrid porous filtration medium.",
        deliverableName: "Filtration_Medium_Synthesis.pdf",
        isCompleted: true,
        isVerifiedByFaculty: true,
        isEscrowReleased: true,
        payoutAmount: 60000,
        completedDate: "20 Aug 2026"
      },
      {
        phase: 2,
        title: "Gravity Flow Column Filtration Lab Testing",
        objective: "Achieve fluoride drop from 3.5 mg/L to below 0.8 mg/L under 500 liters continuous flow.",
        deliverableName: "Spectrophotometer_Lab_Report.pdf",
        isCompleted: false,
        isVerifiedByFaculty: false,
        isEscrowReleased: false,
        payoutAmount: 70000
      },
      {
        phase: 3,
        title: "Standard Hand-Pump Collar Retrofit Fabrication",
        objective: "Manufacture injection-molded housing costing under ₹250 for village installation.",
        deliverableName: "Collar_Fabrication_Specs.pdf",
        isCompleted: false,
        isVerifiedByFaculty: false,
        isEscrowReleased: false,
        payoutAmount: 40000
      },
      {
        phase: 4,
        title: "Installation & IoT Water Quality Telemetry in Palamu",
        objective: "Deploy across 40 hand-pumps in Satbarwa with community water quality dashboard.",
        deliverableName: "Palamu_Field_Deployment_Signed.pdf",
        isCompleted: false,
        isVerifiedByFaculty: false,
        isEscrowReleased: false,
        payoutAmount: 30000
      }
    ]
  }
];

export const CORPORATE_SPONSORS: CorporateSponsor[] = [
  {
    id: "tata-steel",
    name: "Tata Steel Foundation",
    shortName: "Tata Steel",
    committedFunds: 4850000,
    escrowLocked: 2900000,
    disbursedFunds: 1950000,
    auditedPercentage: 100,
    activeProjectsCount: 14
  },
  {
    id: "bccl",
    name: "Bharat Coking Coal Limited (BCCL)",
    shortName: "BCCL",
    committedFunds: 3200000,
    escrowLocked: 2100000,
    disbursedFunds: 1100000,
    auditedPercentage: 100,
    activeProjectsCount: 8
  },
  {
    id: "sail",
    name: "Steel Authority of India (SAIL - Bokaro)",
    shortName: "SAIL",
    committedFunds: 2500000,
    escrowLocked: 1600000,
    disbursedFunds: 900000,
    auditedPercentage: 100,
    activeProjectsCount: 6
  }
];

export const INSTITUTION_RANKINGS: InstitutionRanking[] = [
  { rank: 1, name: "BIT Mesra, Ranchi", type: "Tier-1 University", pilotsDeployed: 14, activeProjects: 28, csrRaised: "₹ 18.5 L", naacGrade: "A+" },
  { rank: 2, name: "NIT Jamshedpur", type: "National Institute", pilotsDeployed: 11, activeProjects: 22, csrRaised: "₹ 14.0 L", naacGrade: "A" },
  { rank: 3, name: "IIT (ISM) Dhanbad", type: "National Institute", pilotsDeployed: 7, activeProjects: 18, csrRaised: "₹ 16.0 L", naacGrade: "A++" },
  { rank: 4, name: "Birsa Agricultural University", type: "Tier-1 University", pilotsDeployed: 8, activeProjects: 15, csrRaised: "₹ 9.5 L", naacGrade: "A" },
  { rank: 5, name: "IIIT Ranchi", type: "National Institute", pilotsDeployed: 5, activeProjects: 12, csrRaised: "₹ 6.2 L", naacGrade: "B++" },
  { rank: 6, name: "Govt. Polytechnic, Khunti", type: "Govt. Polytechnic", pilotsDeployed: 4, activeProjects: 9, csrRaised: "₹ 3.8 L", naacGrade: "B+" }
];

export const DIALECT_SAMPLES: Record<string, { label: string; text: string; audioDuration: string }> = {
  hindi: {
    label: "हिंदी (Hindi)",
    text: "पलामू और गढ़वा जिले के 42 से अधिक ग्रामीण चापाकलों में फ्लोराइड की मात्रा 3.5 mg/L से अधिक हो गई है। बच्चे और बुजुर्ग जोड़ों के दर्द और दांतों के क्षरण से जूझ रहे हैं। हमें कम लागत वाले टिकाऊ फिल्टर की आवश्यकता है।",
    audioDuration: "0:24"
  },
  santhali: {
    label: "संताली (Santhali)",
    text: "ᱟᱞᱮ ᱟᱹᱛᱩ ᱨᱮᱱᱟᱜ ᱵᱚᱨᱣᱮᱞ ᱨᱮ ᱫᱟᱜ ᱟᱹᱰᱤ ᱵᱟᱹᱲᱤᱡ ᱟᱨ ᱯᱷᱞᱳᱨᱟᱭᱤᱰ ᱢᱮᱱᱟᱜᱼᱟ, ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ ᱨᱩᱣᱟᱹ ᱠᱟᱱᱟ... (गाँव के बोरवेल में पानी बहुत गंदा और फ्लोराइड वाला है, बच्चे बीमार हो रहे हैं...)",
    audioDuration: "0:31"
  },
  nagpuri: {
    label: "नागपुरी (Nagpuri)",
    text: "खूंटी कर मुरहू आर तोरपा में टमाटर, लाहा आर महुआ बाजार पहुंचे से पहिले गर्मी से सड़ जाथे। हमर आदिवासी भाई-बहन मन के खातिर कम दाम वाला सोलर कोल्ड स्टोरेज बनाल जाय।",
    audioDuration: "0:28"
  },
  ho: {
    label: "हो (Ho)",
    text: "ᱟᱞᱮᱭᱟᱜ ᱦᱟᱥᱟ ᱟᱨ ᱦᱚᱭ ᱠᱚᱭᱞᱟ ᱫᱷᱩᱲᱤ ᱛᱮ ᱵᱟᱹᱲᱤᱡᱚᱜ ᱠᱟᱱᱟ... (कोयले की धूल से हमारी खेती की मिट्टी और साँस लेने की हवा खराब हो रही है, इसे रोकने का कोई उपाय किया जाए...)",
    audioDuration: "0:26"
  },
  english: {
    label: "English",
    text: "Severe post-harvest spoilage of perishable produce (Mahua, Lac, seasonal vegetables in Ranchi and Khunti) due to absence of affordable cold chains and manual water lifting challenges.",
    audioDuration: "0:18"
  }
};
