const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const authenticateToken = require('../helpers/auth');
const { formatToYYYYMMDD } = require('../helpers/formatHelpers');

/** Constants **/
const TABLE_NAME = 'habits';

// @route   habits/~
// @desc    handle habits CRUD requests
// @access  Private


// CREATE Habit
router.post('/newHabit', authenticateToken, async (req, res) => {
  const { user, habit } = req.body;
  const created_at = formatToYYYYMMDD(new Date());
  const userID = user.user_id;

  const VALUES = [
    habit.title,
    habit.description,
    created_at,
    null,
    null,
    false,
    userID
  ];
  const queryString = `
    INSERT INTO ${TABLE_NAME} (title, description, created_at, last_completed_at, last_broken_at, is_edited, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7);
  `;

  const newHabit = await pool.query(queryString, VALUES);
  const jsonRes = {
    msg: 'New habit successfully created.',
    newHabit
  };
  res.json(jsonRes);
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