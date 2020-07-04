/** Adds leading zeroes based on 'length' integer. Output: string **/
const formatZeros = (string, length) => {
  const desiredLength = length;
  let result = string.toString();
  while (result.length < desiredLength) {
    result = '0' + result;
  }

  return result;
};

/** Input: new Date(). Output: 'YYYY-MM-DD' **/
const formatToYYYYMMDD = dateObj => {
  const YEAR =  dateObj.getFullYear();
  const MONTH = formatZeros(dateObj.getMonth() + 1, 2); // January = 0, December = 12
  const DAY = formatZeros(dateObj.getDate(), 2);

  return `${YEAR}-${MONTH}-${DAY}`;
}; 

/** Helper functions that deal with instances of new Date() **/
// This function is taken from client side
/** Input: date object. Output: string in YYYY-MM-DD format **/
const getDateYYYYMMDD = dateObj => {
  const year = formatZeros(dateObj.getFullYear(), 2);
  const month = formatZeros(dateObj.getMonth() + 1, 2); // Months: 0-11
  const date = formatZeros(dateObj.getDate(), 2);
  return `${year}-${month}-${date}`;
};


const formatHelpers = {
  formatToYYYYMMDD,
  formatZeros,
  getDateYYYYMMDD
};

module.exports = formatHelpers;