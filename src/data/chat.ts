import type { Chat, ChatMessage, AICommand, AgentCapability, ChatSuggestion } from "../types/chat";

// ===== AI AGENTS =====

export const AI_AGENTS = {
  "mission-planner": {
    id: "agent-mission",
    name: "Mission Planner",
    avatar: "🧠",
    description: "Analyzes outcomes and creates optimized work graphs",
    capabilities: [
      {
        name: "Mission Analysis",
        description: "Breaks down complex outcomes into actionable tasks",
        examples: [
          "Analyze this mission: Launch e-commerce in 21 days",
          "Create work graph for restaurant opening",
          "Break down app development into phases",
        ],
      },
      {
        name: "Dependency Mapping",
        description: "Identifies task dependencies and critical paths",
        examples: [
          "What depends on what in this mission?",
          "Show me the critical path",
          "Which tasks can run in parallel?",
        ],
      },
      {
        name: "Timeline Estimation",
        description: "Calculates realistic timelines with buffers",
        examples: [
          "How long will this mission take?",
          "Estimate timeline for 5-person crew",
          "What's the fastest delivery possible?",
        ],
      },
    ],
  },
  "workforce-agent": {
    id: "agent-workforce",
    name: "Workforce Agent",
    avatar: "👥",
    description: "Optimizes human + AI crew composition",
    capabilities: [
      {
        name: "Crew Optimization",
        description: "Creates optimal team compositions",
        examples: [
          "Build a crew for e-commerce launch",
          "Find 3 developers + 1 designer",
          "Optimize crew for budget $10k",
        ],
      },
      {
        name: "Skill Matching",
        description: "Matches workers to tasks based on skills",
        examples: [
          "Who's best for React development?",
          "Find workers with e-commerce experience",
          "Match skills to mission requirements",
        ],
      },
      {
        name: "Availability Check",
        description: "Checks worker availability and timezone",
        examples: [
          "Who's available this week?",
          "Find workers in Asian timezone",
          "Check availability for next month",
        ],
      },
    ],
  },
  "execution-agent": {
    id: "agent-execution",
    name: "Execution Agent",
    avatar: "⚡",
    description: "Monitors progress and triggers self-healing",
    capabilities: [
      {
        name: "Progress Monitoring",
        description: "Tracks mission progress in real-time",
        examples: [
          "What's the current status?",
          "Show mission progress",
          "Any blockers in the mission?",
        ],
      },
      {
        name: "Self-Healing",
        description: "Detects issues and auto-resolves",
        examples: [
          "Worker inactive, find replacement",
          "Task blocked, suggest solution",
          "Deadline at risk, optimize schedule",
        ],
      },
      {
        name: "Task Assignment",
        description: "Assigns tasks to workers automatically",
        examples: [
          "Assign next task to available worker",
          "Reassign blocked task",
          "Balance workload across team",
        ],
      },
    ],
  },
  "risk-agent": {
    id: "agent-risk",
    name: "Risk Agent",
    avatar: "⚠️",
    description: "Predicts and mitigates mission risks",
    capabilities: [
      {
        name: "Risk Assessment",
        description: "Identifies potential risks early",
        examples: [
          "What are the risks in this mission?",
          "Assess deadline risk",
          "Identify budget risks",
        ],
      },
      {
        name: "Mitigation Planning",
        description: "Creates risk mitigation strategies",
        examples: [
          "How to mitigate supplier delay risk?",
          "Create backup plan for key worker",
          "Suggest risk mitigation strategies",
        ],
      },
      {
        name: "Confidence Scoring",
        description: "Calculates success probability",
        examples: [
          "What's the success probability?",
          "Calculate deadline confidence",
          "Assess overall mission risk",
        ],
      },
    ],
  },
  "proof-agent": {
    id: "agent-proof",
    name: "Proof Agent",
    avatar: "✅",
    description: "Verifies deliverables and outcomes",
    capabilities: [
      {
        name: "Deliverable Verification",
        description: "Checks if deliverables meet requirements",
        examples: [
          "Verify this deliverable",
          "Check if code meets requirements",
          "Validate design against spec",
        ],
      },
      {
        name: "Quality Assessment",
        description: "Evaluates work quality",
        examples: [
          "Assess code quality",
          "Check design quality",
          "Evaluate documentation",
        ],
      },
      {
        name: "Outcome Validation",
        description: "Validates business outcomes",
        examples: [
          "Validate business outcome",
          "Check if KPIs met",
          "Verify ROI calculation",
        ],
      },
    ],
  },
};

// ===== AI COMMANDS =====

export const AI_COMMANDS: AICommand[] = [
  {
    id: "cmd-1",
    name: "Create Mission",
    description: "Create a new mission from outcome description",
    icon: "🎯",
    parameters: [
      { name: "outcome", type: "string", required: true, description: "Desired outcome", placeholder: "e.g., Launch e-commerce in 21 days" },
      { name: "budget", type: "number", required: true, description: "Budget in USD", placeholder: "10000" },
      { name: "deadline", type: "string", required: true, description: "Deadline", placeholder: "21 days" },
    ],
    agentType: "mission-planner",
  },
  {
    id: "cmd-2",
    name: "Build Crew",
    description: "Create optimized crew for mission",
    icon: "👥",
    parameters: [
      { name: "missionId", type: "string", required: true, description: "Mission ID", placeholder: "mission-123" },
      { name: "budget", type: "number", required: false, description: "Crew budget", placeholder: "8000" },
    ],
    agentType: "workforce-agent",
  },
  {
    id: "cmd-3",
    name: "Check Status",
    description: "Get current mission status",
    icon: "📊",
    parameters: [
      { name: "missionId", type: "string", required: true, description: "Mission ID", placeholder: "mission-123" },
    ],
    agentType: "execution-agent",
  },
  {
    id: "cmd-4",
    name: "Assess Risk",
    description: "Assess mission risks",
    icon: "⚠️",
    parameters: [
      { name: "missionId", type: "string", required: true, description: "Mission ID", placeholder: "mission-123" },
    ],
    agentType: "risk-agent",
  },
  {
    id: "cmd-5",
    name: "Verify Deliverable",
    description: "Verify a deliverable meets requirements",
    icon: "✅",
    parameters: [
      { name: "deliverableId", type: "string", required: true, description: "Deliverable ID", placeholder: "del-123" },
    ],
    agentType: "proof-agent",
  },
];

// ===== CHAT SUGGESTIONS =====

export const CHAT_SUGGESTIONS: ChatSuggestion[] = [
  { text: "Create a new mission", icon: "🎯", category: "mission" },
  { text: "Find workers for my project", icon: "👥", category: "workforce" },
  { text: "Check mission status", icon: "📊", category: "execution" },
  { text: "Assess project risks", icon: "⚠️", category: "risk" },
  { text: "Verify deliverables", icon: "✅", category: "proof" },
  { text: "Optimize crew composition", icon: "🔧", category: "workforce" },
  { text: "Show mission timeline", icon: "📅", category: "mission" },
  { text: "Find replacement worker", icon: "🔄", category: "execution" },
];

// ===== SAMPLE CHATS =====

export const SAMPLE_CHATS: Chat[] = [
  {
    id: "chat-1",
    category: "ai-assistant",
    title: "AI Assistant",
    description: "Chat with Skillhub AI for help with missions",
    participants: [
      {
        id: "user-1",
        name: "You",
        avatar: "👤",
        type: "user",
        status: "online",
      },
      {
        id: "agent-main",
        name: "Skillhub AI",
        avatar: "🤖",
        type: "agent",
        status: "online",
      },
    ],
    messages: [
      {
        id: "msg-1",
        chatId: "chat-1",
        senderId: "agent-main",
        senderName: "Skillhub AI",
        senderAvatar: "🤖",
        senderType: "agent",
        type: "text",
        content: "Hello! I'm your Skillhub AI assistant. I can help you create missions, find workers, check status, and more. What would you like to do today?",
        timestamp: "2024-01-15T10:00:00Z",
        status: "read",
      },
      {
        id: "msg-2",
        chatId: "chat-1",
        senderId: "user-1",
        senderName: "You",
        senderAvatar: "👤",
        senderType: "user",
        type: "text",
        content: "I want to launch an e-commerce store in Bangladesh within 21 days with a budget of $10,000",
        timestamp: "2024-01-15T10:01:00Z",
        status: "read",
      },
      {
        id: "msg-3",
        chatId: "chat-1",
        senderId: "agent-main",
        senderName: "Skillhub AI",
        senderAvatar: "🤖",
        senderType: "agent",
        type: "mission-update",
        content: "I've analyzed your outcome and created a mission plan. Here's what I've compiled:\n\n**Mission:** Launch E-commerce Store in Bangladesh\n**Budget:** $10,000\n**Deadline:** 21 days\n**Success Probability:** 94%\n\nI've identified 6 key phases:\n1. Market Research (20h)\n2. Brand Design (40h)\n3. Product Sourcing (60h)\n4. Website Development (120h)\n5. Content Creation (30h)\n6. Marketing Setup (40h)\n\nWould you like me to create an optimized crew for this mission?",
        timestamp: "2024-01-15T10:02:00Z",
        status: "read",
        metadata: {
          missionId: "mission-1",
          successProbability: 94,
          totalHours: 310,
        },
      },
      {
        id: "msg-4",
        chatId: "chat-1",
        senderId: "user-1",
        senderName: "You",
        senderAvatar: "👤",
        senderType: "user",
        type: "text",
        content: "Yes, please create a crew. I want the best team possible within budget",
        timestamp: "2024-01-15T10:03:00Z",
        status: "read",
      },
      {
        id: "msg-5",
        chatId: "chat-1",
        senderId: "agent-main",
        senderName: "Skillhub AI",
        senderAvatar: "🤖",
        senderType: "agent",
        type: "crew-proposal",
        content: "I've created 2 optimized crew options for you:\n\n**Option A: Premium Team**\n- Cost: $8,500\n- Delivery: 18 days\n- Success: 94%\n- Risk: Low\n- Team: 3 humans + 2 AI agents\n\n**Option B: Budget Team**\n- Cost: $6,100\n- Delivery: 24 days\n- Success: 87%\n- Risk: Medium\n- Team: 1 human + 3 AI agents\n\nWhich option would you prefer?",
        timestamp: "2024-01-15T10:04:00Z",
        status: "read",
        metadata: {
          options: [
            { name: "Premium Team", cost: 8500, delivery: 18, success: 94 },
            { name: "Budget Team", cost: 6100, delivery: 24, success: 87 },
          ],
        },
      },
    ],
    lastMessage: {
      id: "msg-5",
      chatId: "chat-1",
      senderId: "agent-main",
      senderName: "Skillhub AI",
      senderAvatar: "🤖",
      senderType: "agent",
      type: "crew-proposal",
      content: "I've created 2 optimized crew options for you...",
      timestamp: "2024-01-15T10:04:00Z",
      status: "read",
    },
    unreadCount: 0,
    isPinned: true,
    isMuted: false,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:04:00Z",
    agentType: "mission-planner",
  },
  {
    id: "chat-2",
    category: "mission-support",
    title: "E-commerce Launch Mission",
    description: "Support chat for active mission",
    participants: [
      {
        id: "user-1",
        name: "You",
        avatar: "👤",
        type: "user",
        status: "online",
      },
      {
        id: "agent-exec",
        name: "Execution Agent",
        avatar: "⚡",
        type: "agent",
        status: "online",
      },
    ],
    messages: [
      {
        id: "msg-6",
        chatId: "chat-2",
        senderId: "agent-exec",
        senderName: "Execution Agent",
        senderAvatar: "⚡",
        senderType: "agent",
        type: "system",
        content: "Mission started! I'll monitor progress and alert you of any issues.",
        timestamp: "2024-01-16T09:00:00Z",
        status: "read",
      },
      {
        id: "msg-7",
        chatId: "chat-2",
        senderId: "agent-exec",
        senderName: "Execution Agent",
        senderAvatar: "⚡",
        senderType: "agent",
        type: "mission-update",
        content: "**Progress Update:**\n\n✅ Market Research - Completed\n✅ Brand Design - Completed\n🔄 Product Sourcing - 65% complete\n🔄 Website Development - 45% complete\n⏳ Content Creation - Pending\n⏳ Marketing Setup - Pending\n\n**Overall Progress:** 62%\n**Deadline Confidence:** 93%\n\nAll tasks are on track. No issues detected.",
        timestamp: "2024-01-18T14:00:00Z",
        status: "read",
        metadata: {
          progress: 62,
          deadlineConfidence: 93,
        },
      },
    ],
    lastMessage: {
      id: "msg-7",
      chatId: "chat-2",
      senderId: "agent-exec",
      senderName: "Execution Agent",
      senderAvatar: "⚡",
      senderType: "agent",
      type: "mission-update",
      content: "Progress Update: 62% complete...",
      timestamp: "2024-01-18T14:00:00Z",
      status: "read",
    },
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    createdAt: "2024-01-16T09:00:00Z",
    updatedAt: "2024-01-18T14:00:00Z",
    missionId: "mission-1",
    agentType: "execution-agent",
  },
  {
    id: "chat-3",
    category: "worker-chat",
    title: "Ahmed Hassan",
    description: "Full-stack Developer",
    participants: [
      {
        id: "user-1",
        name: "You",
        avatar: "👤",
        type: "user",
        status: "online",
      },
      {
        id: "worker-2",
        name: "Ahmed Hassan",
        avatar: "👨‍💻",
        type: "worker",
        status: "online",
      },
    ],
    messages: [
      {
        id: "msg-8",
        chatId: "chat-3",
        senderId: "worker-2",
        senderName: "Ahmed Hassan",
        senderAvatar: "👨‍💻",
        senderType: "worker",
        type: "text",
        content: "Hi! I've started working on the website development task. I'll have the initial setup ready by tomorrow.",
        timestamp: "2024-01-17T11:00:00Z",
        status: "read",
      },
      {
        id: "msg-9",
        chatId: "chat-3",
        senderId: "user-1",
        senderName: "You",
        senderAvatar: "👤",
        senderType: "user",
        type: "text",
        content: "Great! Can you also integrate the payment gateway?",
        timestamp: "2024-01-17T11:05:00Z",
        status: "read",
      },
      {
        id: "msg-10",
        chatId: "chat-3",
        senderId: "worker-2",
        senderName: "Ahmed Hassan",
        senderAvatar: "👨‍💻",
        senderType: "worker",
        type: "text",
        content: "Yes, I'll integrate Stripe for payments. I'll need your API keys. Can you share them securely?",
        timestamp: "2024-01-17T11:10:00Z",
        status: "read",
      },
    ],
    lastMessage: {
      id: "msg-10",
      chatId: "chat-3",
      senderId: "worker-2",
      senderName: "Ahmed Hassan",
      senderAvatar: "👨‍💻",
      senderType: "worker",
      type: "text",
      content: "Yes, I'll integrate Stripe for payments...",
      timestamp: "2024-01-17T11:10:00Z",
      status: "read",
    },
    unreadCount: 1,
    isPinned: false,
    isMuted: false,
    createdAt: "2024-01-17T11:00:00Z",
    updatedAt: "2024-01-17T11:10:00Z",
    workerId: "worker-2",
  },
];

// ===== AI RESPONSE GENERATOR =====

export function generateAIResponse(message: string, agentType: string): string {
  const lowerMessage = message.toLowerCase();

  // Mission Planner responses
  if (agentType === "mission-planner") {
    if (lowerMessage.includes("create") || lowerMessage.includes("mission")) {
      return "I'll help you create a mission. Please describe the outcome you want to achieve, your budget, and deadline. I'll break it down into an optimized work graph with tasks, dependencies, and timeline.";
    }
    if (lowerMessage.includes("timeline") || lowerMessage.includes("how long")) {
      return "Based on the mission complexity and available resources, I estimate this will take approximately 18-24 days. The critical path includes 4 key tasks that must be completed sequentially. Would you like me to show you the detailed timeline?";
    }
    if (lowerMessage.includes("work graph") || lowerMessage.includes("dependencies")) {
      return "I've mapped out the work graph with 6 main phases and their dependencies. The critical path runs through Market Research → Brand Design → Website Development → Marketing Setup. Several tasks can run in parallel to optimize delivery time.";
    }
  }

  // Workforce Agent responses
  if (agentType === "workforce-agent") {
    if (lowerMessage.includes("crew") || lowerMessage.includes("team")) {
      return "I can create an optimized crew for your mission. I'll consider skills, availability, timezone, budget, and past performance to build the best team. Would you like a premium team (higher success rate) or a budget team (lower cost)?";
    }
    if (lowerMessage.includes("find") || lowerMessage.includes("worker")) {
      return "I found several qualified workers for your requirements. Based on skills, ratings, and availability, here are the top matches. Would you like me to check their availability and create a crew proposal?";
    }
    if (lowerMessage.includes("skill") || lowerMessage.includes("match")) {
      return "I've analyzed the skill requirements and found workers with matching expertise. Each worker has verified skills with evidence from past missions. I can show you their outcome history and success rates.";
    }
  }

  // Execution Agent responses
  if (agentType === "execution-agent") {
    if (lowerMessage.includes("status") || lowerMessage.includes("progress")) {
      return "Current mission progress is 62% complete. All tasks are on track with 93% deadline confidence. The team is working efficiently with no blockers. Next milestone is due in 3 days.";
    }
    if (lowerMessage.includes("block") || lowerMessage.includes("issue")) {
      return "I've detected a potential issue: one worker has been inactive for 14 hours. I'm initiating the self-healing protocol to find a replacement. Deadline confidence has been recalculated to 91%. I'll keep you updated.";
    }
    if (lowerMessage.includes("assign") || lowerMessage.includes("task")) {
      return "I've assigned the next task to the most suitable worker based on skills, availability, and workload balance. The task has been added to their queue with clear requirements and deadline.";
    }
  }

  // Risk Agent responses
  if (agentType === "risk-agent") {
    if (lowerMessage.includes("risk") || lowerMessage.includes("assess")) {
      return "I've assessed the mission risks. Overall risk level: LOW. Key risks identified:\n\n1. Supplier delays (Medium severity, 20% probability)\n2. Payment integration issues (Low severity, 10% probability)\n\nMitigation strategies are in place. Deadline confidence: 93%, Budget confidence: 96%.";
    }
    if (lowerMessage.includes("mitigate") || lowerMessage.includes("backup")) {
      return "I've created mitigation strategies for each identified risk:\n\n1. For supplier delays: Backup suppliers identified, 3-day buffer added\n2. For payment issues: Early testing scheduled, fallback payment method ready\n\nThese strategies maintain 93% deadline confidence.";
    }
    if (lowerMessage.includes("confidence") || lowerMessage.includes("probability")) {
      return "Current success probability: 94%\n- Deadline confidence: 93%\n- Budget confidence: 96%\n- Quality confidence: 94%\n\nThis is based on team performance, task progress, and risk factors. All metrics are above our 85% threshold.";
    }
  }

  // Proof Agent responses
  if (agentType === "proof-agent") {
    if (lowerMessage.includes("verify") || lowerMessage.includes("deliverable")) {
      return "I'm verifying the deliverable against requirements. Checking:\n\n✓ Technical specifications\n✓ Quality standards\n✓ Acceptance criteria\n✓ Business requirements\n\nVerification in progress. I'll provide a detailed report shortly.";
    }
    if (lowerMessage.includes("quality") || lowerMessage.includes("check")) {
      return "Quality assessment complete. Score: 96/100\n\nStrengths:\n- Clean code structure\n- Proper documentation\n- All tests passing\n\nMinor improvements:\n- Add more edge case tests\n- Optimize performance\n\nOverall: EXCELLENT quality.";
    }
    if (lowerMessage.includes("outcome") || lowerMessage.includes("validate")) {
      return "Outcome validation complete. Business requirements met:\n\n✓ All deliverables submitted\n✓ Quality standards exceeded\n✓ Timeline met (2 days early)\n✓ Budget within limits\n\nFinal outcome score: 96/100. Mission successful!";
    }
  }

  // Default response
  return "I understand your request. Let me analyze this and provide you with the best solution. Could you provide more details about your specific requirements? I'm here to help you achieve your outcome efficiently.";
}
