import styles from "./styles.module.css";
import {Card, Form, InputGroup, ListGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";
import {SearchItem} from "./SearchItem";
import L from "leaflet";
import {MarkerIFace} from "../map";

interface ResponseIFace {
    response: {
        GeoObjectCollection?: {
            futureMember?: [FeatureMemberItemIFace],
            metaDataProperty?: {
                GeocoderResponseMetaData?: {
                    found?: string,
                    request?: string,
                    results?: string,
                    boundedBy?: {
                        Envelope?: {
                            lowerCorner?: string,
                            upperCorner?: string
                        }
                    }
                }
            }
        }
    }
}

export interface FeatureMemberItemIFace {
    GeoObject: {
        Point: {
            pos: string
        },
        boundedBy?: {
            Envelope?: {
                loweCorner?: string,
                upperCorner?: string
            },
            description?: string | undefined
        },
        metaDataProperty?: {
            GeocoderMetaData?: {
                precision?: string,
                text?: string,
                kind?: string,
                Address?: {
                    country_code?: string,
                    formatted?: string
                    Components?: [
                        {
                            kind?: string,
                            name?: string
                        }
                    ]
                },
                AddressDetails?: {
                    Country?: {
                        AddressLine?: string,
                        CountryName?: string,
                        CountryNameCode?: string,
                        AdministrativeArea?: {
                            AdministrativeAreaName?: string
                        }
                    }
                }
            }
        },
        name?: string,
        uri?: string
        description?: string | undefined
    },
    latlng?: L.LatLngLiteral
}

interface SearchResultProps {
    featureMember: FeatureMemberItemIFace[] | undefined,
    setFeatureMember: React.Dispatch<React.SetStateAction<FeatureMemberItemIFace[] | undefined>>,
    setShowSearch: React.Dispatch<React.SetStateAction<boolean>>,
    setMarkerList: React.Dispatch<React.SetStateAction<MarkerIFace[] | undefined>>
}

export const SearchResult = (props:SearchResultProps) => {
    const {featureMember, setFeatureMember, setShowSearch, setMarkerList} = props
    const [search, setSearch] = useState<string>('')
    const handleChange = (e: any): void => {
        setSearch(e.currentTarget.value)
    }

    async function getLatLng(place: string): Promise<ResponseIFace | unknown> {
        const API_KEY_YANDEX = '85eaff1b-ef9e-4c11-89bc-ca01d1ae43de'
        const API_URL_GEO_DATA = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY_YANDEX}&geocode=${place}&format=json`
        const response = await fetch(API_URL_GEO_DATA)
        const data = await response.json()
        return data as Promise<ResponseIFace>
    }


    useEffect((): void => {
        setFeatureMember([])
        if (search.length > 0) {
            getLatLng(search)
                .then((data:any) => {
                    if (data) {
                        const fm:FeatureMemberItemIFace[] = data['response']['GeoObjectCollection']['featureMember']
                        setFeatureMember(fm)
                    }
                })

        }
    }, [search])

    return (
        <div className={[styles.search_result, 'shadow-lg'].join(' ')}>
            <Card>
                <Card.Header>
                    <InputGroup>
                        <InputGroup.Text id="btnGroupAddon"><FontAwesomeIcon
                            icon={faMagnifyingGlass}/></InputGroup.Text>
                        <Form.Control
                            autoFocus
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