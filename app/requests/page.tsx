"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Clock, XCircle } from "lucide-react";

// Extend session type
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

  if (status === "loading") return <p className="text-center mt-20 text-gray-600">Loading session...</p>;

  return (
    <section className="py-20 bg-indigo-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="pt-2 pb-2 text-[3rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5rem] font-black tracking-[-0.03em] text-gray-900 leading-[0.9] transform scale-y-120 font-display text-center">
          <span className="block">
            SWAP REQUESTS
          </span>
        </h1>

        {requests.length === 0 ? (
          <p className=" pt-8 text-center text-gray-500 text-lg">No requests yet.</p>
        ) : (
          <ul className="space-y-6 mt-10">
            {requests.map((req) => (
              <li
                key={req._id}
                className="bg-white/70 border border-indigo-100 rounded-xl p-5 backdrop-blur-sm"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-lg font-medium text-gray-800 mb-1">
                      {req.fromUserId === currentUserId ? "To:" : "From:"} <span className="font-semibold text-indigo-600">{req.fromUserId === currentUserId ? req.toUserId : req.fromUserId}</span>
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(req.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="mt-2 text-sm">
                      <span className="font-semibold text-gray-700">Status:</span>{" "}
                      <span className={`uppercase font-semibold ${req.status === "pending" ? "text-yellow-600" : req.status === "accepted" ? "text-green-600" : "text-red-600"}`}>
                        {req.status}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
                    {req.status === "pending" && req.toUserId === currentUserId && (
                      <>
                        <button
                          onClick={() => handleAction(req._id, "accepted")}
                          className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleAction(req._id, "rejected")}
                          className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {req.status === "pending" && req.fromUserId === currentUserId && (
                      <button
                        onClick={() => handleDelete(req._id)}
                        className="px-4 py-2 text-sm bg-red-50 text-red-600 border border-red-200 rounded-lg flex items-center gap-1"
                      >
                        <XCircle className="w-4 h-4" /> Cancel Request
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}