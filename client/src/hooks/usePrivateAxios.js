import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../api/axios'
import { useAuth } from './useAuth';
import { useRefreshToken } from './useRefreshToken';

const usePrivateAxios = () => {
    const accessToken = localStorage.getItem('_jwt');
    const {auth, setAuth} = useAuth();
    const navigate = useNavigate();
    const refresh = useRefreshToken();
  
    useEffect(() => {
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            request => {
                if(auth && !request.headers['Authorization']) {
                    request.headers = {};
                    request.headers['Authorization'] = "Bearer " + auth?.accessToken;
                }
                return request;
            },
            (err) => Promise.reject(err)
        )

        const responseInterceptor = axiosPrivate.interceptors.response.use(
            response => response,
            async (invalidResponse) => {
                const request = invalidResponse.config;
                if(invalidResponse.response?.status === 403 
                    || invalidResponse.response?.status === 401
                    && !request.requestedRefresh) {

                    request.requestedRefresh = true;
                    
                    const data = await refresh();
                    const newAccessToken = data.accessToken;

                    if(newAccessToken) {
                        request.headers = {}
                        request.headers['Authorization'] = "Bearer " + newAccessToken;
                        
                        setAuth(prev => {
                            return {
                                ...prev,
                                username: data.username,
                                accessToken: newAccessToken,
                                profile: data.profile
                            }
                        })

                        return axiosPrivate.request(request) 
                    } else {
                        navigate("/signin");
                        return;
                    }
                }
                return Promise.reject(invalidResponse)
            }
        )

        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor);
            axiosPrivate.interceptors.response.eject(responseInterceptor);
        }
    }, [auth, setAuth]);

    return axiosPrivate;
}

export default usePrivateAxios;