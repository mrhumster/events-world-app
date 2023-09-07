import axios from 'axios';
import { useNavigate } from "react-router-dom";

export function useUserActions() {
    const navigate = useNavigate();
    const baseURL = "https://base/api";

    // Login user
    function login(data: any) {
        const params = new URLSearchParams()

        params.append('username', data.username)
        params.append('password', data.password)

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        return axios.post(`${baseURL}/users/token`, params, config)
            .then((res) => {
                // Registering the account and tokens in the store
                setUserData(res.data);
                navigate("/")
            });
    }

    function register(data: any) {
        return axios.post(`${baseURL}/users/create`, data)
            .then((res) => {
                // Registering the account and tokens in the store
                setUserData(res.data);
                navigate("/")
            });
    }

    // Logout the user
    function logout() {
        localStorage.removeItem("auth")
        navigate("/login")
    }


    return {
        login,
        register,
        logout,
    };
}

// Get the user
export function getUser() {
    const auth = JSON.parse(localStorage.getItem("auth")!);
    if (auth) {
        return auth.user;
    }
    return null
}

// Get the access token
export function getAccessToken() {
    const auth = JSON.parse(localStorage.getItem("auth")!);
    return auth.access;
}

// Get the refresh token
export function getRefreshToken() {
    const auth = JSON.parse(localStorage.getItem("auth")!);
    return auth.refresh;
}

// Set the access, token and user property
export function setUserData(data: any) {
    localStorage.setItem("auth", JSON.stringify({
        access: data.access,
        refresh: data.refresh,
        user: data.user,
    }))
}