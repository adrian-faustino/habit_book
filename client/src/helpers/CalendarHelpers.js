import axios from 'axios';

// import { getDateYYYYMMDD } from '../helpers/dateObjHelpers';

// // Return an array of days that the user has marked 
// /** Input: start date (no time). Output:  **/
// export const getCompletedDays = (start, end) => {
//   // 
// };


// // sets the color of the last selected date tile
// export const highlightRange = ({ date, view }) => {
//   /** Constants **/
//   // to add successful day highlight css class
//   const CALENDAR_SELECTED = 'CalendarComponent__selected';

//   if (view === 'month') {
//     const _date = getDateYYYYMMDD(date);
//     // const _value = getDateYYYYMMDD(null);
//     if (_date === _date) {
//       return CALENDAR_SELECTED;
//     }
//   }
// };

// Input: Date YYYY-MM-DD. Ask server to insert new created_at into db
// todo: auth (THIS NEEDS TO BE A PROTECTED ROUTE)
export const createCompletedAt = async (date, user_id, habit_id) => {
  const endpoint = process.env.REACT_APP_API +
    `created_at/${date}/${user_id}/${habit_id}`;

  try {
    const request = await axios.post(endpoint);
    const newEntry = request.data;
    return newEntry;
  } catch (err) {
    console.log(err);
  }
  // axios
  //   .post(endpoint)
  //   .then(data => {
  //     console.log('good entry')
  //   })
  //   .catch(err => console.log('bad day',err.response));
};