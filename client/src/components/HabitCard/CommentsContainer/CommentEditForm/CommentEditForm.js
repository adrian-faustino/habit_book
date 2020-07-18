import React, { useState } from 'react'
/** Redux **/
import { useDispatch } from 'react-redux';
/** Redux actions **/
import { increment } from '../../../../actions';
/** Helpers */
import { updateComment } from '../../../../helpers/commentDataHelpers';
/** Styles **/
import './CommentEditForm.css';

const CommentEditForm = ({ comment, setIsEditMode }) => {
  /** State **/
  const [value, setValue] = useState(comment.content);

  /** Redux **/
  const dispatch = useDispatch();

  const handleChange = e => {
    setValue(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    updateComment(value, comment.comment_id, (success, err) => {
      if (err) return;
      // trigger view change
      dispatch(increment(1));
      
      // close edit component
      console.log(success)
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
