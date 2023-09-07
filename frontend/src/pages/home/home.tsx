import React from "react";
import {Navigationbar} from "../../components";
import styles from './styles.module.css'
import { Map } from "../../components/Map";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Home = () => {
    return(
        <>
            <Navigationbar></Navigationbar>
            <Map />
        </>
    )
}