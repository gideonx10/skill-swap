import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  location: String,
  photo: String,
  skillsOffered: [String],
  skillsWanted: [String],
  availability: [String],
  isPublic: { type: Boolean, default: true },
  isBan: { type: Boolean, default: false },
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
