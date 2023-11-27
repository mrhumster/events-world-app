import React, {useState} from "react";
import {FormType, HomeForm, Toaster } from "../../components";
import logger from '../../logger/logger';

import styles from './styles.module.css';

export interface ToasterIFace {
    setToastTitle: React.Dispatch<React.SetStateAction<string>>,
    setToastMessage: React.Dispatch<React.SetStateAction<string>>,
    setToastType: React.Dispatch<React.SetStateAction<string>>,
    setShowToast: React.Dispatch<React.SetStateAction<boolean>>
}

export const Login = () => {
    const [rightPanelActive, setRightPanelActive] = useState(false)

    const setClassRightPanelActive = () => {
        if (rightPanelActive) {
            return styles.right_panel_active
        }
    }
    const onClickSignInHandler = () => {
        setRightPanelActive(prevState => !prevState)
        logger.log('Button clicked');
    }
    return(
        <div className={styles.login_page}>
            <div className={[styles.container, setClassRightPanelActive()].join(' ')} id="container">
                <div className={[styles.form_container, styles.sign_up_container].join(' ')}>
                    <HomeForm action="#" type={FormType.signup}></HomeForm>
                </div>
                <div className={[styles.form_container, styles.sign_in_container].join(' ')}>
                    <HomeForm action="#" type={FormType.login}></HomeForm>
                </div>
                <div className={styles.overlay_container}>
                    <div className={styles.overlay}>
                        <div className={[styles.overlay_panel, styles.overlay_left].join(' ')}>
                            <h1>Добро пожаловать!</h1>
                            <p>Чтобы оставаться на связи с нами, пожалуйста, войдите</p>
                            <button className={[styles.ghost, styles.loging_form].join(' ')} id="signIn" onClick={onClickSignInHandler}>Войти</button>
                        </div>
                        <div className={[styles.overlay_panel, styles.overlay_right].join(' ')}>
                            <h1>Привет, друг!</h1>
                            <p>Введите свои личные данные и начните путешествие вместе с нами</p>
                            <button className={[styles.ghost, styles.loging_form].join(' ')} id="signUp" onClick={onClickSignInHandler}>Регистрация</button>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    )
}
