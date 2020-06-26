/** The validation methods in this file should be similar to client **/
const { USERNAME_MAX_LENGTH, PASSWORD_MIN_LENGTH } = require('../constants');

/** Input: string. Output: boolean **/
const isValidEmail = email => {
  if (!email) return false;
  const REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return REGEX.test(email);
};

/** Input: string. Output: boolean **/
const isValidUsername = username => {
  const REGEX = /^[a-zA-Z0-9]+$/; // simple alpha numeric regex for now
  if (!username) return false;
  if (username.length > USERNAME_MAX_LENGTH) return false;
  return REGEX.test(username);
};

/** Input: string. Output: boolean **/
const isValidPassword = password => {
  const REGEX = /^[a-zA-Z0-9]+$/; // simple alpha numeric regex for now
  if (!password) return false;
  if (password.length < PASSWORD_MIN_LENGTH) return false;
  return REGEX.test(password);
};

/** Input: object. Output: boolean **/
const isEmptyObj = obj => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

/** Input: . Output: boolean **/
const usernameExists = async (pool, table, username) => {
  const query = `
    SELECT *
    FROM ${table}
    WHERE username = $1
    LIMIT 1;
  `;
  const queryResult = await pool.query(query, [username]);
  return queryResult.rows.length > 0;
};

/** Input: obj, str, str. Output: boolean **/
const emailExists = async (pool, table, email) => {
  const query = `
    SELECT *
    FROM ${table}
    WHERE email = $1
    LIMIT 1;
  `;
  const queryResult = await pool.query(query, [email]);
  return queryResult.rows.length > 0;
};

/** Input: obj, str. Output: user obj  **/
const getUserByEmail = async (pool, table, email) => {
  const query = `
  SELECT *
  FROM ${table}
  WHERE email = $1
  LIMIT 1;
`;
  const queryResult = await pool.query(query, [email]);
  return queryResult;
};

const userValidationHelpers = {
  isValidEmail,
  isValidUsername,
  isValidPassword,
  isEmptyObj,
  usernameExists,
  emailExists,
  getUserByEmail
};

module.exports = userValidationHelpers;