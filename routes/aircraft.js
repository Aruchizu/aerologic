const express = require('express');
const router = express.Router();
const Aircraft = require('../models/Aircraft');

// GET /api/aircraft
router.get('/', async (req, res) => {
  try {
    const aircraft = await Aircraft.find().sort('order');
    res.json(aircraft);
  } catch (err) {
    console.error('Aircraft error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
