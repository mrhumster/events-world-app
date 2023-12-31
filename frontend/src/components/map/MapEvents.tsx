import {useMapEvent} from "react-leaflet";
import React from "react";
import {MarkerIFace} from "./Map";


interface MapEventsProps {
    setShowSearch: React.Dispatch<React.SetStateAction<boolean>>,
    setMarkerList: React.Dispatch<React.SetStateAction<MarkerIFace[] | undefined>>
}


export function MapEvents(props:MapEventsProps) {
    const {setShowSearch, setMarkerList} = props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const clickHandler = useMapEvent('click', (e) => {
       setShowSearch(false)
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const doubleClickHandler = useMapEvent('dblclick', (e) => {

        const item:MarkerIFace = {'latlng': {'lat': e.latlng.lat, 'lng': e.latlng.lng}}

        setMarkerList((prev:MarkerIFace[] | undefined) => {
            if (prev) {return [...prev, item]}
            return [item]
        })
    })

  return null
}