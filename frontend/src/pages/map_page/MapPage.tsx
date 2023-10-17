import React, {useState} from "react";
import {Navigationbar, SearchResult} from "../../components";
import { Map } from "../../components";
import 'bootstrap/dist/css/bootstrap.min.css';
import {MarkerIFace} from "../../components/map";
import { FeatureMemberItemIFace } from "../../types";


export const MapPage = () => {
    const [showSearch, setShowSearch] = useState<boolean>(false)
    const [featureMember, setFeatureMember] = useState<FeatureMemberItemIFace[]>()
    const [markerList, setMarkerList] = useState<MarkerIFace[] | undefined>()

    return (
        <>
            <Navigationbar setShowSearch={setShowSearch}/>
            <Map setShowSearch={setShowSearch} markerList={markerList} setMarkerList={setMarkerList}/>
            {showSearch && <SearchResult featureMember={featureMember} setFeatureMember={setFeatureMember} setShowSearch={setShowSearch} setMarkerList={setMarkerList} />}
        </>
    )
}