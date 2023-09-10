import React from "react";
import styles from './styles.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faLinkedin, faGooglePlus} from "@fortawesome/free-brands-svg-icons";

export const SocialContainer = () => {
    return(
        <div className={styles.social_container}>
            <a href="#" className={styles.social}><FontAwesomeIcon icon={faFacebook} size='2x'/></a>
            <a href="#" className={styles.social}><FontAwesomeIcon icon={faLinkedin} size='2x'/></a>
            <a href="#" className={styles.social}><FontAwesomeIcon icon={faGooglePlus} size='2x'/></a>
        </div>
    )
}