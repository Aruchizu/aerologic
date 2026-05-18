const mongoose = require('mongoose');

const aircraftSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  status: { type: String, enum: ['available', 'coming-soon'], default: 'coming-soon' },
  description: String,
  imagePath: String,
  order: { type: Number, default: 0 }
});

module.exports = mongoose.model('Aircraft', aircraftSchema, 'aircraft');
