const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const dashboardController = require('../controllers/dashboardController');
const User = require("../models/User");

// Get user data
router.get('/', auth, dashboardController.getUserData);

// Update user data
const upload = require("../utils/multer");

// Update profile picture
router.put("/profile-picture", auth, upload.single("profilePicture"), async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.file) {
      user.profilePicture = `/uploads/profile-pictures/${req.file.filename}`;
      await user.save();
    }

    res.json({ message: "Profile picture updated successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;