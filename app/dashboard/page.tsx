"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { User } from "@/types/user";

const initialFormState = {
  name: "",
  location: "",
  photo: "",
  skillsOffered: "",
  skillsWanted: "",
  availability: "",
  isPublic: false,
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<User | null>(null);
  const [form, setForm] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

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
          if (myProfile) {
            setForm({
              name: myProfile.name || "",
              location: myProfile.location || "",
              photo: myProfile.photo || "",
              skillsOffered: (myProfile.skillsOffered || []).join(", "),
              skillsWanted: (myProfile.skillsWanted || []).join(", "),
              availability: (myProfile.availability || []).join(", "),
              isPublic: !!myProfile.isPublic,
            });
          }
        } catch (err) {
          console.error("Failed to load profile", err);
        }
      };
      fetchProfile();
    }
  }, [session]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      name: form.name,
      location: form.location,
      photo: form.photo,
      skillsOffered: form.skillsOffered.split(",").map((s: string) => s.trim()),
      skillsWanted: form.skillsWanted.split(",").map((s: string) => s.trim()),
      availability: form.availability.split(",").map((a: string) => a.trim()),
      isPublic: form.isPublic,
      email: session.user.email,
      role: "user",
    };

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // Defensive check for JSON response
    let data;
    try {
      data = await res.json();
    } catch (e) {
      alert("Error updating profile: No JSON response received.");
      return;
    }

    alert(data.message || "Profile updated!");
    setEditing(false);

    // Reload profile
    if (session?.user?.email) {
      const res2 = await fetch("/api/users");
      const allUsers: User[] = await res2.json();
      const myProfile = allUsers.find(
        (user) => user.email === session.user.email
      );
      setProfile(myProfile || null);
    }
  };

  if (status === "loading") return <p className="text-black">Loading session...</p>;
  if (!session) return <p className="text-black">Please log in to view dashboard.</p>;

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-2xl mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-6">
          Welcome, {session.user.name}
        </h1>

        {profile && !editing ? (
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
            <button
              onClick={() => setEditing(true)}
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-all"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-10 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white border-2 border-indigo-200 rounded-2xl p-10 shadow-xl">
              <h1 className="text-[2rem] font-black tracking-[-0.03em] text-gray-900 mb-10 text-center">
                {profile ? "EDIT PROFILE" : "CREATE PROFILE"}
              </h1>
              <div className="space-y-6">
                <input
                  name="name"
                  placeholder="Your Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                />
                <input
                  name="location"
                  placeholder="Location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                />
                <input
                  name="photo"
                  placeholder="Photo URL"
                  value={form.photo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                />
                <input
                  name="skillsOffered"
                  placeholder="Skills Offered (comma separated)"
                  value={form.skillsOffered}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                />
                <input
                  name="skillsWanted"
                  placeholder="Skills Wanted (comma separated)"
                  value={form.skillsWanted}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                />
                <input
                  name="availability"
                  placeholder="Availability (comma separated)"
                  value={form.availability}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                />
                <label className="flex items-center text-gray-700">
                  <input
                    type="checkbox"
                    name="isPublic"
                    checked={form.isPublic}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Make profile public
                </label>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-all"
                >
                  {profile ? "Update Profile" : "Save Profile"}
                </button>
                {profile && (
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="w-full mt-2 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}