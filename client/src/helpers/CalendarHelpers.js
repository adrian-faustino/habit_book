import axios from 'axios';
/** Auth **/
import { config, headers } from '../util/config';

// Input: Date YYYY-MM-DD. Ask server to insert new created_at into db
export const createCompletedAt = async (date, user_id, habit_id, callback) => {
  const endpoint = process.env.REACT_APP_API +
    `completed_at`;

  const payload = {
    date,
    user_id,
    habit_id
  };

  try {
    const request = await axios.post(endpoint, payload, config);
    const newEntry = request.data;
    callback(newEntry);
  } catch (err) {
    console.log(err.message);
    callback(null, err);
  }
};

// Delete (untoggle) completed at
export const deleteCompletedAt = (habit_id, date, callback) => {
  const endpoint = process.env.REACT_APP_API + 
    `completed_at/${habit_id}/${date}`;

  axios
    .delete(endpoint, {headers})
    .then(res => {
      callback(res);
    })
    .catch(err => console.log(err));
};