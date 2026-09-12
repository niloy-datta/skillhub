# 🤖 Chatbot System - Spring Boot Integration Guide

## ✅ Frontend Implementation Complete

The chatbot system has been fully implemented in React/TypeScript with:

### Features Implemented
- ✅ **5 AI Agents** (Mission Planner, Workforce, Execution, Risk, Proof)
- ✅ **Chat Sidebar** with search, filters, and conversation list
- ✅ **Chat Window** with real-time messages
- ✅ **Message Types** (text, mission-update, crew-proposal, system, typing)
- ✅ **AI Commands** (/create-mission, /build-crew, /check-status, etc.)
- ✅ **Chat Suggestions** for quick actions
- ✅ **Typing Indicators** for real-time feel
- ✅ **Message Attachments** support
- ✅ **Message Reactions** support
- ✅ **Chat History** with search
- ✅ **Multiple Chat Categories** (AI Assistant, Mission Support, Worker Chat)

---

## 🚀 Spring Boot Backend Integration

### 1. Project Structure

```
skillhub-backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── skillhub/
│   │   │           ├── SkillhubApplication.java
│   │   │           ├── config/
│   │   │           │   ├── WebSocketConfig.java
│   │   │           │   ├── SecurityConfig.java
│   │   │           │   └── CorsConfig.java
│   │   │           ├── controller/
│   │   │           │   ├── ChatController.java
│   │   │           │   ├── MessageController.java
│   │   │           │   └── AgentController.java
│   │   │           ├── service/
│   │   │           │   ├── ChatService.java
│   │   │           │   ├── MessageService.java
│   │   │           │   ├── AgentService.java
│   │   │           │   └── WebSocketService.java
│   │   │           ├── model/
│   │   │           │   ├── Chat.java
│   │   │           │   ├── Message.java
│   │   │           │   ├── Participant.java
│   │   │           │   └── Agent.java
│   │   │           ├── repository/
│   │   │           │   ├── ChatRepository.java
│   │   │           │   └── MessageRepository.java
│   │   │           └── websocket/
│   │   │               ├── WebSocketHandler.java
│   │   │               └── MessageHandler.java
│   │   └── resources/
│   │       ├── application.yml
│   │       └── schema.sql
│   └── test/
├── pom.xml
└── README.md
```

### 2. Dependencies (pom.xml)

```xml
<dependencies>
    <!-- Spring Boot Starters -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-websocket</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    
    <!-- Database -->
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <scope>runtime</scope>
    </dependency>
    
    <!-- AI Integration -->
    <dependency>
        <groupId>com.google.cloud</groupId>
        <artifactId>google-cloud-aiplatform</artifactId>
        <version>3.35.0</version>
    </dependency>
    
    <!-- Utilities -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
</dependencies>
```

### 3. Database Schema (schema.sql)

```sql
-- Chats table
CREATE TABLE chats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    mission_id UUID,
    worker_id UUID,
    agent_type VARCHAR(50),
    is_pinned BOOLEAN DEFAULT FALSE,
    is_muted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chat participants
CREATE TABLE chat_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
    user_id UUID,
    participant_type VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'offline',
    last_seen TIMESTAMP,
    is_typing BOOLEAN DEFAULT FALSE
);

-- Messages table
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL,
    sender_name VARCHAR(255) NOT NULL,
    sender_avatar VARCHAR(50),
    sender_type VARCHAR(50) NOT NULL,
    message_type VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    metadata JSONB,
    status VARCHAR(50) DEFAULT 'sent',
    reply_to UUID REFERENCES messages(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Attachments table
CREATE TABLE attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
    attachment_type VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    size BIGINT,
    mime_type VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Message reactions
CREATE TABLE message_reactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    emoji VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(message_id, user_id, emoji)
);

-- Indexes
CREATE INDEX idx_messages_chat_id ON messages(chat_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
CREATE INDEX idx_chat_participants_chat_id ON chat_participants(chat_id);
CREATE INDEX idx_chat_participants_user_id ON chat_participants(user_id);
```

### 4. Entity Classes

```java
// Chat.java
@Entity
@Table(name = "chats")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Column(nullable = false)
    private String category;
    
    @Column(nullable = false)
    private String title;
    
    private String description;
    
    private UUID missionId;
    private UUID workerId;
    private String agentType;
    
    private Boolean isPinned = false;
    private Boolean isMuted = false;
    
    @OneToMany(mappedBy = "chat", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChatParticipant> participants;
    
    @OneToMany(mappedBy = "chat", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("createdAt ASC")
    private List<Message> messages;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @Transient
    private Message lastMessage;
    
    @Transient
    private Integer unreadCount;
}

// Message.java
@Entity
@Table(name = "messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @ManyToOne
    @JoinColumn(name = "chat_id", nullable = false)
    private Chat chat;
    
    @Column(name = "sender_id", nullable = false)
    private UUID senderId;
    
    @Column(name = "sender_name", nullable = false)
    private String senderName;
    
    private String senderAvatar;
    
    @Column(name = "sender_type", nullable = false)
    private String senderType;
    
    @Column(name = "message_type", nullable = false)
    private String messageType;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;
    
    @Column(columnDefinition = "jsonb")
    private String metadata;
    
    private String status;
    
    @Column(name = "reply_to")
    private UUID replyTo;
    
    @OneToMany(mappedBy = "message", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Attachment> attachments;
    
    @OneToMany(mappedBy = "message", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MessageReaction> reactions;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
```

### 5. WebSocket Configuration

```java
// WebSocketConfig.java
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(chatWebSocketHandler(), "/ws/chat")
                .setAllowedOrigins("http://localhost:5173") // React dev server
                .withSockJS();
    }
    
    @Bean
    public WebSocketHandler chatWebSocketHandler() {
        return new ChatWebSocketHandler();
    }
}

// ChatWebSocketHandler.java
@Component
public class ChatWebSocketHandler extends TextWebSocketHandler {
    
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    
    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        String userId = session.getUri().getQuery().split("=")[1];
        sessions.put(userId, session);
    }
    
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        WebSocketMessage wsMessage = objectMapper.readValue(message.getPayload(), WebSocketMessage.class);
        
        switch (wsMessage.getType()) {
            case "message":
                handleMessage(wsMessage);
                break;
            case "typing":
                handleTyping(wsMessage);
                break;
            case "read":
                handleRead(wsMessage);
                break;
        }
    }
    
    private void handleMessage(WebSocketMessage wsMessage) {
        // Save message to database
        // Broadcast to all participants
        // Trigger AI response if needed
    }
    
    public void sendMessageToUser(String userId, Object message) throws IOException {
        WebSocketSession session = sessions.get(userId);
        if (session != null && session.isOpen()) {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
        }
    }
}
```

### 6. REST API Controller

```java
// ChatController.java
@RestController
@RequestMapping("/api/chats")
@RequiredArgsConstructor
public class ChatController {
    
    private final ChatService chatService;
    
    @GetMapping
    public ResponseEntity<List<Chat>> getUserChats(@RequestParam UUID userId) {
        return ResponseEntity.ok(chatService.getUserChats(userId));
    }
    
    @GetMapping("/{chatId}")
    public ResponseEntity<Chat> getChat(@PathVariable UUID chatId) {
        return ResponseEntity.ok(chatService.getChat(chatId));
    }
    
    @PostMapping
    public ResponseEntity<Chat> createChat(@RequestBody CreateChatRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(chatService.createChat(request));
    }
    
    @DeleteMapping("/{chatId}")
    public ResponseEntity<Void> deleteChat(@PathVariable UUID chatId) {
        chatService.deleteChat(chatId);
        return ResponseEntity.noContent().build();
    }
}

// MessageController.java
@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {
    
    private final MessageService messageService;
    
    @GetMapping("/chat/{chatId}")
    public ResponseEntity<List<Message>> getChatMessages(
            @PathVariable UUID chatId,
            @RequestParam(defaultValue = "50") int limit,
            @RequestParam(required = false) UUID before) {
        return ResponseEntity.ok(messageService.getMessages(chatId, limit, before));
    }
    
    @PostMapping
    public ResponseEntity<Message> sendMessage(@RequestBody SendMessageRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(messageService.sendMessage(request));
    }
    
    @PutMapping("/{messageId}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable UUID messageId) {
        messageService.markAsRead(messageId);
        return ResponseEntity.ok().build();
    }
}
```

### 7. AI Agent Service

```java
// AgentService.java
@Service
@RequiredArgsConstructor
public class AgentService {
    
    private final VertexAiClient vertexAiClient;
    
    public String generateResponse(String userMessage, String agentType) {
        String prompt = buildPrompt(userMessage, agentType);
        
        // Call Google Vertex AI (Gemini)
        String response = vertexAiClient.generateContent(prompt);
        
        return response;
    }
    
    private String buildPrompt(String userMessage, String agentType) {
        return switch (agentType) {
            case "mission-planner" -> buildMissionPlannerPrompt(userMessage);
            case "workforce-agent" -> buildWorkforceAgentPrompt(userMessage);
            case "execution-agent" -> buildExecutionAgentPrompt(userMessage);
            case "risk-agent" -> buildRiskAgentPrompt(userMessage);
            case "proof-agent" -> buildProofAgentPrompt(userMessage);
            default -> "You are a helpful AI assistant. " + userMessage;
        };
    }
    
    private String buildMissionPlannerPrompt(String userMessage) {
        return """
            You are the Mission Planner Agent for Skillhub.
            Your role is to analyze outcomes and create optimized work graphs.
            
            Capabilities:
            - Break down complex outcomes into actionable tasks
            - Identify task dependencies and critical paths
            - Estimate realistic timelines
            
            User message: %s
            
            Provide a helpful, detailed response.
            """.formatted(userMessage);
    }
    
    // Similar methods for other agents...
}
```

### 8. Frontend Integration

Update the API client in frontend to connect to Spring Boot backend:

```typescript
// src/infrastructure/chatApi.ts

const API_BASE_URL = 'http://localhost:8080/api';

export class ChatApi {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  async getChats(): Promise<Chat[]> {
    const response = await fetch(`${API_BASE_URL}/chats`, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    });
    return response.json();
  }

  async getMessages(chatId: string): Promise<ChatMessage[]> {
    const response = await fetch(`${API_BASE_URL}/messages/chat/${chatId}`, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    });
    return response.json();
  }

  async sendMessage( any): Promise<ChatMessage> {
    const response = await fetch(`${API_BASE_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}

// WebSocket connection
export function connectWebSocket(userId: string, onMessage: (message: any) => void) {
  const socket = new SockJS('http://localhost:8080/ws/chat');
  const stompClient = Stomp.over(socket);
  
  stompClient.connect({}, () => {
    stompClient.subscribe(`/user/${userId}/queue/messages`, (message) => {
      onMessage(JSON.parse(message.body));
    });
  });
  
  return stompClient;
}
```

---

## 🎯 Deployment

### Backend Deployment (Google Cloud Run)

```bash
# Build JAR
./mvnw clean package

# Deploy to Cloud Run
gcloud run deploy skillhub-backend \
  --image gcr.io/YOUR_PROJECT/skillhub-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars DATABASE_URL=...,AI_API_KEY=...
```

### Frontend Deployment

```bash
# Build frontend
npm run build

# Deploy to Cloud Run
gcloud run deploy skillhub-frontend \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

---

## 📊 API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/chats` | Get user's chats |
| GET | `/api/chats/{id}` | Get specific chat |
| POST | `/api/chats` | Create new chat |
| DELETE | `/api/chats/{id}` | Delete chat |
| GET | `/api/messages/chat/{chatId}` | Get chat messages |
| POST | `/api/messages` | Send message |
| PUT | `/api/messages/{id}/read` | Mark as read |
| WS | `/ws/chat` | WebSocket connection |

---

## ✅ Summary

**Frontend:** ✅ Complete chatbot system implemented  
**Backend:** 📋 Spring Boot integration guide provided  
**Database:** 📋 PostgreSQL schema provided  
**AI Integration:** 📋 Google Vertex AI (Gemini) integration guide  
**WebSocket:** 📋 Real-time messaging setup guide  
**Deployment:** 📋 Google Cloud Run deployment guide  

The chatbot system is production-ready on the frontend and fully documented for Spring Boot backend integration! 🚀
