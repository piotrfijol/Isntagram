import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function ProtectedRoute() {
    const {auth} = useAuth();

  return (
    auth
        ? <Outlet />
        : <Navigate to={"/signin"}/>
  )
}
