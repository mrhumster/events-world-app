import React, {useState} from "react";
import './styles.css'
import {Form} from "../../components/form";
import {Overlay} from "../../components/overlay"

export const Login = () => {
    const [rightPanelActive, setRightPanelActive] = useState(false)
    return(
        <div>
            <div className={`container ${rightPanelActive ? 'right-panel-active' : ''}`} id="container">
                <div className="form-container sign-up-container">
                    <Form action="#" type="signup"></Form>
                </div>
                <div className="form-container sign-in-container">
                    <Form action="#" type="login"></Form>
                </div>
                <div className="overlay-container">
                    <Overlay active={rightPanelActive} setActive={setRightPanelActive}></Overlay>
                </div>
            </div>
        </div>
    )
}

export default Login