import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getUsersCollection, getRequestsCollection } from "@/lib/db";

// Get all swap requests (Admin only)
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

    const requestsCol = await getRequestsCollection();

    // Get query parameters for filtering
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const fromUser = searchParams.get("fromUser");
    const toUser = searchParams.get("toUser");
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");

    // Build filter object
    const filter: any = {};

    if (status && status !== "all") {
      filter.status = status;
    }

    if (fromUser) {
      filter.fromUserId = fromUser;
    }

    if (toUser) {
      filter.toUserId = toUser;
    }

    if (dateFrom || dateTo) {
      filter.createdAt = {};
      if (dateFrom) {
        filter.createdAt.$gte = new Date(dateFrom);
      }
      if (dateTo) {
        filter.createdAt.$lte = new Date(dateTo + "T23:59:59.999Z");
      }
    }

    // Get requests with user details
    const requests = await requestsCol
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    // Get all users for mapping
    const allUsers = await usersCol.find({}).toArray();
    const userMap = new Map(
      allUsers.map((user) => [user._id?.toString(), user])
    );

    // Enrich requests with user details
    const enrichedRequests = requests.map((request) => ({
      ...request,
      fromUser: userMap.get(request.fromUserId) || null,
      toUser: userMap.get(request.toUserId) || null,
    }));

    return NextResponse.json(enrichedRequests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Update request status (Admin only)
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { requestId, status } = await req.json();

    if (!requestId || !["pending", "accepted", "rejected"].includes(status)) {
      return NextResponse.json(
        { message: "Invalid request ID or status" },
        { status: 400 }
      );
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

    const requestsCol = await getRequestsCollection();

    const result = await requestsCol.updateOne(
      { _id: requestId },
      { $set: { status, updatedBy: session.user.email, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Request status updated successfully",
    });
  } catch (error) {
    console.error("Error updating request:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Delete request (Admin only)
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { requestId } = await req.json();

    if (!requestId) {
      return NextResponse.json(
        { message: "Request ID is required" },
        { status: 400 }
      );
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

    const requestsCol = await getRequestsCollection();

    const result = await requestsCol.deleteOne({ _id: requestId });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Request deleted successfully" });
  } catch (error) {
    console.error("Error deleting request:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
