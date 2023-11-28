import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import {showToast} from "../services/toastSlice";

interface LoginDataIFace {
    username: string,
    password: string
}

interface SignUpDataIFace extends LoginDataIFace {
    email: string
}

interface UserIFace {
    username: string,
    email: string,
    theme: string
}

interface UserDataIFace {
    access: string,
    refresh: string,
    user: UserIFace
}

export function useUserActions() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    // const baseURL = `https://${process.env.REACT_APP_HOSTNAME}/api`;

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
        return axios.post(`/api/users/token`, params, config)
          .then((res) => {
              setUserData(res.data);
              navigate("/")
          })
          .catch((err) => {
              dispatch(showToast({title: 'Ошибка', text: 'Неправильные учетные данный', type: 'danger'}))
          })
    }

    function register(data: SignUpDataIFace) {
        return axios.post(`/api/users/create`, data)
            .then((res) => {
                setUserData(res.data);
                navigate("/")
            })
          .catch((err) => {
              console.log(err)
              dispatch(showToast({title: 'Ошибка', text: err.response.data.detail, type: 'danger'}))
          })
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