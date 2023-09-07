import React, {useState} from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import styles from './styles.module.css'
import 'leaflet/dist/leaflet.css';

const defaultPosition = {
  lat: 55.75,
  lng: 37.36,
  zoom: 7
};
export const Map: React.FC = () => {
    const [loc, setLoc] = useState<[number, number]>([defaultPosition.lat,defaultPosition.lng]);

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
    </MapContainer>
  );
};
