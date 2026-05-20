const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  badgeCode:               { type: String, required: true, unique: true },
  name:                    { type: String, required: true },
  requiredCompletionCount: { type: Number, required: true },
  description:             { type: String, default: '' },
  createdAt:               { type: Date, default: Date.now }
});

module.exports = mongoose.model('Badge', badgeSchema, 'badges');
