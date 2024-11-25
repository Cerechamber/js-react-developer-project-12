import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import axios from 'axios'
  
  const Login = ({ dispatch, setUser }) => {
    const [error, setError] = useState(false)
    return (
        <>
      <h1>Войти</h1>
      <Formik
        initialValues={{
          nick: '',
          password: '',
        }}
        onSubmit={ (values) => {
          console.log(values);
          axios.post('/api/v1/login',
          { username: values.nick, password: values.password })
          .then((res) => {
            setError(false)
            dispatch(setUser(res))

            console.log(res.data)
          }).catch(function (err) {
             if (err.status === 401) {
              setError(true)
             }
          });
        }}
      >
          <Form>
            <Field name="nick" required />
            <Field name="password" required />
            { error ? 
            <div>Неверные имя пользователя или пароль</div>
            : null
            }
            <button type="submit">Войти</button>
          </Form>
      </Formik>
      <Link to='/reg'>Зарегистрироваться</Link>
    </>
    )
    
};

export default Login