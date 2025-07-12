import { type NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongo";

// Get maintenance mode status (Public endpoint)
export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const settingsCol = client.db().collection("settings");

    const maintenanceSetting = await settingsCol.findOne({
      key: "maintenance",
    });

    if (!maintenanceSetting) {
      return NextResponse.json({
        enabled: false,
        title: "Maintenance Mode",
        message: "The system is currently under maintenance.",
      });
    }

    return NextResponse.json(maintenanceSetting.value);
  } catch (error) {
    console.error("Error fetching maintenance status:", error);
    return NextResponse.json({
      enabled: false,
      title: "Maintenance Mode",
      message: "The system is currently under maintenance.",
    });
  }
}
