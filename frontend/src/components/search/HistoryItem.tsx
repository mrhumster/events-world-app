import {Button, Col, Container, ListGroup, Row} from "react-bootstrap";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faClockRotateLeft, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useDeleteHistoryMutation, useGetHistoryByNameQuery} from "../../services/backend";
import {getUser} from "../../hooks";
import {HistoryIFace} from "../../types/HistoryType";

interface HistoryItemPropsIFace {
    item: HistoryIFace,
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export const HistoryItem = (props: HistoryItemPropsIFace) => {
    const {item, setSearch} = props
    const user = getUser()
    const { refetch } = useGetHistoryByNameQuery(user?.username)
    const [ deleteHistory] = useDeleteHistoryMutation()

    const handlerClick = () => {setSearch(item.query)}

    const handlerDeleteClick = () => {
        deleteHistory({
            username: user?.username,
            query: item.query
        })
        refetch()
    }


    return (
        <ListGroup.Item className='p-1 border rounded mb-1'>
            <div className="d-grid gap-2">
                <Container>
                    <Row className="">
                        <Col sm="1" className="d-flex justify-content-center align-items-center" style={{'cursor': 'pointer'}} onClick={handlerClick}>
                            <FontAwesomeIcon icon={faClockRotateLeft} style={{color: "#404040",}} />
                        </Col>
                        <Col sm="9" className="d-flex justify-content-center align-items-center" style={{'cursor': 'pointer'}} onClick={handlerClick}>
                            <span className="text-secondary text-decoration-none w-100 text-left">{item.query}</span>
                        </Col>
                        <Col sm="2" className="d-flex justify-content-end align-items-center">
                            <Button variant="link" onClick={handlerDeleteClick}>
                                <FontAwesomeIcon icon={faXmark}/>
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </ListGroup.Item>
    )
}