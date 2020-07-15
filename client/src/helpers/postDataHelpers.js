/** All the functions in this file are for posting specific information to the API **/
import axios from 'axios';
import { config } from '../util/config';

// post new habit
export const submitHabit_API = async (habit, callback) => {
  const endpoint = 
  process.env.REACT_APP_API + 'habits/newHabit';

  const payload = {
    habit
  };

  try {
    const response = await axios.post(endpoint, payload, config);
    callback(response);
  } catch (err) {
    console.log(err);
  };
};

export const updateHabit_API = async (habit_id, habit, callback) => {
  console.log('Updating habit:', habit_id);
  const endpoint = process.env.REACT_APP_API + `habits`;

  const payload = {
    habit_id, habit
  };

  try {
    const res = await axios.put(endpoint, payload, config);
    callback(res);
  } catch (err) {
    console.log(err);
  }
};