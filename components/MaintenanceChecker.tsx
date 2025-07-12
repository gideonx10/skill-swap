"use client";
import { useEffect, useState } from "react";
import type React from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import type { MaintenanceSettings } from "@/types/settings";

export default function MaintenanceChecker({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [maintenanceMode, setMaintenanceMode] =
    useState<MaintenanceSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkComplete, setCheckComplete] = useState(false);

  // Pages that are allowed during maintenance (very restrictive)
  const allowedPagesForMaintenance = ["/maintenance", "/login", "/signup"];
  const isAllowedPage = allowedPagesForMaintenance.some((page) =>
    pathname.startsWith(page)
  );

  useEffect(() => {
    const checkMaintenanceAndAdmin = async () => {
      try {
        // Always check maintenance mode first
        const maintenanceRes = await fetch("/api/settings/maintenance");
        const maintenanceData = await maintenanceRes.json();
        setMaintenanceMode(maintenanceData);

        // Check if user is admin (only if logged in)
        if (session?.user?.email) {
          try {
            const adminRes = await fetch("/api/admin/users");
            if (adminRes.ok) {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
          } catch {
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error checking maintenance/admin status:", error);
        // Default to no maintenance mode if there's an error
        setMaintenanceMode({ enabled: false, title: "", message: "" });
        setIsAdmin(false);
      } finally {
        setLoading(false);
        setCheckComplete(true);
      }
    };

    // Only run check when session is loaded
    if (status !== "loading") {
      checkMaintenanceAndAdmin();
    }
  }, [session, status]);

  useEffect(() => {
    // Only redirect after all checks are complete
    if (!loading && checkComplete && status !== "loading") {
      // If maintenance mode is enabled
      if (maintenanceMode?.enabled) {
        // If user is not admin and not on an allowed page, redirect to maintenance
        if (!isAdmin && !isAllowedPage) {
          router.push("/maintenance");
          return;
        }
        // If user is admin and on maintenance page, redirect to admin dashboard
        if (isAdmin && pathname === "/maintenance") {
          router.push("/admin");
          return;
        }
      }
    }
  }, [
    maintenanceMode,
    isAdmin,
    router,
    pathname,
    isAllowedPage,
    loading,
    status,
    checkComplete,
  ]);

  // Show loading while checking
  if (loading || status === "loading" || !checkComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If maintenance is enabled and user is not admin and not on allowed page, show maintenance
  if (maintenanceMode?.enabled && !isAdmin && !isAllowedPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to maintenance page...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
