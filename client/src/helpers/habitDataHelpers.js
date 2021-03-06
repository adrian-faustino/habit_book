import axios from 'axios';
/** Redux - actions **/
import { increment } from '../actions';
/** Auth **/
import { config, headers } from '../util/config';

// given user_id, get all habits
export const getUserHabits = (user_id, callback) => {
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
    `habits/delete/${user_id}/${habit_id}`
  
  axios
    .delete(endpoint, {headers})
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
    callback(likes.data);

  } catch (err) {
    console.log(err);
  };
};

// register new like to DB (or delete if existing)
export const registerLike = (user, user_id, habit_id, callback) => {
  const endpoint = process.env.REACT_APP_API +
    `habits/likes`;

  const payload = {
    liked_by: user.user_id,
    habit_by: user_id,
    habit_id
  };
  
  axios
    .post(endpoint, payload, config)
    .then(res => {
      callback(res.data);
    })
    .catch(err => {
      console.log(err);
      callback(null, err);
    });
};

// get all comments on a habit
export const getComments = (habit_id, callback) => {
  const endpoint = process.env.REACT_APP_API +
    `comments/${habit_id}`;
  
  axios
    .get(endpoint)
    .then(res => {
      callback(res.data);
    })
    .catch(err => console.log(err));
};