/** All the functions in this file are for getting specific information from the API **/
import axios from 'axios';

// Get user data given user_id
export const getUserAPIData = async (user_id, callback) => {
  const endpoint = process.env.REACT_APP_API +
  `users/${user_id}`;

  axios
    .get(endpoint)
    .then(res => {
      console.log('User data:', res.data[0]);
      callback(res.data[0]);
    })
    .catch(err => console.log(err));
};