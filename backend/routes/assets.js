// routes/assets.js
const express = require('express');
const router = express.Router();
const Asset = require('../models/Asset');
const User = require('../models/User');

router.post('/', async (req, res) => {
  const { userEmail, assets } = req.body;

  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const savedAssets = await Promise.all(
      assets.map((asset) => {
        return new Asset({
          ...asset,
          user: user._id,
        }).save();
      })
    );

    res.status(200).json({ message: 'Assets saved', savedAssets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add this GET route here (not inside userRoutes)
router.get('/user/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const userAssets = await Asset.find({ user: user._id });
    res.json(userAssets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
