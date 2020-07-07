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

// get number of likes for each habit
export const getLikes = async (user_id, habit_id, callback) => {
  try {    
    const endpoint = process.env.REACT_APP_API +
      `habits/likes/${user_id}/${habit_id}`;
    const likes = await axios.get(endpoint);
    callback(likes.data[0].count);
  } catch (err) {
    console.log(err);
  };
};

export const registerLike = (user, user_id, habit_id) => {
  const liked_by = user.user_id;
  const habit_by = user_id;
  const _habit_id = habit_id;

  const endpoint = process.env.REACT_APP_API +
    `habits/likes/${liked_by}/${habit_by}/${_habit_id}`;
  
  axios
    .post(endpoint)
    .then(res => {
      console.log('New like registered!', res);
    })
    .catch(err => console.log(err));
};