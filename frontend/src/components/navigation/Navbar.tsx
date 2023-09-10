import React from "react";
import {Navbar, Container, NavDropdown, Nav, Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import logo from "../../images/logo-without-text-blue.png"
import {getUser} from '../../hooks';
import {SearchInput} from '../search/'
import {faWind} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function Navigationbar({setShowSearch}:{setShowSearch?:any}) {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("auth")
        navigate("/login/")
    }
    const user = getUser();

    let search_input

    if (window.location.pathname === '/') {
        search_input = <SearchInput setShowSearch={setShowSearch} />
    }

    return (
        <Navbar bg="white" variant="pills" className="shadow-lg py-0">
            <Container>
                <Navbar.Brand href="/">
                    <FontAwesomeIcon icon={faWind} beatFade style={{color: "#7382f2",}} />{' '}
                    <span className="navbar-brand fw-light text-primary ms-2 text-uppercase" id="logo">Ветерок</span>
                </Navbar.Brand>
                <Nav>
                    <Nav.Link href='/'>
                        Карта
                    </Nav.Link>
                    <Nav.Link href='/about'>
                        О сервисе
                    </Nav.Link>
                </Nav>
                { search_input }
                <Navbar.Collapse
                    className="justify-content-end">
                    <Nav>
                        <NavDropdown
                            menuVariant="light"
                            title={<Button size="sm" variant="link" className="text-uppercase link-offset-3">{user.username}</Button>}>
                            <NavDropdown.Item onClick={handleLogout}>
                                Выйти
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}