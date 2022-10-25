import React from 'react'
import Comment from '../Comment'

export default function PostCommentSection({ collapsed = true, postId, className }) {
    let sampleComments = [
        {
            user: "username",
            content: "This is an awesome picture!"
        },
        {
            user: "username",
            content: "This is an awesome picture!"
        },
        {
            user: "username",
            content: "This is an awesome picture!"
        }
    ]
  return (
    <div className={className}>
        {collapsed 
            ? <p className="">See all x comments</p>
            : sampleComments.map((comment, id) => 
                <Comment 
                    content={comment.content} 
                    author={comment.username} 
                    key={id}
                />
        )}
    </div>
  )
}
