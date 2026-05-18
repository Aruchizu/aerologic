const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Progress = require('../models/Progress');
const { protect } = require('../middleware/authMiddleware');

const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password)
      return res.status(400).json({ error: 'All fields are required' });

    if (await User.findOne({ email }))
      return res.status(400).json({ error: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ fullName, email, password: hashed });

    // Create default A320 progress record
    await Progress.create({
      userId: user._id.toString(),
      aircraftSlug: 'airbus-a320',
      currentLessonKey: 'aircraft-preparation',
      completedLessons: [],
      progressPercentage: 0,
      status: 'Not Started',
      completionCount: 0
    });

    res.status(201).json({ token: generateToken(user._id), user: { id: user._id, fullName, email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: 'All fields are required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid email or password' });

    res.json({ token: generateToken(user._id), user: { id: user._id, fullName: user.fullName, email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/auth/me (protected)
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
