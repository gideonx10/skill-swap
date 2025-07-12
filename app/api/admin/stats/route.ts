import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getUsersCollection, getRequestsCollection } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const usersCol = await getUsersCollection();
    const adminUser = await usersCol.findOne({
      email: session.user.email,
      role: "admin",
    });

    if (!adminUser) {
      return NextResponse.json(
        { message: "Admin access required" },
        { status: 403 }
      );
    }

    // Get statistics
    const totalUsers = await usersCol.countDocuments();
    const bannedUsers = await usersCol.countDocuments({ isBan: true });
    const activeUsers = await usersCol.countDocuments({ isBan: false });
    const publicProfiles = await usersCol.countDocuments({
      isPublic: true,
      isBan: false,
    });

    const requestsCol = await getRequestsCollection();
    const totalRequests = await requestsCol.countDocuments();
    const pendingRequests = await requestsCol.countDocuments({
      status: "pending",
    });
    const acceptedRequests = await requestsCol.countDocuments({
      status: "accepted",
    });
    const rejectedRequests = await requestsCol.countDocuments({
      status: "rejected",
    });

    return NextResponse.json({
      users: {
        total: totalUsers,
        active: activeUsers,
        banned: bannedUsers,
        publicProfiles,
      },
      requests: {
        total: totalRequests,
        pending: pendingRequests,
        accepted: acceptedRequests,
        rejected: rejectedRequests,
      },
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
