import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from "../Avatar";
import './UserHeader.scss'

export default function UserHeader({ user={username: 'User'}, className }) {
  return (
    <Link to={`/profile/${user.username}`}>
      <div className={"header " + className }>
          <div className="header__avatar">
            <Avatar className="profile__avatar" user={user}/>
          </div>
          <p className="header__username">{user.username}</p>
      </div>
    </Link>
  )
}

