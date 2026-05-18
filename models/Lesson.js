const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  aircraftSlug: { type: String, required: true },
  lessonKey:    { type: String, required: true },
  title:        { type: String, required: true },
  description:  String,
  checklist:    [String],
  videoPath:    String,
  order:        { type: Number, default: 0 },
  isActive:     { type: Boolean, default: true }
});

module.exports = mongoose.model('Lesson', lessonSchema);
