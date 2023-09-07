import React, {useEffect, useState} from "react";
import './styles.css'
import './csshake-hard.css'
import {SocialContainer} from "../social_container";
import { useUserActions } from "../../hooks"

export interface ValidateString {
    value: string;
    error: string;
}

export const Form = ({action = '#', type = 'login'}:{action: string, type: string}) => {

    const [email, setEmail] = useState<ValidateString>({value: '', error: ''})
    const [username, setUsername] = useState<ValidateString>({value: '', error: ''})
    const [password, setPassword] = useState<ValidateString>({value: '', error: ''})
    const [password2, setPassword2] = useState<ValidateString>({value: '', error: ''})

    const userActions = useUserActions();

    const handleSubmit = (event: any) => {
        const form = event.target
        event.preventDefault()
        if (form.classList.contains('login')) {
            if (!username.error && !password.error) {
                console.log('Форма без ошибок')
                const data = {
                    username: username.value,
                    password: password.value,
                };
                userActions.login(data).catch((err) => {
                    if (err.message) {
                        console.log(err)
                    }
                });

            }
        } else if (form.classList.contains('signup')) {
            if (!email.error && !password.error && !password2.error && !username.error) {
                console.log('Форма без ошибок')
                const data = {
                    username: username.value,
                    password: password.value,
                    email: email.value
                };
                userActions.register(data).catch((err) => {
                    if (err.message) {
                        console.log(err)
                    }
                });
            }
        }
    }

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail({value: event.target.value, error: ''})
    }

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword({value: event.target.value, error: ''})
    }

    const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setUsername({value: event.target.value, error: ''})
    }

    const handleChangePassword2 = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword2({value: event.target.value, error: ''})
    }

    const validateEmail = (email: ValidateString) => {
        return email.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    }

    const validatePassword = (password: ValidateString) => {
        return password.value.length >= 8
    }

    const validatePassword2 = (password2: ValidateString) => {
        return password2.value === password.value
    }

    useEffect(():void => {
        if (!validatePassword(password) && !password.error) {
            setPassword(pervState => {
                return {
                    ...pervState,
                    error: 'Пароль должен быть не менее 8 символов'
                }
            })
        }
    }, [password])

    useEffect(():void => {
        if (!validatePassword2(password2) && !password2.error) {
            setPassword2(pervState => {
                return {
                    ...pervState,
                    error: 'Пароль не совпадает'
                }
            })
        }
    }, [password2])

    useEffect(():void => {
        if (!validateEmail(email) && !email.error) {
            setEmail(pervState => {
                return {
                    ...pervState,
                    error: 'Введите корректный адрес электронной почты'
                }
            })
        }
    }, [email])

    let content: JSX.Element
    switch (type) {
        case 'login':
            content =
                <form className={type} action={action} onSubmit={handleSubmit}>
                    <h1>Вход</h1>
                    <SocialContainer/>
                    <span>или зарегистрируй свой аккаунт</span>

                    <input type="text" placeholder="Имя пользователя"
                           onChange={(e) => handleChangeUsername(e)}/>
                    { username.error && <small className="error">{username.error}</small>}

                    <input type="password" placeholder="Пароль"
                           onChange={(e) => handleChangePassword(e)}/>
                    { password.error && <small className="error">{password.error}</small>}

                    <a href="#">Забыли пароль</a>
                    <button id="button_login" type="submit">Войти</button>
                </form>
            break
        case 'signup':
            content = <form className={type} action={action} onSubmit={handleSubmit}>
                <h1>Создайте пользователя</h1>
                <SocialContainer/>
                <span>или используй свою почту для входа</span>
                <input type="text" placeholder="Имя пользователя" onChange={(e) => handleChangeUsername(e)}></input>

                <input type="email" placeholder="Почта"
                       onChange={(e) => handleChangeEmail(e)}/>
                { email.error && <small className="error">{email.error}</small>}

                <input type="password" placeholder="Пароль"
                       onChange={(e) => handleChangePassword(e)}/>
                { password.error && <small className="error">{password.error}</small>}

                <input type="password" placeholder="Повтор пароля"
                           onChange={(e) => handleChangePassword2(e)}/>
                    { password2.error && <small className="error">{password2.error}</small>}

                <button id="button_signup" type="submit">Зарегистрировать</button>
            </form>
            break
    }
    return content!
}