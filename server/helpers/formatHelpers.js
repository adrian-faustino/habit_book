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



const formatHelpers = {
  formatToYYYYMMDD,
  formatZeros
};

module.exports = formatHelpers;