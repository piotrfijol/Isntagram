import React from 'react'
import Comment from '../Comment'

export default function PostCommentSection({ comments = [], collapsed = true, className }) {

  return (
    <div className={className}>
        {collapsed 
            ? <p style={{fontWeight: 600, color: "rgb(50, 50, 50)"}}>See all {comments.length} comments</p>
            : comments.map((comment) => 
                <Comment 
                    content={comment.content} 
                    user={comment.user} 
                    key={comment._id}
                />
        )}
    </div>
  )
}
