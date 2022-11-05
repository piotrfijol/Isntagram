import axios from '../api/axios'

export const useRefreshToken = () => {

    return async function() {
        let requestToken;
        let data;

        try {
            requestToken = await axios.get("/api/refresh-token", {
                withCredentials: true
            })
            data = requestToken.data;

        } catch(err) {
            data = null
        }

        return data;
    }
}
