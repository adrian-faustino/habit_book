/** All the functions in this file are for comments CRUD requests **/

import axios from 'axios';
import { headers } from '../util/config';

export const deleteComment = async (comment_id, callback) => {
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