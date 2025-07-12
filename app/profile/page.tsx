"use client";
import { useState } from "react";

export default function ProfilePage() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    photo: "",
    skillsOffered: "",
    skillsWanted: "",
    availability: "",
    isPublic: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        skillsOffered: form.skillsOffered.split(",").map(s => s.trim()),
        skillsWanted: form.skillsWanted.split(",").map(s => s.trim()),
        availability: form.availability.split(",").map(a => a.trim()),
        role: "user",
      }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Create or Edit Your Profile</h1>

      <input name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border mb-2" />
      <input name="location" placeholder="Location" onChange={handleChange} className="w-full p-2 border mb-2" />
      <input name="photo" placeholder="Photo URL" onChange={handleChange} className="w-full p-2 border mb-2" />
      <input name="skillsOffered" placeholder="Skills Offered (comma separated)" onChange={handleChange} className="w-full p-2 border mb-2" />
      <input name="skillsWanted" placeholder="Skills Wanted (comma separated)" onChange={handleChange} className="w-full p-2 border mb-2" />
      <input name="availability" placeholder="Availability (comma separated)" onChange={handleChange} className="w-full p-2 border mb-2" />

      <label className="flex items-center mb-4">
        <input type="checkbox" name="isPublic" checked={form.isPublic} onChange={handleChange} className="mr-2" />
        Make profile public
      </label>

      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
        Save Profile
      </button>
    </div>
  );
}
