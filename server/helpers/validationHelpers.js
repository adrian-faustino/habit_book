/** Input: string, Output: boolean **/
const isValidEmail = email => {
  const REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return REGEX.test(email);
};

const validationHelpers = {
  isValidEmail
};

module.exports = validationHelpers;