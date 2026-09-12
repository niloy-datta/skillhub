import { useState } from 'react';
import type { Chat, ChatMessage } from '../../types/chat';
import { SAMPLE_CHATS } from '../../data/chat';
import { ChatSidebar } from '../chat/ChatSidebar';
import { ChatWindow } from '../chat/ChatWindow';

interface ChatPageProps {
  onNavigate: (view: any) => void;
}

export function ChatPage({ onNavigate }: ChatPageProps) {
  const [chats, setChats] = useState<Chat[]>(SAMPLE_CHATS);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(SAMPLE_CHATS[0]);

  const handleSendMessage = (chatId: string, message: ChatMessage) => {
    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: [...chat.messages, message],
            lastMessage: message,
            updatedAt: new Date().toISOString(),
          };
        }
        return chat;
      })
    );

    // Update selected chat
    if (selectedChat?.id === chatId) {
      setSelectedChat((prev) =>
        prev
          ? {
              ...prev,
              messages: [...prev.messages, message],
              lastMessage: message,
              updatedAt: new Date().toISOString(),
            }
          : null
      );
    }
  };

  const handleNewChat = () => {
    const newChat: Chat = {
      id: `chat-${Date.now()}`,
      category: 'ai-assistant',
      title: 'New Chat',
      participants: [
        {
          id: 'user-1',
          name: 'You',
          avatar: '👤',
          type: 'user',
          status: 'online',
        },
        {
          id: 'agent-main',
          name: 'Skillhub AI',
          avatar: '🤖',
          type: 'agent',
          status: 'online',
        },
      ],
      messages: [
        {
          id: `msg-${Date.now()}`,
          chatId: `chat-${Date.now()}`,
          senderId: 'agent-main',
          senderName: 'Skillhub AI',
          senderAvatar: '🤖',
          senderType: 'agent',
          type: 'text',
          content: 'Hello! How can I help you today?',
          timestamp: new Date().toISOString(),
          status: 'delivered',
        },
      ],
      unreadCount: 0,
      isPinned: false,
      isMuted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setChats([newChat, ...chats]);
    setSelectedChat(newChat);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-midnight via-charcoal to-midnight pt-20">
      {/* Sidebar */}
      <ChatSidebar
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
        onNewChat={handleNewChat}
      />

      {/* Chat Window */}
      {selectedChat ? (
        <ChatWindow chat={selectedChat} onSendMessage={handleSendMessage} />
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="mb-4 text-6xl">💬</div>
            <h2 className="mb-2 font-display text-2xl font-bold text-white">
              Select a chat to start
            </h2>
            <p className="text-white/60">Choose a conversation from the sidebar</p>
          </div>
        </div>
      )}
    </div>
  );
}
