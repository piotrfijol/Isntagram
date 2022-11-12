import React from 'react'

export const PostThumbnail = ({ post, className }) => {
  return (
    <div className={className}>
        <img 
            src={post.imgURL[480]}
            srcSet={ 
                Object.entries(post.imgURL)
                    .map(([key, value]) => `${value} ${key}w`)
                    .join(", ")
            }
        />
    </div>
  )
}
