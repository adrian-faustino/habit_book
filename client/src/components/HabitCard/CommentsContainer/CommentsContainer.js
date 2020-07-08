import React from 'react';
/** Subcomponents **/
import CommentCard from './CommentCard/CommentCard';
/** Styles **/
import './CommentsContainer.css';
/** npm **/
import { v4 as uuidv4 } from 'uuid';

// Props notes: 
// comments is an array of objects containing comment info
const CommentsContainer = props => {
  const { comments } = props;

  // spread for render
  const _comments = comments.map(comment => {
    return <CommentCard key={uuidv4()} comment={comment} />
  });
  return (
    <ul className="CommentsContainer">
      {_comments}      
    </ul>
  );
};

export default CommentsContainer;