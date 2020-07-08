import React, { useEffect, useState } from 'react'
import axios from 'axios';

const CommentCard = ({ comment }) => {
  const { comment_id,
          comment_by,
          habit_id,
          created_at,
          content,
          is_edited } = comment;

  /** State **/
  const [commenter, setCommenter] = useState({});

  // get commenter's info (avatar, name etc)
  useEffect(() => {
    const endpoint = process.env.REACT_APP_API +
      `users/${comment_by}`;
    axios
      .get(endpoint)
      .then(res => {
        console.log('User data:', res.data);
      })
      .catch(err => console.log(err));
  }, []);


  return (
    <li>
      {content}
    </li>
  )
}

export default CommentCard
