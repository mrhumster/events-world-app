import React from "react";
import styles from "./styles.module.css";
import {Button} from "react-bootstrap";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface SearchInputProps {
    setShowSearch:any
}

export const SearchInput = (props:SearchInputProps) => {
    const {setShowSearch} = props
    const handleClick = () => {
        setShowSearch(true)
    }
    return (
        <Button variant="outline-primary" className="rounded-5 ms-5" onClick={handleClick}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <span className={styles.search_button_text}>Поиск</span>
        </Button>

    )
}