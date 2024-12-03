import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";
import tunnel from "../assets/tunnel.png";
import {
  Button,
  Row,
  Col,
  Container,
  Card,
  Form,
  Alert,
  FloatingLabel,
} from "react-bootstrap";

const Login = ({ dispatch, setUser, navigate }) => {
  const [error, setError] = useState(false);
  const formik = useFormik({
    initialValues: {
      nick: "",
      password: "",
    },
    onSubmit: (values) => {
      axios
        .post("/api/v1/login", {
          username: values.nick,
          password: values.password,
        })
        .then(({ data }) => {
          setError(false);
          dispatch(setUser(data));
          localStorage.setItem("userToken", data.token);
          localStorage.setItem("userName", data.username);
          navigate("/", { replace: false });
        })
        .catch(function (err) {
          if (err.status === 401) {
            setError(true);
          }
        });
    },
  });
  return (
    <Container fluid={true} className="auth mb-3 mt-3">
      <Row className="justify-content-center align-items-center">
        <Col xxl={6} lg={9} md={11}>
          <Row>
            <Card className="shadow p-0">
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Card.Img
                      variant="top"
                      className="auth__img object-fit-cover rounded"
                      src={tunnel}
                    />
                  </Col>
                  <Col md={6}>
                    <Row className="flex-column justify-content-center h-100">
                      <Card.Title className="fs-2 text-center mb-3">
                        Войти
                      </Card.Title>
                      <Form onSubmit={formik.handleSubmit}>
                        <FloatingLabel
                          controlId="nickAuth"
                          label="Ваш ник"
                          className="mb-3"
                        >
                          <Form.Control
                            type="text"
                            name="nick"
                            required
                            placeholder="Ваш ник"
                            onChange={formik.handleChange}
                            value={formik.values.nick}
                          />
                        </FloatingLabel>

                        <FloatingLabel
                          controlId="passwordAuth"
                          label="Пароль"
                          className="mb-3"
                        >
                          <Form.Control
                            type="password"
                            name="password"
                            required
                            placeholder="Пароль"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                          />
                        </FloatingLabel>

                        {error ? (
                          <Alert variant="danger">
                            Неверные имя пользователя или пароль
                          </Alert>
                        ) : null}
                        <Button
                          variant="info"
                          className="w-100 mt-3"
                          type="submit"
                        >
                          Войти
                        </Button>
                      </Form>
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="text-center pt-3 pb-2">
                <Card.Subtitle className="mb-0">Нет аккаунта?</Card.Subtitle>
                <Link to="/reg">Зарегистрироваться</Link>
              </Card.Footer>
            </Card>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
