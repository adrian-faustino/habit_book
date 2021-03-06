/** All the functions in this file are for comments CRUD requests **/

import axios from 'axios';
import { config, headers } from '../util/config';

// CREATE
export const createComment = (habit_id, content, is_edited, callback) => {
  const endpoint = process.env.REACT_APP_API + 
      `comments/newComment`;

    const payload = {
      habit_id,
      content,
      is_edited
    };
    
    axios
      .post(endpoint, payload, config)
      .then(res => {
        callback();
      })
      .catch(err => console.log(err));
}

export const deleteComment = (comment_id, callback) => {
  const endpoint = process.env.REACT_APP_API + 
    `comments/delete/${comment_id}`;

  axios
    .delete(endpoint, {headers})
    .then(res => {
      // trigger fetch data after crud operation
      callback(res);
    })
    .catch(err => console.log(err));
};

// READ

// UPDATE
export const updateComment = (content, comment_id, callback) => {
  const endpoint = process.env.REACT_APP_API + 
    `comments/updateComment`;

  const payload = {
    content,
    comment_id
  }

  axios
    .put(endpoint, payload, config)
    .then(res => {
      callback(res.data.content);
    })
    .catch(err => {
      console.error(err.message)
      callback(null, err.message);
    })
};

// DELETE