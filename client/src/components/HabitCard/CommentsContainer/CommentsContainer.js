import React from 'react';
/** Subcomponents **/
import CommentCard from './CommentCard/CommentCard';
/** Styles **/
import './CommentsContainer.css';

// Props notes: 
// comments is an array of objects containing comment info
const CommentsContainer = props => {
  const { comments } = props;

  // spread for render
  const _comments = comments.map(comment => {
    return <CommentCard comment={comment} />
  });
  return (
    <div className="CommentsContainer">
      {_comments}      
    </div>
  );
};

export default CommentsContainer;