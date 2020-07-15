/** All the functions in this file are for follows CRUD requests **/
import axios from 'axios';
import { config } from '../util/config';

// create a new follow relation between users
/* param notes: follower_id refers to the   * user clicking follow button
 * target_user_id is the profile being followed */
export const followUser = (target_user_id, callback) => {
  const endpoint = process.env.REACT_APP_API + `follows`;

  const payload = {
    target_user_id
  };

  axios
    .post(endpoint, payload, config)
    .then(data => {
      callback(data);
    })
    .catch(err => console.log(err));
};


// read
// get a single user's followers
export const getUserFollowers = (user_id, callback) => {
  const endpoint = process.env.REACT_APP_API + `follows/${user_id}`;

  axios
    .get(endpoint)
    .then(data => {
      callback(data);
    })
    .catch(err => {
      console.log(err);
      callback(null, err);
    });
};


// update


// delete