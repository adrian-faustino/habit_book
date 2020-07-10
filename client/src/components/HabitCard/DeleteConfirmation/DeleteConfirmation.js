import React from 'react'
/** Custom hooks **/
import useInput from '../../../hooks/useInput';
/** Helpers **/
import { handleDeleteCard } from '../../../helpers/habitDataHelpers';
/** Reactstrap **/
import { Button } from 'reactstrap';
/** Styles **/
import './DeleteConfirmation.css';

const DeleteConfirmation = props => {
  const { user_id,
          habit_id,
          dispatch,
          closeModal,
          title } = props;

  /** State **/
  const [value, bind, reset] = useInput('');


  return (
    <div className="DeleteConfirmation">
      <Button close
        onClick={closeModal}/>
        
      <span className="DeleteConfirmation__prompt">
        Are you sure you want to delete?
        <i className="DeleteConfirmation__prompt">
          Once a habit is deleted, all data is lost and cannot be recovered.
        </i>
      </span>

      <hr />

      <span className="DeleteConfirmation__prompt">
        Please type "
        <i className="DeleteConfirmation__keyword">   {title}
        </i>" to delete.
      </span>

      <div className="flush-height">
        <input
          className="DeleteConfirmation__input"
          value={value}
          onChange={bind.onChange}/>

        {<Button
          className="DeleteConfirmation__button"
          color="danger"
          onClick={e => handleDeleteCard(e, user_id, habit_id, dispatch)}
          disabled={title !== value}>
            DELETE
        </Button>}
      </div>
    </div>
  )
}

export default DeleteConfirmation
