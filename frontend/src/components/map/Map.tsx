import React, {useState} from "react";
import {LayersControl, MapContainer, TileLayer } from "react-leaflet";

import styles from './styles.module.css'
import 'leaflet/dist/leaflet.css';
import { MarkerList } from './MarkerList';
import {MapEvents} from './MapEvents'

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
    latlng: {
        lat: number,
        lng: number
    }
}

export const Map = (props:MapProps) => {
    const {setShowSearch, markerList, setMarkerList} = props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
            <LayersControl position="bottomright">

                    <LayersControl.BaseLayer name="Спутник">
                        <TileLayer
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                        />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer checked name="Схема">
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                className='map-tiles'
            />
            <MapEvents setShowSearch={setShowSearch} setMarkerList={setMarkerList}/>
            <MarkerList objects={markerList}/>
        </MapContainer>
    );
}
