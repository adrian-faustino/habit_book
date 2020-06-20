const { USERNAME_MAX_LENGTH, PASSWORD_MIN_LENGTH } = require('../constants');

/** Input: string. Output: boolean **/
const isValidEmail = email => {
  if (!email) return false;
  const REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return REGEX.test(email);
};

/** Input: string. Output: boolean **/
const isValidUsername = username => {
  if (!username) return false;
  return username.length <= USERNAME_MAX_LENGTH;
};

/** Input: string. Output: boolean **/
const isValidPassword = password => {
  if (!password) return false;
  return password.length >= PASSWORD_MIN_LENGTH;
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

/** Input: . Output: boolean **/
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

const userValidationHelpers = {
  isValidEmail,
  isValidUsername,
  isValidPassword,
  isEmptyObj,
  usernameExists,
  emailExists
};

module.exports = userValidationHelpers;