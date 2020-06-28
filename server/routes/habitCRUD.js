const express = require('express');
const router = express.Router();
const pool = require('../db/db');

// @route   habits/~
// @desc    handle habits CRUD requests
// @access  Private


// CREATE Habit
router.post('/newHabit', (req, res) => {
  const { title, description } = req.body;
  console.log(req.body);
});

// READ habits

// EDIT habits

// DELETE habits


module.exports = router;