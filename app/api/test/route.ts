import clientPromise from "@/lib/mongo";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("skill_swap");

    const users = await db.collection("users").find({}).toArray();
    return NextResponse.json(users);
  } catch (err) {
    console.error(err);
    return new NextResponse("Error connecting to DB", { status: 500 });
  }
}
