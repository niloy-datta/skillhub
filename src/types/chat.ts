// ===== CHATBOT SYSTEM TYPES =====

export type ChatCategory = 
  | "ai-assistant"
  | "mission-support"
  | "worker-chat"
  | "team-chat"
  | "customer-support";

export type MessageType = 
  | "text"
  | "image"
  | "file"
  | "system"
  | "typing"
  | "mission-update"
  | "crew-proposal"
  | "payment"
  | "evidence";

export type AgentType = 
  | "mission-planner"
  | "workforce-agent"
  | "execution-agent"
  | "risk-agent"
  | "proof-agent";

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderType: "user" | "agent" | "worker" | "system";
  type: MessageType;
  content: string;
  timestamp: string;
  reactions?: MessageReaction[];
  attachments?: Attachment[];
  metadata?: any;
  status: "sending" | "sent" | "delivered" | "read" | "failed";
  replyTo?: string;
}

export interface MessageReaction {
  emoji: string;
  userId: string;
  userName: string;
}

export interface Attachment {
  id: string;
  type: "image" | "file" | "video" | "audio";
  name: string;
  url: string;
  size: number;
  mimeType: string;
}

export interface Chat {
  id: string;
  category: ChatCategory;
  title: string;
  description?: string;
  participants: ChatParticipant[];
  messages: ChatMessage[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  isPinned: boolean;
  isMuted: boolean;
  createdAt: string;
  updatedAt: string;
  missionId?: string;
  workerId?: string;
  agentType?: AgentType;
}

export interface ChatParticipant {
  id: string;
  name: string;
  avatar: string;
  type: "user" | "agent" | "worker" | "system";
  status: "online" | "offline" | "away" | "busy";
  lastSeen?: string;
  isTyping?: boolean;
}

export interface AICommand {
  id: string;
  name: string;
  description: string;
  icon: string;
  parameters: CommandParameter[];
  agentType: AgentType;
}

export interface CommandParameter {
  name: string;
  type: "string" | "number" | "boolean" | "date";
  required: boolean;
  description: string;
  placeholder?: string;
}

export interface AgentCapability {
  name: string;
  description: string;
  examples: string[];
}

export interface ChatSuggestion {
  text: string;
  icon: string;
  category: string;
}

// Spring Boot API Integration Types
export interface ChatAPIResponse {
  success: boolean;
  data?: any;
  error?: string;
  timestamp: string;
}

export interface WebSocketMessage {
  type: "message" | "typing" | "read" | "presence";
  payload: any;
  chatId: string;
  senderId: string;
  timestamp: string;
}
