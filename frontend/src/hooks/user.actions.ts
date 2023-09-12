import axios from 'axios';
import { useNavigate } from "react-router-dom";

interface LoginDataIFace {
    username: string,
    password: string
}

interface SignUpDataIFace extends LoginDataIFace {
    email: string
}

interface UserIFace {
    username: string,
    email: string
}

interface UserDataIFace {
    access: string,
    refresh: string,
    user: UserIFace
}

export function useUserActions() {
    const navigate = useNavigate();
    const baseURL = `https://${process.env.REACT_APP_HOSTNAME}/api`;

    // Login user
    function login(data: LoginDataIFace) {
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
                setUserData(res.data);
                navigate("/")
            });
    }

    function register(data: SignUpDataIFace) {
        return axios.post(`${baseURL}/users/create`, data)
            .then((res) => {
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

export function getUser() {
    const auth:UserDataIFace = JSON.parse(localStorage.getItem("auth")!);
    if (auth) {
        return auth.user;
    }
    return null
}


export function getAccessToken() {
    const auth:UserDataIFace = JSON.parse(localStorage.getItem("auth")!);
    return auth.access;
}


export function getRefreshToken() {
    const auth:UserDataIFace = JSON.parse(localStorage.getItem("auth")!);
    return auth.refresh;
}


export function setUserData(data: UserDataIFace) {
    localStorage.setItem("auth", JSON.stringify({
        access: data.access,
        refresh: data.refresh,
        user: data.user,
    }))
}