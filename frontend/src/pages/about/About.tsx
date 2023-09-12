
import {Card, Container} from "react-bootstrap";
import React from "react";

import image from '../../images/oblaka.jpg'
import { Navigationbar } from "../../components";

export const About = () => {

    return (
        <main>
            <Navigationbar></Navigationbar>
            <Container className="mt-3">
                <Card className='shadow'>
                    <Card.Img variant="top" height={'100px'} src={image} />
                    <Card.ImgOverlay>
                        <Card.Header className="p-0 text-center" style={{'height': '82px'}}>
                            <div className="fw-light pt-3 mb-2" style={{'color': '#fff'}}>Аттестация по программированию: создание веб-сервиса по прогнозу состояния воздуха</div>
                        </Card.Header>
                    </Card.ImgOverlay>
                    <Card.Body className="text-left">
                        <div className='p-3'>Веб-сервис предоставляет интерактивную карту с возможностью выбора точки для получения прогноза по состоянию воздуха. Прогноз включает показатели содержания твердых частиц, таких как пыльца, пыль и другие мелкие частицы.</div>
                        <div className="card-text">Основные функции сервиса:</div>
                        <ul>
                            <li>Интерактивная карта с возможностью масштабирования и выбора нужной точки для получения информации о состоянии воздуха.</li>
                            <li>Отображение показателей содержания твердых частиц в выбранном месте, включая пыльцу, пыль, диоксид азота и другие загрязнители.</li>
                            <li>Информация о прогнозе на ближайшие несколько часов или дней, включая тенденции изменения содержания твердых частиц.</li>
                            <li>Интеграция с погодными данными для учета влияния погодных условий на качество воздуха.</li>
                        </ul>

                    </Card.Body>

                </Card>
            </Container>
        </main>
    )
}