import styles from "./styles.module.css";
import {Card, Form, InputGroup, ListGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faSpinner} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";
import {SearchItem} from "./SearchItem";
import {MarkerIFace} from "../map";
import {useGetLatLngQuery} from "../../services/geocode";
import { useDebounce } from 'usehooks-ts'
import {FeatureMemberItemIFace} from "../../types";
import { HistoryList } from "./HistoryList";
import {useAddHistoryItemMutation} from "../../services/backend";
import {getUser} from "../../hooks";



interface SearchResultProps {
    featureMember: FeatureMemberItemIFace[] | undefined,
    setFeatureMember: React.Dispatch<React.SetStateAction<FeatureMemberItemIFace[] | undefined>>,
    setShowSearch: React.Dispatch<React.SetStateAction<boolean>>,
    setMarkerList: React.Dispatch<React.SetStateAction<MarkerIFace[] | undefined>>
}

export const SearchResult = (props:SearchResultProps) => {
    const {featureMember, setFeatureMember, setShowSearch, setMarkerList} = props
    const [search, setSearch] = useState<string>('')
    const debouncedSearch = useDebounce<string>(search, 400)
    const handleChange = (e: any): void => {
        setSearch(e.currentTarget.value)
    }
    const { data, error, isLoading } = useGetLatLngQuery(debouncedSearch, { skip: debouncedSearch === ''})

    useEffect(() => {
        if (search.length === 0) {
            setFeatureMember(undefined)
        }
    }, [search, setFeatureMember])

    useEffect(()=> {
        if (data) {
            const fm: any = data['response']['GeoObjectCollection']
            setFeatureMember(fm.featureMember)
        }
    }, [data, setFeatureMember])

    useEffect(()=>{
        if (error) {
            console.log('Query error: ',error)
        }
    }, [error])


    return (
        <div className={[styles.search_result, 'shadow-lg'].join(' ')}>
            <Card>
                <Card.Header>
                    <InputGroup>
                        <InputGroup.Text id="btnGroupAddon">
                            {isLoading? <FontAwesomeIcon icon={faSpinner} spinPulse />:<FontAwesomeIcon icon={faMagnifyingGlass}/>}
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
                    </InputGroup>
                </Card.Header>
                <Card.Body className={styles.search_body}>
                    {!featureMember && <HistoryList setSearch={setSearch} />}

                    <ListGroup id="list_group" variant='flush'>
                        {featureMember && featureMember.map(
                            (item: any, index: number) => (
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
        </div>
    )
}