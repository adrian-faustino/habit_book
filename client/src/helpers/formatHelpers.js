/** Adds leading zeroes based on 'length' integer. Output: string **/
export const formatZeros = (string, length) => {
  const desiredLength = length;
  let result = string.toString();
  while (result.length < desiredLength) {
    result = '0' + result;
  }

  return result;
};

/** Input: string. Output: 'Month Day, Year' */
export const formatToWords = dateStr => {
  const date = dateStr.split('T')[0].split('-');
  const [year, month, day] = date;

  const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  return `${MONTHS[month - 1]} ${day}, ${year}`;
  /* STRETCH: add 1st 2nd 3rd suffix on date */
};