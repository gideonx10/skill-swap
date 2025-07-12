import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getUsersCollection } from "@/lib/db";
import clientPromise from "@/lib/mongo";

// Get all settings (Admin only)
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
    const settings = await settingsCol.find({}).toArray();

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Update settings (Admin only)
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { key, value, description } = await req.json();

    if (!key || value === undefined) {
      return NextResponse.json(
        { message: "Key and value are required" },
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

    // Update or create setting
    await settingsCol.updateOne(
      { key },
      {
        $set: {
          key,
          value,
          description,
          updatedBy: session.user.email,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ message: "Settings updated successfully" });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
