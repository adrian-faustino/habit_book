import React from 'react';
import axios from 'axios';
/** Custom Hooks **/
import useForm from '../../../hooks/useFormHook';
/** Redux **/
import { useSelector } from 'react-redux';

const CommentForm = props => {
  /** State **/
  const [ values,
          handleChange,
          handleSubmit,
          handleReset ] = useForm(submitComment);

  /** Redux **/
  const user_id = useSelector(state => state.user.user_id);

  function submitComment() {
    console.log('submitting');
    console.log(values.content);
    const endpoint = process.env.REACT_APP_API + 
      `comments/newComment`;
    const payload = {
      comment_by: user_id,
      habit_id: props.habit_id,
      content: values.content,
      created_at: new Date(),
      is_edited: false
    };
    
    axios
      .post(endpoint, payload)
      .then(res => {
        console.log('ok')
        // trigger view change
        handleReset();
      })
      .catch(err => console.log(err));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="HabitCard__form-container">
        <input
          name="content"
          value={values.content || ''}
          onChange={handleChange}
          className="CommentsContainer__comment-input"
          placeholder="Leave a comment"/>
    </form>
  );
};

export default CommentForm;
