"use client";
import { useEffect } from "react";
import type React from "react";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

export default function BanChecker({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // Pages that banned users can access
  const allowedPagesForBanned = ["/banned", "/login", "/signup"];
  const isAllowedPage = allowedPagesForBanned.some((page) =>
    pathname.startsWith(page)
  );

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user?.email && !isAllowedPage) {
      // Check if user is banned
      fetch("/api/auth/check-ban")
        .then((res) => res.json())
        .then((data) => {
          if (data.banned) {
            router.push("/banned");
          }
        })
        .catch((error) => {
          console.error("Error checking ban status:", error);
        });
    }
  }, [session, status, router, pathname, isAllowedPage]);

  return <>{children}</>;
}
