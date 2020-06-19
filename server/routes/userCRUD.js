/** This file contains all CRUD operations handling User information **/
const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const { formatToYYYYMMDD } = require('../helpers/formatHelpers');

/** Constants **/
const TABLE_NAME = 'users';

// CREATE
/** .com/users/newUser **/
router.post('/newUser', async (req, res) => {
  try {
    const { username, first_name, last_name, email, password } = req.body;

    /** BEGIN: Validation **/
    const error = {};
    !username && (error.username = `Username is required.`);
    !first_name && (error.first_name = `First name is required.`);
    !last_name && (error.last_name = `Last name is required.`);
    !email && (error.email = `Email is required.`);
    !password && (error.password = `Password is required.`);
   
    if (!username || !first_name || !last_name || !email || !password) {
      return res.status(500).json(error);
    }
    /** END: Validation **/

    /** If all validations passed, continue DB INSERT **/
    const created_at = formatToYYYYMMDD(new Date());
    const is_active = true;
    const avatar_url = 'default';

    const VALUES = [username, first_name, last_name, email, password, created_at, is_active, avatar_url];
    const createUserQuery = `
      INSERT INTO ${TABLE_NAME} (username, first_name, last_name, email, password, created_at, is_active, avatar_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `;

    const newUser = await pool.query(createUserQuery, VALUES);
    const jsonRes = {
      success: 'New user successfully created.'
    }
    res.json(jsonRes);

  } catch (err) {
    console.log(err.message);
  }
});

// READ
/** .com/users **/
router.get('/', async (req, res) => {
  try {
    const getAllUsersQuery = `
      SELECT * FROM ${TABLE_NAME};
    `;
    const allUsers = (await pool.query(getAllUsersQuery)).rows;
    res.json(allUsers); // [{}, {}, {}]

  } catch (err) {
    console.error(err.message);
  }
});

// UPDATE

// DELETE

module.exports = router;