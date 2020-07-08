import React, { useEffect, useState } from 'react';
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
        console.log('User data:', res.data[0]);
        setCommenter(res.data[0]);
      })
      .catch(err => console.log(err));
  }, []);


  return (
    <li>
      <img 
        src={commenter.avatar_url}/>
      
      <span>
        {`${commenter.first_name} ${commenter.last_name}`}
      </span>

      <span>
        @{commenter.username}
      </span>

      <p>
        {content}
      </p>

      {is_edited && (
        <span>(edited)</span>
      )}  

      <span>
        Created at {created_at}
      </span>
    </li>
  );
};

export default CommentCard;
