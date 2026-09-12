import { useState } from 'react';
import type { Chat } from '../../types/chat';
import { SAMPLE_CHATS } from '../../data/chat';

interface ChatSidebarProps {
  selectedChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
  onNewChat: () => void;
}

export function ChatSidebar({ selectedChat, onSelectChat, onNewChat }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'ai-assistant' | 'mission-support' | 'worker-chat'>('all');

  const filteredChats = SAMPLE_CHATS.filter((chat) => {
    const matchesSearch = chat.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || chat.category === filter;
    return matchesSearch && matchesFilter;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ai-assistant': return '🤖';
      case 'mission-support': return '🎯';
      case 'worker-chat': return '💬';
      default: return '💬';
    }
  };

  return (
    <div className="flex h-full w-80 flex-col border-r border-white/10 bg-midnight/50">
      {/* Header */}
      <div className="border-b border-white/10 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-white">Chats</h2>
          <button
            onClick={onNewChat}
            className="rounded-full bg-gradient-to-r from-indigo to-violet p-2 text-white transition-all hover:scale-105"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chats..."
            className="w-full rounded-xl border-2 border-white/20 bg-white/5 px-4 py-2 pl-10 text-sm text-white placeholder:text-white/40 outline-none focus:border-indigo"
          />
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Filters */}
        <div className="mt-3 flex gap-2">
          {(['all', 'ai-assistant', 'mission-support', 'worker-chat'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                filter === f
                  ? 'bg-indigo text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {f === 'all' ? 'All' : f.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`w-full border-b border-white/5 p-4 text-left transition-all hover:bg-white/5 ${
              selectedChat?.id === chat.id ? 'bg-white/10' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo to-violet text-lg">
                {getCategoryIcon(chat.category)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="truncate font-semibold text-white">{chat.title}</h3>
                  {chat.unreadCount > 0 && (
                    <span className="ml-2 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-indigo text-xs font-bold text-white">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
                {chat.lastMessage && (
                  <p className="mt-1 truncate text-sm text-white/60">
                    {chat.lastMessage.content}
                  </p>
                )}
                <div className="mt-1 flex items-center gap-2">
                  {chat.isPinned && (
                    <span className="text-xs text-amber">📌</span>
                  )}
                  <span className="text-xs text-white/40">
                    {new Date(chat.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
