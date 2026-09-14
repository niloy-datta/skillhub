import { useState } from 'react';

export function AdvancedMessaging() {
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState('');

  const chats = [
    {
      id: 0,
      name: 'Ahmed Hassan',
      avatar: '👨‍🔧',
      status: 'online',
      lastMessage: 'I\'ll start tomorrow morning',
      time: '2h ago',
      unread: 2,
      messages: [
        { id: 1, sender: 'them', text: 'Hi! I\'m interested in your construction project.', time: '10:30 AM' },
        { id: 2, sender: 'me', text: 'Great! Can you handle electrical work too?', time: '10:35 AM' },
        { id: 3, sender: 'them', text: 'Yes, I\'m certified in both construction and electrical work.', time: '10:40 AM' },
        { id: 4, sender: 'me', text: 'Perfect! What\'s your availability?', time: '10:45 AM' },
        { id: 5, sender: 'them', text: 'I\'ll start tomorrow morning', time: '11:00 AM' },
      ],
    },
    {
      id: 1,
      name: 'Yuki Tanaka',
      avatar: '👩',
      status: 'online',
      lastMessage: 'Thank you for the opportunity!',
      time: '1d ago',
      unread: 0,
      messages: [
        { id: 1, sender: 'them', text: 'Hi! I saw your cleaning task posting.', time: 'Yesterday' },
        { id: 2, sender: 'me', text: 'Yes, are you available this week?', time: 'Yesterday' },
        { id: 3, sender: 'them', text: 'Yes, I can start on Wednesday.', time: 'Yesterday' },
        { id: 4, sender: 'me', text: 'Great! Let\'s proceed.', time: 'Yesterday' },
        { id: 5, sender: 'them', text: 'Thank you for the opportunity!', time: 'Yesterday' },
      ],
    },
    {
      id: 2,
      name: 'TechCorp Inc.',
      avatar: '🏢',
      status: 'offline',
      lastMessage: 'Payment processed successfully',
      time: '3d ago',
      unread: 0,
      messages: [
        { id: 1, sender: 'them', text: 'Project completed successfully!', time: '3 days ago' },
        { id: 2, sender: 'me', text: 'Thank you! It was a pleasure working with you.', time: '3 days ago' },
        { id: 3, sender: 'them', text: 'Payment processed successfully', time: '3 days ago' },
      ],
    },
  ];

  const currentChat = chats[selectedChat];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-black text-gray-900 mb-2">
            Messages <span className="gradient-text">Hub</span>
          </h1>
          <p className="text-xl text-gray-600">Communicate with clients and workers</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 h-full">
            {/* Chat List */}
            <div className="border-r border-gray-200 overflow-y-auto">
              <div className="p-4 border-b border-gray-200">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              <div>
                {chats.map((chat, i) => (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedChat(i)}
                    className={`w-full p-4 border-b border-gray-100 text-left transition-all ${
                      selectedChat === i ? 'bg-indigo-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-2xl shadow-lg">
                          {chat.avatar}
                        </div>
                        {chat.status === 'online' && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold text-gray-900 truncate">{chat.name}</h3>
                          {chat.unread > 0 && (
                            <span className="w-5 h-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                              {chat.unread}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                        <p className="text-xs text-gray-500 mt-1">{chat.time}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="md:col-span-2 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-2xl shadow-lg">
                    {currentChat.avatar}
                  </div>
                  {currentChat.status === 'online' && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{currentChat.name}</h3>
                  <p className={`text-sm ${currentChat.status === 'online' ? 'text-green-600' : 'text-gray-500'}`}>
                    {currentChat.status === 'online' ? '● Online' : '○ Offline'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-xl hover:bg-gray-100 transition-all">
                    <span className="text-xl">📞</span>
                  </button>
                  <button className="p-2 rounded-xl hover:bg-gray-100 transition-all">
                    <span className="text-xl">📹</span>
                  </button>
                  <button className="p-2 rounded-xl hover:bg-gray-100 transition-all">
                    <span className="text-xl">⋮</span>
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                {currentChat.messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                        msg.sender === 'me'
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                          : 'bg-white text-gray-900 border border-gray-200'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-white/60' : 'text-gray-500'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex gap-2">
                  <button className="p-3 rounded-xl hover:bg-gray-100 transition-all">
                    <span className="text-xl">📎</span>
                  </button>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 outline-none transition-all"
                  />
                  <button className="p-3 rounded-xl hover:bg-gray-100 transition-all">
                    <span className="text-xl">😊</span>
                  </button>
                  <button className="btn-shine px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
