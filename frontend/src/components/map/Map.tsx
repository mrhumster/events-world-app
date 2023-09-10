import React, {useEffect, useRef, useState} from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from "react-leaflet";
import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    PointElement,
    LineElement,
    ChartData
} from "chart.js";
import {Bar} from "react-chartjs-2";
import styles from './styles.module.css'
import 'leaflet/dist/leaflet.css';
import L from "leaflet";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
);

const defaultPosition = {
  lat: 55.75,
  lng: 37.36,
  zoom: 7
};

interface MapEventsProps {
    setShowSearch:any,
    setMarkerList:any
}

interface LatLang {
    lat: Number,
    lng: Number
}

interface StatisticProps {
    object: any
}

interface MarkerListProps {
    objects:any
}

interface MapProps {
    setShowSearch:any,
    markerList:any,
    setMarkerList:any
}

function MapEvents(props:MapEventsProps) {
    const {setShowSearch, setMarkerList} = props

    const clickHandler = useMapEvent('click', (e) => {
       setShowSearch(false)
    })

    const doubleClickHandler = useMapEvent('dblclick', (e) => {
        let item = {}
        // @ts-ignore
        item["latlng"] = {
            'lng': e.latlng.lng,
            'lat': e.latlng.lat,
        }
        // @ts-ignore
        setMarkerList(prev => ([...prev,item]))
    })

  return null
}

const Statistic = (props:StatisticProps) => {
    const {object} = props
    const [data, setData] = useState<any>()
    const [fetching, setFetch] = useState<boolean>(false)
    let coordinates = object.latlng

    const getLineData = (initialData:any, lengthOfDataChunks:any) => {
        const numOfChunks = Math.ceil(initialData.length / lengthOfDataChunks);
        let dataChunks:any[] = [];

        for (let i = 0; i < numOfChunks; i++) dataChunks[i] = [];

        initialData.forEach((entry:any, index:any) => {
            const chunkNumber = Math.floor(index / lengthOfDataChunks);
            dataChunks[chunkNumber].push(entry);
        });

        const averagedChunks = dataChunks.map(chunkEntry => {
            const sumArray = (accumulator:any, currentValue:any) => accumulator + currentValue;
            const chunkAverage = chunkEntry.reduce(sumArray) / lengthOfDataChunks;
            // @ts-ignore
            return chunkEntry.map(chunkEntryValue => chunkAverage);
        });

        return averagedChunks.flat();
    }

    function fetchData(coordinates:LatLang){
        setFetch(true)
        const API_OPEN_METEO = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${coordinates.lat}&longitude=${coordinates.lng}&hourly=pm10,pm2_5`

        fetch(API_OPEN_METEO)
            // @ts-ignore
            .then((response) => {
                if (!response.ok) {
                    console.log(response)
                }
                return response.json()})
            .then((data) => {
                setData(data)
            })

    }

    useEffect(() => fetchData(coordinates), [object])

    useEffect(() => {
        setFetch(false)
    }, [data])

    let bar;

    if (data) {
        const isoTime = data.hourly.time;
        const pm10 = data.hourly.pm10;
        const pm2_5 = data.hourly.pm2_5;
        const lineDataPM10 = getLineData(pm10, 24);
        const lineDataPM2_5 = getLineData(pm2_5, 24);

        const options = {
            scales: {
                y: {
                    beginAtZero: true
                },
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    font: {size: 18},
                    text: [`Статистика по загрязнению воздуха`, `Координаты: [${data.latitude}, ${data.longitude}]`]
                },
            }
        }

        const chart_data: ChartData = {
            labels: isoTime.map((item: string) => new Date(item).toLocaleTimeString()),
            datasets: [
                {
                    label: 'Частицы 2.5 мкм',
                    data: data.hourly.pm2_5,
                    borderWidth: 2,
                    borderColor: "rgba(115,117,216,0.55)",
                },
                {
                    label: 'Частицы 10 мкм',
                    data: data.hourly.pm10,
                    borderWidth: 2,
                    borderColor: "rgba(255,115,115,0.5)",
                },

                {
                    label: 'Среднее за сутки 2.5 мкм',
                    data: lineDataPM2_5,
                    type: 'line',
                    borderColor: "#7375D8",
                    fill: false,
                    borderWidth: 2,
                    order: 1
                },
                {
                    label: 'Среднее за сутки 10 мкм',
                    data: lineDataPM10,
                    type: 'line',
                    borderColor: "#FF7373",
                    fill: false,
                    borderWidth: 2,
                    order: 1
                },
            ]
        }

        // @ts-ignore
        bar = <Bar options={options} data={chart_data} />;
    }


    return (
        <>
            <div className={styles.chart_container}>
                {bar}
            </div>
        </>
    )
}

const MarkerList = (props:MarkerListProps) => {
    const {objects} = props
    const Map = useMap()

    const icon = L.icon({
        iconUrl: require('../../images/pin.png'),
        iconSize: [26, 36],
        iconAnchor: [13, 36],
        popupAnchor: [0, -36],
        shadowUrl: require('../../images/pin_shadow.png'),
        shadowSize:   [46, 36],
        shadowAnchor: [12, 36]
    })

    useEffect(() => {
        if (objects.length > 0) {
            const last_marker = objects[objects.length-1]
            Map.flyTo(last_marker.latlng)
        }
    }, [objects])


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
