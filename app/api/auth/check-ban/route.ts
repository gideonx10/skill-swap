import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getUsersCollection } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ banned: false });
    }

    const usersCol = await getUsersCollection();
    const user = await usersCol.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ banned: false });
    }

    return NextResponse.json({
      banned: user.isBan || false,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error checking ban status:", error);
    return NextResponse.json({ banned: false });
  }
}
