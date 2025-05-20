const express = require("express");
const router = express.Router();
const User = require("../models/User");
const verifyToken = require("../middleware/verifyToken"); // Make sure this middleware is properly set up

// GET user profile
router.get("/profile", verifyToken, async (req, res) => {
    console.log("🔐 User ID from token:", req.userId);

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found. Please complete your profile." });
    }

    // Always return user data, even if incomplete
    const { name, wallet, email } = user;

    if (!name || !wallet || !email) {
      return res.status(200).json({ message: "Incomplete profile", name, wallet, email });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user profile: ", err);
    res.status(500).json({ message: "Server error" });
  }
});



// POST update user profile
// POST update user profile
router.post("/profile", verifyToken, async (req, res) => {
  const { name, wallet, email } = req.body;

  if (!name || !wallet || !email) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== req.userId) {
      return res.status(400).json({ message: "Email is already associated with another account." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { name, wallet, email },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    console.error("Error updating user profile: ", err);
    res.status(500).json({ message: "Server error" });
  }
});



// Route to fetch all user profiles (for checking data)


// GET user profile by email
router.get('/get-profile/:email', async (req, res) => {
  try {
    const profile = await User.findOne({ email: req.params.email });
    if (!profile) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    res.json(profile);
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get("/allProfiles", async (req, res) => {
  try {
    const profiles = await User.find();
    if (profiles.length === 0) {
      return res.status(404).json({ message: "No profiles found" });
    }
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profiles" });
  }
});

router.get('/email/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/debug/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err });
  }
});


module.exports = router;