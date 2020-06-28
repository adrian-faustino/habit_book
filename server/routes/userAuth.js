const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db/db');
const bcrypt = require('bcrypt');
const { 
  emailExists, 
  getUserByEmail
} = require('../helpers/userValidationHelpers');
const authenticateToken = require('../helpers/auth');

/** Constants **/
const TABLE_NAME = 'users';

// @route   login/~
// @desc    Auth user
// @access  Public

// return all posts made by that user?
router.get('/test', authenticateToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name ));
});


router.post('/', async (req, res) => {
  const { email, password } = req.body;

  // ...check if email in DB
  const isValidEmail = await emailExists(pool, TABLE_NAME, email);
  if (!isValidEmail) return res.status(400).json({
    error: "Unregistered email" 
  });

  // ...get user email and password from DB
  const result = await getUserByEmail(pool, TABLE_NAME, email);
  const user = result.rows[0];
  
  /** After successful authentification **/
  try {
    if (await bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

      console.log('Sending...', accessToken)
      return res.json({
        accessToken: accessToken,
        user: {
          user_id: user.user_id,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          created_at: user.created_at,
          avatar_url: user.avatar_url
        }
      });
    };
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Invalid password" });
  }
  
  return res.status(401).json({ error: "Invalid password "});
});


module.exports = router;

/* Token secret notes:
 * These tokens can be easily generated using NodeJs crypto
 * require('crypto').randomBytes(64).toString('hex') */