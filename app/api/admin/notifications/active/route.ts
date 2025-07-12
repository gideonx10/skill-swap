import { type NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongo";

// Get active notifications for users (Public endpoint)
export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const settingsCol = client.db().collection("settings");

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

    return NextResponse.json(activeNotifications);
  } catch (error) {
    console.error("Error fetching active notifications:", error);
    return NextResponse.json([]);
  }
}
