import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot} from "@fortawesome/free-solid-svg-icons";
import {Button, Container, ListGroup} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import styles from "./styles.module.css";
import React from "react";

interface PositionProps {
    position: string
}

interface SearchItemProps {
    item:any,
    setShowSearch:any,
    setMarkerList:any
}

function Position(props:PositionProps) {
    const {position} = props
    return (
        <span className='text-start'><FontAwesomeIcon icon={faLocationDot} />
            <span className='ps-1'>{position}</span>
        </span>
    );
}

export const SearchItem = (props:SearchItemProps) => {
    const {item, setShowSearch, setMarkerList} = props
    const handleClickResult = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

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
                        <Position position={item.GeoObject.Point.pos}></Position>
                    </Row>
                </Container>
            </Button>
            </div>
        </ListGroup.Item>
    )
}
