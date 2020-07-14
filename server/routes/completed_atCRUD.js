const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const authenticateToken = require('../helpers/auth');
const { getDateYYYYMMDD } = require('../helpers/formatHelpers');

/** Constants **/
const COMPLETED_AT_TABLE = 'completed_at';

// @route   completed_at/~
// @desc    handle user CRUD requests
// @access  Private

// CREATE completed_at
router.post('/', authenticateToken, async (req, res) => {
  const { date, user_id, habit_id } = req.body;
  
  // validate to see if this habit belongs to this user
  if (req.user.user_id !== user_id) {
    console.log('This habit does not belong to you.');
    return res.status(500).json({ msg: 'Habit does not belong to this user '});
  };
  
  try {
    // check if a completed_at entry from this habit and date and user already exists
    const checkQuery = `
      SELECT * FROM ${COMPLETED_AT_TABLE}
      WHERE user_id = $1
      AND habit_id = $2
      AND CAST(completed_at AS text) LIKE '${date}%';
    `;

    const exists = await pool.query(checkQuery, [user_id, habit_id]);
    if (exists.rows.length > 0) {
      console.log('completed_at not created.')
      return res.status(500).json({ err: 'Day already marked complete!' });
    }

    // check if day is in future
    if (date > getDateYYYYMMDD(new Date())) {
      console.log('completed_at not created.')
      return res.status(500).json({ err: 'Cannot set dates in the future.' });
    };

    // if validation passed
    console.log('inserting new completed_at...');
    const insertQuery = `
      INSERT INTO ${COMPLETED_AT_TABLE}
        (user_id, habit_id, completed_at)
      VALUES ($1, $2, $3);
    `;
    
    await pool.query(insertQuery, [user_id, habit_id, date]);
    res.json({
      msg: 'Day marked completed!',
      date
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ err: err.message });
  };
});

// READ
// return all completed_at
// TODO: add limit, pagination
router.get('/', (req, res) => {
  const query = `
    SELECT * FROM ${COMPLETED_AT_TABLE};
  `;

  pool
    .query(query)
    .then(data => {
      res.json(data.rows[0]);
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).json({ err: err.message });
    })
});

module.exports = router;