import { ListGroup } from "react-bootstrap"
import { getUser } from "../../hooks";
import {useGetHistoryByNameQuery} from "../../services/backend";
import {HistoryItem} from "./HistoryItem";

export const HistoryList = (props: any) => {
    const { setSearch } = props
    const user = getUser()
    const { data, refetch } = useGetHistoryByNameQuery(user?.username)
    return (
        <ListGroup id="list_group" variant='flush'>
            {data && data.items.map((item: any, index: number) => (
                <HistoryItem key={index} item={ item } setSearch={ setSearch }/>
            ))}
        </ListGroup>
    )
}