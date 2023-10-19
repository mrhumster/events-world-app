import React from 'react';
import {Navigationbar} from "../../components";
import {Alert, Container} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import './styles.css'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import {useGetUserDataQuery} from "../../services/backend";

export const PageNotFound = () => {
    const {data} = useGetUserDataQuery({})
    const current_theme = data?.data[0].theme
    return (
        <>
            <Navigationbar></Navigationbar>
            <Container className="pt-5 d-flex justify-content-center" data-bs-theme={current_theme}>
                <Alert className="page_not_found shadow-lg mx-5 mt-5" variant={'danger'}>
                    <Alert.Heading className="text-center fw-light">Страница на которую вы пытаетесь перейти не существует</Alert.Heading>
                    <hr />
                    <div className="d-flex flex-column justify-content-center align-content-center">
                        <h1 className="text-center mt-5"><FontAwesomeIcon icon={faTriangleExclamation} bounce size="2xl" /></h1>
                        <h1 className="text-center mt-3">404</h1>
                    </div>
                </Alert>
            </Container>
        </>
    )
}
