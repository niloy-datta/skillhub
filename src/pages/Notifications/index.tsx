import { useState } from 'react';
import { NOTIFICATIONS } from '../../data';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => !n.read);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">Notifications</h1>
            <p className="text-gray-600">
              {notifications.filter(n => !n.read).length} unread notifications
            </p>
          </div>
          <button
            onClick={markAllAsRead}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:shadow-lg transition-all"
          >
            Mark all as read
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              filter === 'all' 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' 
                : 'bg-white text-gray-600 border-2 border-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              filter === 'unread' 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' 
                : 'bg-white text-gray-600 border-2 border-gray-200'
            }`}
          >
            Unread
          </button>
        </div>

        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={`bg-white border-2 rounded-2xl p-6 cursor-pointer transition-all hover:shadow-lg ${
                notification.read ? 'border-gray-200' : 'border-indigo-300 bg-indigo-50/30'
              }`}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{notification.icon}</span>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900">{notification.title}</h3>
                    {!notification.read && (
                      <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{notification.message}</p>
                  <p className="text-sm text-gray-400">{new Date(notification.timestamp).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-16">
            <span className="text-6xl mb-4 block">📭</span>
            <p className="text-xl text-gray-600">No notifications</p>
          </div>
        )}
      </div>
    </div>
  );
}
