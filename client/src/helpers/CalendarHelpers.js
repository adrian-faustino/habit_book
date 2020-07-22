import axios from 'axios';
/** Auth **/
import { config, headers } from '../util/config';

// Input: Date YYYY-MM-DD. Ask server to insert new created_at into db
export const createCompletedAt = async (date, user_id, habit_id, callback) => {
  const endpoint = process.env.REACT_APP_API +
    `completed_at`;

  const payload = {
    date,
    user_id,
    habit_id
  };

  try {
    const request = await axios.post(endpoint, payload, config);
    const newEntry = request.data;
    callback(newEntry);
  } catch (err) {
    console.log(err.message);
    callback(null, err);
  }
};

// Delete (untoggle) completed at
export const deleteCompletedAt = (habit_id, date, callback) => {
  const endpoint = process.env.REACT_APP_API + 
    `completed_at/${habit_id}/${date}`;

  axios
    .delete(endpoint, {headers})
    .then(res => {
      callback(res);
    })
    .catch(err => console.log(err));
};

// Given array of dates, calculate longest streak
export const calcLongestStreak = datesArr => {
  console.log('Calculating longest streak...', datesArr);
  if (datesArr.length === 0) return 0;
  if (datesArr.length === 1) return 1;
  let currentCounter = 1;
  let longest = 0;

  for (let i = 1; i < datesArr.length; i++) {
    const [prevYear, prevMonth, prevDay] = datesArr[i -1].split('-');
    const [year, month, day] = datesArr[i].split('-');

    if (parseInt(day) - 1 === parseInt(prevDay)) {
      console.log('consecutive!')
      currentCounter++;
    } else {
      if(currentCounter > longest) longest = currentCounter;
      currentCounter = 1;
    }
  }

  if (currentCounter > longest) longest = currentCounter;
  return longest;

  // TODO #3 - fix this function depending on month/leap year etc
};

// Input: int. Output: int.
/* param notes: month is NOT 0 index value of month
 * i.e. January => 1, Feb => 2
 * Also, require year to determine leap year */
function daysInMonth(MM, YYYY) {
  const month = parseInt(MM);
  const year = parseInt(YYYY);
  const monthsWith31d = [1, 3, 5, 7, 8, 10, 12];
  const monthsWith30d = [4, 6, 9, 11];
  const monthsWith28d = [2];

  if (monthsWith28d.includes(month)) {
    return isLeapYear(year) ? 29 : 28;
  } else if (monthsWith31d.includes(month)) {
    return 31;
  } else if (monthsWith30d.includes(month)) {
    return 30;
  };
}

// if leapyear, Feb has 29 days
function isLeapYear(YYYY) {
  const year = parseInt(YYYY);
  if (year % 4 !== 0) return false;
  if (year % 100 === 0) {
    if (year % 400 === 0) return true;
    else return false;
  };
  // if all validation pass, it is leap year
  return true;
}