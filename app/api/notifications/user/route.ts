import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongo";

// Get notifications for a specific user (excluding dismissed ones)
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json([]);
    }

    const client = await clientPromise;
    const settingsCol = client.db().collection("settings");
    const dismissedCol = client.db().collection("dismissed_notifications");

    // Get active notifications
    const notificationSetting = await settingsCol.findOne({
      key: "notifications",
    });
    if (!notificationSetting) {
      return NextResponse.json([]);
    }

    const notifications = notificationSetting.value || [];
    const now = new Date();

    // Filter active notifications that haven't expired
    const activeNotifications = notifications.filter((notification: any) => {
      if (!notification.isActive) return false;
      if (notification.expiresAt && new Date(notification.expiresAt) < now)
        return false;
      return true;
    });

    // Get dismissed notifications for this user
    const dismissedNotifications = await dismissedCol
      .find({ userEmail: session.user.email })
      .toArray();
    const dismissedIds = dismissedNotifications.map((d) => d.notificationId);

    // Filter out dismissed notifications
    const userNotifications = activeNotifications.filter(
      (notification: any) => !dismissedIds.includes(notification.id)
    );

    return NextResponse.json(userNotifications);
  } catch (error) {
    console.error("Error fetching user notifications:", error);
    return NextResponse.json([]);
  }
}
