"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Extend the session user type to include 'id'
declare module "next-auth" {
  interface User {
    id: string;
  }
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

interface SwapRequest {
  _id: string;
  fromUserId: string;
  toUserId: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

export default function RequestsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [requests, setRequests] = useState<SwapRequest[]>([]);

  const currentUserId = session?.user?.id;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (!currentUserId) return;
    fetch(`/api/requests?userId=${currentUserId}`)
      .then((res) => res.json())
      .then((data) => setRequests(data));
  }, [currentUserId]);

  const handleAction = async (id: string, action: string) => {
    await fetch("/api/requests", {
      method: "PUT",
      body: JSON.stringify({ requestId: id, action }),
    });
    location.reload();
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/requests", {
      method: "DELETE",
      body: JSON.stringify({ requestId: id }),
    });
    location.reload();
  };

  if (status === "loading") return <p>Loading session...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Your Swap Requests</h1>

      {requests.length === 0 && <p>No requests yet.</p>}

      <ul className="space-y-4">
        {requests.map((req) => (
          <li key={req._id} className="border p-4 rounded">
            <p className="mb-1">
              <strong>{req.fromUserId === currentUserId ? "To" : "From"}:</strong>{" "}
              {req.fromUserId === currentUserId ? req.toUserId : req.fromUserId}
            </p>
            <p className="mb-1">
              <strong>Status:</strong> {req.status}
            </p>
            {req.status === "pending" && req.toUserId === currentUserId && (
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded"
                  onClick={() => handleAction(req._id, "accepted")}
                >
                  Accept
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => handleAction(req._id, "rejected")}
                >
                  Reject
                </button>
              </div>
            )}
            {req.status === "pending" && req.fromUserId === currentUserId && (
              <button
                className="bg-gray-400 text-white px-3 py-1 mt-2 rounded"
                onClick={() => handleDelete(req._id)}
              >
                Delete Request
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
