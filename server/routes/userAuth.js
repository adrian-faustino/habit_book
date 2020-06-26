/** For Route: .com/login/~ **/
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db/db');
const { emailExists, getUserByEmail } = require('../helpers/userValidationHelpers');
/** Constants **/
const TABLE_NAME = 'users';

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
  if (password === user.password) {
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  console.log('Sending...', accessToken)
    return res.json({ accessToken: accessToken });
  }
  
  return res.status(401).json({ error: "Invalid password "});
});

function authenticateToken(req, res, next) {
  //Bearer TOKEN will be in our verification header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};


module.exports = router;

/* Token secret notes:
 * These tokens can be easily generated using NodeJs crypto
 * require('crypto').randomBytes(64).toString('hex') */