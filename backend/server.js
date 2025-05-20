const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");  // Correct import
const assetRoutes = require('./routes/assets');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Ensure this middleware is applied before routes

// Use the routes properly
console.log(authRoutes); 
app.use("/api/auth", authRoutes);  // Ensure you're not passing an object here, but the correct router middleware
app.use("/api/user", userRoutes);
app.use('/api/assets', assetRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch(err => console.error("❌ DB Error:", err));
