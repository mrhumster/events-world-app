import React from "react";
import {Navbar, NavDropdown, Nav, Button, Card} from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import {useLocation} from "react-router-dom";
import {getUser, useUserActions} from '../../hooks';
import {SearchInput} from '../search/'
import {faCloud, faMoon, faSun} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser} from "@fortawesome/free-regular-svg-icons";
import {useGetUserDataQuery, useUpdateUserMutation} from "../../services/backend";

interface NavigationbarProps {
    setShowSearch? :React.Dispatch<React.SetStateAction<boolean>>
}

export function Navigationbar(props:NavigationbarProps) {
    const {setShowSearch} = props
    const location = useLocation();
    const user = getUser();
    const userAction = useUserActions()
    const [updateUser] = useUpdateUserMutation()
    const {data, refetch} = useGetUserDataQuery({})
    const current_theme = data?.data[0].theme
    const handleLogout = () => userAction.logout()
    const isThisPath = (pathname: string) => location.pathname.match(`^${pathname}$`)

    const handlerChangeTheme = () => {
        updateUser({
            theme: current_theme === 'dark' ? 'light' : 'dark'
        })
        refetch()
    }

    return (
        <Navbar variant="pills" bg={current_theme} className="shadow-lg d-flex flex-row justify-content-around align-items-stretch" data-bs-theme={current_theme}>

                        <Navbar.Brand className="ms-3 ps-5" href="/">
                            <FontAwesomeIcon icon={faCloud} style={{color: "var(--bs-blue)",}}/>{' '}
                            <span className="navbar-brand fw-light text-primary ms-2 text-uppercase" id="logo">Чистый воздух</span>
                        </Navbar.Brand>

                        <Nav className="flex-fill">
                            {isThisPath('/') ? <Nav.Link active href='/'>Карта</Nav.Link> :
                                <Nav.Link href='/'>Карта</Nav.Link>}
                            {isThisPath('/about') ? <Nav.Link active href='/about'>О сервисе</Nav.Link> :
                                <Nav.Link href='/about'>О сервисе</Nav.Link>}
                        </Nav>

                        {isThisPath('/') && setShowSearch ? <SearchInput setShowSearch={setShowSearch}/> : <></>}
                        <div className="flex-fill text-end align-self-center">
                            <Button variant="link" onClick={handlerChangeTheme}>{current_theme === 'light' ?
                                <FontAwesomeIcon icon={faMoon}/> : <FontAwesomeIcon icon={faSun}/>}
                            </Button>
                        </div>


                        <Navbar.Collapse className="flex-fill">
                            <Nav>
                                <NavDropdown menuVariant="light"
                                             title={
                                                 <Button size="sm" variant="link"
                                                         className="text-uppercase text-decoration-none link-offset-3">
                                                     <FontAwesomeIcon icon={faCircleUser}
                                                                      size='xl'/>{' '}{user?.username}
                                                 </Button>}>
                                    <Container>
                                        <Card className="text-center">
                                            <Card.Body>
                                                <div><FontAwesomeIcon icon={faCircleUser} size='2xl'
                                                                      style={{color: "#404040"}}/></div>
                                                <Nav.Link className="inline"
                                                          href={'mailto:' + user?.email}>{user?.email}</Nav.Link>
                                            </Card.Body>
                                        </Card>
                                    </Container>

                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item>
                                        <div className="d-grid gap-2">
                                            <Button variant='outline-danger' size='sm'
                                                    onClick={handleLogout}>Выйти</Button>
                                        </div>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>

        </Navbar>
    )
}