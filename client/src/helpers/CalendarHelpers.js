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
};

// Input: int. Output: int.
/* param notes: month is NOT 0 index value of month
 * i.e. January => 1, Feb => 2 */
function daysInMonth(month) {
  const month = parseInt(month);
  const monthsWith31d = [1, 3, 5, 7, 8, 10, 12];
  const monthsWith30d = [4, 6, 9, 11];
  const monthsWith28d = [2];
}

// if leapyear, Feb has 29 days
function isLeapYear() {

}