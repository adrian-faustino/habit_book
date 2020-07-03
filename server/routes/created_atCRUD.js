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
  console.log(req.params)
  // check if a completed_at entry from this habit and date and user already exists
  const checkQuery = `
    SELECT * FROM ${CREATED_AT_TABLE}
    WHERE user_id = $1
    AND habit_id = $2
    AND CAST(completed_at AS text) LIKE '${date}%';
  `;
  const exists = pool
    .query(checkQuery, [user_id, habit_id])
    .then(result => {
      // if completed at exists already
      if (result.rows.length > 0) {
        
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ msg: err.message });
    });
  console.log('exists', exists);



  
  const insertQuery = `
    INSERT INTO ${CREATED_AT_TABLE} (user_id, habit_id, completed_at)
    VALUES ($1, $2, $3);
  `;

  pool
    .query(insertQuery, [user_id, habit_id, date])
    .then(data => {
      const jsonRes = {
        msg: 'New completed_at created!',
        data
      }
      res.json(jsonRes);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ msg: err.message });
    })
});

module.exports = router;