import React from "react";
import './styles.css'

export const Button = ({ text }:{text: string}) => {
    return(
        <button>{text}</button>
    )
}