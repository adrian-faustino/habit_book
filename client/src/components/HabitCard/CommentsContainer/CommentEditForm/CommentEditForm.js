import React, { useState } from 'react'
/** Helpers */
import { updateComment } from '../../../../helpers/commentDataHelpers';
/** Styles **/
import './CommentEditForm.css';

const CommentEditForm = ({ comment, setIsEditMode, setTempComment, setTempEdited }) => {
  /** State **/
  const [value, setValue] = useState(comment.content);

  const handleChange = e => {
    setValue(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    updateComment(value, comment.comment_id, (content, err) => {
      if (err) return;

      // temp view update for current user to prevent another db query just to update their state.
      setTempComment(content);
      setTempEdited(true);
      // close edit component
      setIsEditMode(false);
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="CommentEditForm">
        <input
          autoFocus
          onChange={handleChange}
          value={value}
          className="CommentEditForm__input"/>
    </form>
  )
}

export default CommentEditForm
