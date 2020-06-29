import axios from 'axios';

// given user_id, get all habits
export const getUserHabits = user_id => {
  console.log('Getting user habits for', user_id);
  const endpoint =
    process.env.REACT_APP_API + `habits/${user_id}`;

  axios
    .get(endpoint)
    .then(res => {
      console.log('successfully queried', res);
    })
    .catch(err => console.log(err));
};