import { useEffect, useState } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom"; 
import { useSelector } from 'react-redux';
import * as Yup from "yup";
import { getAuth } from "../contexts/AuthProvider";
import { useTranslation } from 'react-i18next';
import { changeBlockSending } from "../reducers/usersReducer";
import tunnel from "../assets/tunnel2.png";
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

const passwordMatch =
  /^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=[^!#%]*[!#%])[A-Za-z0-9!#%]{8,32}$/;

const Reg = ({ dispatch, setUser, navigate }) => {
  const { regUser } = getAuth();
  const { t } = useTranslation();
  const SignupSchema = Yup.object().shape({
    nick: Yup.string()
      .required(t('valid.reqField'))
      .min(4, t('valid.min4'))
      .max(25,  t('valid.max25')),
    password: Yup.string()
      .required(t('valid.reqField'))
      .min(8, t('valid.min8'))
      .max(32, t('valid.max32'))
      .matches(passwordMatch, t('valid.match')),
    passwordConfirm: Yup.string()
      .required(t('valid.reqField'))
      .oneOf([Yup.ref("password"), null], t('valid.samePasswords')),
  });
  const { blockSending } = useSelector(state => state.usersReducer);

  const [error, setError] = useState(false);

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
                        { t('registration') }
                      </Card.Title>
                      <Formik
                        initialValues={{
                          nick: "",
                          password: "",
                          passwordConfirm: "",
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={(values) => {
                          dispatch(changeBlockSending(true));
                          const userData = async () => {
                            const data = await regUser(values.nick, values.password);
                            if (data.token) {
                              setError(false);
                              dispatch(setUser(data));
                            localStorage.setItem("userToken", data.token);
                            localStorage.setItem("userName", data.username);
                            values.nick = '';
                            values.password = '';
                            values.passwordConfirm = '';
                            navigate("/", { replace: false });
                            } else if (data !== 'no-connection') {
                              setError(true);
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
                              label={ t('nick') }
                              className="mb-3"
                            >
                              <Form.Control
                                type="text"
                                name="nick"
                                placeholder={ t('nick') }
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
                              label={ t('password') }
                              className="mb-3"
                            >
                              <Form.Control
                                type="password"
                                name="password"
                                placeholder={ t('password') }
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
                              label={ t('confirmPassword') }
                              className="mb-3"
                            >
                              <Form.Control
                                type="password"
                                name="passwordConfirm"
                                placeholder={ t('confirmPassword') }
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

                            {error ? (
                            <Alert variant="danger">
                              { t('loginExists') }
                            </Alert>
                            ) : null}

                            <Button
                              variant="info"
                              className="w-100 mt-3"
                              type="submit"
                              disabled={!blockSending ? false : true}
                            >
                              { t('regin') }
                            </Button>
                          </Form>
                        )}
                      </Formik>
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="text-center pt-3 pb-2">
              <Card.Subtitle className="mb-0">{ t('rememberPassword') }</Card.Subtitle>
                <Link to="/login">{ t('authin') }</Link>
              </Card.Footer>
            </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Reg;
