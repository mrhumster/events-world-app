import React, {useState} from "react";
import {Navigationbar, SearchResult} from "../../components";
import styles from './styles.module.css'
import { Map } from "../../components";
import 'bootstrap/dist/css/bootstrap.min.css';


export const MapPage = () => {
    const [showSearch, setShowSearch] = useState<boolean>(false)
    const [featureMember, setFeatureMember] = useState<any>()
    const [markerList, setMarkerList] = useState<[]>([])

    return (
        <>
            <Navigationbar setShowSearch={setShowSearch}/>
            <Map setShowSearch={setShowSearch} markerList={markerList} setMarkerList={setMarkerList}/>
            {showSearch && <SearchResult featureMember={featureMember} setFeatureMember={setFeatureMember} setShowSearch={setShowSearch} setMarkerList={setMarkerList} />}
        </>
    )
}