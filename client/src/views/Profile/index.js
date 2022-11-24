import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FollowButton } from '../../components/FollowButton';
import { PostThumbnail } from '../../components/PostThumbnail';
import { useAuth } from '../../hooks/useAuth';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import {useMediaQuery} from 'react-responsive';
import './Profile.scss'


export default function Profile() {

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const [userData, setUserData] = useState(null);
    const {name: username} = useParams();
    const axiosPrivate = usePrivateAxios();
    const {auth} = useAuth();

    useEffect(() => {
        
        axiosPrivate.get(`/api/user/${username}`)
            .then((response) => {
                setUserData(response.data);
            }).catch((err) => {
                console.error(err);
            });

    }, [username]);

  return (
    userData ?
    <div className="profile-container">
        <div className="profile">
            <div className="profile__avatar">
                <img src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" alt="a profile picture"/>
            </div>
            <div className="profile__info">
                <p className="profile__info__username">{userData.username}</p>
                { !isTabletOrMobile 
                ? (<div className="profile__info__details">
                    <p>Posts {userData.posts.length}</p>
                    <p>Followers {userData.followers.count}</p>
                    <p>Following {userData.following.count}</p>
                   </div>)
                : (<Link to={`/settings/edit`}>
                    <button className="profile__btn profile__btn--block">Edit Profile</button>
                   </Link>)
                }
                <p className="profile__info__bio">Follow me on other social media: Snapchat.. Tiktok.. Yt..</p>
            </div>
            <div>
                {userData.username !== auth.username 
                ? <FollowButton username={username} /> 
                : (!isTabletOrMobile 
                    ? (<Link to={`/settings/edit`}>
                        <button className="profile__btn">Edit profile</button>
                       </Link>) 
                    : null
                  ) 
            }
            </div>
        </div>
        {isTabletOrMobile 
            ? <div className="profile-details">
                <div className="profile-details__tile">
                    <p className="profile-details__tile__label">Posts</p>
                    <p className="profile-details__tile__data">{userData.posts.length}</p>
                </div>
                <div className="profile-details__tile">
                    <p className="profile-details__tile__label">Followers</p>
                    <p className="profile-details__tile__data">{userData.followers.count}</p>
                </div>
                <div className="profile-details__tile">
                    <p className="profile-details__tile__label">Following</p>
                    <p className="profile-details__tile__data">{userData.following.count}</p>
                </div>
            </div>
            : null
        }
        <div className="profile-gallery">
            {userData.posts.map((post) => {
                return (
                    <Link to={`/p/${post._id}`} key={post._id}>
                        <PostThumbnail post={post} className="profile-gallery__image"/>
                    </Link>
                )
            })}
        </div>
    </div>
    : null
  )
}
