import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  fromUserId: mongoose.Schema.Types.ObjectId,
  toUserId: mongoose.Schema.Types.ObjectId,
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Request || mongoose.model("Request", requestSchema);
