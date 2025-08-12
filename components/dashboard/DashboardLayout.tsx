import Link from "next/link";

export default function DashboardLayout({
  children,
  userName,
}: {
  children: React.ReactNode;
  userName: string;
}) {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Top Navbar */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold">SkillSwap Dashboard</h1>
          <nav className="space-x-6">
            <Link href="/explore" className="hover:underline">
              Explore
            </Link>
            <Link href="/requests" className="hover:underline">
              Requests
            </Link>
          </nav>
        </div>
      </header>

      {/* Welcome Banner */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h2 className="text-2xl font-semibold">
            Welcome, {userName} 
          </h2>
          <p className="text-gray-600">
            Manage your profile, explore new skills, and view swap requests.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
