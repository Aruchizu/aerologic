const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');

// GET /api/lessons/:slug — all active lessons for an aircraft
router.get('/:slug', async (req, res) => {
  try {
    const lessons = await Lesson.find({
      aircraftSlug: req.params.slug,
      isActive: true
    }).sort('order');
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
