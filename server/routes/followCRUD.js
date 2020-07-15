const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const authenticateToken = require('../helpers/auth');

/** Constants **/
const FOLLOWS_TABLE = 'follows';

// @route   follows/~
// @desc    handle follows CRUD requests
// @access  Private

// CREATE
// create a new follow relation between users
router.post('/', authenticateToken, (req, res) => {
  const { target_user_id } = req.body;
  const follower_id = req.user.user_id;


});


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

// get a user's followers
router.get('/:user_id', (req, res) => {
  const { user_id } = req.params;
  
  const query = `
    SELECT * FROM ${FOLLOWS_TABLE}
    WHERE target_user_id = $1;
  `;

  pool
    .query(query, [user_id])
    .then(data => {
      res.json(data.rows);
    })
    .catch(err => {
      console.error(err.message);
      res.json({ err: err.message });
    });
});

// UPDATE

// DELETE

module.exports = router;