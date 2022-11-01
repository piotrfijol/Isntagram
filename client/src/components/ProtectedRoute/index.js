import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function ProtectedRoute({ user }) {
    const location = useLocation();

  return (
    user 
        ? <Outlet />
        : <Navigate to="/signin" state={ {from: location} } replace/>
  )
}
