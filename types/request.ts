export interface SwapRequest {
  _id?: string;
  fromUserId: string;
  toUserId: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}
