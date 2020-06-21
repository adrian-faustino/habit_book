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

/** Input: an object container user values. Output: boolean **/
const isValidRegistration = values => {
  console.log('Validating...', values);
};


const userValidationHelpers = {
  isValidEmail,
  isValidUsername,
  isValidPassword,
  isEmptyObj,
  isValidRegistration
};

export default userValidationHelpers;