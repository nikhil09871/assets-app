const express = require("express");
const { signup, login } = require("../controllers/authController");
const router = express.Router();
const UserProfile = require('../models/UserProfile'); // Assuming you have this model
const jwt = require('jsonwebtoken');
const verifyToken = require("../middleware/verifyToken");
const bcrypt = require('bcryptjs');

// Correct routes:
router.post("/signup", signup);  // for registering a user
router.post("/login", login);    // for logging in a user

router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await UserProfile.findById(req.userId); // req.userId comes from verifyToken
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST update user profile
router.post("/profile", verifyToken, async (req, res) => {
  const { name, wallet, email } = req.body;

  try {
    const updatedUser = await UserProfile.findByIdAndUpdate(
      req.userId,
      { name, wallet, email },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
