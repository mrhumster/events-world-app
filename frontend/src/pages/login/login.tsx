import React, {useState} from "react";
import styles from './login.module.css';
import {Form} from "../../components/form";

export const Login = () => {
    const [rightPanelActive, setRightPanelActive] = useState(false)
    const setClassRightPanelActive = () => {
        if (rightPanelActive) {
            return styles.right_panel_active
        }
    }
    const onClickSignInHandler = () => {
        setRightPanelActive(prevState => !prevState)
    }
    return(
        <div className={styles.login_page}>
            <div className={[styles.container, setClassRightPanelActive()].join(' ')} id="container">
                <div className={[styles.form_container, styles.sign_up_container].join(' ')}>
                    <Form action="#" type="signup"></Form>
                </div>
                <div className={[styles.form_container, styles.sign_in_container].join(' ')}>
                    <Form action="#" type="login"></Form>
                </div>
                <div className={styles.overlay_container}>
                    <div className={styles.overlay}>
                        <div className={[styles.overlay_panel, styles.overlay_left].join(' ')}>
                            <h1>Добро пожаловать!</h1>
                            <p>Чтобы оставаться на связи с нами, пожалуйста, войдите</p>
                            <button className={styles.ghost} id="signIn" onClick={onClickSignInHandler}>Войти</button>
                        </div>
                        <div className={[styles.overlay_panel, styles.overlay_right].join(' ')}>
                            <h1>Привет, друг!</h1>
                            <p>Введите свои личные данные и начните путешествие вместе с нами</p>
                            <button className={styles.ghost} id="signUp" onClick={onClickSignInHandler}>Регистрация</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
