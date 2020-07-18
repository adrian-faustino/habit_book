import React, { useState } from 'react'
/** Helpers */
import { updateComment } from '../../../../helpers/commentDataHelpers';
/** Styles **/
import './CommentEditForm.css';

const CommentEditForm = ({ comment, setIsEditMode, setTempComment }) => {
  /** State **/
  const [value, setValue] = useState(comment.content);

  const handleChange = e => {
    setValue(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    updateComment(value, comment.comment_id, (content, err) => {
      if (err) return;

      // close edit component
      setTempComment(content);
      setIsEditMode(false);
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="CommentEditForm">
        <input
          onChange={handleChange}
          value={value}
          className="CommentEditForm__input"/>
    </form>
  )
}

export default CommentEditForm
