const express = require('express');
const router = express.Router();
const pool = require('../db/db');

/** Constants **/
const CREATED_AT_TABLE = 'completed_at';

// @route   user/~
// @desc    handle user CRUD requests
// @access  Private


router.post('/:date/:user_id/:habit_id', async (req, res) => {
  const { date, user_id, habit_id } = req.params;

  try {
    // check if a completed_at entry from this habit and date and user already exists
    const checkQuery = `
      SELECT * FROM ${CREATED_AT_TABLE}
      WHERE user_id = $1
      AND habit_id = $2
      AND CAST(completed_at AS text) LIKE '${date}%';
    `;

    const exists = await pool.query(checkQuery, [user_id, habit_id]);
    if (exists.rows.length > 0) {
      console.log('completed_at not created.')
      return res.status(500).json({ err: 'Day already marked complete!' });
    }

    // if validation passed
    console.log('inserting new completed_at...');
    const insertQuery = `
      INSERT INTO ${CREATED_AT_TABLE}
        (user_id, habit_id, completed_at)
      VALUES ($1, $2, $3);
    `;
    const newEntry = pool.query(insertQuery, [user_id, habit_id, date]);
    res.json({
      msg: 'Day marked completed!', newEntry
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ err: err.message });
  };
});

module.exports = router;