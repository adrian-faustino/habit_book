/** The validation methods in this file should be similar to server **/
import constants from '../constants';
const { USERNAME_MAX_LENGTH, PASSWORD_MIN_LENGTH } = constants;

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

/** Output: boolean **/
/* Notes: for now I am validating if it is ok to submit. Errors
 * will be returned if username or email exists already. */
const isValidSubmission = values => {
  /** Validate null fields **/
  const error = {};
  !values.username && (error.username = `Username is required.`);
  !values.first_name && (error.first_name = `First name is required.`);
  !values.last_name && (error.last_name = `Last name is required.`);
  !values.email && (error.email = `Email is required.`);
  !values.password && (error.password = `Password is required.`);
  /** Validate username **/
  values.username &&
    !isValidUsername(values.username) &&
    (error.username = `Invalid username.`);
  /** Validate email **/
  values.email &&
    !isValidEmail(values.email) &&
    (error.email = `Invalid email.`);
  /** Validate password **/
  values.password &&
    !isValidPassword(values.password) &&
    (error.password = `Invalid password.`);
  /** Validate if password matches **/
  values._password &&
    (values.password !== values._password) &&
    (error._password = `Password does not match.`);

  return error;
};

/** Output: boolean **/
const inputWithinRange = (string, min, max) => {
  if (!string) return;
  return string.length >= min && string.length <= max;
};



const userValidationHelpers = {
  isValidEmail,
  isValidUsername,
  isValidPassword,
  isEmptyObj,
  isValidSubmission,
  inputWithinRange
};

export default userValidationHelpers;