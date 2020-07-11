import React from 'react'
/** Styles **/
import './EditHabitForm.css';

const EditHabitForm = props => {
  const { description, title } = props;

  return (
    <div className="EditHabitForm">
      <form>
        <input 
          value={title}
          className="EditHabitForm__title"/>

        <input
          value={description}
          className="EditHabitForm__description" 
          placeholder="edit mode..."/>
      </form>
    </div>
  )
}

export default EditHabitForm
