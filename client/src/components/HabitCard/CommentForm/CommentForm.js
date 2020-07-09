import React from 'react';
import axios from 'axios';
/** Custom Hooks **/
import useForm from '../../../hooks/useFormHook';
/** Redux **/
import { useSelector } from 'react-redux';
/** Styles **/
import './CommentForm.css';

const CommentForm = props => {
  /** State **/
  const [ values,
          handleChange,
          handleSubmit,
          handleReset ] = useForm(submitComment);

  /** Redux **/
  const user = useSelector(state => state.user);

  function submitComment() {
    console.log('submitting');
    console.log(values.content);
    const endpoint = process.env.REACT_APP_API + 
      `comments/newComment`;
    const payload = {
      comment_by: user.user_id,
      habit_id: props.habit_id,
      content: values.content,
      created_at: new Date(),
      is_edited: false
    };
    
    axios
      .post(endpoint, payload)
      .then(res => {
        handleReset();
        // trigger view change
        props.handleExpandComments();
      })
      .catch(err => console.log(err));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="CommentForm__container">
        <img
          className="CommentForm__avatar"
          src={user.avatar_url} />
        <input
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
