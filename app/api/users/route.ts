import { getUsersCollection } from "@/lib/db";
import { User } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const usersCol = await getUsersCollection();
    const users = await usersCol.find().toArray();
    return NextResponse.json(users);
  } catch {
    return new NextResponse("Failed to fetch users", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const usersCol = await getUsersCollection();
    const body = await req.json();

const existing = await usersCol.findOne({ email: body.email });

    if (existing) {
      await usersCol.updateOne({ name: body.name }, { $set: body });
      return NextResponse.json({ message: "User updated", updated: true });
    }

    await usersCol.insertOne(body as User);
    return NextResponse.json({ message: "User created", created: true });
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to save user", { status: 500 });
  }
}
