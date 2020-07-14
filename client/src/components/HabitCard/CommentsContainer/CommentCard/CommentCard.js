import React, { useEffect, useState } from 'react';
/** React router **/
import { Link } from 'react-router-dom';
/** Redux **/
import { useDispatch, useSelector } from 'react-redux';
/** Redux actions **/
import { increment } from '../../../../actions';
/** React strap **/
import { Button } from 'reactstrap';
/** Helpers **/
import { getUserAPIData } from '../../../../helpers/getDataHelpers';
import { getTimeSince, timeSince } from '../../../../helpers/dateObjHelpers';
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
  const [isMyComment, setIsMyComment] = useState(false);

  /** Redux **/
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  // get commenter's info (avatar, name etc)
  useEffect(() => {
    getUserAPIData(comment_by, (data) => {
      setCommenter(data);
    });

    // if this comment is user's show option to delete button
    if (comment_by === user.user_id) {
      setIsMyComment(true);
    }
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
            {timeSince(new Date(created_at))} ago
          </span>

          {isMyComment && (
            <Button
              color="danger"
              className="CommentCard__delete-comment">
                delete
            </Button>)}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
