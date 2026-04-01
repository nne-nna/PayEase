import { useState, useEffect } from "react";
import { Bell, Check, CheckCheck } from "lucide-react";
import api from "../api/axios";
import useToast from "../hooks/useToast";

const getNotificationStyle = (type) => {
  switch (type) {
    case "WALLET_FUNDED":
      return {
        color: "text-green-600 dark:text-green-400",
        bg: "bg-green-50 dark:bg-green-900/20",
        icon: "💰",
      };
    case "BILL_PAYMENT_SUCCESS":
      return {
        color: "text-blue-600 dark:text-blue-400",
        bg: "bg-blue-50 dark:bg-blue-900/20",
        icon: "✅",
      };
    case "BILL_PAYMENT_FAILED":
      return {
        color: "text-red-600 dark:text-red-400",
        bg: "bg-red-50 dark:bg-red-900/20",
        icon: "❌",
      };
    default:
      return {
        color: "text-gray-600 dark:text-gray-400",
        bg: "bg-gray-50 dark:bg-gray-800",
        icon: "🔔",
      };
  }
};

const Notifications = () => {
  const toast = useToast();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchNotifications();
  }, []);

  const normalizeNotifications = (items) =>
    items.map((notification) => ({
      ...notification,
      read: notification.read ?? notification.isRead,
    }));

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await api.get("/notifications");
      setNotifications(
        normalizeNotifications(response.data.notifications || []),
      );
      setUnreadCount(Number(response.data.unreadCount || 0));
    } catch {
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.post(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true, isRead: true } : n)),
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch {
      toast.error("Failed to mark as read");
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.post("/notifications/read-all");
      await fetchNotifications();
      toast.success("All notifications marked as read");
    } catch {
      toast.error("Failed to mark all as read");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Notifications
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            {unreadCount > 0
              ? `${unreadCount} unread notifications`
              : "All caught up!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium"
          >
            <CheckCheck size={16} />
            Mark all as read
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center p-6">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <Bell size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              No notifications yet
            </p>
            <p className="text-gray-400 dark:text-gray-600 text-xs mt-1">
              You'll see notifications about your transactions here
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50 dark:divide-gray-800">
            {notifications.map((notification) => {
              const { color, bg, icon } = getNotificationStyle(
                notification.type,
              );

              return (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 transition ${
                    !notification.read
                      ? "bg-green-50/50 dark:bg-green-900/10"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${bg}`}
                  >
                    <span className="text-lg">{icon}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm font-semibold ${color}`}>
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
                      {new Date(notification.createdAt).toLocaleString("en-NG")}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!notification.read ? (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition"
                        title="Mark as read"
                      >
                        <Check size={16} />
                      </button>
                    ) : (
                      <div
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-green-500"
                        title="Read"
                      >
                        <CheckCheck size={16} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;


