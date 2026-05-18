const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId:             { type: String, required: true },
  aircraftSlug:       { type: String, default: 'airbus-a320' },
  currentLessonKey:   { type: String, default: 'aircraft-preparation' },
  completedLessons:   [String],
  progressPercentage: { type: Number, default: 0 },
  status:             { type: String, default: 'Not Started' },
  completionCount:    { type: Number, default: 0 },
  lastUpdated:        { type: Date, default: Date.now }
});

module.exports = mongoose.model('Progress', progressSchema);
