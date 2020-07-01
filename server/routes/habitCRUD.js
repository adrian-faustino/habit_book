const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const authenticateToken = require('../helpers/auth');
const { formatToYYYYMMDD } = require('../helpers/formatHelpers');

/** Constants **/
const HABITS_TABLE = 'habits';
const COMPLETED_AT_TABLE = 'completed_at';

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
    INSERT INTO ${HABITS_TABLE} (title, description, created_at, last_completed_at, last_broken_at, is_edited, user_id)
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
/** Return all habits in db **/
router.get('/', async (req, res) => {
  try {
    const queryString = `
      SELECT * FROM ${HABITS_TABLE};
    `; 
    const allHabits = (await pool.query(queryString)).rows;
    res.json(allHabits);  
  } catch (err) {
    console.err(err);
    res.status(500).json({ msg: err.message });
  }
});

/** Return all habits of a user **/
router.get('/:user_id', async (req, res) => {
  try {
    const queryString = `
      SELECT * FROM ${HABITS_TABLE}
      WHERE user_id = $1;
    `;
    const allHabits = (
      await pool.query(queryString, [req.params.user_id])
    ).rows;
    res.json(allHabits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
});

/** Return all completed dates for a habit **/
router.get('/:user_id/:habit_id', async (req, res) => {
  const { user_id, habit_id } = req.params;

  try {
    const queryString = `
      SELECT * FROM ${COMPLETED_AT_TABLE}
      WHERE user_id = $1 AND habit_id = $2;
    `;
    const result = (
      await pool.query(queryString, [user_id, habit_id])
      ).rows;
      res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
});

// EDIT habits

// DELETE habits

module.exports = router;