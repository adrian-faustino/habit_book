const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const authenticateToken = require('../helpers/auth');

/** Constants **/
const TABLE_NAME = 'habits';

// @route   habits/~
// @desc    handle habits CRUD requests
// @access  Private


// CREATE Habit
router.post('/newHabit', authenticateToken, (req, res) => {
  const { user, habit } = req.body;
  console.log('Habit', habit);
  console.log('User', user);
  const userID = user.user_id;

  //query using user id,
  const queryString = `
    INSERT INTO ${TABLE_NAME} (title, description, created_at, last_completed_at, last_broken_at, is_edited)
    VALUES ($1, $2, $3, $4, $5, $6);
  `;
});

// READ habits
router.get('/', async (req, res) => {
  try {
    const queryString = `
      SELECT * FROM ${TABLE_NAME};
    `; 
    const allHabits = (await pool.query(queryString)).rows;
    res.json(allHabits);  
  } catch (err) {
    console.err(err);
    res.status(500).json({ error: err.message });
  }
});

// EDIT habits

// DELETE habits

module.exports = router;