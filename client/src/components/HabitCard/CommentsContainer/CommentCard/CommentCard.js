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
import { getComments, handleDeleteCard } from '../../../../helpers/habitDataHelpers';
import { deleteComment } from '../../../../helpers/commentDataHelpers';
/** Styles **/
import './CommentCard.css';
/** Subcomponents **/
import CommentDeleteConfimration from '../CommentDeleteConfirmation/CommentDeleteConfimration';
import CommentEditForm from '../CommentEditForm/CommentEditForm';

const CommentCard = ({ comment, setComments }) => {
  const { comment_id,
          comment_by,
          habit_id,
          created_at,
          content,
          is_edited } = comment;

  /** State **/
  const [commenter, setCommenter] = useState({});
  const [isMyComment, setIsMyComment] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  /** View change notes: these variables are to update the view temporarily for the user, to prevent another DB query just to update their view. These are set once we get OK from DB that data has been updated **/
  const [tempComment, setTempComment] = useState(content);
  const [tempEdited, setTempEdited] = useState(is_edited);

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

  // TODO: refactor - use this function to trigger view reload on other components?
  const triggerReload = () => {
    dispatch(increment(1));
    // window.location.reload();
  };

  const handleDeleteComment = () => {
    deleteComment(comment_id, res => {
      getComments(habit_id, data => {
        setComments(data);
      })
    });
  };

  const toggleConfirmDelete = e => {
    e.preventDefault();
    setIsDeleteMode(true);
  }

  const toggleEditMode = e => {
    e.preventDefault();
    setIsEditMode(!isEditMode);
  }

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

          <div className="CommentCard__content">
            {tempComment}
            {isEditMode && (
              <CommentEditForm
                setTempEdited={setTempEdited}
                setTempComment={setTempComment}
                setIsEditMode={setIsEditMode}
                comment={comment}/>
            )}
          </div>
        </div>

        <div className="CommentCard__buttons-container">
          {tempEdited && (
            <span className="CommentCard__edited">
              (edited)
            </span>
          )}  

          <span className="CommentCard__created-at">
            {timeSince(new Date(created_at))} ago
          </span>
          
          {/* delete comment button  */}
          {isMyComment && !isDeleteMode && (
            <Button
              onClick={toggleConfirmDelete}
              color="danger"
              className="CommentCard__delete-comment">
                delete
            </Button>)}

          {/* edit comment button */}
          {isMyComment && (
            <Button
              onClick={toggleEditMode}
              className="CommentCard__edit-comment"
              color={isEditMode ? 'light' : 'primary'}>
                {isEditMode ? 'cancel' : 'edit'}
            </Button>
          )}
        </div>
      </div>

      {isDeleteMode && (
        <CommentDeleteConfimration
          handleDeleteComment={handleDeleteComment}
          setIsDeleteMode={setIsDeleteMode}/>
      )}
    </div>
  );
};

export default CommentCard;
