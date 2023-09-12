import React, {useEffect, useState} from "react";
import styles from '../../pages/login/styles.module.css'
import component from './styles.module.css'
import {SocialContainer} from "../social";
import { useUserActions } from "../../hooks"
import {ToasterIFace} from "../../pages/login";

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
    toast: ToasterIFace
}

export const HomeForm = (props: FormProps) => {
    const {action, type, toast} = props
    const [email, setEmail] = useState<ValidateString>({value: '', error: ''})
    const [username, setUsername] = useState<ValidateString>({value: '', error: ''})
    const [password, setPassword] = useState<ValidateString>({value: '', error: ''})
    const [password2, setPassword2] = useState<ValidateString>({value: '', error: ''})

    const userActions = useUserActions();

    const handleError = (err:any) => {
        if (err.response.status === 401) {
            toast.setToastMessage(err.response.data.detail)
        } else if (err.response.status === 502) {
            toast.setToastMessage('Похоже произошла ошибка. Свяжитесь с администратором')
        }
        toast.setToastTitle('Ошибка')
        toast.setToastType('danger')
        toast.setShowToast(true)
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
                userActions.login(data).catch((err) => {
                    if (err.message) {
                        handleError(err)
                    }
                });

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
        return password2.value === password.value
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
                           onChange={(e) => handleChangeUsername(e)}/>
                    <small className={component.error}>{username.error}</small>

                    <input className={component.login_form} type="password" placeholder="Пароль"
                           onChange={(e) => handleChangePassword(e)}/>
                    <small className={component.error}>{password.error}</small>

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
                       onChange={(e) => handleChangeUsername(e)}></input>
                <small className={component.error}>{username.error}</small>

                <input className={component.login_form} type="email" placeholder="Почта"
                       onChange={(e) => handleChangeEmail(e)}/>
                <small className={component.error}>{email.error}</small>

                <input className={component.login_form} type="password" placeholder="Пароль"
                       onChange={(e) => handleChangePassword(e)}/>
                <small className={component.error}>{password.error}</small>

                <input className={component.login_form} type="password" placeholder="Повтор пароля"
                           onChange={(e) => handleChangePassword2(e)}/>
                    <small className={component.error}>{password2.error}</small>

                <button className={styles.loging_form} id="button_signup" type="submit">Зарегистрировать</button>
            </form>
            break
    }
    return content!
}