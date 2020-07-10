/** All the functions in this file are for getting specific information from the API **/
import axios from 'axios';

// Get user data given user_id
export const getUserAPIData = async (user_id, callback) => {
  const endpoint = process.env.REACT_APP_API +
  `users/${user_id}`;

  axios
    .get(endpoint)
    .then(res => {
      callback(res.data[0]);
    })
    .catch(err => console.log(err));
};

// Get user habit count
export const getUserHabitCountAPIData = async (user_id, callback) => {
  const endpoint =
  process.env.REACT_APP_API +
  `habits/${user_id}`;
  
  axios
    .get(endpoint)
    .then(res => {
      callback(res.data.length);
    })
    .catch(err => console.log(err));

};

// Get a [] list of completed days for a habit
export const getCompleted_atAPIData = async (user_id, habit_id, callback) => {
  const endpoint =
  process.env.REACT_APP_API +
  `habits/${user_id}/${habit_id}`;
  
  axios
    .get(endpoint)
    .then(res => {
      const dates = res.data.map(date => {
        return date.completed_at.split('T')[0];
      });
      callback(dates);
    })
    .catch(err => console.log(err));
};