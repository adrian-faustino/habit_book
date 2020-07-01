import axios from 'axios';

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

export const handleDeleteCard = async (e, user_id, habit_id) => {
  e.preventDefault();

  const endpoint =
    process.env.REACT_APP_API + 
    `habits/${user_id}/${habit_id}`
  
  axios
    .delete(endpoint)
    .then(res => {
      console.log('Delete OK', res);
    })
    .catch(err => console.log(err));
};
