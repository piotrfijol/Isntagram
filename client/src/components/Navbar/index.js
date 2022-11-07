import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.scss'
import { FaHome, FaCompass, FaUser, FaCameraRetro, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth';

export default function Navbar({ hideLocations, authOnly = true }) {

  let location = useLocation();
  let [shouldRender, setShouldRender] = useState(false);
  const {auth} = useAuth();

  useEffect(() => {
    if(authOnly) {
      setShouldRender(auth !== null);
    } else {
      setShouldRender(true);
    }
  }, [authOnly, auth]);

  const forbiddenLocations = !Array.isArray(hideLocations) || hideLocations.length < 1
    ? ['/signin', '/signup'] 
    : hideLocations;

  return (forbiddenLocations.includes(location.pathname) || !shouldRender ? null :
    <nav className="nav">
        <header>
            <FaCameraRetro />
            <h1 className='logo'>Isntagram</h1>
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
              <Link to={`/profile/${auth.username}`}>
                <FaUser className="nav__item__icon" />
                <span className="nav__item__label">Profile</span>
              </Link>
            </li>
            <li className="nav__item">
              <Link to={`/logout`}>
                <FaSignOutAlt className="nav__item__icon" />
                <span className="nav__item__label">Logout</span>
              </Link>
            </li>
        </ul>
    </nav>
  )
}
