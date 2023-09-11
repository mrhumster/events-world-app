import {Marker, Popup, useMap} from "react-leaflet";
import L from "leaflet";
import React, {useEffect} from "react";
import styles from "./styles.module.css";
import {Statistic} from "./Statistic";
import {MarkerIFace} from "./Map";

interface MarkerListProps {
    objects:MarkerIFace[] | undefined
}
export const MarkerList = (props:MarkerListProps) => {
    const {objects} = props
    const Map:L.Map = useMap()

    const icon:L.Icon<L.IconOptions> = L.icon({
        iconUrl: require('../../images/pin.png'),
        iconSize: [26, 36],
        iconAnchor: [13, 36],
        popupAnchor: [0, -36],
        shadowUrl: require('../../images/pin_shadow.png'),
        shadowSize:   [46, 36],
        shadowAnchor: [12, 36]
    })

    useEffect(() => {
        if (objects) {
            if (objects.length > 0) {
                const last_marker:MarkerIFace | undefined = objects[objects.length - 1]
                if (last_marker.latlng) {
                    Map.flyTo(last_marker.latlng)
                }
            }
        }
    }, [Map, objects])


    return (
        <>
            {objects && objects.map((marker: any, index: number) => (
                <Marker key={index} position={marker.latlng} icon={icon}>
                    <Popup className={styles.node_popup} >
                        <Statistic object={marker}/>
                    </Popup>
                </Marker>
            ))}
        </>
    )
}