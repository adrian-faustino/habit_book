/** All the functions in this file are for posting specific information to the API **/
import axios from 'axios';

export const submitHabit_API =  async (user_id, habit, callback) => {
  const endpoint = 
  process.env.REACT_APP_API + 'habits/newHabit';

  const payload = {
    user_id, habit
  };

  const config = {
    headers: {
      authorization : `Bearer ${localStorage.accessToken}`
    }
  };

  try {
    const response = await axios.post(endpoint, payload, config);
    callback(response);
  } catch (err) {
    console.log(err);
  };
};