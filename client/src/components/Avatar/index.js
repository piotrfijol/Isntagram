import React, { useEffect, useState } from 'react'

const defaultAvatar = {
    "128": "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
    "256": "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
}

export const Avatar = ({user, className}) => {

    const [avatar, setAvatar] = useState(defaultAvatar);

    useEffect(() => {
        if(user.profile?.img) {
            setAvatar(user.profile.img);
        } else {
            setAvatar(defaultAvatar);
        }
    }, [user]);
    
  return (
    <div className={className}>
        <img 
            src={avatar["256"]} 
            alt="a profile picture"/>
    </div>
  )
}
