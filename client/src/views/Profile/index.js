import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FollowButton } from '../../components/FollowButton';
import { useAuth } from '../../hooks/useAuth';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import './Profile.scss'

export default function Profile() {

    const [userData, setUserData] = useState(null);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const {name: username} = useParams();
    const axiosPrivate = usePrivateAxios();
    const {auth} = useAuth();

    useEffect(() => {
        axiosPrivate.get(`/api/user/${username}/followers`)
            .then((response) => {
                setFollowers(response.data.followers);
            }).catch((err) => {
                console.error(err);
            });

        axiosPrivate.get(`/api/user/${username}/following`)
            .then((response) => {
                setFollowing(response.data.following);
            }).catch((err) => {
                console.error(err);
            });

        axiosPrivate.get(`/api/user/${username}`)
            .then((response) => {
                setUserData(response.data);
            }).catch((err) => {
                console.error(err);
            })
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
                <div className="profile__info__details">
                    <p>Posts {userData.posts.length}</p>
                    <p>Followers {followers.length}</p>
                    <p>Following {following.length}</p>
                </div>
                <p className="profile__info__bio">Follow me on other social media: Snapchat.. Tiktok.. Yt..</p>
            </div>
            <div>
                {userData.username === auth.username 
                ? null 
                : <FollowButton username={username} /> 
            }
            </div>
        </div>
        <div className="profile-gallery">
            {userData.posts.map((post) => {
                return (
                    <Link to={`/p/${post._id}`} key={post._id}>
                        <div className="profile-gallery__image">
                            <img 
                                src={post.imgURL[480]}
                                alt="A woman taking a picture"
                            />
                        </div>
                    </Link>
                )
            })}
        </div>
    </div>
    : null
  )
}
