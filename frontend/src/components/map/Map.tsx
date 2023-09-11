import React, {useState} from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import styles from './styles.module.css'
import 'leaflet/dist/leaflet.css';
import { MarkerList } from './MarkerList';
import {MapEvents} from './MapEvents'
import L from "leaflet";

const defaultPosition = {
  lat: 55.75,
  lng: 37.36,
  zoom: 7
};


interface MapProps {
    setShowSearch:React.Dispatch<React.SetStateAction<boolean>>,
    markerList:MarkerIFace[] | undefined,
    setMarkerList: React.Dispatch<React.SetStateAction<MarkerIFace[] | undefined>>
}

export interface MarkerIFace {
    latlng?: L.LatLngExpression
}

export const Map = (props:MapProps) => {
    const {setShowSearch, markerList, setMarkerList} = props
    const [loc, setLoc] = useState<[number, number]>([defaultPosition.lat, defaultPosition.lng]);

    return (
        <MapContainer className={styles.map}
                      center={loc}
                      zoom={defaultPosition.zoom}
                      scrollWheelZoom={true}
                      attributionControl={false}
                      zoomControl={false}
                      doubleClickZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapEvents setShowSearch={setShowSearch} setMarkerList={setMarkerList}/>
            <MarkerList objects={markerList}/>
        </MapContainer>
    );
}
