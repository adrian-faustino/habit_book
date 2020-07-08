import React from 'react';
/** Subcomponents **/
import CommentCard from './CommentCard/CommentCard';
/** Styles **/
import './CommentsContainer.css';

// Props notes: 
// comments is an array of objects containing comment info
const CommentsContainer = props => {
  const { comments } = props;
  return (
    <div className="CommentsContainer">
      comment container
    </div>
  );
};

export default CommentsContainer;