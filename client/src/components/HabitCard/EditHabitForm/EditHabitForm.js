import React from 'react'
/** Custom Hooks **/
import useInput from '../../../hooks/useInput';
/** Styles **/
import './EditHabitForm.css';

const EditHabitForm = props => {
  const { description, title, setEditMode } = props;

  /** State **/
  const [_title, titleBind, resetTitle] = useInput(title);
  const [_description, descriptionBind, resetDescription] = useInput(description);

  const handleEditSubmit = () => {
    console.log('submitting edited habit...');
    setEditMode(false);
  }

  return (
    <div className="EditHabitForm">
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
          value={_description}
          className="EditHabitForm__description" 
          placeholder="edit mode...">
        </textarea>
        <button className="EditHabitForm__save-btn">
          save
        </button>
      </form>
    </div>
  )
}

export default EditHabitForm
