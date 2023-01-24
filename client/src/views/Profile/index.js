import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FollowButton } from '../../components/FollowButton';
import { PostThumbnail } from '../../components/PostThumbnail';
import { useAuth } from '../../hooks/useAuth';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import {useMediaQuery} from 'react-responsive';
import './Profile.scss'
import { Avatar } from '../../components/Avatar';
import { LoadingDots } from '../../components/placeholders/LoadingDots'
import { useErrors } from '../../hooks/useErrors';
import { AiFillPlusCircle } from 'react-icons/ai';


export default function Profile() {

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const [userData, setUserData] = useState(null);
    const {name: username} = useParams();
    const axiosPrivate = usePrivateAxios();
    const {auth} = useAuth();
    const {setError} = useErrors();
 
    const isProfileOwner = () => userData.username === auth.username;

    useEffect(() => {
        
        axiosPrivate.get(`/api/user/${username}`)
            .then((response) => {
                setUserData(response.data);
            }).catch((err) => {
                if(err.response) setError(err.respone.data.message);
            });

    }, [username]);

  return (
    userData ?
    
    <div className='content'>
    <div className="profile-container">
        <div className="profile">
            <Avatar className="profile__avatar" user={userData}/>
            <div className="profile__info">
                <div style={{display: "flex", alignItems: "center"}}>
                    <p className="profile__info__username">{userData.username}</p>
                    <div style={{marginLeft: "50px"}}>
                        {!isProfileOwner()
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
                { !isTabletOrMobile 
                ? (<div className="profile__info__details">
                    <p>Posts {userData.posts.length}</p>
                    <p>Followers {userData.followers.count}</p>
                    <p>Following {userData.following.count}</p>
                   </div>)
                :  isProfileOwner()
                    ? (<Link to={`/settings/edit`}>
                        <button className="profile__btn profile__btn--block">Edit Profile</button>
                       </Link>)
                    : null
                }
                <p className="profile__info__bio">{userData.profile.biography}</p>
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
            {isProfileOwner()
            ? (
                <Link to={`/p/new`}>
                    <div className="profile-gallery__create-post">
                        <AiFillPlusCircle />
                    </div>
                </Link>
            ) 
            : null }
            {userData.posts.map((post) => {
                return (
                    <Link to={`/p/${post._id}`} key={post._id}>
                        <PostThumbnail post={post} className="profile-gallery__image"/>
                    </Link>
                )
            })}
        </div>
    </div>
    </div>
    : <LoadingDots />
  )
}
