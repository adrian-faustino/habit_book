const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// return all posts made by that user?
router.get('/test', authenticateToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name ));
});


router.post('/', (req, res) => {
  // Authenticate user here...
  //
  //
  //

  /** After successful authentification **/
  const username = req.body.username;
  const user = { name: username };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  console.log('Sending...', accessToken)
  res.json({ accessToken: accessToken });
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