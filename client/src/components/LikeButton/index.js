import React, { useEffect, useState } from 'react'
import ActionButton from '../ActionButton';
import { FaHeart } from 'react-icons/fa';
import "./LikeButton.scss";
import usePrivateAxios from '../../hooks/usePrivateAxios';

export const LikeButton = ({ onClick, isLiked }) => {

    return (
        <ActionButton 
            icon={FaHeart} 
            className={["like-btn", isLiked ? "like-btn--active" : ""].join(" ")} 
            name="Like"
            onClick={onClick}
        />
     )
}
