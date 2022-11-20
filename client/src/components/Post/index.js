import React, { useEffect, useState } from 'react'
import ActionButton from '../ActionButton';
import UserHeader from '../UserHeader';
import PostCommentSection from '../PostCommentSection';
import { FaCommentAlt } from 'react-icons/fa'
import './Post.scss'
import { LikeButton } from '../LikeButton';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import { Link } from 'react-router-dom';

const defaultPost = {
    description: "",
    imgURL: ""
}

export default function Post({ variant = "", post = defaultPost }) {

    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(undefined);
    const axiosPrivate = usePrivateAxios();

    const handleChange = (ev) => {
        setComment(ev.target.value);
    };

    const sendComment = (ev) => {
        ev.preventDefault();

        axiosPrivate.post(`/api/post/${post._id}/comment`, {
            data: {
                content: comment
            }
        })
        .then((response) => response.data.comment)
        .then((comment) => {
            setComments(comments.concat(comment));
        });

        setComment("");
    }
    
    useEffect(() => {
        const aController = new AbortController();
        const signal = aController.signal;

        axiosPrivate.get(`/api/post/${post._id}/comments`, {
            signal
        }).then((response) => {
            setComments(response.data.comments);
        }).catch((err) => {
            console.error(err);
        });
    }, []);

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
                        {comments && comments.length === 0 
                        ? <p className="neglible post__comments" style={{textAlign: 'center'}}>No comments were found</p>
                        : (
                        <PostCommentSection 
                            comments={comments}
                            className="post__comments"
                            collapsed={false} 
                        />)}
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
                            <Link to={`/p/${post._id}`}>
                                <ActionButton icon={FaCommentAlt} name="Comments" />
                            </Link>
                        <p className="post__likes">{post.likesCount} likes</p>
                        </div>
                        <p className="post__description">
                            {post.description}
                        </p>
                        <PostCommentSection 
                            comments={comments}
                            postId={post._id}  
                            className="post__comments"
                        />
                    </React.Fragment>
                    
                )
            }

            <div className="post__comment-form">
                <form onSubmit={sendComment}>
                    <input autoComplete="off" onChange={handleChange} value={comment} type="text" name="content" placeholder="Type something..." />
                </form>
            </div>
        </div>
    </div>
  )
}
