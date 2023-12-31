import React, {useEffect} from "react";
import styles from "./styles.module.css";
import {Button, Container} from "react-bootstrap";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useHotkeys} from "react-hotkeys-hook";
import logger from "../../logger/logger";
import {getUser} from "../../hooks";

interface SearchInputProps {
    setShowSearch: React.Dispatch<React.SetStateAction<boolean>>
}

export const SearchInput = (props:SearchInputProps) => {
    const {setShowSearch} = props
    const user = getUser()
    const handleClick = () => {
        logger.log(`${user?.username} нажал на кнопку поиска`)
        setShowSearch(true)}
    useHotkeys('ctrl+k', () => {
        logger.log(`${user?.username} открыл поиск сочетанием ctrl+k`)
        setShowSearch(true)
    }, { preventDefault: true })

    return (
        <div className="flex-fill">
        <Button variant="outline-primary" className="rounded-5" onClick={handleClick} data-cy="searchButton">
            <Container className="d-flex align-items-center justify-content-center px-0">
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
            <span className={styles.search_button_text}>Поиск</span>
            <kbd className="bg-primary mx-1">Ctrl</kbd><kbd className="bg-primary">K</kbd>
            </Container>
        </Button>
        </div>
    )
}