import React from 'react'
import ActionButton from '../ActionButton';
import UserHeader from '../UserHeader';
import PostCommentSection from '../PostCommentSection';
import { FaHeart, FaCommentAlt } from 'react-icons/fa'
import './Post.scss'
import { LikeButton } from '../LikeButton';

const defaultPost = {
    description: "",
    imgURL: ""
}

export default function Post({ variant = "", post = defaultPost }) {

    const isPreview = () => {return variant === "preview"}

  return (
    <div className={"post " + (isPreview() ? "preview" : "")}>
        { !isPreview() ? <UserHeader className="post__header" user={post.user}/> : null }
        <div className="post__picture">
            <img src={post.imgURL[1280]} />
        </div>

        <div className="post__wrapper">
            {isPreview() 
                ? (
                    <React.Fragment>
                        <UserHeader className="post__header" user={post.user}/>            
                        <p className="post__description">
                            {post.description}
                        </p>
                        <PostCommentSection 
                            postId={0} 
                            className="post__comments"
                            collapsed={false} 
                        />
                        <div className="post__actions">
                            <LikeButton postId={post._id}/>
                            <p className="post__likes">{post.likesCount} likes</p>
                        </div>

                    </React.Fragment>
                )
                : (
                    <React.Fragment>
                        <div className="post__actions">
                            <LikeButton postId={post._id}/>
                            <ActionButton icon={FaCommentAlt} name="Comments" />
                        <p className="post__likes">{post.likesCount} likes</p>
                        </div>
                        <p className="post__description">
                            {post.description}
                        </p>
                        <PostCommentSection 
                            postId={0}  
                            className="post__comments"
                        />
                    </React.Fragment>
                    
                )
            }
            <div className="post__comment-form">
                <form action="" method="POST">
                    <input type="text" placeholder="Type something..." />
                </form>
            </div>

        </div>
        
    </div>
  )
}
