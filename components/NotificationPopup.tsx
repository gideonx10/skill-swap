"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { X, Info, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";
import type { NotificationSettings } from "@/types/settings";

export default function NotificationPopup() {
  const { data: session, status } = useSession();
  const [notifications, setNotifications] = useState<NotificationSettings[]>(
    []
  );
  const [currentNotification, setCurrentNotification] =
    useState<NotificationSettings | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      fetchUserNotifications();
    }
  }, [session, status]);

  useEffect(() => {
    if (notifications.length > 0 && !currentNotification) {
      setCurrentNotification(notifications[0]);
      setShowPopup(true);
    }
  }, [notifications, currentNotification]);

  const fetchUserNotifications = async () => {
    try {
      const res = await fetch("/api/notifications/user");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const dismissNotification = async (notificationId: string) => {
    try {
      const res = await fetch("/api/notifications/dismiss", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationId }),
      });

      if (res.ok) {
        const remainingNotifications = notifications.filter(
          (n) => n.id !== notificationId
        );
        setNotifications(remainingNotifications);

        if (remainingNotifications.length > 0) {
          setCurrentNotification(remainingNotifications[0]);
        } else {
          setCurrentNotification(null);
          setShowPopup(false);
        }
      }
    } catch (error) {
      console.error("Error dismissing notification:", error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case "warning":
        return <AlertTriangle className="w-6 h-6 text-yellow-600" />;
      case "error":
        return <AlertCircle className="w-6 h-6 text-red-600" />;
      default:
        return <Info className="w-6 h-6 text-blue-600" />;
    }
  };

  const getNotificationColors = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "error":
        return "bg-red-50 border-red-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  if (!showPopup || !currentNotification || status !== "authenticated") {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`max-w-md w-full rounded-lg shadow-lg border-2 ${getNotificationColors(
          currentNotification.type
        )} animate-in fade-in duration-300`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              {getNotificationIcon(currentNotification.type)}
              <h3 className="text-lg font-semibold text-gray-900">
                {currentNotification.title}
              </h3>
            </div>
            <button
              onClick={() => dismissNotification(currentNotification.id)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Message */}
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">
              {currentNotification.message}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              {new Date(currentNotification.createdAt).toLocaleDateString()}
            </div>
            <div className="flex space-x-2">
              {notifications.length > 1 && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {notifications.indexOf(currentNotification) + 1} of{" "}
                  {notifications.length}
                </span>
              )}
              <button
                onClick={() => dismissNotification(currentNotification.id)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
