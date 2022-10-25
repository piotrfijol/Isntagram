import React from 'react'
import ActionButton from '../ActionButton';
import UserHeader from '../UserHeader';
import PostCommentSection from '../PostCommentSection';
import { FaHeart, FaCommentAlt } from 'react-icons/fa'
import './Post.scss'


export default function Post({ variant = "" }) {

    const isPreview = () => {return variant === "preview"}

  return (
    <div className={"post " + (isPreview() ? "preview" : "")}>
        { !isPreview() ? <UserHeader className="post__header" /> : null }
        <div className="post__picture">
            <img src="https://images.pexels.com/photos/2272940/pexels-photo-2272940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
        </div>

        <div className="post__wrapper">
            {isPreview() 
                ? (
                    <React.Fragment>
                        <UserHeader className="post__header" />            
                        <p className="post__description">
                            Lorem ipsum, sample text...
                        </p>
                        <PostCommentSection 
                            postId={0} 
                            className="post__comments"
                            collapsed={false} 
                        />
                        <div className="post__actions">
                            <ActionButton icon={FaHeart} name="Like"/>
                        <p className="post__likes">9,000 likes</p>
                        </div>

                    </React.Fragment>
                )
                : (
                    <React.Fragment>
                        <div className="post__actions">
                            <ActionButton icon={FaHeart} name="Like"/>
                            <ActionButton icon={FaCommentAlt} name="Comments" />
                        <p className="post__likes">9,000 likes</p>
                        </div>
                        <p className="post__description">
                            Lorem ipsum, sample text...
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
