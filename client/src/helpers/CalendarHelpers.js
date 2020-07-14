import axios from 'axios';

// Input: Date YYYY-MM-DD. Ask server to insert new created_at into db
// todo: auth (THIS NEEDS TO BE A PROTECTED ROUTE)
export const createCompletedAt = async (date, user_id, habit_id, callback) => {
  const endpoint = process.env.REACT_APP_API +
    `completed_at`;

  const payload = {
    date,
    user_id,
    habit_id
  };

  const config = {
    headers: {
      authorization : `Bearer ${localStorage.accessToken}`
    }
  };

  try {
    const request = await axios.post(endpoint, payload, config);
    const newEntry = request.data;
    callback(newEntry);
  } catch (err) {
    console.log(err);
  }
};