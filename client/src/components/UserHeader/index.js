import React from 'react'
import './UserHeader.scss'

export default function UserHeader({ user, className }) {
  return (
    <div className={"header " + className }>
        <div className="header__avatar">
            <img src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" alt="a profile picture"/>
        </div>
        <p className="header__username">Username</p>
    </div>
  )
}

