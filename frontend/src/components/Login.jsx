import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { authUser } from "../chatServer";
import tunnel from "../assets/tunnel.png";
import { useTranslation } from 'react-i18next';
import { changeBlockSending } from "../reducers/usersReducer";
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

  const { t } = useTranslation();

  const AuthSchema = Yup.object().shape({
    nick: Yup.string().required(t('valid.reqField')),
    password: Yup.string().required(t('valid.reqField')),
  });

const { username, token } = useSelector(state => state.usersReducer);
const { blockSending } = useSelector(state => state.usersReducer);
  
  useEffect(() => {
    if (username || token) {
      navigate("/", { replace: true });
    }
  },[token, username]);


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
                      className="auth__img object-fit-cover rounded mb-3 mb-sm-0"
                      src={tunnel}
                    />
                  </Col>
                  <Col md={6}>
                    <Row className="flex-column justify-content-center h-100">
                      <Card.Title className="fs-2 text-center mb-3">
                        {t('auth')}
                      </Card.Title>
                      <Formik
                       initialValues={{
                        nick: "",
                        password: "",
                      }}
                      validationSchema={AuthSchema}
                      onSubmit={(values)=>{
                        dispatch(changeBlockSending(true));
                        const userData = async () => {
                          const data = await authUser(values.nick, values.password);
                          if (data && data.token) {
                            setError(false);
                            dispatch(setUser(data));
                            localStorage.setItem("userToken", data.token);
                            localStorage.setItem("userName", data.username);
                            values.nick = '';
                            values.password = '';
                            navigate("/", { replace: false });
                          } else if (data && data.status === 401) {
                            setError(true);
                            dispatch(changeBlockSending(false));
                          } else {
                            console.log(t('serverOn'));
                            dispatch(changeBlockSending(false));
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
  
                          {error ? (
                            <Alert variant="danger">
                              { t('errorLogin') }
                            </Alert>
                          ) : null}
                          <Button
                            variant="info"
                            className="w-100 mt-3"
                            type="submit"
                            disabled={!blockSending ? false : true}
                          >
                            { t('auth') }
                          </Button>
                        </Form>
                        )}
                      </Formik>
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="text-center pt-3 pb-2">
                <Card.Subtitle className="mb-0">{ t('noaccount') }</Card.Subtitle>
                <Link to="/reg">{ t('regin') }</Link>
              </Card.Footer>
            </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
