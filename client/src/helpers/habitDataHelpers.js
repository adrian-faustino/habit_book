import axios from 'axios';
/** Redux - actions **/
import { increment } from '../actions';

// given user_id, get all habits
export const getUserHabits = (user_id, callback) => {
  console.log('Getting user habits for', user_id);
  const endpoint =
    process.env.REACT_APP_API + `habits/${user_id}`;

  axios
    .get(endpoint)
    .then(res => callback(res.data))
    .catch(err => console.log(err));
};

// delete habit
export const handleDeleteCard = async (e, user_id, habit_id, dispatch) => {
  e.preventDefault();

  const endpoint =
    process.env.REACT_APP_API + 
    `habits/${user_id}/${habit_id}`
  
  axios
    .delete(endpoint)
    .then(res => {
      // trigger fetch data after crud operation
      dispatch(increment(1));
    })
    .catch(err => console.log(err));
};