import { Link } from "react-router-dom";
import lost from "../assets/lost.png";
import {
  Row,
  Col,
  Card,
  Container,
} from "react-bootstrap";

const NotFound = () => {
  return (
    <Container className="mb-3 mt-3">
      <Row className="justify-content-center align-items-center">
        <Col xxl={6} lg={9} md={12}>
          <Card className="shadow p-0">
            <Card.Body>
              <Card.Img
                variant="top"
                className="object-fit-cover rounded"
                src={lost}
              />
              <Card.Title className="fs-1 text-center mb-3 mt-3">
                404
              </Card.Title>
              <Card.Subtitle className="text-center">
                Здесь ничего нет. <Link to='/'>Возвращайся назад</Link>
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
