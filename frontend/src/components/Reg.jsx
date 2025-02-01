import { Formik } from "formik";
import { Link } from "react-router-dom"; 
import * as Yup from "yup";
import { regUser } from "../chatServer";
import tunnel from "../assets/tunnel2.png";
import {
  Button,
  Row,
  Col,
  Container,
  Card,
  Form,
  FloatingLabel,
} from "react-bootstrap";

const passwordMatch =
  /^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=[^!#%]*[!#%])[A-Za-z0-9!#%]{8,32}$/;

const SignupSchema = Yup.object().shape({
  nick: Yup.string()
    .required("Обязательное поле")
    .min(4, "Минимум 4 символа")
    .max(25, "Максимум 25 символов"),
  password: Yup.string()
    .required("Обязательное поле")
    .min(8, "Минимум 8 символов")
    .max(32, "Максимум 32 символов")
    .matches(passwordMatch, `Пароль должен содержать как минимум 1 букву нижнего регистра, минимум
       1 заглавную букву, не менее 1 числа, как минимум 1 специальный символ(!#%). Только латиница.`),
  passwordConfirm: Yup.string()
    .required("Обязательное поле")
    .oneOf([Yup.ref("password"), null], "Пароли должны совпадать"),
});

const Reg = ({ dispatch, setUser, navigate }) => {
  return (
    <Container fluid={true} className="auth bg-dark bg-gradient h-100 overflow-hidden py-3 py-sm-4 px-0">
      <Row className="justify-content-center align-items-center h-100 mx-1 mx-sm-4">
        <Col xxl={6} lg={8} sm={10} className="h-100">
            <Card className="shadow p-0 h-100 overflow-auto">
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
                        Регистрация
                      </Card.Title>
                      <Formik
                        initialValues={{
                          nick: "",
                          password: "",
                          passwordConfirm: "",
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={(values) => {
                          const userData = async () => {
                            const data = await regUser(values.nick, values.password);
                            if (data) {
                              dispatch(setUser(data));
                            localStorage.setItem("userToken", data.token);
                            localStorage.setItem("userName", data.username);
                            values.nick = '';
                            values.password = '';
                            values.passwordConfirm = '';
                            navigate("/", { replace: false });
                            } else {
                              console.log('Запустите сервер');
                            }
                            
                          }
                          userData();
                        }}
                      >
                        {({
                          errors,
                          touched,
                          values,
                          handleChange,
                          handleSubmit,
                        }) => (
                          <Form onSubmit={handleSubmit}>
                            <FloatingLabel
                              controlId="nickAuth"
                              label="Ваш ник"
                              className="mb-3"
                            >
                              <Form.Control
                                type="text"
                                name="nick"
                                placeholder="Ваш ник"
                                onChange={handleChange}
                                value={values.nick}
                                isInvalid={errors.nick && touched.nick}
                                isValid={!errors.nick && touched.nick}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.nick}
                              </Form.Control.Feedback>
                            </FloatingLabel>

                            <FloatingLabel
                              controlId="passwordAuth"
                              label="Пароль"
                              className="mb-3"
                            >
                              <Form.Control
                                type="password"
                                name="password"
                                placeholder="Пароль"
                                onChange={handleChange}
                                value={values.password}
                                isInvalid={errors.password && touched.password}
                                isValid={!errors.password && touched.password}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.password}
                              </Form.Control.Feedback>
                            </FloatingLabel>

                            <FloatingLabel
                              controlId="passwordAuthConfirm"
                              label="Подтвердите пароль"
                              className="mb-3"
                            >
                              <Form.Control
                                type="password"
                                name="passwordConfirm"
                                placeholder="Подтвердите пароль"
                                onChange={handleChange}
                                value={values.passwordConfirm}
                                isInvalid={
                                  errors.passwordConfirm &&
                                  touched.passwordConfirm
                                }
                                isValid={
                                  !errors.passwordConfirm &&
                                  touched.passwordConfirm
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.passwordConfirm}
                              </Form.Control.Feedback>
                            </FloatingLabel>

                            <Button
                              variant="info"
                              className="w-100 mt-3"
                              type="submit"
                            >
                              Зарегистрироваться
                            </Button>
                          </Form>
                        )}
                      </Formik>
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="text-center pt-3 pb-2">
              <Card.Subtitle className="mb-0">Вспомнился пароль?</Card.Subtitle>
                <Link to="/login">Авторизоваться</Link>
              </Card.Footer>
            </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Reg;
