import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { useRefreshToken } from './useRefreshToken';

export const useSetup = () => {

    const { auth, setAuth } = useAuth();
    const refresh = useRefreshToken();
    const navigate = useNavigate();

    useEffect(() => {
        if(!auth) {
          (async function() {
            const data = await refresh();
            if(data?.accessToken) {
                setAuth(prev => {
                    return {
                        ...prev,
                        username: data.username,
                        accessToken: data.accessToken
                    }
                })
            } else {
                navigate("/signin")
            }
          })();
        }
      }, []);

}
