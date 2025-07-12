"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Users,
  UserCheck,
  UserX,
  MessageSquare,
  TrendingUp,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  Settings,
  Bell,
  Plus,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import type { NotificationSettings } from "@/types/settings";

interface User {
  _id: string;
  name: string;
  email: string;
  location?: string;
  skillsOffered: string[];
  skillsWanted: string[];
  isPublic: boolean;
  isBan: boolean;
  role: string;
  createdAt: string;
}

interface AdminStats {
  users: {
    total: number;
    active: number;
    banned: number;
    publicProfiles: number;
  };
  requests: {
    total: number;
    pending: number;
    accepted: number;
    rejected: number;
  };
}

function NotificationsTab() {
  const [notifications, setNotifications] = useState<NotificationSettings[]>(
    []
  );
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "info" as "info" | "warning" | "success" | "error",
    expiresAt: "",
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/admin/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const createNotification = async () => {
    if (!newNotification.title || !newNotification.message) {
      alert("Title and message are required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNotification),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Notification created successfully!");
        setNewNotification({
          title: "",
          message: "",
          type: "info",
          expiresAt: "",
        });
        setShowCreateForm(false);
        fetchNotifications();
      } else {
        alert(data.message || "Error creating notification");
      }
    } catch (error) {
      console.error("Error creating notification:", error);
      alert("Error creating notification");
    } finally {
      setLoading(false);
    }
  };

  const toggleNotificationStatus = async (
    notificationId: string,
    isActive: boolean
  ) => {
    try {
      const res = await fetch("/api/admin/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationId, isActive }),
      });

      if (res.ok) {
        fetchNotifications();
      }
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  const deleteNotification = async (notificationId: string) => {
    if (!confirm("Are you sure you want to delete this notification?")) return;

    try {
      const res = await fetch("/api/admin/notifications", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationId }),
      });

      if (res.ok) {
        alert("Notification deleted successfully!");
        fetchNotifications();
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Platform Notifications
          </h3>
          <p className="text-sm text-gray-600">
            Send announcements to all users
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Notification</span>
        </button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-gray-900">
              Create New Notification
            </h4>
            <button
              onClick={() => setShowCreateForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={newNotification.title}
                onChange={(e) =>
                  setNewNotification((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Notification title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                value={newNotification.message}
                onChange={(e) =>
                  setNewNotification((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }))
                }
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Notification message"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={newNotification.type}
                  onChange={(e) =>
                    setNewNotification((prev) => ({
                      ...prev,
                      type: e.target.value as
                        | "info"
                        | "warning"
                        | "success"
                        | "error",
                    }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="info">Info</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expires At (Optional)
                </label>
                <input
                  type="datetime-local"
                  value={newNotification.expiresAt}
                  onChange={(e) =>
                    setNewNotification((prev) => ({
                      ...prev,
                      expiresAt: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={createNotification}
                disabled={loading}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Creating..." : "Create Notification"}
              </button>
              <button
                onClick={() => setShowCreateForm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h4 className="text-lg font-medium text-gray-900">
            All Notifications
          </h4>
        </div>

        {notifications.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No notifications created yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h5 className="font-medium text-gray-900">
                        {notification.title}
                      </h5>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getTypeColor(
                          notification.type
                        )}`}
                      >
                        {notification.type}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          notification.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {notification.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{notification.message}</p>
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>
                        Created:{" "}
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                      <p>By: {notification.createdBy}</p>
                      {notification.expiresAt && (
                        <p>
                          Expires:{" "}
                          {new Date(notification.expiresAt).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() =>
                        toggleNotificationStatus(
                          notification.id,
                          !notification.isActive
                        )
                      }
                      className={`p-2 rounded-lg transition-colors ${
                        notification.isActive
                          ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                          : "bg-green-100 text-green-600 hover:bg-green-200"
                      }`}
                      title={notification.isActive ? "Deactivate" : "Activate"}
                    >
                      {notification.isActive ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsTab() {
  const [settings, setSettings] = useState<any[]>([]);
  const [maintenanceSettings, setMaintenanceSettings] = useState({
    enabled: false,
    title: "Maintenance Mode",
    message:
      "We're currently performing scheduled maintenance to improve your experience.",
    estimatedEnd: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        setSettings(data);

        // Find maintenance settings
        const maintenanceSetting = data.find(
          (s: any) => s.key === "maintenance"
        );
        if (maintenanceSetting) {
          setMaintenanceSettings(maintenanceSetting.value);
        }
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const updateMaintenanceMode = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "maintenance",
          value: maintenanceSettings,
          description: "Maintenance mode configuration",
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Maintenance settings updated successfully!");
        fetchSettings();
        // Force a full page reload to ensure middleware re-evaluates maintenance status
        window.location.reload();
      } else {
        alert(data.message || "Error updating settings");
      }
    } catch (error) {
      console.error("Error updating maintenance settings:", error);
      alert("Error updating settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Maintenance Mode Settings */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Maintenance Mode
          </h3>
          <p className="text-sm text-gray-600">
            Control site-wide maintenance mode - All admins can access during
            maintenance
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Enable/Disable Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">
                Enable Maintenance Mode
              </h4>
              <p className="text-sm text-gray-600">
                When enabled, only admins can access the site. Regular users
                will see the maintenance page.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={maintenanceSettings.enabled}
                onChange={(e) =>
                  setMaintenanceSettings((prev) => ({
                    ...prev,
                    enabled: e.target.checked,
                  }))
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>

          {/* Warning Message */}
          {maintenanceSettings.enabled && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-orange-800">
                  Warning: Maintenance Mode Active
                </span>
              </div>
              <p className="text-sm text-orange-700 mt-1">
                Regular users cannot access the platform and will see the
                maintenance page. Only administrators can access the site.
              </p>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={maintenanceSettings.title}
              onChange={(e) =>
                setMaintenanceSettings((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Maintenance Mode"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              value={maintenanceSettings.message}
              onChange={(e) =>
                setMaintenanceSettings((prev) => ({
                  ...prev,
                  message: e.target.value,
                }))
              }
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Maintenance message for users"
            />
          </div>

          {/* Estimated End Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estimated End Time (Optional)
            </label>
            <input
              type="datetime-local"
              value={maintenanceSettings.estimatedEnd}
              onChange={(e) =>
                setMaintenanceSettings((prev) => ({
                  ...prev,
                  estimatedEnd: e.target.value,
                }))
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={updateMaintenanceMode}
            disabled={loading}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>

      {/* Current Status */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Current Status
          </h3>
        </div>
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <div
              className={`w-3 h-3 rounded-full ${
                maintenanceSettings.enabled ? "bg-orange-500" : "bg-green-500"
              }`}
            ></div>
            <span className="font-medium">
              {maintenanceSettings.enabled
                ? "Maintenance Mode Active"
                : "Site Operational"}
            </span>
          </div>
          {maintenanceSettings.enabled ? (
            <div className="mt-3 space-y-2">
              <p className="text-sm text-orange-600 font-medium">
                🔧 Maintenance mode is currently active
              </p>
              <p className="text-sm text-gray-600">
                • Regular users will see the maintenance page and can only sign
                out
              </p>
              <p className="text-sm text-gray-600">
                • All administrators can access the full platform
              </p>
              <p className="text-sm text-gray-600">
                • Users can still access login and signup pages
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-600 mt-2">
              All users can access the platform normally.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.email) {
      fetchAdminData();
    }
  }, [session]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);

      // Fetch users
      const usersRes = await fetch("/api/admin/users");
      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData);
      } else if (usersRes.status === 403) {
        alert("Access denied. Admin privileges required.");
        router.push("/");
        return;
      }

      // Fetch stats
      const statsRes = await fetch("/api/admin/stats");
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
      alert("Error loading admin data");
    } finally {
      setLoading(false);
    }
  };

  const handleBanUser = async (userId: string, action: "ban" | "unban") => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        fetchAdminData(); // Refresh data
      } else {
        alert(data.message || "Error updating user status");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user status");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
            </div>
            <div className="text-sm text-gray-600">
              Welcome, {session?.user?.name || session?.user?.email}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: "overview", label: "Overview", icon: TrendingUp },
              { id: "users", label: "User Management", icon: Users },
              { id: "requests", label: "Swap Requests", icon: MessageSquare },
              { id: "notifications", label: "Notifications", icon: Bell },
              { id: "settings", label: "Settings", icon: Settings },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === id
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && stats && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Users
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stats.users.total}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Active Users
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      {stats.users.active}
                    </p>
                  </div>
                  <UserCheck className="w-8 h-8 text-green-600" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Banned Users
                    </p>
                    <p className="text-3xl font-bold text-red-600">
                      {stats.users.banned}
                    </p>
                  </div>
                  <UserX className="w-8 h-8 text-red-600" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Requests
                    </p>
                    <p className="text-3xl font-bold text-purple-600">
                      {stats.requests.total}
                    </p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </div>

            {/* Request Status Breakdown */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Swap Request Status
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-600" />
                  <div>
                    <p className="font-semibold text-yellow-800">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {stats.requests.pending}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-800">Accepted</p>
                    <p className="text-2xl font-bold text-green-600">
                      {stats.requests.accepted}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg">
                  <XCircle className="w-6 h-6 text-red-600" />
                  <div>
                    <p className="font-semibold text-red-800">Rejected</p>
                    <p className="text-2xl font-bold text-red-600">
                      {stats.requests.rejected}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                User Management
              </h3>
              <p className="text-sm text-gray-600">
                Manage user accounts and permissions
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Skills
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                          {user.location && (
                            <div className="text-xs text-gray-400">
                              {user.location}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex flex-wrap gap-1">
                            {user.skillsOffered
                              .slice(0, 3)
                              .map((skill, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded"
                                >
                                  {skill}
                                </span>
                              ))}
                            {user.skillsOffered.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{user.skillsOffered.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {user.isBan ? (
                            <span className="flex items-center space-x-1 px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                              <AlertTriangle className="w-3 h-3" />
                              <span>Banned</span>
                            </span>
                          ) : (
                            <span className="flex items-center space-x-1 px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                              <CheckCircle className="w-3 h-3" />
                              <span>Active</span>
                            </span>
                          )}
                          {!user.isPublic && (
                            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                              Private
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {user.role !== "admin" && (
                          <button
                            onClick={() =>
                              handleBanUser(
                                user._id,
                                user.isBan ? "unban" : "ban"
                              )
                            }
                            className={`px-3 py-1 rounded text-xs font-medium ${
                              user.isBan
                                ? "bg-green-100 text-green-700 hover:bg-green-200"
                                : "bg-red-100 text-red-700 hover:bg-red-200"
                            }`}
                          >
                            {user.isBan ? "Unban" : "Ban"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === "requests" && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Swap Requests
              </h3>
              <p className="text-sm text-gray-600">
                Monitor all skill swap requests
              </p>
            </div>
            <div className="p-6">
              <p className="text-gray-600">
                Request management functionality coming soon...
              </p>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && <NotificationsTab />}

        {/* Settings Tab */}
        {activeTab === "settings" && <SettingsTab />}
      </div>
    </div>
  );
}
