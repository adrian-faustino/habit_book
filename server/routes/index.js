const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(`Welcome to the HabitBook API! 🔥`);
});

module.exports = router;