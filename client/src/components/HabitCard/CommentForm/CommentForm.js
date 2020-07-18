import React from 'react';
/** Custom Hooks **/
import useForm from '../../../hooks/useFormHook';
/** Redux **/
import { useSelector } from 'react-redux';
/** Styles **/
import './CommentForm.css';
/** Helpers **/
import { createComment } from '../../../helpers/commentDataHelpers';

const CommentForm = props => {
  /** State **/
  const [ values,
          handleChange,
          handleSubmit,
          handleReset ] = useForm(submitComment);

  /** Redux **/
  const user = useSelector(state => state.user);

  function submitComment() {
    createComment(
      props.habit_id,
      values.content,
      false, // is_edited = false
      () => {
        // reset form
        handleReset();
        //trigger view change
        props.handleExpandComments();
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="CommentForm__container">
        <img
          className="CommentForm__avatar"
          src={user.avatar_url} />
        <input
          ref={props.commentField}
          autoComplete="off"
          name="content"
          value={values.content || ''}
          onChange={handleChange}
          className="CommentForm__comment-input"
          placeholder="Leave a comment..."/>
    </form>
  );
};

export default CommentForm;
