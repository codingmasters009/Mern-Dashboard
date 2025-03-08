const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

// Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    logger.info(`User created: ${email}`);
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    logger.error(`Signup error: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(`Login attempt failed: User not found - ${email}`);
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Login attempt failed: Invalid credentials - ${email}`);
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    logger.info(`User logged in: ${email}`);
    res.json({ token });
  } catch (err) {
    logger.error(`Login error: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
};