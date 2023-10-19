import styles from "./styles.module.css";
import {Card, Form, InputGroup, ListGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faSpinner, faXmark} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";
import {SearchItem} from "./SearchItem";
import {MarkerIFace} from "../map";
import {useGetLatLngQuery} from "../../services/geocode";
import { useDebounce } from 'usehooks-ts'
import {FeatureMemberItemIFace} from "../../types";
import { HistoryList } from "./HistoryList";
import { motion } from "framer-motion"
import {GeoObjectCollectionIFace} from "../../types/ResponseType";


interface SearchResultProps {
    featureMember: FeatureMemberItemIFace[] | undefined,
    setFeatureMember: React.Dispatch<React.SetStateAction<FeatureMemberItemIFace[] | undefined>>,
    setShowSearch: React.Dispatch<React.SetStateAction<boolean>>,
    setMarkerList: React.Dispatch<React.SetStateAction<MarkerIFace[] | undefined>>
}

export const SearchResult = (props:SearchResultProps) => {
    const {
        featureMember,
        setFeatureMember,
        setShowSearch,
        setMarkerList,
    } = props
    const [search, setSearch] = useState<string>('')
    const debouncedSearch = useDebounce<string>(search, 400)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearch(e.currentTarget.value)
    }
    const {data, isLoading} = useGetLatLngQuery(debouncedSearch, {skip: debouncedSearch === ''})


    useEffect(() => {
        if (search.length === 0) {
            setFeatureMember(undefined)
        }
    }, [search, setFeatureMember])

    useEffect(() => {
        if (data) {
            const fm: GeoObjectCollectionIFace = data.response.GeoObjectCollection
            setFeatureMember(fm.featureMember)
        }
    }, [data, setFeatureMember])

    const handlerDeleteQuery = () => {
        setSearch('')
    }


    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.1, y: -200, x: -150 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            transition={{ duration: 0.2 }}
            className={[styles.search_result, 'shadow-lg'].join(' ')}>
            <Card>
                <Card.Header>
                    <InputGroup>
                        <InputGroup.Text id="btnGroupAddon">
                            {isLoading ? <FontAwesomeIcon icon={faSpinner} spinPulse/> :
                                <FontAwesomeIcon icon={faMagnifyingGlass}/>}
                        </InputGroup.Text>
                        <Form.Control
                            autoFocus
                            type="text"
                            placeholder="Поиск"
                            aria-label="Search group"
                            aria-describedby="btnGroupAddon"
                            onChange={handleChange}
                            value={search}
                        />
                        <button className={styles.innerBtn} onClick={handlerDeleteQuery}><FontAwesomeIcon
                            icon={faXmark}/></button>
                    </InputGroup>
                </Card.Header>
                <Card.Body className={styles.search_body}>
                    {!featureMember && <HistoryList setSearch={setSearch}/>}

                    <ListGroup id="list_group" variant='flush'>
                        {featureMember && featureMember.map(
                            (item: FeatureMemberItemIFace, index: number) => (
                                <SearchItem
                                    key={index}
                                    item={item}
                                    setShowSearch={setShowSearch}
                                    setMarkerList={setMarkerList}
                                    query={search}
                                />
                            )
                        )}
                    </ListGroup>
                </Card.Body>
            </Card>
        </motion.div>
    )
}