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
router.post('/newComment', authenticateToken, async (req, res) => {
  const { habit_id, content, is_edited } = req.body;
  const comment_by = req.user.user_id;
  
  // insert into db
  const VALUES = [comment_by, habit_id, content, is_edited];
  const insertQuery = `
    INSERT INTO ${HABIT_COMMENTS_TABLE}
      (comment_by, habit_id, content, is_edited)
    VALUES
      ($1, $2, $3, $4);
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
// get all comments
router.get('/', async (req, res) => {
  const query = `
    SELECT * FROM ${HABIT_COMMENTS_TABLE};
  `;

  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ err: err.message });
  };
});

// get all comments on a habit
router.get('/:habit_id', async (req, res) => {
  const { habit_id } = req.params;

  const query = `
    SELECT * FROM ${HABIT_COMMENTS_TABLE}
    WHERE habit_id = $1
    ORDER BY created_at DESC;
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
router.put('/updateComment', authenticateToken, (req, res) => {
  const { content, comment_id } = req.body;

  const VALUES = [content, comment_id]
  const query = `
    UPDATE ${HABIT_COMMENTS_TABLE}
    SET content = $1, is_edited = true
    WHERE comment_id = $2;
  `;

  pool
    .query(query, VALUES)
    .then(data => {
      res.json({ content });
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).json({ err: err.message });
    })
});

// DELETE comments
router.delete('/delete/:comment_id', authenticateToken, async (req, res) => {
  const { comment_id } = req.params;

  const query = `
    DELETE FROM ${HABIT_COMMENTS_TABLE}
    WHERE comment_id = $1;
  `;

  try {
    await pool.query(query, [comment_id]);
    res.json({ msg: 'Successfully deleted comment. '});
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;