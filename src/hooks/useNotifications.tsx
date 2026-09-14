import { useState, useEffect } from 'react';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  timestamp: number;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (type: Notification['type'], message: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: Date.now(),
    };
    setNotifications(prev => [...prev, newNotification]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return {
    notifications,
    addNotification,
    removeNotification,
  };
}

export function NotificationContainer({ notifications, onRemove }: { 
  notifications: Notification[];
  onRemove: (id: string) => void;
}) {
  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
  };

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-3">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className="animate-slideIn"
        >
          <div className={`${colors[notification.type]} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[300px]`}>
            <span className="text-2xl font-bold">{icons[notification.type]}</span>
            <span className="flex-1 font-semibold">{notification.message}</span>
            <button 
              onClick={() => onRemove(notification.id)}
              className="text-white/80 hover:text-white text-xl"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
