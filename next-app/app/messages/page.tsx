'use client';

import { useState } from 'react';

const CHATS = [
  { id: 'chat1', name: 'Ahmed Hassan', avatar: '👨‍🔧', lastMessage: 'I\'ll start tomorrow morning', time: '2h ago', unread: 2 },
  { id: 'chat2', name: 'Yuki Tanaka', avatar: '👩', lastMessage: 'Thank you for the opportunity!', time: '1d ago', unread: 0 },
];

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(CHATS[0]);
  const [message, setMessage] = useState('');

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <div className="flex h-[calc(100vh-5rem)]">
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Messages</h2>
          </div>
          {CHATS.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`w-full p-4 border-b border-gray-200 text-left transition-all ${
                selectedChat.id === chat.id ? 'bg-indigo-500/10' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{chat.avatar}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-gray-900">{chat.name}</p>
                    {chat.unread > 0 && (
                      <span className="bg-indigo-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  <p className="text-xs text-gray-400 mt-1">{chat.time}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{selectedChat.avatar}</span>
              <div>
                <p className="font-semibold text-gray-900">{selectedChat.name}</p>
                <p className="text-sm text-emerald-600">● Online</p>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
            <div className="mb-4 flex justify-start">
              <div className="max-w-[70%] bg-white px-4 py-3 rounded-2xl">
                <p className="text-sm">Hi! I'm available to start tomorrow.</p>
                <p className="text-xs text-gray-400 mt-1">10:30 AM</p>
              </div>
            </div>
            <div className="mb-4 flex justify-end">
              <div className="max-w-[70%] bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-3 rounded-2xl">
                <p className="text-sm">Great! Can you handle electrical work too?</p>
                <p className="text-xs text-white/60 mt-1">10:35 AM</p>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 bg-white">
            <form onSubmit={(e) => { e.preventDefault(); setMessage(''); }} className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 outline-none focus:border-indigo-500"
              />
              <button type="submit" className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
