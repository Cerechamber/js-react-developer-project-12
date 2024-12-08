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
    <Container fluid={true} className="bg-dark bg-gradient h-100 overflow-hidden py-3 py-sm-4 px-0">
      <Row className="justify-content-center align-items-center h-100 mx-1 mx-sm-4">
        <Col xxl={6} lg={8} sm={10} className="h-100">
          <Card className="shadow p-0 h-100 overflow-auto">
            <Card.Body className="d-flex flex-column">
              <Card.Img
                variant="top"
                className="object-fit-cover rounded lost mb-auto"
                src={lost}
              />
              <Card.Title className="fs-1 text-center mb-3 mt-3">
                404
              </Card.Title>
              <Card.Subtitle className="text-center mb-auto">
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
