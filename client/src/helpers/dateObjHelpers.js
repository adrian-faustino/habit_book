import { formatZeros } from './formatHelpers';

/** Helper functions that deal with instances of new Date() **/

/** Input: date object. Output: string in YYYY-MM-DD format **/
export const getDateYYYYMMDD = dateObj => {
  const year = formatZeros(dateObj.getFullYear(), 2);
  const month = formatZeros(dateObj.getMonth() + 1, 2); // Months: 0-11
  const date = formatZeros(dateObj.getDate(), 2);
  return `${year}-${month}-${date}`;
};

// return the time since a date
export const getTimeSince = dateStr => {
  const dateArr = dateStr.split('T');
  const date = dateArr[0];
  const time = dateArr[1];

  const today = new Date(); 
}

// borrowed function form stackoverflow
export function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}