import React, {useEffect, useState} from "react";
import {Navigationbar, SearchResult, Toaster} from "../../components";
import { Map } from "../../components";
import 'bootstrap/dist/css/bootstrap.min.css';
import {MarkerIFace} from "../../components/map";
import { FeatureMemberItemIFace } from "../../types";
import {useGetUserDataQuery} from "../../services/backend";
import {getUser} from "../../hooks";
import logger from "../../logger/logger";


export const MapPage = () => {
    const [showSearch, setShowSearch] = useState<boolean>(false)
    const [featureMember, setFeatureMember] = useState<FeatureMemberItemIFace[]>()
    const [markerList, setMarkerList] = useState<MarkerIFace[] | undefined>()
    const UserData = useGetUserDataQuery({})
    const current_theme = UserData.data?.data[0].theme

    const user = getUser()
    useEffect(() => {
        logger.log(`${user?.username} открыл страницу "Карта"`)
    }, [])

    useEffect(() => {
        if (!showSearch) {
            setFeatureMember(undefined)
        }
    }, [showSearch])

    return (
        <div className={current_theme}>
            <Navigationbar setShowSearch={setShowSearch}/>
            <Map setShowSearch={setShowSearch} markerList={markerList} setMarkerList={setMarkerList}/>
            {showSearch && <SearchResult featureMember={featureMember} setFeatureMember={setFeatureMember} setShowSearch={setShowSearch} setMarkerList={setMarkerList} />}
            <Toaster />
        </div>
    )
}