import React from 'react'
import './Profile.scss'

export default function Profile() {
  return (
    <div className="profile-container">
        <div className="profile">
            <div className="profile__avatar">
                <img src="https://scontent.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent.cdninstagram.com&_nc_cat=1&_nc_ohc=4x80AR8wRasAX-qGMCl&edm=AOL1moYAAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AT-7G1uHKUqykZf9VLLRR2TefJogffV8W3Lz_USoQewDRw&oe=635940CF&_nc_sid=97d328" alt="a profile picture"/>
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
