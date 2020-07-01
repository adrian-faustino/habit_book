import { formatZeros } from './formatHelpers';

/** Helper functions that deal with instances of new Date() **/

/** Input: date object. Output: string in YYYY-MM-DD format **/
export const getDateYYYYMMDD = dateObj => {
  const year = formatZeros(dateObj.getFullYear(), 2);
  const month = formatZeros(dateObj.getMonth() + 1, 2); // Months: 0-11
  const date = formatZeros(dateObj.getDate(), 2);
  return `${year}-${month}-${date}`;
};