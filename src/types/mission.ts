// ===== SKILLHUB OUTCOME NETWORK - CORE TYPES =====

// ===== MISSION DOMAIN =====

export type MissionStatus = 
  | "draft"
  | "compiling" 
  | "ready"
  | "crew-proposed"
  | "crew-accepted"
  | "funded"
  | "in-progress"
  | "blocked"
  | "healing"
  | "completed"
  | "failed";

export type MissionPriority = "low" | "medium" | "high" | "critical";

export interface Mission {
  id: string;
  title: string;
  outcome: string; // The desired outcome, not just a task
  constraints: MissionConstraints;
  budget: Budget;
  deadline: string;
  deliverables: Deliverable[];
  workGraph: WorkGraph;
  milestones: Milestone[];
  crew: Crew | null;
  risk: RiskAssessment;
  evidence: Evidence[];
  outcomeMetrics: OutcomeMetrics | null;
  status: MissionStatus;
  priority: MissionPriority;
  progress: number; // 0-100
  deadlineConfidence: number; // 0-100
  successProbability: number; // 0-100
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  companyId: string;
}

export interface MissionConstraints {
  budget: number;
  currency: string;
  deadline: string;
  quality: number; // 0-100
  compliance?: string[];
  timezone?: string;
  language?: string[];
}

export interface Budget {
  total: number;
  currency: string;
  allocated: number;
  spent: number;
  remaining: number;
  escrow: number;
}

export interface Deliverable {
  id: string;
  name: string;
  description: string;
  type: "document" | "code" | "design" | "data" | "service" | "other";
  requirements: string[];
  acceptanceCriteria: string[];
  status: "pending" | "in-progress" | "submitted" | "verified" | "rejected";
  assignedTo?: string;
  dueDate: string;
}

export interface WorkGraph {
  nodes: WorkGraphNode[];
  edges: WorkGraphEdge[];
  criticalPath: string[];
  totalEstimatedHours: number;
  parallelism: number;
}

export interface WorkGraphNode {
  id: string;
  name: string;
  type: "human" | "ai" | "hybrid";
  estimatedHours: number;
  difficulty: number; // 1-10
  skills: string[];
  dependencies: string[];
  status: "pending" | "in-progress" | "completed" | "blocked";
  assignedWorker?: string;
  assignedAgent?: string;
  progress: number;
}

export interface WorkGraphEdge {
  from: string;
  to: string;
  type: "dependency" | "parallel" | "optional";
}

export interface Milestone {
  id: string;
  name: string;
  dueDate: string;
  completionPercent: number;
  deliverables: string[];
  paymentAmount: number;
  status: "pending" | "in-progress" | "completed";
}

export interface Crew {
  id: string;
  name: string;
  workers: CrewWorker[];
  agents: CrewAgent[];
  totalCost: number;
  estimatedDelivery: string;
  successProbability: number;
  risk: "low" | "medium" | "high";
  collaborationScore: number;
  skillCoverage: number;
}

export interface CrewWorker {
  workerId: string;
  name: string;
  avatar: string;
  role: string;
  skills: string[];
  hourlyRate: number;
  currency: string;
  availability: string;
  confidence: number; // 0-1
  pastOutcomeQuality: number; // 0-100
}

export interface CrewAgent {
  agentId: string;
  name: string;
  type: "research" | "analysis" | "generation" | "validation" | "monitoring";
  tasks: string[];
  estimatedCost: number;
  confidence: number;
}

export interface RiskAssessment {
  overallRisk: "low" | "medium" | "high" | "critical";
  factors: RiskFactor[];
  mitigation: string[];
  deadlineConfidence: number;
  budgetConfidence: number;
  qualityConfidence: number;
}

export interface RiskFactor {
  name: string;
  severity: "low" | "medium" | "high";
  probability: number;
  impact: string;
  mitigation: string;
}

export interface Evidence {
  id: string;
  type: "code" | "document" | "screenshot" | "video" | "data" | "test" | "other";
  name: string;
  description: string;
  url: string;
  verified: boolean;
  verifiedBy?: string;
  verifiedAt?: string;
  taskId: string;
}

export interface OutcomeMetrics {
  businessOutcome: string;
  quantitativeResults: {
    metric: string;
    before: number;
    after: number;
    improvement: number;
  }[];
  qualitativeResults: string[];
  clientSatisfaction: number;
  deliveredOnTime: boolean;
  deliveredOnBudget: boolean;
  qualityScore: number;
}

// ===== WORKER DOMAIN (Enhanced) =====

export interface OutcomeWorker {
  id: string;
  name: string;
  avatar: string;
  city: string;
  country: string;
  skills: OutcomeSkill[];
  reliability: number; // 0-1
  collaboration: number; // 0-1
  timezone: string;
  availability: "now" | "soon" | "scheduled";
  hourlyRate: number;
  currency: string;
  outcomeHistory: OutcomeRecord[];
  missionSuccessRate: number;
  avgDeliveryEarly: number; // days
  clientInterventionRate: number; // 0-1
}

export interface OutcomeSkill {
  name: string;
  confidence: number; // 0-1
  verified: boolean;
  evidence: SkillEvidence[];
}

export interface SkillEvidence {
  taskId: string;
  difficulty: number;
  completedEarly: number; // days
  quality: number;
  clientIntervention: number;
  businessOutcome: string;
}

export interface OutcomeRecord {
  missionId: string;
  missionName: string;
  role: string;
  difficulty: number;
  completedEarly: number;
  quality: number;
  clientIntervention: number;
  businessOutcome: string;
  productionDefects: number;
}

// ===== EVENTS =====

export type DomainEvent =
  | { type: "MissionCreated"; missionId: string; timestamp: string }
  | { type: "MissionCompiled"; missionId: string; workGraph: WorkGraph; timestamp: string }
  | { type: "CrewProposed"; missionId: string; crew: Crew; timestamp: string }
  | { type: "CrewAccepted"; missionId: string; crewId: string; timestamp: string }
  | { type: "TaskAssigned"; taskId: string; workerId: string; timestamp: string }
  | { type: "TaskStarted"; taskId: string; timestamp: string }
  | { type: "TaskBlocked"; taskId: string; reason: string; timestamp: string }
  | { type: "WorkerUnavailable"; workerId: string; reason: string; timestamp: string }
  | { type: "ReplacementRequested"; missionId: string; workerId: string; timestamp: string }
  | { type: "ReplacementAssigned"; missionId: string; oldWorkerId: string; newWorkerId: string; timestamp: string }
  | { type: "DeliverableSubmitted"; deliverableId: string; timestamp: string }
  | { type: "DeliverableVerified"; deliverableId: string; timestamp: string }
  | { type: "MilestoneApproved"; milestoneId: string; timestamp: string }
  | { type: "PaymentReleased"; missionId: string; amount: number; timestamp: string }
  | { type: "MissionCompleted"; missionId: string; outcome: OutcomeMetrics; timestamp: string };

export type Command =
  | { type: "CompileMission"; missionId: string }
  | { type: "ProposeCrew"; missionId: string }
  | { type: "AcceptCrew"; missionId: string; crewId: string }
  | { type: "ReplaceWorker"; missionId: string; workerId: string }
  | { type: "GenerateInvoice"; missionId: string }
  | { type: "SendNotification"; userId: string; message: string }
  | { type: "VerifyDocument"; documentId: string };
