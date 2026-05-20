const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName:     { type: String, required: true, trim: true },
  username:     { type: String, default: '', trim: true },
  email:        { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:     { type: String, required: true },
  displayTitle: { type: String, default: 'Beginner Learner' },
  role:         { type: String, default: 'learner' },
  createdAt:    { type: Date, default: Date.now },
  updatedAt:    { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
