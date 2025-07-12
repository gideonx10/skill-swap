import { type NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongo";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const usersCol = client.db().collection("users");

    const existingUser = await usersCol.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const user = {
      name,
      email, // Make sure email is included
      password,
      createdAt: new Date(),
      isPublic: true,
      isBan: false, // Add isBan field with default false
      skillsOffered: [],
      skillsWanted: [],
      availability: [],
      role: "user", // Always set to user for new signups
    };

    await usersCol.insertOne(user);

    return NextResponse.json({ message: "User created" }, { status: 200 });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
