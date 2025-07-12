import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  location: String,
  photo: String,
  skillsOffered: [String],
  skillsWanted: [String],
  availability: [String],
  isPublic: { type: Boolean, default: true },
  role: { type: String, default: "user" },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
