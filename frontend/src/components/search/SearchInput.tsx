import React from "react";
import styles from "./styles.module.css";
import {Button, Container} from "react-bootstrap";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useHotkeys} from "react-hotkeys-hook";

interface SearchInputProps {
    setShowSearch:any
}

export const SearchInput = (props:SearchInputProps) => {
    const {setShowSearch} = props
    const handleClick = () => {setShowSearch(true)}
    useHotkeys('ctrl+k', () => setShowSearch(true), { preventDefault: true })

    return (
        <Button variant="outline-primary" className="ms-3 rounded-5" onClick={handleClick}>
            <Container className="d-flex align-items-center justify-content-center px-0">
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
            <span className={styles.search_button_text}>Поиск</span>
            <kbd className="bg-primary mx-1">Ctrl</kbd><kbd className="bg-primary">K</kbd>
            </Container>
        </Button>

    )
}