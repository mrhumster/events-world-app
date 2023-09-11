import React, {useEffect, useState} from "react";
import {ChartData} from "chart.js";
import {Bar} from "react-chartjs-2";
import styles from "./styles.module.css";

import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    PointElement,
    LineElement
} from "chart.js";
import {Spinner, Tab, Table, Tabs} from "react-bootstrap";
import L, {LatLngLiteral} from "leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

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
interface StatisticProps {
    object: any
}

function TableData(props: { data:any }) {
    const {data} = props

    return (
        <Table striped className="border-start border-bottom">
           <thead>
            <tr>
              <th>Время</th>
              <th>Частицы 2.5 {data.hourly_units.pm2_5}</th>
              <th>Частицы 10 {data.hourly_units.pm10}</th>
            </tr>
          </thead>
            <tbody>
            {data.hourly.time.map((time:string, i:number) => {
                const d = new Date(data.hourly.time[i])
                return (
                    <tr key={i}>
                        <td>{d.toLocaleDateString()} {d.toLocaleTimeString()}</td>
                        <td>{data.hourly.pm2_5[i]}</td>
                        <td>{data.hourly.pm10[i]}</td>
                    </tr>
                )
            })}

            </tbody>
        </Table>
    )
}

export const Statistic = (props:StatisticProps) => {
    const {object} = props
    const [data, setData] = useState<any>()
    const [fetching, setFetch] = useState<boolean>(true)
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

    function fetchData(coordinates:L.LatLngLiteral){
        setFetch(true)
        const API_OPEN_METEO = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${coordinates.lat}&longitude=${coordinates.lng}&hourly=pm10,pm2_5`

        fetch(API_OPEN_METEO)
            .then((response) => {
                if (!response.ok) {
                    console.log(response)
                }
                return response.json()})
            .then((data) => {
                setData(data)
            })

    }

    useEffect(() => fetchData(coordinates), [coordinates])

    useEffect(() => {
        setTimeout(()=>setFetch(false), 1000)
    }, [data])

    let bar, table;

    if (data) {
        const isoTime = data.hourly.time;
        const pm10 = data.hourly.pm10;
        const pm2_5 = data.hourly.pm2_5;
        const lineDataPM10 = getLineData(pm10, 24);
        const lineDataPM2_5 = getLineData(pm2_5, 24);

        const options = {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        align: 'end',
                        color: '#989898',
                        text: data.hourly_units.pm10
                    }
                },
            },
            responsive: true,
            maintainAspectRatio: false,

        }

        const chart_data: ChartData = {
            labels: isoTime.map(
                (item: string) => {
                    const date_value = new Date(item);
                    return `${date_value.toLocaleDateString()} ${date_value.toLocaleTimeString()}`

                }
            ),
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
        table = <TableData data={data}></TableData>
    }

    if (fetching) {
        return (
            <div className={styles.fetch_data}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        )
    }

    return (
        <div className={styles.popup_content}>
            <p className="p-2 m-0 text-center">Прогноз по содержанию твердых частиц в воздухе</p>
            <span className="fst-italic p-2"><FontAwesomeIcon icon={faLocationDot} />{' '}{data.latitude} {data.longitude}</span>
            <Tabs defaultActiveKey="diagram" className="mb-0" fill>
                <Tab eventKey="diagram" title="Диаграмма" className="border-bottom border-start border-end">
                    <div className={styles.chart_container}>
                        {bar}
                    </div>
                </Tab>
                <Tab eventKey="table" title="Таблица">
                    <div className={styles.popup_table}>
                        {table}
                    </div>
                </Tab>
            </Tabs>

        </div>
    )
}