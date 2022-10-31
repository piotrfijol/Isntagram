import React from 'react'
import './Profile.scss'

export default function Profile() {
  return (
    <div className="profile-container">
        <div className="profile">
            <div className="profile__avatar">
                <img src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" alt="a profile picture"/>
            </div>
            <div className="profile__info">
                <p className="profile__info__username">Username</p>
                <div className="profile__info__details">
                    <p>Posts 0</p>
                    <p>Followers 0</p>
                    <p>Following 0</p>
                </div>
                <p className="profile__info__bio">Follow me on other social media: Snapchat.. Tiktok.. Yt..</p>
            </div>
        </div>
        <div className="profile-gallery">
            <div className="profile-gallery__image">
                <img 
                    src="https://images.pexels.com/photos/2272940/pexels-photo-2272940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="A woman taking a picture"
                />
            </div>
            <div className="profile-gallery__image">
                <img 
                    src="https://images.pexels.com/photos/416024/pexels-photo-416024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="A harbor with boats in it"
                />
            </div>  
            <div className="profile-gallery__image">
                <img 
                    src="https://images.pexels.com/photos/2272940/pexels-photo-2272940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="A woman taking a picture"
                />
            </div>
        </div>
    </div>
  )
}
