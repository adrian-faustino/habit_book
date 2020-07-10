import React, { useEffect, useState } from 'react';
/** React router **/
import { Link } from 'react-router-dom';
/** Redux **/
import { useDispatch } from 'react-redux';
/** Redux actions **/
import { increment } from '../../../../actions';
/** Helpers **/
import { getUserAPIData } from '../../../../helpers/getDataHelpers';
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

  /** Redux **/
  const dispatch = useDispatch();

  // get commenter's info (avatar, name etc)
  useEffect(() => {
    getUserAPIData(comment_by, (data) => {
      setCommenter(data);
    });
  }, []);

  const triggerReload = () => {
    dispatch(increment(1));
    // window.location.reload();
  };


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
            <Link
              onClick={triggerReload}
              to={`/users/${comment_by}`}>
                {`${commenter.first_name} ${commenter.last_name}`}
            </Link>
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
