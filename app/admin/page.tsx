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
} from "lucide-react";

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
      </div>
    </div>
  );
}
