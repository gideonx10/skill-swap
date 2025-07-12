import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getUsersCollection } from "@/lib/db";
import clientPromise from "@/lib/mongo";

// Get active notifications (Admin only)
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

    const client = await clientPromise;
    const settingsCol = client.db().collection("settings");
    const notificationSetting = await settingsCol.findOne({
      key: "notifications",
    });

    if (!notificationSetting) {
      return NextResponse.json([]);
    }

    return NextResponse.json(notificationSetting.value || []);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Create new notification (Admin only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, message, type, expiresAt } = await req.json();

    if (!title || !message) {
      return NextResponse.json(
        { message: "Title and message are required" },
        { status: 400 }
      );
    }

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

    const client = await clientPromise;
    const settingsCol = client.db().collection("settings");

    // Get existing notifications
    const notificationSetting = await settingsCol.findOne({
      key: "notifications",
    });
    const existingNotifications = notificationSetting?.value || [];

    // Create new notification
    const newNotification = {
      id: Date.now().toString(),
      title,
      message,
      type: type || "info",
      isActive: true,
      createdAt: new Date().toISOString(),
      createdBy: session.user.email,
      expiresAt: expiresAt || null,
    };

    // Add to notifications array
    const updatedNotifications = [...existingNotifications, newNotification];

    // Update or create notifications setting
    await settingsCol.updateOne(
      { key: "notifications" },
      {
        $set: {
          key: "notifications",
          value: updatedNotifications,
          description: "Platform-wide notifications",
          updatedBy: session.user.email,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({
      message: "Notification created successfully",
      notification: newNotification,
    });
  } catch (error) {
    console.error("Error creating notification:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Update notification status (Admin only)
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { notificationId, isActive } = await req.json();

    if (!notificationId) {
      return NextResponse.json(
        { message: "Notification ID is required" },
        { status: 400 }
      );
    }

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

    const client = await clientPromise;
    const settingsCol = client.db().collection("settings");

    // Get existing notifications
    const notificationSetting = await settingsCol.findOne({
      key: "notifications",
    });
    const existingNotifications = notificationSetting?.value || [];

    // Update notification status
    const updatedNotifications = existingNotifications.map(
      (notification: any) =>
        notification.id === notificationId
          ? { ...notification, isActive }
          : notification
    );

    // Update notifications setting
    await settingsCol.updateOne(
      { key: "notifications" },
      {
        $set: {
          value: updatedNotifications,
          updatedBy: session.user.email,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({ message: "Notification updated successfully" });
  } catch (error) {
    console.error("Error updating notification:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Delete notification (Admin only)
export async function DELETE(req: NextRequest) {
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

    const client = await clientPromise;
    const settingsCol = client.db().collection("settings");

    // Get existing notifications
    const notificationSetting = await settingsCol.findOne({
      key: "notifications",
    });
    const existingNotifications = notificationSetting?.value || [];

    // Remove notification
    const updatedNotifications = existingNotifications.filter(
      (notification: any) => notification.id !== notificationId
    );

    // Update notifications setting
    await settingsCol.updateOne(
      { key: "notifications" },
      {
        $set: {
          value: updatedNotifications,
          updatedBy: session.user.email,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
