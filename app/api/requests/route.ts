import { getRequestsCollection } from "@/lib/db";
import { SwapRequest } from "@/types/request";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) return new NextResponse("Missing userId", { status: 400 });

  const requestsCol = await getRequestsCollection();
  const requests = await requestsCol
    .find({ $or: [{ fromUserId: userId }, { toUserId: userId }] })
    .toArray();

  return NextResponse.json(requests);
}

export async function POST(req: NextRequest) {
  const requestsCol = await getRequestsCollection();
  const body = await req.json();

  const request: SwapRequest = {
    fromUserId: body.fromUserId,
    toUserId: body.toUserId,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  await requestsCol.insertOne(request);
  return NextResponse.json({ message: "Swap request sent" });
}

export async function PUT(req: NextRequest) {
  const requestsCol = await getRequestsCollection();
  const { requestId, action } = await req.json();

  if (!["accepted", "rejected"].includes(action)) {
    return new NextResponse("Invalid action", { status: 400 });
  }

  await requestsCol.updateOne(
    { _id: new ObjectId(requestId) },
    { $set: { status: action } }
  );

  return NextResponse.json({ message: `Request ${action}` });
}

export async function DELETE(req: NextRequest) {
  const requestsCol = await getRequestsCollection();
  const { requestId } = await req.json();

  await requestsCol.deleteOne({ _id: new ObjectId(requestId) });
  return NextResponse.json({ message: "Request deleted" });
}
