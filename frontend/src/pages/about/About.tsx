import {Navigationbar} from "../../components";
import {Card, Container} from "react-bootstrap";
import React from "react";

export const About = () => {

    return (
        <main>
            <Navigationbar></Navigationbar>
            <Container className="mt-3">
                <Card className='shadow'>
                    <Card.Header className="p-0 text-center">
                        <Card.Text className="fw-light fs-2 p-3 m-3">Аттестационная работа</Card.Text>
                    </Card.Header>
                    <Card.Body className="text-left">
                        <Card.Text className='fs-3 p-3'>Сервис предоставляет информацию о загрязнении воздуха.</Card.Text>
                        <Card.Text className='fs-3 p-3'>Статистика предоставляется в виде графика.</Card.Text>
                        <Card.Text className='fs-3 p-3'>Возможен поиск населенного пункта по названию.</Card.Text>
                        <Card.Text className='fs-3 p-3'>Так же возможно запросить информацию в произвольной точке на карте.</Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </main>
    )
}