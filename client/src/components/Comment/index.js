import React from 'react'
import UserHeader from '../UserHeader'
import './Comment.scss'

export default function Comment({ content, author }) {
  return (
    <div className="comment">
        <UserHeader className="comment__author"/>
        <p className="comment__content">{content}</p>
    </div>
  )
}
