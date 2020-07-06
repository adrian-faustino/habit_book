const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const authenticateToken = require('../helpers/auth');

/** Constants **/
const USERS_TABLE = 'users';
const QUERY_RESULT_LIMIT = 30;

// @route   search?search_query=
// @desc    handle user search queries for other users
// @access  Private

// Search for users
router.get('/', async (req, res) => {
  console.log('Search query name:', req.query.name);
  const name = req.query.name.split(' ').join(''); // remove space

  const dbQuery = `
    SELECT * FROM ${USERS_TABLE}
    WHERE username LIKE CONCAT('%', $1::text, '%')
    OR first_name LIKE CONCAT('%', $1::text, '%')
    OR last_name LIKE CONCAT('%', $1::text, '%')
    OR email LIKE CONCAT('%', $1::text, '%')
    OR CONCAT(${USERS_TABLE}.first_name, ${USERS_TABLE}.last_name) LIKE CONCAT('%', $1::text, '%')
    LIMIT ${QUERY_RESULT_LIMIT};
  `;

  try {
    const results = await pool.query(dbQuery, [name]);
    res.json({ msg: 'Query results.', queryHits: results.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
});


module.exports = router;