import { useEffect, useRef, useState } from 'react';
import type { Chat, ChatMessage } from '../../types/chat';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { generateAIResponse } from '../../data/chat';

interface ChatWindowProps {
  chat: Chat;
  onSendMessage: (chatId: string, message: ChatMessage) => void;
}

export function ChatWindow({ chat, onSendMessage }: ChatWindowProps) {
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  const handleSendMessage = (content: string) => {
    // Create user message
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      chatId: chat.id,
      senderId: 'user-1',
      senderName: 'You',
      senderAvatar: '👤',
      senderType: 'user',
      type: 'text',
      content,
      timestamp: new Date().toISOString(),
      status: 'sent',
    };

    onSendMessage(chat.id, userMessage);

    // Simulate AI response
    if (chat.category === 'ai-assistant' || chat.category === 'mission-support') {
      setIsAgentTyping(true);

      setTimeout(() => {
        const agentParticipant = chat.participants.find((p) => p.type === 'agent');
        const agentType = chat.agentType || 'mission-planner';
        
        const aiMessage: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          chatId: chat.id,
          senderId: agentParticipant?.id || 'agent-main',
          senderName: agentParticipant?.name || 'Skillhub AI',
          senderAvatar: agentParticipant?.avatar || '🤖',
          senderType: 'agent',
          type: 'text',
          content: generateAIResponse(content, agentType),
          timestamp: new Date().toISOString(),
          status: 'delivered',
        };

        setIsAgentTyping(false);
        onSendMessage(chat.id, aiMessage);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      {/* Chat Header */}
      <div className="border-b border-white/10 bg-midnight/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo to-violet text-lg">
              {chat.participants[1]?.avatar || '🤖'}
            </div>
            <div>
              <h3 className="font-semibold text-white">{chat.title}</h3>
              <p className="text-xs text-white/60">
                {chat.participants[1]?.status === 'online' ? (
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald"></span>
                    Online
                  </span>
                ) : (
                  'Offline'
                )}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="rounded-lg bg-white/5 p-2 text-white/60 transition-all hover:bg-white/10 hover:text-white">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <button className="rounded-lg bg-white/5 p-2 text-white/60 transition-all hover:bg-white/10 hover:text-white">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0m0v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {chat.messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.senderType === 'user'}
          />
        ))}
        {isAgentTyping && (
          <MessageBubble
            message={{
              id: 'typing',
              chatId: chat.id,
              senderId: 'agent',
              senderName: 'Agent',
              senderAvatar: '🤖',
              senderType: 'agent',
              type: 'typing',
              content: '',
              timestamp: new Date().toISOString(),
              status: 'sent',
            }}
            isOwn={false}
          />
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} isAgentTyping={isAgentTyping} />
    </div>
  );
}
