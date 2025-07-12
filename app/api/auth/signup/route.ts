import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongo";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  const client = await clientPromise;
  const usersCol = client.db().collection("users");

  const existingUser = await usersCol.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: "User already exists" }, { status: 400 });
  }

  const user = {
    name,
    email,
    password, // plain text (fine for hackathon only)
    createdAt: new Date(),
    isPublic: true,
    skillsOffered: [],
    skillsWanted: [],
    availability: [],
  };

  await usersCol.insertOne(user);

  return NextResponse.json({ message: "User created" }, { status: 200 });
}
