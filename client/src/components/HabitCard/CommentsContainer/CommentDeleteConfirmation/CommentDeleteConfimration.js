import React from 'react'
/** Reactstrap **/
import { Button } from 'reactstrap';
/** Styles **/
import './CommentDeleteConfimration.css';

const CommentDeleteConfimration = props => {
  const { setIsDeleteMode, handleDeleteComment } = props;


  const handleDelete = e => {
    e.preventDefault();
    handleDeleteComment();
  };
  
  const handleCancel = e => {
    e.preventDefault();
    // close prompt
    setIsDeleteMode(false);
  };
  
  return (
    <div className="CommentDeleteConfirmation">
      <h3 className="CommentDeleteConfirmation__prompt">
        Delete comment?
      </h3>

      <div className="CommentDeleteConfirmation__button-container">
        <Button
          onClick={handleDelete}
          color="danger">
            Delete
        </Button>
        <Button
          onClick={handleCancel}
          color="light">
            Cancel
        </Button>
      </div>
    </div>
  )
}

export default CommentDeleteConfimration
