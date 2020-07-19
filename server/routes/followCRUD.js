const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const authenticateToken = require('../helpers/auth');

/** Constants **/
const FOLLOWS_TABLE = 'follows';
const USERS_TABLE = 'users';

// @route   follows/~
// @desc    handle follows CRUD requests
// @access  Private

// CREATE
// create a new follow relation between users
router.post('/', authenticateToken, (req, res) => {
  const { target_user_id } = req.body;
  const follower_id = req.user.user_id;

  const query = `
    INSERT INTO ${FOLLOWS_TABLE}
      (target_user_id, follower_id)
    VALUES
      ($1, $2);
  `;

  pool
    .query(query, [target_user_id, follower_id])
    .then(data => {
      res.json({ msg: 'Successfully liked user. '});
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).json({ err: err.message });
    })
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


// get all the accounts a user follows
router.get('/myFollows', authenticateToken, (req, res) => {
  const user_id = req.user.user_id;
  
  const query = `
  SELECT * FROM ${FOLLOWS_TABLE}
  WHERE follower_id = $1;
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

// get all the accounts a user follows (no auth)
router.get('/following/:user_id', (req, res) => {
  const { user_id } = req.params;
  // get follow relations
  const query = `
    SELECT * FROM ${FOLLOWS_TABLE}
    WHERE follower_id = $1;
  `;
  // stretch: add limit
  // stretch merge tables to make it one query...
  // RESUME #1

  pool
    .query(query, [user_id])
    .then(data => {
      res.json(data.rows);
    })
    .catch(err => {
      console.error(err.message);
      res.json({ err: err.message });
    })
});


// get a user's followers
router.get('/:user_id', (req, res) => {
  const { user_id } = req.params;
  // get follow relations
  const query = `
    SELECT * FROM ${FOLLOWS_TABLE}
    WHERE target_user_id = $1;
  `;
  
  pool
    .query(query, [user_id])
    .then(async data => {
      let result = [];
      for (let followObj of data.rows) {
        // get follower user info
        const query = `
        SELECT user_id, username, first_name, last_name, email, is_active, avatar_url, created_at FROM ${USERS_TABLE}
        WHERE user_id = ${followObj.follower_id}
        LIMIT 1;
        `;
        const user = await pool.query(query);
        result.push(user.rows[0]);
      };
      console.log(result, 'MEE')
      res.json(result);
    })
    .catch(err => {
      console.error(err.message);
      res.json({ err: err.message });
    });
});

// UPDATE

// DELETE
// unfollow a user
router.delete('/:user_id', authenticateToken, (req, res) => {
  const VALUES = [
    req.user.user_id,
    req.params.user_id
  ];
  const query = `
    DELETE FROM ${FOLLOWS_TABLE}
    WHERE follower_id = $1
    AND target_user_id = $2;
  `;

  pool
    .query(query, VALUES)
    .then(data => {
      res.json({ msg: 'Unfollowed user.' });
    })
    .catch(err => {
      console.error(err.message)
      res.status(500).json({ err: err.message });
    });
});

module.exports = router;