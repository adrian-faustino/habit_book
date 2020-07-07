const express = require('express');
const router = express.Router();
const pool = require('../db/db');

/** Constants **/
const HABIT_COMMENTS_TABLE = 'habit_comments';

// @route   comments/~
// @desc    handle comments on habits (CRUD requests)
// @access  Private

// get all comments on a habit
router.get('/:habit_id', async (req, res) => {
  const { habit_id } = req.params;

  const query = `
    SELECT * FROM ${HABIT_COMMENTS_TABLE}
    WHERE habit_id = $1;
  `;

  try {
    const comments = await pool.query(query, [habit_id]);
    res.json(comments.rows);
  } catch (err) { 
    console.error(err.message);
    res.status(500).json({ err: err.message });
  };
});

module.exports = router;