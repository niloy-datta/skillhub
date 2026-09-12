// ===== DOMAIN TYPES =====

export type UserRole = 'worker' | 'client' | 'admin';

export type WorkMode = 'Remote' | 'Hybrid' | 'On-site';
export type JobType = 'Full-time' | 'Part-time' | 'Contract';
export type TaskStatus = 'open' | 'in-progress' | 'completed' | 'cancelled';
export type JobStatus = 'active' | 'paused' | 'filled' | 'closed';

// ===== WORKER =====
export interface Worker {
  id: string;
  name: string;
  avatar: string;
  title: string;
  city: string;
  country: string;
  skills: string[];
  verifiedSkills: string[];
  humanVerified: boolean;
  rating: number;
  reviews: number;
  completedWork: number;
  expectedRate: number;
  currency: string;
  languages: string[];
  availableNow: boolean;
  bio: string;
  joinedYear: number;
  responseTime: string;
}

// ===== COMPANY =====
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
  responseRate: number;
  tagline: string;
  description: string;
  perks: string[];
}

// ===== TASK =====
export type TaskCategory = 
  | 'Cleaning' | 'Plumbing' | 'Moving' | 'Painting' 
  | 'Gardening' | 'Repair' | 'Caregiving' | 'Household Help'
  | 'Electrical' | 'Cooking' | 'Laundry';

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
  status: TaskStatus;
  clientName: string;
}

// ===== JOB =====
export interface Job {
  id: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  type: 'regular' | 'shift' | 'crew';
  role: string;
  location: string;
  pay: string;
  schedule: string;
  employment: JobType;
  requirements: string[];
  experience: string;
  positions: number;
  postedHours: number;
  applicants: number;
  status: JobStatus;
  date?: string;
  startTime?: string;
  endTime?: string;
}

// ===== CHAT =====
export type ChatCategory = 'ai-assistant' | 'mission-support' | 'worker-chat' | 'team-chat';

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderType: 'user' | 'agent' | 'worker' | 'system';
  type: 'text' | 'system' | 'mission-update';
  content: string;
  timestamp: string;
  status: 'sending' | 'sent' | 'delivered' | 'read';
}

export interface Chat {
  id: string;
  category: ChatCategory;
  title: string;
  participants: { id: string; name: string; avatar: string; type: string; status: string }[];
  messages: ChatMessage[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

// ===== NOTIFICATION =====
export interface Notification {
  id: string;
  type: 'task' | 'job' | 'message' | 'payment' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon: string;
}

// ===== USER =====
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  verified: boolean;
}
