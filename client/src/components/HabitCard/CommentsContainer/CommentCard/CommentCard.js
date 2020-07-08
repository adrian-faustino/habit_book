import React from 'react'

const CommentCard = ({ comment }) => {
  const { comment_id,
          comment_by,
          habit_id,
          created_at,
          content,
          is_edited } = comment;

  return (
    <div>
      {content}
    </div>
  )
}

export default CommentCard
