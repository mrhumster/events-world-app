import {useMapEvent} from "react-leaflet";
import React from "react";
import {MarkerIFace} from "./Map";


interface MapEventsProps {
    setShowSearch: React.Dispatch<React.SetStateAction<boolean>>,
    setMarkerList: React.Dispatch<React.SetStateAction<MarkerIFace[] | undefined>>
}


export function MapEvents(props:MapEventsProps) {
    const {setShowSearch, setMarkerList} = props

    const clickHandler = useMapEvent('click', (e) => {
       setShowSearch(false)
    })

    const doubleClickHandler = useMapEvent('dblclick', (e) => {

        let item:MarkerIFace = {'latlng': e.latlng}

        setMarkerList((prev:MarkerIFace[] | undefined) => {
            if (prev) {return [...prev, item]}
        })
    })

  return null
}