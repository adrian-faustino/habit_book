import React from 'react'
/** Reactstrap **/
import { Button } from 'reactstrap';
/** Styles **/
import './CommentDeleteConfimration.css';

const CommentDeleteConfimration = () => {
  return (
    <div className="CommentDeleteConfirmation">
      <h3 className="CommentDeleteConfirmation__prompt">
        Delete comment?
      </h3>

      <div className="CommentDeleteConfirmation__button-container">
        <Button
          color="danger">
            Delete
        </Button>
        <Button
          color="light">
            Cancel
        </Button>
      </div>
    </div>
  )
}

export default CommentDeleteConfimration
