"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { User } from "@/types/user";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProfileView from "@/components/dashboard/ProfileView";
import ProfileForm from "@/components/dashboard/ProfileForm";

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
      email: session?.user?.email,
      role: "user",
    };

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let data;
    try {
      data = await res.json();
    } catch {
      alert("Error updating profile: No JSON response received.");
      return;
    }

    alert(data.message || "Profile updated!");
    setEditing(false);

    if (session?.user?.email) {
      const res2 = await fetch("/api/users");
      const allUsers: User[] = await res2.json();
      const myProfile = allUsers.find(
        (user) => user.email === session.user.email
      );
      setProfile(myProfile || null);
    }
  };

  if (status === "loading")
    return <p className="text-black p-6">Loading session...</p>;

  if (!session)
    return <p className="text-black p-6">Please log in to view dashboard.</p>;

  return (
    <DashboardLayout userName={session.user.name || "User"}>
      {profile && !editing ? (
        <ProfileView profile={profile} onEdit={() => setEditing(true)} />
      ) : (
        <ProfileForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          onCancel={() => setEditing(false)}
          isEditing={!!profile}
        />
      )}
    </DashboardLayout>
  );
}
