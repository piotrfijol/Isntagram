import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'
import { FaHome, FaCompass, FaUser } from 'react-icons/fa'

export default function Navbar() {

  let userName = "name";

  return (
    <nav class="nav">
        <header>
            <h1>Instagram</h1>
        </header>
        <ul>
            <li className="nav__item">
              <Link to="/">
                <FaHome className="nav__item__icon"/>
                <span className="nav__item__label">Home</span>
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/explore">
                <FaCompass className="nav__item__icon" />
                <span className="nav__item__label">Explore</span>
              </Link>
            </li>
            <li className="nav__item">
              <Link to={`/profile/${userName}`}>
                <FaUser className="nav__item__icon" />
                <span className="nav__item__label">Profile</span>
              </Link>
            </li>
        </ul>
    </nav>
  )
}
