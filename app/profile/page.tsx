"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    location: "",
    photo: "",
    skillsOffered: "",
    skillsWanted: "",
    availability: "",
    isPublic: true,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
        email: session?.user?.email,
        skillsOffered: form.skillsOffered.split(",").map((s) => s.trim()),
        skillsWanted: form.skillsWanted.split(",").map((s) => s.trim()),
        availability: form.availability.split(",").map((a) => a.trim()),
        role: "user",
      }),
    });

    const data = await res.json();
    alert(data.message);
  };

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-20 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white border-2 border-indigo-200 rounded-2xl p-10 shadow-xl">
        <h1 className="text-[3rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5rem] font-black tracking-[-0.03em] text-gray-900 leading-[0.9] transform scale-y-120 font-display mb-10 text-center">
          <span className="block">CREATE</span>
          <span className="block text-indigo-600">PROFILE</span>
        </h1>

        <div className="space-y-6">
          <input
            name="name"
            placeholder="Your Full Name"
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          />

          <input
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          />

          <input
            name="photo"
            placeholder="Photo URL"
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          />

          <input
            name="skillsOffered"
            placeholder="Skills Offered (comma separated)"
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          />

          <input
            name="skillsWanted"
            placeholder="Skills Wanted (comma separated)"
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          />

          <input
            name="availability"
            placeholder="Availability (comma separated)"
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
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}
