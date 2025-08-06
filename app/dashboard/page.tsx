"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { User } from "@/types/user";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    if (session?.user?.email) {
      const fetchProfile = async () => {
        try {
          const res = await fetch("/api/users");
          const allUsers: User[] = await res.json();
          const myProfile = allUsers.find(
            (user) => user.email === session.user.email
          );
          setProfile(myProfile || null);
        } catch (err) {
          console.error("Failed to load profile", err);
        }
      };
      fetchProfile();
    }
  }, [session]);

  if (status === "loading") return <p className="text-black">Loading session...</p>;
  if (!session) return <p className="text-black">Please log in to view dashboard.</p>;

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-2xl mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-6">
          Welcome, {session.user.name}
        </h1>

        {profile ? (
          <div className="space-y-3">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email ?? "Not provided"}</p>
            <p><strong>Location:</strong> {profile.location ?? "Not set"}</p>
            <p><strong>Availability:</strong> {profile.availability?.join(", ") || "Not set"}</p>
            <p><strong>Skills Offered:</strong> {profile.skillsOffered?.join(", ") || "None"}</p>
            <p><strong>Skills Wanted:</strong> {profile.skillsWanted?.join(", ") || "None"}</p>
            <p><strong>Profile Visibility:</strong> {profile.isPublic ? "Public" : "Private"}</p>
            <p><strong>Banned:</strong> {profile.isBan ? "Yes" : "No"}</p>
            <p><strong>Role:</strong> {profile.role}</p>
            <p><strong>Joined:</strong> {profile.createdAt ? new Date(profile.createdAt).toLocaleString() : "N/A"}</p>
          </div>
        ) : (
          <p>No profile data found. Please complete your profile.</p>
        )}
      </div>
    </div>
  );
}
