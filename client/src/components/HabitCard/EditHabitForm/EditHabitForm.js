import React, { useState } from 'react';
/** Custom Hooks **/
import useInput from '../../../hooks/useInput';
/** Styles **/
import './EditHabitForm.css';
/** Helpers **/
import { updateHabit_API } from '../../../helpers/postDataHelpers';
import { validateForm } from '../../../helpers/habitFormHelpers';

const EditHabitForm = props => {
  const { description, title, setEditMode, habit_id } = props;

  /** State **/
  const [_title, titleBind, resetTitle] = useInput(title);
  const [_description, descriptionBind, resetDescription] = useInput(description);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleEditSubmit = e => {
    e.preventDefault();
    // ensure no empty title, and trim text for whitespace
    const values = {
      title: _title,
      description: _description
    };
    const validated = validateForm(values);
    if (validated.err) return setError(validated.err);
    
    // if validation passes submit for update
    const habit = {
      title: _title,
      description: _description
    };
    updateHabit_API(habit_id, habit, res => {
      console.log('Habit updated :)', res);
      
      // close form
      setEditMode(false);
    });
  };

  return (
    <div className="EditHabitForm">
      {error}
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
