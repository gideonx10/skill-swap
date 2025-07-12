"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  name: string;
  skillsOffered: string[];
  skillsWanted: string[];
  availability: string[];
  location?: string;
  photo?: string;
  isBan?: boolean; // Add isBan field
}

interface SwapRequest {
  fromUserId: string;
  toUserId: string;
  status: string;
}

export default function ExplorePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState("");
  const [sentRequests, setSentRequests] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const currentUserId = session?.user?.id;

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Check if current user is banned
  useEffect(() => {
    if (session?.user?.email) {
      fetch("/api/users")
        .then((res) => res.json())
        .then((data) => {
          const user = data.find((u: any) => u.email === session.user?.email);
          if (user?.isBan) {
            alert("Your account has been banned. Please contact support.");
            router.push("/");
            return;
          }
          setCurrentUser(user);
        });
    }
  }, [session, router]);

  // Fetch all users
  useEffect(() => {
    if (!currentUserId || !currentUser) return;
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) =>
        setUsers(
          data.filter(
            (u: any) => u.isPublic && u._id !== currentUserId && !u.isBan // Filter out banned users
          )
        )
      );
  }, [currentUserId, currentUser]);

  // Fetch requests sent
  useEffect(() => {
    if (!currentUserId) return;
    fetch(`/api/requests?userId=${currentUserId}`)
      .then((res) => res.json())
      .then((data: SwapRequest[]) => {
        const alreadySent = data
          .filter((r) => r.fromUserId === currentUserId)
          .map((r) => r.toUserId);
        setSentRequests(alreadySent);
      });
  }, [currentUserId]);

  const filteredUsers = users.filter((user) =>
    [...user.skillsOffered, ...user.skillsWanted]
      .join(",")
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const handleRequestSwap = async (toUserId: string) => {
    const res = await fetch("/api/requests", {
      method: "POST",
      body: JSON.stringify({
        fromUserId: currentUserId,
        toUserId,
      }),
    });

    const data = await res.json();
    alert(data.message);
    setSentRequests((prev) => [...prev, toUserId]);
  };

  if (status === "loading") return <p>Loading session...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Explore Skill Swappers</h1>

      <input
        type="text"
        placeholder="Search by skill (e.g. React, Excel)"
        className="w-full p-2 border rounded mb-4"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {filteredUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredUsers.map((user) => (
            <div key={user._id} className="p-4 border rounded shadow">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              {user.location && (
                <p className="text-sm text-gray-600">{user.location}</p>
              )}

              <div className="mt-2">
                <p className="text-sm font-medium">Offers:</p>
                <ul className="flex flex-wrap gap-1 text-sm">
                  {user.skillsOffered.map((skill, idx) => (
                    <li key={idx} className="bg-green-100 px-2 py-1 rounded">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-2">
                <p className="text-sm font-medium">Wants:</p>
                <ul className="flex flex-wrap gap-1 text-sm">
                  {user.skillsWanted.map((skill, idx) => (
                    <li key={idx} className="bg-yellow-100 px-2 py-1 rounded">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-2">
                <p className="text-sm font-medium">Availability:</p>
                <p className="text-gray-700 text-sm">
                  {user.availability.join(", ")}
                </p>
              </div>

              <button
                onClick={() => handleRequestSwap(user._id)}
                className={`mt-4 px-3 py-1 rounded ${
                  sentRequests.includes(user._id)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 text-white"
                }`}
                disabled={sentRequests.includes(user._id)}
              >
                {sentRequests.includes(user._id)
                  ? "Swap Requested"
                  : "Request Swap"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
