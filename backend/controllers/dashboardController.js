const User = require('../models/User');
const logger = require('../utils/logger');
const upload = require('../utils/multer');

// Get user data
exports.getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    logger.info(`User data fetched: ${user.email}`);
    res.json(user);
  } catch (err) {
    logger.error(`Error fetching user data: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

// Update user data
exports.updateUserData = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findById(req.userId);

    if (name) user.name = name;
    if (password) user.password = password;

   
    if (req.file) {
      user.profilePicture = `/uploads/profile-pictures/${req.file.filename}`;
    }

    await user.save();
    logger.info(`User data updated: ${user.email}`);
    res.json({ message: 'User updated successfully', user });
  } catch (err) {
    logger.error(`Error updating user data: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
};

// Middleware for handling image upload
exports.uploadProfilePicture = upload.single('profilePicture');