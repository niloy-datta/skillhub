import { useState } from 'react';
import { CHATS } from '../../data';

export function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(CHATS[0]);
  const [message, setMessage] = useState('');

  return (
    <div className="flex h-screen pt-20">
      {/* Sidebar */}
      <div className="w-80 border-r border-midnight/10 bg-white">
        <div className="border-b border-midnight/10 p-4">
          <h2 className="font-display text-xl font-bold text-midnight">Messages</h2>
        </div>
        <div className="overflow-y-auto">
          {CHATS.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`w-full border-b border-midnight/5 p-4 text-left transition-colors hover:bg-mist ${
                selectedChat.id === chat.id ? 'bg-indigo/10' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{chat.participants[1]?.avatar}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-midnight">{chat.title}</p>
                  {chat.lastMessage && (
                    <p className="truncate text-sm text-midnight/60">{chat.lastMessage.content}</p>
                  )}
                </div>
                {chat.unreadCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo text-xs font-bold text-white">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col">
        <div className="border-b border-midnight/10 bg-white p-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{selectedChat.participants[1]?.avatar}</span>
            <div>
              <p className="font-semibold text-midnight">{selectedChat.title}</p>
              <p className="text-sm text-emerald">● Online</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-cream p-4">
          {selectedChat.messages.map((msg) => (
            <div key={msg.id} className={`mb-4 flex ${msg.senderType === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                msg.senderType === 'user'
                  ? 'bg-gradient-to-r from-indigo to-violet text-white'
                  : 'bg-white text-midnight'
              }`}>
                <p className="text-sm">{msg.content}</p>
                <p className={`mt-1 text-xs ${msg.senderType === 'user' ? 'text-white/60' : 'text-midnight/40'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-midnight/10 bg-white p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setMessage('');
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded-xl border-2 border-midnight/20 bg-cream px-4 py-2 outline-none focus:border-indigo"
            />
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-indigo to-violet px-6 py-2 font-semibold text-white"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
