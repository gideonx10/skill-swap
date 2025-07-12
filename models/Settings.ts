import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
  description: String,
  updatedBy: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Settings ||
  mongoose.model("Settings", settingsSchema);
