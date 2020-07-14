import React from 'react';
/** Redux **/
import { useDispatch } from 'react-redux';
/** Redux actions **/
import { increment } from '../../../actions';
/** Custom Hooks **/
import useInput from '../../../hooks/useInput';
/** Reacstrap **/
import { Button } from 'reactstrap';
/** Styles **/
import './EditHabitForm.css';
/** Helpers **/
import { updateHabit_API } from '../../../helpers/postDataHelpers';
import { validateForm } from '../../../helpers/habitFormHelpers';

const EditHabitForm = props => {
  const { description, title, setEditMode, habit_id, setErr, setSuccess } = props;

  /** State **/
  const [_title, titleBind, resetTitle] = useInput(title);
  const [_description, descriptionBind, resetDescription] = useInput(description);

  /** Redux **/
  const dispatch = useDispatch();

  const handleEditSubmit = e => {
    e.preventDefault();
    // ensure no empty title, and trim text for whitespace
    const values = {
      title: _title,
      description: _description
    };
    const validated = validateForm(values);
    if (validated.err) {
      setErr(validated.err);

      // fade out err after 2 seconds
      setTimeout(() => {
        setErr('');
      }, 2000);

      return;
    };
    
    // if validation passes submit for update
    const habit = {
      title: _title,
      description: _description
    };
    updateHabit_API(habit_id, habit, res => {
      // trigger view update
      dispatch(increment(1));

      // trigger and fade out success feedback
      setSuccess(res.data.msg);
      setTimeout(() => {
        setSuccess('');
      }, 2000);
      
      // close form
      setEditMode(false);
    });
  };

  return (
    <div className="EditHabitForm">
      <Button
        className="EditHabitForm__close-btn"
        onClick={() => setEditMode(false)}
        close />

      <form
        autoComplete="off"
        type="submit"
        onSubmit={handleEditSubmit}>
        <input 
          name="title"
          onChange={titleBind.onChange}
          value={_title}
          className="EditHabitForm__title"/>

        <textarea
          name="description"
          onChange={descriptionBind.onChange}
          value={_description || ''}
          className="EditHabitForm__description" 
          placeholder="edit mode...">
        </textarea>
        <button 
          type="submit"
          className="EditHabitForm__save-btn">
            save
        </button>
      </form>
    </div>
  );
};

export default EditHabitForm;
