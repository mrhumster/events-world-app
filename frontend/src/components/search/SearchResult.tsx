import styles from "./styles.module.css";
import {
    Card,
    Form,
    InputGroup,
    ListGroup
} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";
import { SearchItem } from "./SearchItem";


interface SearchResultProps {
    featureMember:[],
    setFeatureMember:any,
    setShowSearch:any,
    setMarkerList:any
}

export const SearchResult = (props:SearchResultProps) => {
    const {featureMember, setFeatureMember, setShowSearch, setMarkerList} = props
    const [search, setSearch] = useState<string>('')
    const handleChange = (e: any): void => {
        setSearch(e.currentTarget.value)
    }

    function getLatLng<T>(place: string): Promise<T> {
        const API_KEY_YANDEX = '85eaff1b-ef9e-4c11-89bc-ca01d1ae43de'
        const API_URL_GEO_DATA = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY_YANDEX}&geocode=${place}&format=json`
        return fetch(API_URL_GEO_DATA)
            .then(response => {
                if (!response.ok) {
                    console.log(response)
                }
                return response.json() as Promise<T>
            })
    }

    // @ts-ignore
    useEffect((): void => {
        setFeatureMember([])
        if (search.length > 0) {
            getLatLng(search)
                .then((data) => {
                    // @ts-ignore
                    setFeatureMember(data['response']['GeoObjectCollection']['featureMember'])
                })
        }
    }, [search])

    return (
        <div className={styles.search_result}>
            <Card>
                <Card.Header>
                    <InputGroup>
                        <InputGroup.Text id="btnGroupAddon"><FontAwesomeIcon
                            icon={faMagnifyingGlass}/></InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Поиск"
                            aria-label="Search group"
                            aria-describedby="btnGroupAddon"
                            onChange={handleChange}
                        />
                    </InputGroup>
                </Card.Header>
                <Card.Body className={styles.search_body}>
                    <ListGroup id="list_group" variant='flush'>
                        {featureMember && featureMember.map(
                            (item: any, index: number) => (
                                <SearchItem
                                    key={index}
                                    item={item}
                                    setShowSearch={setShowSearch}
                                    setMarkerList={setMarkerList}
                                />
                            )
                        )}
                    </ListGroup>
                </Card.Body>
            </Card>
        </div>
    )
}