const express = require('express');
const router = express.Router();
const pool = require('../db/db');

/** Constants **/
const FOLLOWS_TABLE = 'follows';

// @route   follows/~
// @desc    handle follows CRUD requests
// @access  Private

// CREATE

// READ
// get all follow relations
router.get('/', (req, res) => {
  const query = `
    SELECT * FROM ${FOLLOWS_TABLE};
  `;
  pool
    .query(query)
    .then(data => {
      res.json(data.rows);
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).json({ err: err.message });
    })
});

// UPDATE

// DELETE

module.exports = router;