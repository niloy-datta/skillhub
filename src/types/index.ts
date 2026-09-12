// ===== CORE TYPES =====

export type View =
  | "home"
  | "get-help"
  | "post-task"
  | "task-detail"
  | "hire-people"
  | "post-job"
  | "find-workers"
  | "worker-profile"
  | "company-profile"
  | "business-workspace"
  | "my-profile"
  | "messages"
  | "notifications"
  | "analytics"
  | "payments"
  | "help-center"
  | "verification"
  | "disputes"
  | "referrals"
  | "achievements"
  | "social-sharing"
  | "coupons"
  | "loyalty"
  | "leaderboard"
  | "team"
  | "video-call"
  | "language"
  | "forecasting"
  | "trends"
  | "insights";

export type ToastType = "success" | "error" | "info";

export interface Toast {
  message: string;
  type: ToastType;
}

// ===== NAVIGATION TYPES =====

export interface NavItem {
  label: string;
  view: View;
  icon: string;
}

// ===== WORKER TYPES =====

export type WorkerSkill =
  | "House Cleaning"
  | "Deep Cleaning"
  | "Plumbing"
  | "Electrical"
  | "Painting"
  | "Carpentry"
  | "Moving"
  | "Packing"
  | "Gardening"
  | "Cooking"
  | "Caregiving"
  | "Elderly Care"
  | "Child Care"
  | "Warehouse"
  | "Forklift"
  | "Kitchen"
  | "Serving"
  | "Housekeeping"
  | "Laundry"
  | "Security"
  | "Driving"
  | "Delivery"
  | "Construction"
  | "Masonry"
  | "Welding"
  | "Repair";

export interface Worker {
  id: string;
  name: string;
  avatar: string;
  city: string;
  country: string;
  distanceKm?: number;
  skills: WorkerSkill[];
  verifiedSkills: WorkerSkill[];
  humanVerified: boolean;
  rating: number;
  reviews: number;
  completedWork: number;
  expectedRate: number;
  currency: string;
  languages: string[];
  availableNow: boolean;
  nextAvailable?: string;
  bio: string;
  joinedYear: number;
  responseTime: string;
}

// ===== COMPANY TYPES =====

export interface Company {
  id: string;
  name: string;
  industry: string;
  city: string;
  country: string;
  logo: string;
  verified: boolean;
  locations: number;
  activeJobs: number;
  activeShifts: number;
  workerRating: number;
  paymentReliability: number;
  jobAccuracy: number;
  workEnvironment: number;
  communication: number;
  safety: number;
  responseRate: number;
  repeatWorkerRate: number;
  tagline: string;
  description: string;
  perks: string[];
  hue: number;
}

// ===== TASK TYPES =====

export type TaskCategory =
  | "Cleaning"
  | "Plumbing"
  | "Moving"
  | "Painting"
  | "Gardening"
  | "Repair"
  | "Caregiving"
  | "Household Help"
  | "Electrical"
  | "Appliance Repair"
  | "Cooking"
  | "Laundry";

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  description: string;
  country: string;
  city: string;
  area: string;
  date: string;
  time: string;
  budget: number;
  currency: string;
  duration: string;
  workersNeeded: number;
  specialRequirements: string[];
  postedHours: number;
  offersCount: number;
  status: "open" | "in-progress" | "completed";
  clientName: string;
}

// ===== BUSINESS JOB TYPES =====

export interface BusinessJob {
  id: string;
  companyId: string;
  type: "regular" | "shift" | "crew";
  role: string;
  location: string;
  pay: string;
  schedule: string;
  employment: "Full-time" | "Part-time" | "Contract";
  requirements: string[];
  experience: string;
  languages: string[];
  positions: number;
  postedHours: number;
  applicants: number;
  status: "active" | "paused" | "filled";
  date?: string;
  startTime?: string;
  endTime?: string;
  hourlyRate?: number;
  currency?: string;
  uniform?: string;
  meal?: boolean;
  transport?: boolean;
}

// ===== REVIEW TYPES =====

export interface CompanyReview {
  id: string;
  companyId: string;
  workerName: string;
  workerAvatar: string;
  role: string;
  date: string;
  paymentReliability: number;
  jobAccuracy: number;
  workEnvironment: number;
  communication: number;
  safety: number;
  comment: string;
  verifiedWork: boolean;
  communityComments: number;
}

// ===== COMPONENT PROP TYPES =====

export interface NavigateProps {
  navigate: (view: View) => void;
}

export interface ToastProps {
  showToast: (message: string, type?: ToastType) => void;
}

export interface SavedProps {
  savedWorkers: Set<string>;
  savedTasks: Set<string>;
  toggleSaveWorker: (id: string) => void;
  toggleSaveTask: (id: string) => void;
}
