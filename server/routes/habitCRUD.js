const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const authenticateToken = require('../helpers/auth');
const { formatToYYYYMMDD } = require('../helpers/formatHelpers');
const validateForm = require('../helpers/habitValidationHelpers');

/** Constants **/
const HABITS_TABLE = 'habits';
const COMPLETED_AT_TABLE = 'completed_at';
const HABIT_LIKES_TABLE = 'habit_likes';

// @route   habits/~
// @desc    handle habits CRUD requests
// @access  Private


// CREATE Habit
router.post('/newHabit', authenticateToken, async (req, res) => {
  const { user, habit } = req.body;
  // ensure no empty title, and trim text for whitespace
  const validated = validateForm(habit);
  if (validated.err) return res.status(500).json({
    err: validated.err
  });

  // if validation passes, insert into DB
  const created_at = formatToYYYYMMDD(new Date());
  const userID = user.user_id;

  const VALUES = [
    validated.habit.title,
    validated.habit.description,
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

  pool
    .query(queryString, VALUES)
    .then(data => {
      const jsonRes = {
        msg: 'New habit created!',
        habit: data.data
      };
      res.json(jsonRes);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ msg: err.message });
    });
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
// TODO: add auth
router.get('/:user_id', async (req, res) => {
  try {
    const queryString = `
      SELECT * FROM ${HABITS_TABLE}
      WHERE user_id = $1
      ORDER BY habit_id DESC;
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
// TODO: add auth
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

/** Get all of a habit's likes **/
router.get('/likes/:user_id/:habit_id', async (req, res) => {
  const { user_id, habit_id } = req.params;

  console.log('Getting likes:', user_id, habit_id);
  const query = `
    SELECT count(*) FROM ${HABIT_LIKES_TABLE}
    WHERE habit_by = $1
    AND habit_id = $2;
  `;
  
  try {
    const result = await pool.query(query, [user_id, habit_id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ err: err.message });
  }
});

// EDIT habits

// DELETE habits
router.delete('/:user_id/:habit_id', async (req, res) => {
  const { user_id, habit_id } = req.params;
  // authent

  try {
    // delete all completed_at related to that habit
    const deleteCompleted_at = `
      DELETE FROM ${COMPLETED_AT_TABLE}
      WHERE habit_id = $1
      AND user_id = $2;
    `;
    
    const deleteHabit = `
      DELETE FROM ${HABITS_TABLE}
      WHERE habit_id = $1;
    `;
    
    await pool.query(deleteCompleted_at, [habit_id, user_id]);
    await pool.query(deleteHabit, [habit_id]);
    res.json({ msg: 'Successfully deleted habit.'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;