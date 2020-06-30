/** Helper functions that deal with instances of new Date() **/

/** Input: date object. Output: string in YYYY-MM-DD format **/
export const getDateYYYYMMDD = dateObj => {
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  const date = dateObj.getDate();
  return `${year}-${month}-${date}`;
};