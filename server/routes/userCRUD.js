/** This file contains all CRUD operations handling User information **/
const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const { formatToYYYYMMDD } = require('../helpers/formatHelpers');
const { isValidUsername, isValidEmail, isValidPassword, isEmptyObj } = require('../helpers/userValidationHelpers');

/** Constants **/
const TABLE_NAME = 'users';



// ===> CREATE
/** .com/users/newUser **/
router.post('/newUser', async (req, res) => {
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
    /* =============================/
     * END: New user insert into DB /
     * ============================*/
     
  } catch (err) {
    console.log(err.message);
  }
});



// ===> READ
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



// ===> UPDATE
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, first_name, last_name, email, password } = req.body;

    const VALUES = [];
    let  queryHead = `
      UPDATE ${TABLE_NAME} SET
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
    if (email) {
      VALUES.push(email);
      queryHead += `, email = $${VALUES.length}`
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
  }
});


// ===> DELETE
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const VALUES = [id];
    const deleteUserQuery = `
      DELETE FROM ${TABLE_NAME}
      WHERE user_id = $1;
    `;

    const deleteUser = await pool.query(deleteUserQuery, VALUES);
    res.json({ message: "User deleted." });
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;