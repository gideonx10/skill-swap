import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getUsersCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

// Get all users (Admin only)
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

    const users = await usersCol.find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Ban/Unban user (Admin only)
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { userId, action } = await req.json();

    if (!userId || !["ban", "unban"].includes(action)) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const usersCol = await getUsersCollection();

    // Check if user is admin
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

    // Update user ban status
    const result = await usersCol.updateOne(
      {
        _id:
          typeof userId === "string" && ObjectId.isValid(userId)
            ? new ObjectId(userId)
            : userId,
      },
      { $set: { isBan: action === "ban" } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: `User ${action === "ban" ? "banned" : "unbanned"} successfully`,
    });
  } catch (error) {
    console.error("Error updating user ban status:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
