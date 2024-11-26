import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import axios from "axios";

const Login = ({ dispatch, setUser }) => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <h1>Войти</h1>
      <Formik
        initialValues={{
          nick: "",
          password: "",
        }}
        onSubmit={(values) => {
          axios
            .post("/api/v1/login", {
              username: values.nick,
              password: values.password,
            })
            .then(({ data }) => {
              setError(false);
              dispatch(setUser(data));
              localStorage.setItem('userToken', data.token);
              localStorage.setItem('userName', data.username);
              navigate('/', { replace: false });
            })
            .catch(function (err) {
              if (err.status === 401) {
                setError(true);
              }
            });
        }}
      >
        <Form>
          <Field name="nick" required />
          <Field name="password" required />
          {error ? <div>Неверные имя пользователя или пароль</div> : null}
          <button type="submit">Войти</button>
        </Form>
      </Formik>
      <div>Нет аккаунта?</div>
      <Link to="/reg">Зарегистрироваться</Link>
    </>
  );
};

export default Login;
