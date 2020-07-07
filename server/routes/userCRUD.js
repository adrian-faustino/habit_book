/** This file contains all CRUD operations handling User information **/
const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const bcrypt = require('bcrypt');
const { formatToYYYYMMDD } = require('../helpers/formatHelpers');
const { 
  isValidUsername, 
  isValidEmail, 
  isValidPassword, 
  isEmptyObj, 
  usernameExists, 
  emailExists } = require('../helpers/userValidationHelpers');

/** Constants **/
const USERS_TABLE = 'users';

// @route   user/~
// @desc    handle user CRUD requests
// @access  Private

// ===> CREATE
/** .com/users/newUser **/
router.post('/newUser', async (req, res) => {
  console.log('New user request...', req.body);
  try {
    const { username, first_name, last_name, email, password } = req.body;

    /* ==================/
     * BEGIN: Validation /
     * ==================/
    /** Validate null fields **/
    const error = {};
    !username && (error.username = `Username is required.`);
    !first_name && (error.first_name = `First name is required.`);
    !last_name && (error.last_name = `Last name is required.`);
    !email && (error.email = `Email is required.`);
    !password && (error.password = `Password is required.`);

    /** Validate username **/
    !isValidUsername(username) && (error.username = `Invalid username.`);
    /** Validate email **/
    !isValidEmail(email) && (error.email = `Invalid email.`);
    /** Validate password **/
    !isValidPassword(password) && (error.password = `Invalid password.`);
    /** Check if email exists already **/
    if (email && await emailExists(pool, USERS_TABLE, email)) {
      error.email = `Email is already registered.`;
    }
    /** Check if username exists already **/
    if (username && await usernameExists(pool, USERS_TABLE, username)) {
      error.username = `Username is taken.`;
    }

    /** If there are any errors at all, res with error obj **/
    if (!isEmptyObj(error)) return res.status(500).json(error);
    /* ================/
     * END: Validation /
     * ===============*/

    /* ===============================/
     * BEGIN: New user insert into DB /
     * ===============================/
    /** If all validations passed, continue DB INSERT **/
    const created_at = formatToYYYYMMDD(new Date());
    const is_active = true;
    /* STRETCH: allow user to choose their avatar */
    const avatar_url = 'https://i.imgur.com/2WZtOD6.png';

    // hash and salt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); 

    const VALUES = [username, first_name, last_name, email, hashedPassword, created_at, is_active, avatar_url];
    const createUserQuery = `
      INSERT INTO ${USERS_TABLE} (username, first_name, last_name, email, password, created_at, is_active, avatar_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `;

    const newUser = await pool.query(createUserQuery, VALUES);
    const jsonRes = {
      msg: 'New user successfully created.',
      newUser
    };
    res.json(jsonRes);
    /* =============================/
     * END: New user insert into DB /
     * ============================*/
     
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});



// ===> READ
/** .com/users **/
// get all users
router.get('/', async (req, res) => {
  try {
    const getAllUsersQuery = `
      SELECT * FROM ${USERS_TABLE};
    `;
    const allUsers = (await pool.query(getAllUsersQuery)).rows;
    res.json(allUsers); // [{}, {}, {}]

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// get a user
router.get('/:user_id', async (req, res) => {
  console.log(req.params);
});



// ===> UPDATE
/** .com/users/123 **/
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, first_name, last_name, password } = req.body;

    /* ==================/
     * BEGIN: Validation /
     * =================*/
    const error = {};
    /** Validate username **/
    username && !isValidUsername(username) && (error.username = `Invalid username.`);
    /** Validate password **/
    password && !isValidPassword(password) && (error.password = `Invalid password.`);
    /** Check if username exists already **/
    if (username && await usernameExists(pool, USERS_TABLE, username)) {
      error.username = `Username is taken.`;
    }

    /** If there are any errors at all, res with error obj **/
    if (!isEmptyObj(error)) return res.status(500).json(error);
    /* ================/
     * END: Validation /
     * ===============*/

    const VALUES = [];
    let  queryHead = `
      UPDATE ${USERS_TABLE} SET
    `;

    if (username) {
      VALUES.push(username);
      queryHead += `username = $${VALUES.length}`;
    }
    if (first_name) {
      VALUES.push(first_name);
      console.log('firstname,', VALUES.length)
      queryHead += `, first_name = $${VALUES.length}`
    }
    if (last_name) {
      console.log('lastname,', last_name)
      VALUES.push(last_name);
      queryHead += `, last_name = $${VALUES.length}`
    }
    if (password) {
      VALUES.push(password);
      queryHead += `, password = $${VALUES.length}`
    }
    
    const queryTail = `
      WHERE user_id = ${id};
    `;

    const updateUserQuery = queryHead + queryTail;
    console.log('final query:', updateUserQuery, VALUES);
    const updateUser = await pool.query(updateUserQuery, VALUES);
    res.json({'User updated:' : updateUser});
    
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});


// ===> DELETE
/** .com/users/123 **/
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deleteUserQuery = `
      DELETE FROM ${USERS_TABLE}
      WHERE user_id = $1;
    `;

    const deleteUser = await pool.query(deleteUserQuery, [id]);
    res.json({ message: "User deleted." });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;