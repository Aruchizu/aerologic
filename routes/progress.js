const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const Lesson = require('../models/Lesson');
const { protect } = require('../middleware/authMiddleware');

// GET /api/progress/me
router.get('/me', protect, async (req, res) => {
  try {
    const progress = await Progress.findOne({ userId: req.user.id });
    if (!progress) return res.status(404).json({ error: 'No progress found' });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/progress/complete
router.post('/complete', protect, async (req, res) => {
  try {
    const progress = await Progress.findOne({ userId: req.user.id });
    if (!progress) return res.status(404).json({ error: 'No progress found' });

    const { lessonKey } = req.body;
    if (!lessonKey) return res.status(400).json({ error: 'lessonKey is required' });

    // Fetch all active lessons for this aircraft in order
    const lessons = await Lesson.find({
      aircraftSlug: progress.aircraftSlug,
      isActive: true
    }).sort('order');

    const totalLessons = lessons.length;
    if (totalLessons === 0) return res.status(400).json({ error: 'No lessons found for this aircraft' });

    // If already completed, do nothing — prevents rebadge gaming
    if (progress.completedLessons.includes(lessonKey)) {
      return res.json(progress);
    }

    progress.completedLessons.push(lessonKey);

    // Advance to next lesson
    const currentIndex = lessons.findIndex(l => l.lessonKey === lessonKey);
    const nextLesson = lessons[currentIndex + 1];
    progress.currentLessonKey = nextLesson ? nextLesson.lessonKey : lessonKey;

    // Recalculate percentage and status
    progress.progressPercentage = Math.round((progress.completedLessons.length / totalLessons) * 100);

    if (progress.completedLessons.length >= totalLessons) {
      progress.status = 'Completed';
      progress.completionCount += 1;
    } else {
      progress.status = 'In Progress';
    }

    progress.lastUpdated = new Date();
    await progress.save();
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
