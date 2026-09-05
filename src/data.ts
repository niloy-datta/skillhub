export const CATEGORIES = [
  "Engineering",
  "Design",
  "Product",
  "Data",
  "Marketing",
  "Operations",
] as const;
export type Category = (typeof CATEGORIES)[number];

export type WorkMode = "Remote" | "Hybrid" | "On-site";
export type JobType = "Full-time" | "Contract" | "Part-time" | "Internship";
export type JobLevel = "Junior" | "Mid" | "Senior" | "Lead";

export interface Company {
  id: string;
  name: string;
  hue: number;
  shape: 0 | 1 | 2;
  rating: number;
  reviews: number;
  openRoles: number;
  tagline: string;
  hq: string;
  perks: string[];
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyId: string;
  category: Category;
  type: JobType;
  level: JobLevel;
  mode: WorkMode;
  location: string;
  salaryMin: number;
  salaryMax: number;
  postedHours: number;
  tags: string[];
  featured?: boolean;
  description: string;
  responsibilities: string[];
}

export const COMPANIES: Company[] = [
  {
    id: "kelp",
    name: "Kelp Analytics",
    hue: 158,
    shape: 1,
    rating: 4.7,
    reviews: 214,
    openRoles: 31,
    tagline: "Data infrastructure for messy, real-world pipelines.",
    hq: "Amsterdam",
    perks: ["Remote-first", "€2k learning", "30d PTO"],
  },
  {
    id: "ferrostack",
    name: "Ferrostack",
    hue: 215,
    shape: 0,
    rating: 4.8,
    reviews: 512,
    openRoles: 24,
    tagline: "Compiler-grade tooling for platform teams.",
    hq: "Berlin",
    perks: ["Equity", "4-day weeks", "On-site gym"],
  },
  {
    id: "moonloop",
    name: "Moonloop",
    hue: 335,
    shape: 2,
    rating: 4.6,
    reviews: 178,
    openRoles: 17,
    tagline: "Design-led apps used by 4M people every week.",
    hq: "Lisbon",
    perks: ["Design-first", "Annual offsite", "Wellness budget"],
  },
  {
    id: "halide",
    name: "Halide Labs",
    hue: 40,
    shape: 0,
    rating: 4.9,
    reviews: 96,
    openRoles: 9,
    tagline: "Camera tools & computational imaging research.",
    hq: "Amsterdam",
    perks: ["Research time", "Patent bonus", "Studio space"],
  },
  {
    id: "ondo",
    name: "Ondo",
    hue: 260,
    shape: 1,
    rating: 4.5,
    reviews: 689,
    openRoles: 38,
    tagline: "Banking that behaves. 2M customers across the EU.",
    hq: "London",
    perks: ["Private health", "Sabbatical @4y", "Matched pension"],
  },
  {
    id: "parcel-pine",
    name: "Parcel & Pine",
    hue: 95,
    shape: 2,
    rating: 4.4,
    reviews: 143,
    openRoles: 12,
    tagline: "Last-mile logistics without the carbon guilt.",
    hq: "Rotterdam",
    perks: ["Bike-first fleet", "Profit share", "Carbon budget"],
  },
  {
    id: "signalhouse",
    name: "Signalhouse",
    hue: 15,
    shape: 1,
    rating: 4.7,
    reviews: 87,
    openRoles: 8,
    tagline: "Independent media infrastructure for newsrooms.",
    hq: "Berlin",
    perks: ["Press freedom", "Home studio", "Book allowance"],
  },
  {
    id: "cartogram",
    name: "Cartogram",
    hue: 190,
    shape: 0,
    rating: 4.8,
    reviews: 65,
    openRoles: 6,
    tagline: "Mapping software for climate adaptation planning.",
    hq: "Berlin",
    perks: ["Climate mission", "Open-source days", "Transit pass"],
  },
];

export const JOBS: Job[] = [
  {
    id: "j01",
    title: "Senior Frontend Engineer",
    company: "Ferrostack",
    companyId: "ferrostack",
    category: "Engineering",
    type: "Full-time",
    level: "Senior",
    mode: "Hybrid",
    location: "Berlin, DE",
    salaryMin: 78,
    salaryMax: 96,
    postedHours: 3,
    tags: ["React", "TypeScript", "Design Systems"],
    featured: true,
    description:
      "Own the interface layer of a developer tool used by 40,000 platform engineers. You'll ship the design system's next generation and set the bar for frontend craft across four squads.",
    responsibilities: [
      "Lead architecture of the React/TypeScript monorepo",
      "Evolve the Ferro design system with our two-person brand team",
      "Profile and fix rendering hot paths in the build explorer",
      "Mentor two mid-level engineers through weekly pairing",
    ],
  },
  {
    id: "j02",
    title: "Backend Engineer (Go)",
    company: "Kelp Analytics",
    companyId: "kelp",
    category: "Engineering",
    type: "Full-time",
    level: "Mid",
    mode: "Remote",
    location: "Remote (EU)",
    salaryMin: 70,
    salaryMax: 88,
    postedHours: 7,
    tags: ["Go", "PostgreSQL", "gRPC"],
    description:
      "Build the ingestion services that swallow 2B events a day without chewing on latency. Small team, direct customer impact, very few meetings.",
    responsibilities: [
      "Design gRPC services for the ingestion tier",
      "Tune PostgreSQL partitioning and vacuum strategy",
      "Own services end-to-end: code, deploy, on-call",
      "Write honest postmortems and fix root causes",
    ],
  },
  {
    id: "j03",
    title: "Product Designer",
    company: "Moonloop",
    companyId: "moonloop",
    category: "Design",
    type: "Full-time",
    level: "Mid",
    mode: "Hybrid",
    location: "Lisbon, PT",
    salaryMin: 55,
    salaryMax: 72,
    postedHours: 2,
    tags: ["Figma", "Prototyping", "Mobile"],
    featured: true,
    description:
      "Design the habits people actually keep. You'll take a scrappy prototype to a polished flow used by millions — with researchers embedded in your squad.",
    responsibilities: [
      "Ship end-to-end flows for the streaks & goals surface",
      "Prototype in Figma and test with 5 users a week",
      "Partner with motion on micro-interactions that earn delight",
      "Keep the component library honest and documented",
    ],
  },
  {
    id: "j04",
    title: "Staff Platform Engineer",
    company: "Ondo",
    companyId: "ondo",
    category: "Engineering",
    type: "Full-time",
    level: "Lead",
    mode: "Hybrid",
    location: "London, UK",
    salaryMin: 110,
    salaryMax: 140,
    postedHours: 26,
    tags: ["Kubernetes", "Terraform", "AWS"],
    description:
      "Set the technical direction for the platform group of 14. Fewer tickets, more leverage: golden paths, guardrails, and the occasional heroic refactor.",
    responsibilities: [
      "Own the Kubernetes golden path across 3 clusters",
      "Drive platform cost down 20% without slowing teams",
      "Review architecture across the payments org",
      "Hire and grow two senior platform engineers",
    ],
  },
  {
    id: "j05",
    title: "Machine Learning Engineer",
    company: "Halide Labs",
    companyId: "halide",
    category: "Data",
    type: "Full-time",
    level: "Senior",
    mode: "Hybrid",
    location: "Amsterdam, NL",
    salaryMin: 82,
    salaryMax: 104,
    postedHours: 10,
    tags: ["PyTorch", "LLMs", "Vision"],
    description:
      "Put research into people's pockets. You'll productionise computational imaging models that run on-device for half a million photographers.",
    responsibilities: [
      "Distill research models to on-device size budgets",
      "Build eval harnesses for imaging quality",
      "Ship LLM-assisted editing features behind a flag",
      "Co-author our annual imaging tech report",
    ],
  },
  {
    id: "j06",
    title: "Senior Product Manager",
    company: "Ondo",
    companyId: "ondo",
    category: "Product",
    type: "Full-time",
    level: "Senior",
    mode: "Hybrid",
    location: "London, UK",
    salaryMin: 90,
    salaryMax: 115,
    postedHours: 20,
    tags: ["Fintech", "Discovery", "B2C"],
    featured: true,
    description:
      "Run discovery for the savings pod used by 900k customers. You'll decide what we build next — and defend the 'no' more often than the 'yes'.",
    responsibilities: [
      "Own the roadmap and OKRs for savings products",
      "Run weekly discovery interviews with customers",
      "Partner with compliance early, not last",
      "Ship experiments with clear kill criteria",
    ],
  },
  {
    id: "j07",
    title: "Data Scientist",
    company: "Kelp Analytics",
    companyId: "kelp",
    category: "Data",
    type: "Full-time",
    level: "Mid",
    mode: "Hybrid",
    location: "Amsterdam, NL",
    salaryMin: 70,
    salaryMax: 92,
    postedHours: 4,
    tags: ["Python", "ML", "dbt"],
    description:
      "Turn pipeline telemetry into the anomaly detection our biggest customers brag about. Half modelling, half product sense.",
    responsibilities: [
      "Build anomaly models on 2B-event telemetry",
      "Maintain feature pipelines in dbt",
      "Present findings to customers quarterly",
      "Pair with engineering to ship models to prod",
    ],
  },
  {
    id: "j08",
    title: "DevOps Engineer",
    company: "Signalhouse",
    companyId: "signalhouse",
    category: "Engineering",
    type: "Full-time",
    level: "Mid",
    mode: "Remote",
    location: "Remote (EU)",
    salaryMin: 72,
    salaryMax: 90,
    postedHours: 5,
    tags: ["CI/CD", "Docker", "Grafana"],
    description:
      "Keep 40 independent newsrooms publishing without downtime. You'll own the deploy pipeline and the dashboards that prove it works.",
    responsibilities: [
      "Own CI/CD from commit to production in <10 min",
      "Build SLO dashboards in Grafana that people read",
      "Automate incident runbooks for the on-call rotation",
      "Keep infra spend boring and predictable",
    ],
  },
  {
    id: "j09",
    title: "UX Researcher",
    company: "Kelp Analytics",
    companyId: "kelp",
    category: "Design",
    type: "Full-time",
    level: "Mid",
    mode: "Remote",
    location: "Remote (EU)",
    salaryMin: 58,
    salaryMax: 74,
    postedHours: 8,
    tags: ["Interviews", "Synthesis", "B2B"],
    description:
      "Be the reason we build the right thing. You'll run continuous discovery with data engineers — the most opinionated users on earth.",
    responsibilities: [
      "Run 4–6 discovery interviews every week",
      "Maintain the insight repository and tag taxonomy",
      "Turn findings into decision memos, not decks",
      "Coach PMs to ask better questions",
    ],
  },
  {
    id: "j10",
    title: "Technical Product Manager",
    company: "Ferrostack",
    companyId: "ferrostack",
    category: "Product",
    type: "Full-time",
    level: "Senior",
    mode: "Remote",
    location: "Remote (EU)",
    salaryMin: 80,
    salaryMax: 100,
    postedHours: 14,
    tags: ["APIs", "Roadmaps", "DX"],
    description:
      "Own the public API surface and the developer experience around it. If a changelog reads badly, that's your bug too.",
    responsibilities: [
      "Own API roadmap, versioning and deprecation policy",
      "Write docs and examples developers copy-paste",
      "Triage community issues into roadmap signal",
      "Ship quarterly with a dedicated platform squad",
    ],
  },
  {
    id: "j11",
    title: "Design Lead",
    company: "Halide Labs",
    companyId: "halide",
    category: "Design",
    type: "Full-time",
    level: "Lead",
    mode: "Hybrid",
    location: "Amsterdam, NL",
    salaryMin: 85,
    salaryMax: 105,
    postedHours: 30,
    tags: ["Design Ops", "Mentoring", "Craft"],
    description:
      "Lead a team of five across product and brand, and keep the craft bar where our users expect it: absurdly high.",
    responsibilities: [
      "Manage and grow a team of five designers",
      "Run design crit with engineers in the room",
      "Own the annual brand refresh cycle",
      "Hire the sixth — our first motion designer",
    ],
  },
  {
    id: "j12",
    title: "Junior Fullstack Developer",
    company: "Parcel & Pine",
    companyId: "parcel-pine",
    category: "Engineering",
    type: "Full-time",
    level: "Junior",
    mode: "On-site",
    location: "Rotterdam, NL",
    salaryMin: 38,
    salaryMax: 46,
    postedHours: 12,
    tags: ["Node", "React", "Logistics"],
    description:
      "Learn fast on a product where every deploy moves real parcels. Structured mentorship, honest code review, no sink-or-swim.",
    responsibilities: [
      "Ship features across the driver app and ops dashboard",
      "Fix bugs with a senior reviewer on every PR",
      "Join the Friday demo and show something real",
      "Rotate through support once a month",
    ],
  },
  {
    id: "j13",
    title: "Mobile Engineer (iOS)",
    company: "Moonloop",
    companyId: "moonloop",
    category: "Engineering",
    type: "Full-time",
    level: "Mid",
    mode: "Remote",
    location: "Remote (EU)",
    salaryMin: 65,
    salaryMax: 84,
    postedHours: 50,
    tags: ["Swift", "SwiftUI", "iOS"],
    description:
      "Make the app feel like it was milled from a single block of aluminium. SwiftUI-first, 60fps or it doesn't ship.",
    responsibilities: [
      "Build new surfaces in SwiftUI with the design team",
      "Chase jank with Instruments and flame graphs",
      "Own App Store releases and phased rollouts",
      "Keep crash-free sessions above 99.8%",
    ],
  },
  {
    id: "j14",
    title: "Analytics Engineer",
    company: "Ondo",
    companyId: "ondo",
    category: "Data",
    type: "Full-time",
    level: "Mid",
    mode: "Remote",
    location: "Remote (UK)",
    salaryMin: 68,
    salaryMax: 86,
    postedHours: 44,
    tags: ["dbt", "Snowflake", "SQL"],
    description:
      "Make the numbers trustworthy. You'll own the models finance signs off on and the tests that keep them honest.",
    responsibilities: [
      "Model the core finance marts in dbt",
      "Write tests that catch drift before finance does",
      "Cut warehouse spend with sane incremental models",
      "Document every model like a new joiner will read it",
    ],
  },
  {
    id: "j15",
    title: "Growth Marketer",
    company: "Parcel & Pine",
    companyId: "parcel-pine",
    category: "Marketing",
    type: "Full-time",
    level: "Mid",
    mode: "Hybrid",
    location: "Rotterdam, NL",
    salaryMin: 50,
    salaryMax: 64,
    postedHours: 90,
    tags: ["SEO", "Lifecycle", "B2B"],
    description:
      "Grow a logistics brand people actually root for. You'll run experiments across SEO and lifecycle with a budget and no vanity metrics.",
    responsibilities: [
      "Own the experiment backlog and weekly growth review",
      "Build lifecycle flows for merchant onboarding",
      "Run SEO plays that survive algorithm updates",
      "Report on pipeline, not impressions",
    ],
  },
  {
    id: "j16",
    title: "Product Analyst",
    company: "Cartogram",
    companyId: "cartogram",
    category: "Product",
    type: "Full-time",
    level: "Mid",
    mode: "Hybrid",
    location: "Berlin, DE",
    salaryMin: 52,
    salaryMax: 66,
    postedHours: 70,
    tags: ["SQL", "A/B Testing", "GIS"],
    description:
      "Be the quantitative conscience of a mission-driven product team. Your analyses decide which climate features we build next.",
    responsibilities: [
      "Design and read A/B tests with the product trio",
      "Build the activation funnel dashboards",
      "Turn GIS usage patterns into feature bets",
      "Present to the city-partner board quarterly",
    ],
  },
  {
    id: "j17",
    title: "Brand Designer",
    company: "Signalhouse",
    companyId: "signalhouse",
    category: "Design",
    type: "Full-time",
    level: "Mid",
    mode: "On-site",
    location: "Berlin, DE",
    salaryMin: 48,
    salaryMax: 60,
    postedHours: 120,
    tags: ["Identity", "Motion", "Editorial"],
    description:
      "Give independent journalism a face that isn't a blue serif. Identity, motion and editorial systems for 40 newsroom brands.",
    responsibilities: [
      "Design identities for new newsroom partners",
      "Build motion templates the newsrooms can run themselves",
      "Keep the master brand system sharp and documented",
      "Art-direct the annual press-freedom campaign",
    ],
  },
  {
    id: "j18",
    title: "Content Lead",
    company: "Signalhouse",
    companyId: "signalhouse",
    category: "Marketing",
    type: "Full-time",
    level: "Senior",
    mode: "Hybrid",
    location: "Berlin, DE",
    salaryMin: 60,
    salaryMax: 75,
    postedHours: 150,
    tags: ["Editorial", "B2B", "Strategy"],
    description:
      "Run an editorial engine that makes infrastructure feel urgent. One writer, one illustrator and a budget that respects freelancers.",
    responsibilities: [
      "Own the editorial calendar and commissioning budget",
      "Write two flagship pieces per quarter yourself",
      "Grow the newsletter from 12k to 40k subscribers",
      "Kill content that doesn't earn its keep",
    ],
  },
  {
    id: "j19",
    title: "Engineering Intern",
    company: "Cartogram",
    companyId: "cartogram",
    category: "Engineering",
    type: "Internship",
    level: "Junior",
    mode: "On-site",
    location: "Berlin, DE",
    salaryMin: 18,
    salaryMax: 22,
    postedHours: 96,
    tags: ["Python", "GIS", "Maps"],
    description:
      "Six months shipping real map features with a mentor who reviews everything. 4 of our last 6 interns stayed on full-time.",
    responsibilities: [
      "Ship two production features with mentor review",
      "Improve tile-rendering benchmarks",
      "Present your work at the monthly all-hands",
      "Keep a learning log — we read it",
    ],
  },
  {
    id: "j20",
    title: "People Ops Manager",
    company: "Ferrostack",
    companyId: "ferrostack",
    category: "Operations",
    type: "Full-time",
    level: "Senior",
    mode: "Hybrid",
    location: "Berlin, DE",
    salaryMin: 55,
    salaryMax: 70,
    postedHours: 200,
    tags: ["Culture", "HRIS", "Hiring"],
    description:
      "Scale a company people don't want to leave. You'll own the rituals, the HRIS and the hiring loops that keep the bar high.",
    responsibilities: [
      "Run hiring loops with a 48h feedback promise",
      "Own the HRIS and every process it touches",
      "Design the onboarding people mention in reviews",
      "Coach managers through the hard conversations",
    ],
  },
  {
    id: "j21",
    title: "Customer Support Lead",
    company: "Kelp Analytics",
    companyId: "kelp",
    category: "Operations",
    type: "Full-time",
    level: "Mid",
    mode: "Remote",
    location: "Remote (EU)",
    salaryMin: 45,
    salaryMax: 58,
    postedHours: 36,
    tags: ["Zendesk", "SLAs", "Team of 4"],
    description:
      "Lead four support engineers who answer like engineers. You'll own SLAs, macros and the feedback pipe into product.",
    responsibilities: [
      "Lead a team of four across two time zones",
      "Keep first-response under 4 business hours",
      "Turn tickets into a monthly product signal report",
      "Hire the fifth — Spanish coverage",
    ],
  },
  {
    id: "j22",
    title: "Performance Marketing Intern",
    company: "Moonloop",
    companyId: "moonloop",
    category: "Marketing",
    type: "Internship",
    level: "Junior",
    mode: "On-site",
    location: "Lisbon, PT",
    salaryMin: 16,
    salaryMax: 20,
    postedHours: 60,
    tags: ["Paid Social", "Creative", "CRO"],
    description:
      "Learn paid social with real budget and real creative freedom. You'll brief designers, cut variants and read the numbers honestly.",
    responsibilities: [
      "Run €5k/month of paid social experiments",
      "Brief creative variants with the design team",
      "Build the weekly spend-and-learn report",
      "Present one bold idea per sprint",
    ],
  },
];

export const TICKER_ITEMS: string[] = [
  "Ferrostack — 12 open roles",
  "Kelp — Sr. Data Eng · €95k+",
  "Moonloop — Product Designer",
  "Ondo — Staff Platform Eng",
  "Halide — ML Engineer · €104k",
  "Signalhouse — DevOps · Remote",
  "Cartogram — Paid internships",
  "Parcel & Pine — Growth Lead",
  "41,209 readers on the Friday wire",
  "Salary bands on 92% of listings",
];

export interface SalaryBand {
  level: JobLevel;
  min: number;
  max: number;
}

export const SALARY_BANDS: Record<string, SalaryBand[]> = {
  "Frontend Engineer": [
    { level: "Junior", min: 42, max: 54 },
    { level: "Mid", min: 58, max: 74 },
    { level: "Senior", min: 76, max: 96 },
    { level: "Lead", min: 95, max: 120 },
  ],
  "Backend Engineer": [
    { level: "Junior", min: 45, max: 58 },
    { level: "Mid", min: 60, max: 78 },
    { level: "Senior", min: 80, max: 100 },
    { level: "Lead", min: 100, max: 128 },
  ],
  "Product Designer": [
    { level: "Junior", min: 40, max: 50 },
    { level: "Mid", min: 52, max: 68 },
    { level: "Senior", min: 70, max: 88 },
    { level: "Lead", min: 88, max: 110 },
  ],
  "Data Scientist": [
    { level: "Junior", min: 48, max: 60 },
    { level: "Mid", min: 62, max: 80 },
    { level: "Senior", min: 82, max: 104 },
    { level: "Lead", min: 105, max: 130 },
  ],
  "Product Manager": [
    { level: "Junior", min: 50, max: 64 },
    { level: "Mid", min: 66, max: 84 },
    { level: "Senior", min: 86, max: 110 },
    { level: "Lead", min: 112, max: 140 },
  ],
};

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  companyId: string;
  tilt: string;
  offset: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Three interviews in nine days, offer in three weeks. The salary bands meant I never once had to lowball myself.",
    name: "Mara Jensen",
    role: "Product Designer",
    company: "now at Moonloop",
    companyId: "moonloop",
    tilt: "md:-rotate-2",
    offset: "",
  },
  {
    quote:
      "I set one alert — 'Staff, Remote, €110k+'. It rang exactly twice. I took the second one and never looked back.",
    name: "Dev Kumar",
    role: "Staff Engineer",
    company: "now at Ondo",
    companyId: "ondo",
    tilt: "md:rotate-[1.8deg]",
    offset: "md:translate-y-10",
  },
  {
    quote:
      "We closed four senior engineers in a month. The candidate quality coming off Workwire is a different league.",
    name: "Tomas Riedel",
    role: "Head of Talent",
    company: "Ferrostack",
    companyId: "ferrostack",
    tilt: "md:-rotate-[1.2deg]",
    offset: "md:translate-y-3",
  },
];

export const ALERT_WORDS: string[] = [
  "SENIOR REACT",
  "REMOTE",
  "€96K",
  "STAFF PLATFORM",
  "DESIGN LEAD",
  "4-DAY WEEK",
  "EQUITY",
  "PAID INTERNSHIP",
  "€110K+",
  "ML ENGINEER",
];

export function formatAgo(hours: number): string {
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}
