import React, {useEffect, useState} from "react";
import styles from '../../pages/login/styles.module.css'
import component from './styles.module.css'
import {SocialContainer} from "../social";
import { useUserActions } from "../../hooks"
import {showToast} from "../../services/toastSlice";
import {useDispatch} from "react-redux";
import {ResponseError} from "../../types/ResponseType";

export interface ValidateString {
    value: string;
    error: string;
}
export enum FormType {
    login = 'login',
    signup = 'signup'
}

interface FormProps {
    action: string,
    type: FormType,
}

export const HomeForm = (props: FormProps) => {
    const {action, type} = props
    const [email, setEmail] = useState<ValidateString>({value: '', error: ''})
    const [username, setUsername] = useState<ValidateString>({value: '', error: ''})
    const [password, setPassword] = useState<ValidateString>({value: '', error: ''})
    const [password2, setPassword2] = useState<ValidateString>({value: '', error: ''})
    const dispatch = useDispatch()
    const userActions = useUserActions();

    const handleError = (err: ResponseError) => {
        let text
        if (err.response && 'status' in err.response) {
            if (err.response.status === 401) {
                text = err.response.data.detail
            } else if (err.response.status === 502) {
                text = 'Похоже произошла ошибка. Свяжитесь с администратором'
            } else if (err.response.status === 422) {
                text = err.response.data.detail
            }
            dispatch(showToast({
                show: true,
                title: 'Ошибка',
                text: text,
                type: 'danger'
            }))
        }
        return false
    }

    const handleSubmit = (event:  React.FormEvent) => {
        event.preventDefault()
        if (type === FormType.login) {
            if (!username.error && !password.error) {
                const data = {
                    username: username.value,
                    password: password.value,
                };
                userActions.login(data).then();

            }
        } else if (type === FormType.signup) {
            if (!email.error && !password.error && !password2.error && !username.error) {
                const data = {
                    username: username.value,
                    password: password.value,
                    email: email.value
                };
                userActions.register(data).catch((err) => {
                    if (err.message) {
                        handleError(err)
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
        return email.value.match(/^([a-zA-Z0-9_-]+)(@)([a-zA-Z0-9_-]+)\.([a-zA-Z]{2,})$/);
    }

    const validatePassword = (password: ValidateString) => {
        return password.value.match(/^[a-z]+$/)
    }

    const validatePassword2 = (password2: ValidateString) => {
        return password2.value === password.value && password2
    }

    const validateUsername = (username: ValidateString) => {
        return username.value.match(/^[a-zA-Z0-9]+$/)
    }

    useEffect(():void => {
        if (!validatePassword(password) && !password.error) {
            setPassword(pervState => {
                return {
                    ...pervState,
                    error: 'Только латинские буквы в нижнем регистре'
                }
            })
        }
    }, [password, password2])

    useEffect(():void => {
        if (!validatePassword2(password2) && !password2.error) {
            setPassword2(pervState => {
                return {
                    ...pervState,
                    error: 'Пароль не совпадает'
                }
            })
        }
    }, [password, password2])

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

    useEffect(():void => {
        if (!validateUsername(username) && !username.error) {
            setUsername(pervState => {
                return {
                    ...pervState,
                    error: 'Только латинские буквы и цифры'
                }
            })
        }
    }, [username])

    let content: JSX.Element
    switch (type) {
        case FormType.login:
            content =
                <form className={[component.login_form, type].join(' ')} action={action} onSubmit={handleSubmit}>
                    <h1>Вход</h1>
                    <SocialContainer/>
                    <span>или зарегистрируй свой аккаунт</span>

                    <input className={component.login_form} type="text" placeholder="Имя пользователя"
                           data-cy="loginUserName"
                           onChange={(e) => handleChangeUsername(e)}/>
                    <small className={component.error} data-cy="loginUserNameFeedBack">{username.error}</small>

                    <input className={component.login_form} type="password" placeholder="Пароль"
                           data-cy="loginPassword"
                           onChange={(e) => handleChangePassword(e)}/>
                    <small className={component.error} data-cy="loginPasswordFeedBack">{password.error}</small>

                    <a className={component.login_form} href="#">Забыли пароль</a>
                    <button className={styles.loging_form} id="button_login" type="submit">Войти</button>
                </form>
            break
        case FormType.signup:
            content = <form className={[component.login_form,type].join(' ')} action={action} onSubmit={handleSubmit}>
                <h1>Создайте пользователя</h1>
                <SocialContainer/>
                <span>или используй свою почту для входа</span>
                <input className={component.login_form} type="text" placeholder="Имя пользователя"
                       data-cy="registerUserName"
                       onChange={(e) => handleChangeUsername(e)}></input>
                <small className={component.error} data-cy="registerUserNameFeedBack">{username.error}</small>

                <input className={component.login_form} type="email" placeholder="Почта"
                       data-cy="registerEmail"
                       onChange={(e) => handleChangeEmail(e)}/>
                <small className={component.error} data-cy="registerEmailFeedBack">{email.error}</small>

                <input className={component.login_form} type="password" placeholder="Пароль"
                       data-cy="registerPassword"
                       onChange={(e) => handleChangePassword(e)}/>
                <small className={component.error} data-cy="registerPasswordFeedBack">{password.error}</small>

                <input className={component.login_form} type="password" placeholder="Повтор пароля"
                       data-cy="registerRePassword"
                       onChange={(e) => handleChangePassword2(e)}/>
                    <small className={component.error} data-cy="registerRePasswordFeedBack">{password2.error}</small>

                <button className={styles.loging_form} id="button_signup" data-cy="registerSubmit" type="submit">Зарегистрировать</button>
            </form>
            break
    }
    return content!
}