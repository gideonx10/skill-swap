"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Clock, User, CheckCircle, Send } from "lucide-react";

interface User {
  _id: string;
  name: string;
  skillsOffered: string[];
  skillsWanted: string[];
  availability: string[];
  location?: string;
  photo?: string;
}

interface SwapRequest {
  fromUserId: string;
  toUserId: string;
  status: string;
}

const ExplorePage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState("");
  const [sentRequests, setSentRequests] = useState<string[]>([]);

  const currentUserId = session?.user?.id;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (!currentUserId) return;
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.filter((u: any) => u.isPublic && u._id !== currentUserId)));
  }, [currentUserId]);

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
    [...user.skillsOffered, ...user.skillsWanted].join(",").toLowerCase().includes(query.toLowerCase())
  );

  const handleRequestSwap = async (toUserId: string) => {
    const res = await fetch("/api/requests", {
      method: "POST",
      body: JSON.stringify({ fromUserId: currentUserId, toUserId }),
    });
    const data = await res.json();
    alert(data.message);
    setSentRequests((prev) => [...prev, toUserId]);
  };

  return (
    <section className="py-10 bg-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
           <h1 className="pt-2 pb-2 text-[3rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5rem] font-black tracking-[-0.03em] text-gray-900 leading-[0.9] transform scale-y-120 font-display">
                <span className="block">EXPLORE <span className=" bg-gradient-to-r from-indigo-600 to-purple-600  bg-clip-text text-transparent"> SKILLS</span></span>
                
              </h1>
          <p className=" pt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Browse profiles of passionate individuals eager to swap and sharpen their skills.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by skill (e.g., UI Design, Python)"
              className="w-full pl-12 pr-4 py-4 bg-white border border-indigo-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500 text-lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* No Results */}
        {filteredUsers.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-12 h-12 text-indigo-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600 text-lg">Try adjusting your search keywords</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="bg-white p-6 rounded-2xl border border-transparent hover:border-indigo-200 hover:shadow-xl transition-all duration-300"
              >
                {/* Profile Header */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl font-bold overflow-hidden">
                    {user.photo ? (
                      <img src={user.photo} alt={user.name} className="w-full h-full object-cover rounded-full" />
                    ) : (
                      user.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight">{user.name}</h3>
                    {user.location && (
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        {user.location}
                      </div>
                    )}
                  </div>
                </div>

                {/* Skills Offered */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-1 uppercase tracking-wide">Skills Offered</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.skillsOffered.map((skill, idx) => (
                      <span key={idx} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium border border-green-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Skills Wanted */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-1 uppercase tracking-wide">Skills Wanted</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.skillsWanted.map((skill, idx) => (
                      <span key={idx} className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium border border-yellow-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-1 uppercase tracking-wide">Availability</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-md">
                    {user.availability.join(", ")}
                  </p>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleRequestSwap(user._id)}
                  className={`w-full mt-4 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center space-x-2 ${
                    sentRequests.includes(user._id)
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg"
                  }`}
                  disabled={sentRequests.includes(user._id)}
                >
                  {sentRequests.includes(user._id) ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Swap Requested</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Request Swap</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExplorePage;
