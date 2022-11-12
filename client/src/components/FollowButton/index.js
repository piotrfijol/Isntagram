import React, { useEffect, useState } from 'react';
import { FaCheck, FaPlus } from 'react-icons/fa';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import './FollowButton.scss';

export const FollowButton = ({ username }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const axiosPrivate = usePrivateAxios();

  useEffect(() => {
    axiosPrivate.get(`/api/user/${username}/follow`)
    .then((response) => {
        setIsFollowing(response.data.isFollowing);
    }).catch((err) => {

    }).finally(() => {
      setIsFetching(false);
    });
  }, [setIsFollowing, username]);

  const handleFollow = (ev) => {
    if(isFetching) return;

    setIsFetching(true)
    if(!isFollowing) {
      axiosPrivate.put(`/api/user/${username}/follow`)
        .then((data) => {
          setIsFollowing(true);
        }).catch((err) => {

        }).finally(() => {
          setIsFetching(false);
        });
        
    } else {
      axiosPrivate.delete(`/api/user/${username}/follow`)
        .then((data) => {
          setIsFollowing(false);
        }).catch((err) => {

        }).finally(() => {
          setIsFetching(false);
        });
    }
    
  };
  
  return (
    !isFollowing ? (
        <button onClick={handleFollow} className="follow-btn">
            <FaPlus className='follow-btn__icon' />
            Follow
        </button>
    ) : (
        <button onClick={handleFollow} className="follow-btn follow-btn--active">
            <FaCheck className='follow-btn__icon' />
            Followed
        </button>
    )
  )
}
