import React from "react";
import './styles.css'
import {InputText} from "../input-text";
import {Button} from "../button"
import {SocialContainer} from "../social-container/component";


export const Form = ({action = '#', type = 'login'}:{action: string, type: string}) => {
    let content: JSX.Element
    switch (type) {
        case 'login':
            content =
                <form action={action}>
                    <h1>Вход</h1>
                    <SocialContainer/>
                    <span>или зарегистрируй свой аккаунт</span>
                    <InputText type="email" placeholder="Почта"/>
                    <InputText type="password" placeholder="Пароль"/>
                    <a href="#">Забыли пароль</a>
                    <Button text="Войти" />
                </form>
            break
        case 'signup':
            content = <form action={action}>
                <h1>Создайте пользователя</h1>
                <SocialContainer/>
                <span>или используй свою почту для входа</span>
                <InputText type="text" placeholder="Имя пользователя"></InputText>
                <InputText type="email" placeholder="Почта"/>
                <InputText type="password" placeholder="Пароль"/>
                <Button text="Зарегистрирооватья" />
            </form>
            break
    }
    return content!
}