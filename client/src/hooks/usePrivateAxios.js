import { useEffect } from 'react'
import { axiosPrivate } from '../api/axios'
import { useAuth } from './useAuth';

const usePrivateAxios = () => {
    const accessToken = localStorage.getItem('_jwt');
    const [auth, setAuth] = useAuth();
  
    useEffect(() => {
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            request => {
                if(!request.headers?.Authorization)
                    request.headers['Authorization'] = `Bearer ${auth.accessToken}`;
                return request;
            },
            (err) => Promise.reject(err)
        )

        const responseInterceptor = axiosPrivate.interceptors.response.use(
            response => response,
            async (invalidResponse) => {
                const request = invalidResponse.config;
                if(invalidResponse.response?.status === 403 && !request.requestedRefresh) {
                    request.requestedRefresh = true;
                    const newAccessToken = await axiosPrivate.get("/api/refresh-token");
                    if(newAccessToken) {
                        setAuth(prev => {
                            return {
                                ...prev,
                                accessToken: newAccessToken
                            }
                        })
                    }
                    return axiosPrivate(request);
                }
                return Promise.reject(invalidResponse)
            }
        )

        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor);
            axiosPrivate.interceptors.response.eject(responseInterceptor);
        }
    }, []);

    return axiosPrivate;
}

export default usePrivateAxios;