import {Navigationbar} from "../../components";
import {Card, Container} from "react-bootstrap";

export const About = () => {
    return (
        <>
            <Navigationbar></Navigationbar>
            <Container className="mt-3">
                <Card className="p-0">
                    <Card.Header>
                        <Card.Text className="fw-light fs-5 m-3">Сервис по загрязнению окружающей среды
                        </Card.Text>
                    </Card.Header>

                </Card>
            </Container>
        </>
    )
}