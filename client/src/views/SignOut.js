import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import usePrivateAxios from '../hooks/usePrivateAxios';

export const SignOut = () => {
  
    const axiosPrivate = usePrivateAxios();
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();

    useEffect(() => {
        axiosPrivate.post("/api/logout")
            .then((data) => {
                setAuth(null);
                navigate("/signin");
            });
        
    }, []);
  
    return null;
}
