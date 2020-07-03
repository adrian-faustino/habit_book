const express = require('express');
const router = express.Router();


// @route   user/~
// @desc    handle user CRUD requests
// @access  Private


router.post('/:date/:user_id/:habit_id', async (req, res) => {
  console.log(req.params);
});

module.exports = router;