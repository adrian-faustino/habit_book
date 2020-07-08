import React, { useEffect, useState } from 'react';
/** Helpers **/
import axios from 'axios';
/** Styles **/
import './CommentCard.css';

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
    <div className="CommentCard">
      <div className="CommentCard__avatar-container">
        <img
          className="CommentCard__avatar" 
          src={commenter.avatar_url}/>

        <span className="CommentCard__username">
          @{commenter.username}
        </span>
      </div>

      <div className="vertical-split">
        <div className="CommentCard__content-container">
          <span className="CommentCard__full-name">
            {`${commenter.first_name} ${commenter.last_name}`}
          </span>

          <p className="CommentCard__content">
            {content}
          </p>
        </div>

        <div className="CommentCard__buttons-container">
          {is_edited && (
            <span className="CommentCard__edited">
              (edited)
            </span>
          )}  

          <span className="CommentCard__created-at">
            Created at {created_at}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
