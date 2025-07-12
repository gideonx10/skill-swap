"use client";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Wrench, Clock, LogOut, RefreshCw } from "lucide-react";
import type { MaintenanceSettings } from "@/types/settings";

export default function MaintenancePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [maintenanceInfo, setMaintenanceInfo] = useState<MaintenanceSettings>({
    enabled: true,
    title: "Maintenance Mode",
    message:
      "We're currently performing scheduled maintenance to improve your experience.",
  });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Fetch maintenance information
    fetch("/api/settings/maintenance")
      .then((res) => res.json())
      .then((data) => setMaintenanceInfo(data))
      .catch(() => {
        // Keep default maintenance info if fetch fails
      });

    // Check if user is admin
    if (session?.user?.email) {
      fetch("/api/admin/users")
        .then((res) => {
          if (res.ok) {
            setIsAdmin(true);
          }
        })
        .catch(() => {
          setIsAdmin(false);
        });
    }
  }, [session]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  const handleAdminAccess = () => {
    router.push("/admin");
  };

  const formatEstimatedEnd = (dateString?: string) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch {
      return null;
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {/* Maintenance Icon */}
          <div className="mx-auto flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
            <Wrench className="w-10 h-10 text-orange-600" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {maintenanceInfo.title}
          </h1>

          {/* Message */}
          <div className="text-gray-600 mb-6 space-y-3">
            <p className="text-lg">{maintenanceInfo.message}</p>
            <p className="text-sm">
              We apologize for any inconvenience. Our team is working hard to
              get everything back up and running.
            </p>
          </div>

          {/* Estimated End Time */}
          {maintenanceInfo.estimatedEnd && (
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-2 text-blue-800">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">Estimated completion:</span>
              </div>
              <p className="text-blue-700 mt-1">
                {formatEstimatedEnd(maintenanceInfo.estimatedEnd)}
              </p>
            </div>
          )}

          {/* Status Indicator */}
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="flex items-center space-x-2 px-4 py-2 bg-orange-100 rounded-full">
              <RefreshCw className="w-4 h-4 text-orange-600 animate-spin" />
              <span className="text-orange-800 font-medium">
                Maintenance in Progress
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Admin Access Button (only for admins) */}
            {isAdmin && (
              <button
                onClick={handleAdminAccess}
                className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                <Wrench className="w-5 h-5" />
                <span>Admin Access</span>
              </button>
            )}

            {/* Logout Button */}
            {session && (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 bg-gray-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            )}

            {/* Refresh Button */}
            <button
              onClick={() => window.location.reload()}
              className="w-full flex items-center justify-center space-x-2 bg-orange-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Check Status</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>© 2025 SkillSwap. All rights reserved.</p>
          <p className="mt-1">Follow us on social media for updates</p>
        </div>
      </div>
    </div>
  );
}
