import React from "react";
import styles from './styles.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTelegram, faGithub, faVk} from "@fortawesome/free-brands-svg-icons";

export const SocialContainer = () => {
    return(
        <div className={styles.social_container}>
            <a href="https://t.me/XOMRKOB" className={styles.social}><FontAwesomeIcon icon={faTelegram} size='2x'/></a>
            <a href="https://github.com/mrhumster" className={styles.social}><FontAwesomeIcon icon={faGithub} size='2x'/></a>
            <a href="https://vk.com/xomrkob" className={styles.social}><FontAwesomeIcon icon={faVk} size='2x'/></a>
        </div>
    )
}