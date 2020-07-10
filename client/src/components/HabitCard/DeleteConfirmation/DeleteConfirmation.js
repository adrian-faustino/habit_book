import React from 'react'
/** Custom hooks **/
import useInput from '../../../hooks/useInput';
/** Helpers **/
import { handleDeleteCard } from '../../../helpers/habitDataHelpers';
/** Reactstrap **/
import { Button } from 'reactstrap';

const DeleteConfirmation = props => {
  const { user_id,
          habit_id,
          dispatch,
          title } = props;

  /** State **/
  const [value, bind, reset] = useInput('');

  return (
    <div>
      <span>
        Are you sure you want to delete? Once a habit is deleted, all data is lost and cannot be recovered.
      </span>
      <span>
        {`Please type "${title}" to delete.`}
      </span>

      <input
        value={value}
        onChange={bind.onChange}/>

      {<Button
        color="danger"
        onClick={e => handleDeleteCard(e, user_id, habit_id, dispatch)}
        disabled={title !== value}>
          DELETE
      </Button>}
    </div>
  )
}

export default DeleteConfirmation
