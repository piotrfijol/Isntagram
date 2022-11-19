import React from 'react'
import './PostThumbnail.scss';
import { FaHeart, FaCommentAlt } from 'react-icons/fa';

export const PostThumbnail = ({ post, className }) => {
  return (
    <div className={'post-thumbnail ' + className}>
        <div className="post-thumbnail__overlay">
          <div className='post-thumbnail__overlay__info'>
            <p><FaHeart /> {post.likesCount}</p>
          </div>
        </div>
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
