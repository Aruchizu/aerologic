const express = require('express');
const router  = express.Router();
const User    = require('../models/User');
const Progress = require('../models/Progress');
const { protect } = require('../middleware/authMiddleware');

const ALLOWED_TITLES = ['Beginner Learner', 'A320 Learner', 'A320 Pro'];

// GET /api/users/me — get current user profile
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/users/me — update username and displayTitle only
router.put('/me', protect, async (req, res) => {
  try {
    const { username, displayTitle } = req.body;
    const updates = {};

    if (username !== undefined) {
      const trimmed = String(username).trim();
      if (!trimmed) {
        return res.status(400).json({ error: 'Username cannot be empty' });
      }
      if (trimmed.length > 40) {
        return res.status(400).json({ error: 'Username is too long (max 40 characters)' });
      }
      updates.username = trimmed;
    }

    if (displayTitle !== undefined) {
      if (!ALLOWED_TITLES.includes(displayTitle)) {
        return res.status(400).json({ error: 'Invalid display title' });
      }
      updates.displayTitle = displayTitle;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    updates.updatedAt = new Date();

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/users/me — delete account and related progress
router.delete('/me', protect, async (req, res) => {
  try {
    await Progress.deleteMany({ userId: req.user.id });
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
