import React, { useEffect } from 'react'

const CommentCard = ({ comment }) => {
  const { comment_id,
          comment_by,
          habit_id,
          created_at,
          content,
          is_edited } = comment;



  return (
    <li>
      {content}
    </li>
  )
}

export default CommentCard
