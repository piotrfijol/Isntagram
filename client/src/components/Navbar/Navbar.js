import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.scss'
import { FaHome, FaCompass, FaUser } from 'react-icons/fa'

export default function Navbar({ hideLocations, authOnly = false }) {

  let location = useLocation();
  let [shouldRender, setShouldRender] = useState(true);

  // Mock the user context
  const user = {
    name: "name",
    isLoggedIn: true
  }

  useEffect(() => {
    if(authOnly) {
      shouldRender = setShouldRender(user.isLoggedIn);
    } else {
      shouldRender = setShouldRender(true);
    }
  }, [authOnly]);

  const forbiddenLocations = !Array.isArray(hideLocations) || hideLocations.length < 1
    ? ['/signin', '/signup'] 
    : hideLocations;

  return (forbiddenLocations.includes(location.pathname) || !shouldRender ? null :
    <nav className="nav">
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
              <Link to={`/profile/${user.name}`}>
                <FaUser className="nav__item__icon" />
                <span className="nav__item__label">Profile</span>
              </Link>
            </li>
        </ul>
    </nav>
  )
}
