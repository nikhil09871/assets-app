const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true }, // Investor, Analyst, etc.
  wallet: { type: String }, // ✅ Add this
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
