import {Marker, Popup} from "react-leaflet";
import {Statistic} from "./Statistic";
import React, {useEffect, useRef} from "react";
import L from "leaflet";
import {useGetUserDataQuery} from "../../services/backend";
import {useMap} from "usehooks-ts";

const icon: L.Icon<L.IconOptions> = L.icon({
        iconUrl: require('../../images/pin_red.png'),
        iconSize: [40, 40],
        iconAnchor: [10, 32],
        popupAnchor: [0, -20],
    })

export const MarkerComponent = (props: any) => {
    const { marker } = props
    const markerRef = useRef(null)
    const UserData = useGetUserDataQuery({})
    const current_theme = UserData.data?.data[0].theme
    useMap();
    useEffect(() => {
        const marker = markerRef.current
        if (marker) {
            // @ts-ignore
            marker.openPopup()
        }
    }, [markerRef])

    useEffect(() => {
        const marker = markerRef.current
        if (marker) {
            // @ts-ignore
            const popup = marker.getPopup()
            // @ts-ignore
            const popupElement = popup.getElement();
            // @ts-ignore
            popupElement.classList.remove('dark', 'light')
            popupElement.classList.add(current_theme)
        }

    }, [current_theme])


    return (
        <Marker position={marker.latlng} icon={icon} ref={markerRef}>
            <Popup className={current_theme}>
                <Statistic object={marker}/>
            </Popup>
        </Marker>
    )
}