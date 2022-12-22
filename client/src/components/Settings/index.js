import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import './Settings.scss'

export const Settings = () => {
  return (
    <div className='content'>
      <div className='settings-container'>
          <div className='settings-container__tabs'>
              <Link to="/settings/edit">
                  Edit profile
              </Link>
          </div>
          <div className='settings-container__settings'>
              <Outlet />
          </div>
      </div>
    </div>
  )
}
