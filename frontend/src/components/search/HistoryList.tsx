import { ListGroup } from "react-bootstrap"
import { getUser } from "../../hooks";
import {useGetHistoryByNameQuery} from "../../services/backend";
import {HistoryItem} from "./HistoryItem";
import React from "react";
import {HistoryIFace} from "../../types/HistoryType";

interface HistoryListPropsIFace {
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export const HistoryList = (props: HistoryListPropsIFace) => {
    const { setSearch } = props
    const user = getUser()
    const { data } = useGetHistoryByNameQuery(user?.username)
    return (
        <ListGroup id="list_group" variant='flush'>
            {data && data.items.map((item: HistoryIFace, index: number) => (
                <HistoryItem key={index} item={ item } setSearch={ setSearch }/>
            ))}
        </ListGroup>
    )
}