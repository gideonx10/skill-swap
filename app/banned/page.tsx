"use client";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AlertTriangle, LogOut, Mail, Phone } from "lucide-react";

export default function BannedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<{
    name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (session?.user?.email) {
      // Check if user is actually banned
      fetch("/api/auth/check-ban")
        .then((res) => res.json())
        .then((data) => {
          if (!data.banned) {
            // User is not banned, redirect to home
            router.push("/");
          } else {
            setUserInfo(data.user);
          }
        })
        .catch(() => {
          router.push("/");
        });
    }
  }, [session, status, router]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {/* Warning Icon */}
          <div className="mx-auto flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Account Suspended
          </h1>

          {/* Message */}
          <div className="text-gray-600 mb-6 space-y-3">
            <p>
              Hello {userInfo?.name || "User"}, your account has been
              temporarily suspended due to a violation of our platform policies.
            </p>
            <p className="text-sm">
              This action was taken to maintain a safe and respectful
              environment for all SkillSwap users.
            </p>
          </div>

          {/* Account Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-sm text-gray-600">
              <p>
                <strong>Account:</strong> {userInfo?.email}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="text-red-600 font-semibold">Suspended</span>
              </p>
            </div>
          </div>

          {/* What you can do */}
          <div className="text-left mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">
              What can you do?
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-indigo-600 mt-1">•</span>
                <span>
                  Review our community guidelines and terms of service
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-indigo-600 mt-1">•</span>
                <span>
                  Contact our support team if you believe this is an error
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-indigo-600 mt-1">•</span>
                <span>
                  Wait for the suspension period to end (if temporary)
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Support */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-900 mb-2">Need Help?</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <div className="flex items-center justify-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>support@skillswap.com</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91 87800 96103</span>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>© 2025 SkillSwap. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
