const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const authenticateToken = require('../helpers/auth');

/** Constants **/
const HABIT_COMMENTS_TABLE = 'habit_comments';

// @route   comments/~
// @desc    handle comments on habits (CRUD requests)
// @access  Private

// CREATE
// TODO: auth
router.post('/newComment', authenticateToken, async (req, res) => {
  const { comment_by, habit_id, content, created_at, is_edited } = req.body;
  
  // insert into db
  const VALUES = [comment_by, habit_id, content, created_at, is_edited];
  const insertQuery = `
    INSERT INTO ${HABIT_COMMENTS_TABLE}
      (comment_by, habit_id, content, created_at, is_edited)
    VALUES
      ($1, $2, $3, $4, $5);
  `;

  try {
    await pool.query(insertQuery, VALUES);
    res.json({ msg: 'OK '});

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ err: err.message });
  };
});

// READ
// get all comments on a habit
router.get('/:habit_id', async (req, res) => {
  const { habit_id } = req.params;

  const query = `
    SELECT * FROM ${HABIT_COMMENTS_TABLE}
    WHERE habit_id = $1
    ORDER BY created_at;
  `;

  try {
    const comments = await pool.query(query, [habit_id]);
    res.json(comments.rows);
  } catch (err) { 
    console.error(err.message);
    res.status(500).json({ err: err.message });
  };
});

// UPDATE

// DELETE

module.exports = router;