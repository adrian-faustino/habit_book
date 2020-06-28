const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const authenticateToken = require('../helpers/auth');

// @route   habits/~
// @desc    handle habits CRUD requests
// @access  Private


// CREATE Habit
router.post('/newHabit', authenticateToken, (req, res) => {
  const { user, habit } = req.body;
  console.log(habit);
  console.log('UserID:', user.user_id);
  const userID = user.user_id;

  //query using user id,
});

// READ habits

// EDIT habits

// DELETE habits

module.exports = router;