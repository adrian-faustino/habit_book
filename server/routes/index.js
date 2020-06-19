const express = require('express');
const router = express.Router();
const pool = require('../db/db');

router.get('/', (req, res) => {
  res.send(`Welcome to the HabitBook API! 🔥`);
});


// CREATE TODO
router.post('/todos', async(req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query('INSERT INTO todo (description) VALUES($1)', [description]);
    res.json(newTodo);

  } catch (err) { 
    console.error(err.message)
  }
});

module.exports = router;