import React, { useEffect, useState } from 'react'
import ActionButton from '../ActionButton';
import { FaHeart } from 'react-icons/fa';
import "./LikeButton.scss";
import usePrivateAxios from '../../hooks/usePrivateAxios';

export const LikeButton = ({ postId }) => {
    const [isLiked, setIsLiked] = useState(false);
    const axiosPrivate = usePrivateAxios();

    useEffect(() => {
        axiosPrivate.get(`/api/post/${postId}/like`)
            .then((response) => {
                setIsLiked(response.data.isLiked);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleClick = (ev) => {
        axiosPrivate(`/api/post/${postId}/like`, {
            method: isLiked ? 'delete' : 'put'
        })
        .then((response) => {
            setIsLiked(!isLiked);
        })
        .catch((err) => {
            console.error(err);
        });
    };

    return (
        <ActionButton 
            icon={FaHeart} 
            className={["like-btn", isLiked ? "like-btn--active" : ""].join(" ")} 
            name="Like"
            onClick={handleClick}
        />
     )
}
