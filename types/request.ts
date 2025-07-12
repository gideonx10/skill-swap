import { ObjectId } from "mongodb";

export interface SwapRequest {
  _id?: ObjectId;
  fromUserId: string;
  toUserId: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}
