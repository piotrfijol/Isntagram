import React from 'react'
import ActionButton from '../ActionButton';
import { FaHeart, FaCommentAlt } from 'react-icons/fa'
import './Post.scss'

export default function Post({ variant }) {

  return (
    <div className="post">
        <div className="post__header">
            <div className="post__header__avatar">
                <img src="https://scontent.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent.cdninstagram.com&_nc_cat=1&_nc_ohc=4x80AR8wRasAX-qGMCl&edm=AOL1moYAAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AT-7G1uHKUqykZf9VLLRR2TefJogffV8W3Lz_USoQewDRw&oe=635940CF&_nc_sid=97d328" alt="a profile picture"/>
            </div>
            <p className="post__header__username">Username</p>
        </div>
        <div className="post__picture">
            <img src="https://images.pexels.com/photos/2272940/pexels-photo-2272940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
        </div>
        <div className="post__actions">
            <ActionButton icon={FaHeart} name="Like"/>
            <ActionButton icon={FaCommentAlt} name="Comments" />
        </div>
        <div className="post__metadata">
            <p className="post__metadata__likes">9,000 likes</p>
            <p className="post__metadata__comments">See all x comments</p>
        </div>
        <div className="post__comment-form">
            <form action="" method="POST">
                <input type="text" placeholder="Type something..." />
            </form>
        </div>
    </div>
  )
}
