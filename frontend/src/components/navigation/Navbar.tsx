import React from "react";
import {Navbar, Container, NavDropdown, Nav, Button, Card} from "react-bootstrap";

import {useLocation, useNavigate} from "react-router-dom";
import {getUser} from '../../hooks';
import {SearchInput} from '../search/'

import {faCloud} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser} from "@fortawesome/free-regular-svg-icons";
import styles from "./styles.module.css";

interface NavigationbarProps {
    setShowSearch?:React.Dispatch<React.SetStateAction<boolean>>
}

export function Navigationbar(props:NavigationbarProps) {
    const {setShowSearch} = props
    const navigate = useNavigate();
    const location = useLocation();
    const user = getUser();

    if (user === null) {
        return (<></>)
    }

    const handleLogout = () => {
        localStorage.removeItem("auth")
        navigate("/login/")
    }

    const isThisPath = (pathname:string) => {
        return location.pathname.match(`^${pathname}$`)
    }


    return (
        <Navbar bg="white" variant="pills" className="shadow-lg">
            <Container className="d-flex">
                <Navbar.Brand href="/">
                    <FontAwesomeIcon icon={faCloud} style={{color: "var(--bs-blue)",}} />{' '}
                    <span className="navbar-brand fw-light text-primary ms-2 text-uppercase" id="logo">Чистый воздух</span>
                </Navbar.Brand>
                <Nav>
                    {isThisPath('/') ? <Nav.Link active href='/'>Карта</Nav.Link> : <Nav.Link href='/'>Карта</Nav.Link>}
                    {isThisPath('/about') ? <Nav.Link active href='/about'>О сервисе</Nav.Link> : <Nav.Link href='/about'>О сервисе</Nav.Link>}
                </Nav>
                { isThisPath('/') ? <SearchInput setShowSearch={setShowSearch} /> : <></>}
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <NavDropdown className="me-5" menuVariant="light"
                            title={
                            <Button size="sm" variant="link" className="text-uppercase link-dark text-decoration-none link-offset-3">
                                <FontAwesomeIcon icon={faCircleUser} size='xl' />{' '}{user.username}
                            </Button>}>
                                <Container>
                                    <Card className="text-center">
                                        <Card.Body>
                                            <div><FontAwesomeIcon icon={faCircleUser} size='2xl' style={{color: "#404040"}}/></div>
                                            <Nav.Link className="inline" href={'mailto:'+user.email}>{user.email}</Nav.Link>
                                        </Card.Body>
                                    </Card>
                                </Container>

                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <div className="d-grid gap-2">
                                <Button variant='outline-danger' size='sm' onClick={handleLogout}>Выйти</Button>
                                </div>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}