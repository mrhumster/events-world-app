import React from "react";
import {ChartData} from "chart.js";
import {Bar} from "react-chartjs-2";
import styles from "./styles.module.css";
import darkstyles from "./dark.styles.module.css";

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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import {useGetStatisticQuery} from "../../services/airQuality";
import {MarkerIFace} from "./Map";
import {AirQualityResponseIFace} from "../../types/AirQualityResponse";
import {useGetUserDataQuery} from "../../services/backend";

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
    object: MarkerIFace
}

interface TableDataPropsIFace {
    data: AirQualityResponseIFace
}

function TableData(props: TableDataPropsIFace) {
    const { data} = props
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
    let coordinates = props.object.latlng
    const { data,isLoading } = useGetStatisticQuery(coordinates)
    const UserData = useGetUserDataQuery({})
    const current_theme = UserData.data?.data[0].theme

    const getLineData = (initialData:number[], lengthOfDataChunks:number) => {
        const numOfChunks = Math.ceil(initialData.length / lengthOfDataChunks);
        let dataChunks:number[][] = [];

        for (let i = 0; i < numOfChunks; i++) dataChunks[i] = [];

        initialData.forEach((entry:number, index:number) => {
            const chunkNumber = Math.floor(index / lengthOfDataChunks);
            dataChunks[chunkNumber].push(entry);
        });

        const averagedChunks = dataChunks.map(chunkEntry => {
            const sumArray = (accumulator:number, currentValue:number) => accumulator + currentValue;
            const chunkAverage = chunkEntry.reduce(sumArray) / lengthOfDataChunks;
            return chunkEntry.map(chunkEntryValue => chunkAverage);
        });

        return averagedChunks.flat();
    }

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
            chartArea: {
                backgroundColor: 'rgba(251, 85, 85, 1)'
            }
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
                    borderColor: current_theme === 'dark' ? "rgba(115,117,216,0.55)" : "rgba(15,17,16,0.55)",
                    backgroundColor: current_theme === 'dark' ? "rgba(115,117,216,0.55)" : "rgba(15,17,16,0.55)",
                },
                {
                    label: 'Частицы 10 мкм',
                    data: data.hourly.pm10,
                    borderWidth: 2,
                    borderColor: "rgba(255,115,115,0.5)",
                    backgroundColor: current_theme === 'dark' ? "rgba(115,117,216,0.55)" : ["rgba(15,17,16,0.55)"],
                },

                {
                    label: 'Среднее за сутки 2.5 мкм',
                    data: lineDataPM2_5,
                    type: 'line',
                    borderColor: "#7375D8",
                    backgroundColor: current_theme === 'dark' ? "rgba(115,117,216,0.55)" : "rgba(15,17,16,0.55)",
                    fill: false,
                    borderWidth: 2,
                    order: 1
                },
                {
                    label: 'Среднее за сутки 10 мкм',
                    data: lineDataPM10,
                    type: 'line',
                    borderColor: "#FF7373",
                    backgroundColor: current_theme === 'dark' ? "rgba(115,117,216,0.55)" : "rgba(15,17,16,0.55)",
                    fill: false,
                    borderWidth: 2,
                    order: 1
                },
            ]
        }


        // @ts-ignore
        bar = <Bar options={options} data={chart_data} className={current_theme}/>;
        table = <TableData data={data}></TableData>
    }

    if (isLoading) {
        return (
            <div className={styles.fetch_data}>
                <Spinner animation="grow" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        )
    }

    return (
        <div className={styles.popup_content} data-bs-theme={current_theme}>
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