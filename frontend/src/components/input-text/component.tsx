import React from 'react'
import './styles.css'

export const InputText = ({type = 'text', placeholder} : {type: string, placeholder?: string}) => {

    return (
        <input className='InputText' type={type} placeholder={placeholder}/>
    )
}