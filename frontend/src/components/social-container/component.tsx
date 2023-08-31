import React from "react";
import './styles.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFaceDizzy, faFaceGrin, faFaceKiss} from "@fortawesome/free-solid-svg-icons";
import {faFacebook, faLinkedin, faGooglePlus} from "@fortawesome/free-brands-svg-icons";

export const SocialContainer = () => {
    return(
        <div className="social-container">
            <a href="#" className="social"><FontAwesomeIcon icon={faFacebook} size='2x'/></a>
            <a href="#" className="social"><FontAwesomeIcon icon={faLinkedin} size='2x'/></a>
            <a href="#" className="social"><FontAwesomeIcon icon={faGooglePlus} size='2x'/></a>
        </div>
    )
}