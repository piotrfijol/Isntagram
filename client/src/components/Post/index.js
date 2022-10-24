import React from 'react'
import ActionButton from '../ActionButton';
import UserHeader from '../UserHeader';
import { FaHeart, FaCommentAlt } from 'react-icons/fa'
import './Post.scss'


export default function Post({ variant = "preview" }) {

  return (
    <div className={"post " + (variant === "preview" ? "preview" : "")}>
        <UserHeader className="post__header" />
        <div className="post__picture">
            <img src="https://images.pexels.com/photos/2272940/pexels-photo-2272940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
        </div>

        <div className="post__wrapper">
        <UserHeader className="post__header" />
            {
                variant === "preview" 
                    ? null
                    : 
                    <div className="post__actions">
                        <ActionButton icon={FaHeart} name="Like"/>
                        <ActionButton icon={FaCommentAlt} name="Comments" />
                    </div>
            }
            <div className="post__metadata">
                <p className="post__metadata__likes">9,000 likes</p>
                <p className="post__metadata__description">
                    Lorem ipsum, sample text...
                </p>
                {variant === "preview" ?
                    "commentSection"
                    : <p className="post__metadata__comments">See all x comments</p>
                }
                
            </div>
            <div className="post__comment-form">
                <form action="" method="POST">
                    <input type="text" placeholder="Type something..." />
                </form>
            </div>
        </div>
        
    </div>
  )
}
