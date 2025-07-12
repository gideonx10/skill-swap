import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongo";

// Mark notification as dismissed for a user
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { notificationId } = await req.json();

    if (!notificationId) {
      return NextResponse.json(
        { message: "Notification ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const dismissedCol = client.db().collection("dismissed_notifications");

    // Check if already dismissed
    const existing = await dismissedCol.findOne({
      userEmail: session.user.email,
      notificationId,
    });

    if (existing) {
      return NextResponse.json({ message: "Already dismissed" });
    }

    // Mark as dismissed
    await dismissedCol.insertOne({
      userEmail: session.user.email,
      notificationId,
      dismissedAt: new Date(),
    });

    return NextResponse.json({ message: "Notification dismissed" });
  } catch (error) {
    console.error("Error dismissing notification:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
