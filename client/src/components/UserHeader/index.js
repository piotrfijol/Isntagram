import React from 'react'
import './UserHeader.scss'

export default function UserHeader({ user, className }) {
  return (
    <div className={"header " + className }>
        <div className="header__avatar">
            <img src="https://scontent.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent.cdninstagram.com&_nc_cat=1&_nc_ohc=4x80AR8wRasAX-qGMCl&edm=AOL1moYAAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AT-7G1uHKUqykZf9VLLRR2TefJogffV8W3Lz_USoQewDRw&oe=635940CF&_nc_sid=97d328" alt="a profile picture"/>
        </div>
        <p className="header__username">Username</p>
    </div>
  )
}

