import { useEffect, useState, useCallback } from "react";
import { Notification } from "@shared/api";

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch notifications from backend
  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await fetch("/api/notifications");
      
      if (!res.ok) {
        throw new Error(`Failed to fetch notifications: ${res.status}`);
      }
      
      const data: Notification[] = await res.json();
      setNotifications(data);
      
      // ✅ Calculate unread count
      const unread = data.filter((n) => !n.read).length;
      setUnreadCount(unread);
      
      console.log(`✅ Fetched ${data.length} notifications (${unread} unread)`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error("❌ Failed to fetch notifications:", errorMessage);
      setError(errorMessage);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Mark a notification as read
  const markAsRead = useCallback(async (id: number) => {
    try {
      const res = await fetch(`/api/notifications/${id}/read`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error(`Failed to mark notification as read: ${res.status}`);
      }

      // ✅ Optimistically update state
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(prev - 1, 0));
      
      console.log(`✅ Notification ${id} marked as read`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error("❌ Failed to mark notification as read:", errorMessage);
      setError(errorMessage);
    }
  }, []);

  // ✅ Create a new notification
  const createNotification = useCallback(
    async (title: string, message: string, type?: string) => {
      try {
        const res = await fetch("/api/notifications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, message, type }),
        });

        if (!res.ok) {
          throw new Error(`Failed to create notification: ${res.status}`);
        }

        console.log(`✅ Notification created: ${title}`);
        
        // ✅ Refresh list after creating
        fetchNotifications();
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        console.error("❌ Failed to create notification:", errorMessage);
        setError(errorMessage);
      }
    },
    [fetchNotifications]
  );

  // ✅ Fetch notifications on mount
  useEffect(() => {
    fetchNotifications();
    
    // ✅ Optional: Refresh notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    createNotification,
    refetch: fetchNotifications,
  };
}