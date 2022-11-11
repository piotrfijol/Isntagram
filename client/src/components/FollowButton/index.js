import React from 'react';
import { FaCheck, FaPlus } from 'react-icons/fa';
import './FollowButton.scss';

export const FollowButton = ({ isFollowing, onClick }) => {
  return (
    !isFollowing ? (
        <button onClick={onClick} className="follow-btn">
            <FaPlus className='follow-btn__icon' />
            Follow
        </button>
    ) : (
        <button onClick={onClick} className="follow-btn follow-btn--active">
            <FaCheck className='follow-btn__icon' />
            Followed
        </button>
    )
  )
}
