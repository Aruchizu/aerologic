const express = require('express');
const router   = express.Router();
const Aircraft = require('../models/Aircraft');
const Lesson   = require('../models/Lesson');

// GET /api/search?q=
router.get('/', async (req, res) => {
  try {
    const q = String(req.query.q || '').trim();

    // Empty query → return available aircraft + active lessons (limited)
    if (!q) {
      const [aircraft, lessons] = await Promise.all([
        Aircraft.find({ status: 'available' }).sort('order').limit(10),
        Lesson.find({ isActive: true }).sort('order').limit(20)
      ]);
      return res.json({ aircraft, lessons });
    }

    // Escape regex special chars to keep search safe
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const rx      = new RegExp(escaped, 'i');

    const [aircraft, lessons] = await Promise.all([
      Aircraft.find({
        $or: [
          { name: rx },
          { slug: rx },
          { description: rx },
          { status: rx }
        ]
      }).sort('order').limit(10),
      Lesson.find({
        isActive: true,
        $or: [
          { title: rx },
          { description: rx },
          { aircraftSlug: rx },
          { lessonKey: rx }
        ]
      }).sort('order').limit(20)
    ]);

    res.json({ aircraft, lessons });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
