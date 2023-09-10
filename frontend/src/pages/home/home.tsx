import React, {useContext, useEffect, useState} from "react";
import {Navigationbar} from "../../components";
import styles from './styles.module.css'
import { Map } from "../../components/Map";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, Container, Form, InputGroup, ListGroup} from "react-bootstrap";
import {faLocationDot, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Row from "react-bootstrap/Row";
import { useMap } from "react-leaflet";

function Position({pos}:{pos:string}) {
    // @ts-ignore
    return (<span className='text-start'><FontAwesomeIcon icon={faLocationDot} flip /><span className='ps-1'>{pos}</span></span>);
}

const SearchItem = ({item, setShowSearch, setMarkerList}:{item:any, setShowSearch:any, setMarkerList:any}) => {
    const handleClickResult = (e:any) => {

        item['latlng'] = {
            'lng': parseFloat(item.GeoObject.Point.pos.split(' ')[0]),
            'lat': parseFloat(item.GeoObject.Point.pos.split(' ')[1]),
        }
        setShowSearch(false)
        // @ts-ignore
        setMarkerList(prev => ([...prev,item]))
    }
    return (
        <ListGroup.Item className='p-1'>
            <div className="d-grid gap-2">
            <Button variant='outline-secondary' size='sm' onClick={(e)=>handleClickResult(e)}>
                <Container >
                    <Row className={styles.name}>
                        {item.GeoObject.name}
                    </Row>
                    <Row className={styles.description}>
                        {item.GeoObject.description ? item.GeoObject.description : 'Нет описания'}
                    </Row>
                    <Row className={styles.position}>
                        <Position pos={item.GeoObject.Point.pos}></Position>
                    </Row>
                </Container>
            </Button>
            </div>
        </ListGroup.Item>
    )
}

export const Home = () => {
    const [showSearch, setShowSearch] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')
    const [featureMember, setFeatureMember] = useState<any>()
    const [markerList, setMarkerList] = useState<[]>([])

    const handleChange = (e: any): void => {
        setSearch(e.currentTarget.value)
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

    return (
        <>
            <Navigationbar setShowSearch={setShowSearch}/>
            <Map setShowSearch={setShowSearch} markerList={markerList} setMarkerList={setMarkerList}/>
            {showSearch &&
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
                                    (item:any, index:number) => (
                                        <SearchItem key={index}
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
            }
        </>
    )
}